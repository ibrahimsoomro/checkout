# Checkout

This demonstration project is for showcasing a hypothetical scenario for checkout. The desired usecase was to issue
voucher to customers with order prices more than 100 euros, the voucher should be worth 5 euros and should be issued as
soon as the order status is updated to sent.

## Prerequisites

- Node.js (18.15.0)
- Docker
- Docker Compose
- Yarn

## Getting Started

1. Clone the repository:

   ```bash
   git clone git@github.com:ibrahimsoomro/checkout.git
   ```

2. Install dependencies:

   ```bash
   cd /order
   yarn

   cd /voucher
   yarn
   ```

3. Run tests:

   ```bash
   cd /order
   yarn test

   cd /voucher
   yarn test
   ```

4. Access Order service on:

   ```bash
   http://localhost:54322
   ```

## Service Structure

This project has 2 services `order` and `voucher` both have idential directory structure.

```
    . /service
        /src
            api
                http (holds the http endpoint and controller logic and tests)
                pubsub (holds the pubsub handler logic and tests)
            application
                dto (holds the type definitions)
                events (holds the eventBus definitions)
                factories (holds the UsecaseFactory definitions)
                repositories (holds the repository definitions)
                usecases (holds the usecase logic)
            infrastructure
                events (holds the PubSubClient and PubSubEventBus logic)
                factories (holds the UsecaseFactory logic)
                repositories (holds the repository, entities, migrations logic and database configuration)
            shared
                application (holds shared application related definitions and logic)
                infrastructure (holds shared infrastructer logic)
        index.ts (service entry point)
        .node-version (for fnm to auto detect the node version - note that fnm a system level dependency)
        .env-cmdrc (holds local environment variables)
        tsconfig.base.json (holds typescript configuration)
```

The order service contains logic regarding order creation and is responsible for publishing a message top voucher
service to create the voucher.

`Order` service utilizes http endpoint to create order and use `Redis PubSub` to publish message to `Voucher` service.
`Voucher` service creates and save the voucer as soon as it gets the request. I order to run the flow end-to-end you
have to first run the docker-compose and run the migrations using following command:

```bash
   cd /order
   yarn db:migrate

   cd /voucher
   yarn db:migrate
```

This will create necessary migration tables in the database. Once everything is setup, making a request will save the order in the database and you can check the published message in the docker container logs.

## Architecture

- NodeJS Services
- Postgres DB for both services
- Redis for PubSub

Since this is a demo project, I've tried to keep the architecture as simple as possible. Specially with the PubSub service. Since Redis in not an ideal Pubsub candidate for production level projects due to its persistence strategy. It can be replaced by Kafka or RabbitMQ depending on the Usecase

## What can be improved

- As mentioned above the messaging service can be improved in this overall architecture. To make it scalable we can either setup these services on EC2 instenses on AWS or their alternative on GCP with an auto-scaling policy in place. Alternatively we can use Kubernetes to manage these services.
- I've created these services with an assumption that are going to be deployed being a process manager like PM2 in case if deployed on EC2 or deployment artifact in Kubernetes that recreates the service pods in case of failure. 
- For a more production grade application the overall application can be connected with any Error report and Monitoring tool to check the overall health of the services and architectural components.

In the end I would love to know if you have any questions or confusion regarding this demo. Looking forward for the feedback. 