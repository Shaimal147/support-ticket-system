Description:
  Full stack ticket logging system. Built upon postgresql, springboot and vanilla js.

Features:
  - CRUD functionality
  - Filtering
  - Pagination
  - Comments
  - Search by ticket ID

Tech stack:
 - Java
 - SpringBoot
 - Spring data JPA
 - Postgresql
 - Maven
 - HTML
 - Javascript
 - Axios

Architecture:
  Client side axios requests -> Spring boot controller -> DTO -> service -> DTO to entity mapping -> repository -> postgresql database

Database setup:
 - Postgresql must be installed
 - Database must exist with same name as in application.properties file
 - Create user and give privileges to the user for this database
 - export credentials for the DB username and DB password variables in application.properties
 - Hibernate currently uses ddl-auto=update . change to validate before production migration

How to run:
 - clone repo
 - create database
 - create user
 - give user privileges
 - export credentials
 - run springboot backend
 - run frontend files in a browser server

API overview:
  - POST /tickets
  - GET /tickets/{id}
  - GET /tickets
  - PUT /tickets/{id}/status
  - PUT /tickets/{id}/priority
  - DELETE /tickets/{id}
  - POST /tickets/{id}/comments
  - GET /tickets/{id}/comments

Limitations:
 - No auth
 - Minimal validation
 - No tests
 - vanilla JS frontend
 - No migration system

Future improvements:
 - React migration
 - Authentication / Authorization
 - tests
 - better validation
 - Flyway/Liquibase for migration
 - UI polish
 - Deployment
