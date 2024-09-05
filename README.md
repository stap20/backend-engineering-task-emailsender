# PAYEVER | BACK-END ASSIGNMENT | EMAIL SENDER

This project was developed as part of a challenge proposed by Payever for the position of Back-end Engineer. It involves creating a simple REST application from scratch using Nest.js, TypeScript, MongoDB, RabbitMQ,
## Content

1. [Getting Started](#getting-started)
    - [Requirements](#requirements)
2. [Download and Installation](#download-and-installation)
3. [API Resources](#api-resources)
    - [Endpoints](#endpoints)
4. [Automated Tests](#automated-tests)
5. [Technologies](#technologies)
6. [Acknowledgments](#acknowledgments)

## Getting Started

The following instructions will help you get a copy of this project up and running on your local machine. You will be able to test it in both Production and Development modes.

Below you will find relevant information about the API resources available (its endpoints) as well as the main technologies used to build it.

### Requirements

You need to install the following technologies:

- [Node.js](https://nodejs.org/en/download/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [RabbitMQ](https://www.rabbitmq.com/download.html) - Open-source message-broker software.
- [Nest.js](https://nestjs.com/) - A progressive Node.js framework to build scalable and testable applications.

For MongoDB, you can use its Atlas service to avoid installing it locally. You can access it [here](https://www.mongodb.com/atlas/database).

## Download and Installation

Make sure you have Git installed on your machine. Clone this project using the following command:

bash

Copy code

`git clone https://github.com/stap20/backend-engineering-task-emailsender.git cd backend-engineering-task-emailsender`

After cloning the repository, install the dependencies:

bash

Copy code

`npm install`

Start the application in development mode using:

bash

Copy code

`npm run start:dev`

The application will run as a microservice to receive messages from a RabbitMQ queue. You can now start sending messages to the queue or running tests.

## API Resources

### Endpoints

- **Event Pattern: `report.generated`**
    
    - Listens for the `report.generated` event and triggers the email sending process. The event should include `reportData` in the form of a `ReportDto` object. The service generates an HTML report from the data and simulates sending an email.
## Automated Tests

To ensure the functionality of the service, unit tests can be found alongside the respective code files. For running the tests:

1. Run unit tests:
    
    bash
    
    Copy code
    
    `npm run test`
    
2. To get the test coverage report:
    
    bash
    
    Copy code
    
    `npm run test:cov`

This will provide details on the coverage of your unit tests, including which parts of the code are tested and which are not.

## Technologies

Main technologies used in this project:

- **Node.js** - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Nest.js** - A progressive Node.js framework to build highly scalable and testable applications.
- **TypeScript** - A strongly typed programming language that builds on JavaScript.
- **RabbitMQ** - An open-source message-broker software.

## Acknowledgments

I’d like to thank Payever and its representatives for providing this challenge. The project was a great opportunity to work with new technologies and apply my skills in building scalable applications.