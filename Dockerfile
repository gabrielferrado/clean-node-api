FROM node:14
WORKDIR /app
COPY ./package.json .
RUN npm install --only=prod
RUN npm i pm2 -g
COPY ./dist ./dist
EXPOSE 3000

CMD ["pm2-runtime", "./dist/main/server.js"]
