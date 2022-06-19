provider "aws" {
  region  = "us-east-1"
  version = "~> 2.63"
}


terraform {
  backend "s3" {
    bucket = "tfstate-450097264690"
    key    = "state/terraform.tfstate"
    region = "us-east-1"
  }
}
