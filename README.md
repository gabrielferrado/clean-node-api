# Clean Triangles API

[![Build & Test](https://github.com/gabrielferrado/clean-triangles-api/actions/workflows/main.yml/badge.svg)](https://github.com/gabrielferrado/clean-triangles-api/actions/workflows/main.yml)
[![Terraform](https://github.com/gabrielferrado/clean-triangles-api/actions/workflows/terraform.yml/badge.svg)](https://github.com/gabrielferrado/clean-triangles-api/actions/workflows/terraform.yml)
[![Coverage Status](https://coveralls.io/repos/github/gabrielferrado/clean-node-api/badge.svg?branch=master)](https://coveralls.io/github/gabrielferrado/clean-node-api?branch=master)

This is an API with a well-defined and decoupled architecture, 
using TDD (test-oriented programming) as a working methodology, 
Clean Architecture to distribute responsibilities in layers, 
always following SOLID principles and, whenever possible, 
applying Design Patterns to solve common problems.

## 🚀 Instructions

If you want to test the application run commands as follows

#### With docker
```sh 
 docker compose up
```

#### Without docker
```sh 
 npm build && npm start
```

Open you favourite API platform and start making requests to `http://localhost:5050`

### Tests
```sh 
 npm test
```

#### coverage
```sh 
 npm run test:ci
```

---
## ⚙️ API Features

1. [Signup](./requirements/signup.md)
1. [Login](./requirements/login.md)
1. [Classify Triangle](./requirements/add-triangle.md)
1. [List Triangles](./requirements/load-triangles.md)
---
#### Design Patterns

* Factory
* Adapter
* Composite
* Decorator
* Proxy
* Dependency Injection
* Abstract Server
* Composition Root

#### Methodology & Designs

* TDD
* Clean Architecture
* DDD
* Conventional Commits
* GitFlow
* Modular Design
* Dependency Diagrams
* Use Cases
* Continuous Integration

