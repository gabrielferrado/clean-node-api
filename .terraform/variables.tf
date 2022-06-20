variable "key_name" {
  type        = string
  description = "The name for ssh key, used for aws_launch_configuration"
  default     = "ecs_clean_node_api"
}

variable "cluster_name" {
  type        = string
  description = "The name of AWS ECS cluster"
  default     = "ecs-clean-node-api-cluster"
}
