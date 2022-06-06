
FROM node:14-alpine3.14

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install
COPY . /app
EXPOSE 9000
CMD [ "node", "mock-api/app.js" ]