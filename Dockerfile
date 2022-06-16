FROM node:14
WORKDIR /usr/app/clean-node-api
COPY ./package.json .
RUN npm install --only=prod
