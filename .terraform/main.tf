provider "aws" {
  region  = "us-east-1"
}


terraform {
  cloud {
    organization = "gabrielferrado"

    workspaces {
      name = "gh-actions"
    }
  }
}
