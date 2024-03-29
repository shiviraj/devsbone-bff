FROM node:17

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

CMD ["npm", "start"]
