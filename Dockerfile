FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install --global serve

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]