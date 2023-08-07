FROM node:18.15.0-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production && \
    mv node_modules prod_node_modules && \
    yarn install

COPY . .
RUN yarn build
RUN ls -la


FROM node:18.15.0-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY --from=build --chown=node:node /usr/src/app/prod_node_modules node_modules/
COPY --from=build --chown=node:node /usr/src/app/dist dist/

USER node

EXPOSE 50051

CMD [ "node", "dist"]