FROM node:10.16.3

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

CMD [ "node", "src/index.js" ]