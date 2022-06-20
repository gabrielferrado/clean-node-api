resource "aws_ecs_cluster" "web-cluster" {
  name               = var.cluster_name
  capacity_providers = [aws_ecs_capacity_provider.test.name]
  tags = {
    "env"       = "dev"
    "createdBy" = "gabrielferrado"
  }
  depends_on = [
    aws_ecs_capacity_provider.test,
    aws_autoscaling_group.asg,
  ]
}

resource "aws_ecs_capacity_provider" "test" {
  name = "capacity-provider-test"
  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.asg.arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      status          = "ENABLED"
      target_capacity = 85
    }
  }
}

# update file container-def, so it's pulling image from ecr
resource "aws_ecs_task_definition" "task-definition-test" {
  family                = "web-family"
  container_definitions = file("container-definitions/container-def.json")
  network_mode          = "bridge"
  tags = {
    "env"       = "dev"
    "createdBy" = "gabrielferrado"
  }
}

resource "aws_ecs_service" "service" {
  name            = "${var.key_name}-service"
  cluster         = aws_ecs_cluster.web-cluster.id
  task_definition = aws_ecs_task_definition.task-definition-test.arn
  desired_count   = 10
  ordered_placement_strategy {
    type  = "binpack"
    field = "cpu"
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.lb_target_group.arn
    container_name   = "clean-node-api"
    container_port   = 80
  }
  # Optional: Allow external changes without Terraform plan difference(for example ASG)
  lifecycle {
    ignore_changes = [desired_count]
  }
  launch_type = "EC2"
  depends_on = [
    aws_lb_listener.web-listener,
    aws_ecs_task_definition.task-definition-test,
    aws_ecs_cluster.web-cluster,
    aws_lb_target_group.lb_target_group,
    aws_security_group.ec2-sg,
    aws_security_group.lb
  ]
}

resource "aws_cloudwatch_log_group" "log_group" {
  name              = "/ecs/${var.cluster_name}"
  retention_in_days = 1
  tags = {
    "env"       = "dev"
    "createdBy" = "gabrielferrado"
  }
}

resource "aws_cloudwatch_metric_alarm" "health" {
  alarm_name          = "${var.key_name}-healthy-host"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "HealthyHostCount"
  namespace           = "AWS/ApplicationELB"
  period              = "60"
  statistic           = "Maximum"
  threshold           = "1"
  alarm_description   = "Healthy host count for EC2 machine"

  dimensions = {
    LoadBalancer = aws_lb.test-lb.arn_suffix
    TargetGroup  = aws_lb_target_group.lb_target_group.arn_suffix
  }
}

resource "aws_cloudwatch_metric_alarm" "cpualarm" {
  alarm_name          = "${var.key_name}-cpu-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "60"

  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.asg.name
  }

  alarm_description = "This metric monitor EC2 instance cpu utilization"
}
