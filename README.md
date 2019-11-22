# listify
An application that allows the user to create multiple independant task lists. 

## motivation
The purpose of this project is to learn AngularJS, refresh my knowledge on Java Spring, improve my skills in designing a MYSQL DB, get in the habit unit-testing using TDD and finally host the application on the web (Heroku). I chose to a make a tasklist application because it's fairly simple logic wise - making it great for learning to technology.

## features
* sign-up/login - authentication via JWT
* create/edit/delete many tasklists
* check off task is complete by clicking
* persistance via mysql database

## apps used
* Eclipse
* Atom
* Mysql Workbench
* Postman

## installation
For the front-end Angular CLI is required to run the application in development mode. Run the commands in the CMD.
* npm install (to install all dependancies) 
* ng serve (runs application on localhost:4000)

For the back-end import the project into an ide. Maven is used for dependencies. Run the class that has the annotation @SpringBootApplication. In the resources create an application.yaml to connect to the database and create the tables using the provided sql script.



## improvements
* form validation needs to be implemented 
* reset all tasks 
* UI could be improved
* Application could be more mobile friendly
