FROM node:14
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 80
CMD ["node", "dist/main/server.js"]
