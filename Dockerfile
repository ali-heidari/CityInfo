FROM node:8-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm config set registry https://registry.npmjs.org

RUN npm install

ADD . /app

EXPOSE 3000

CMD ["npm", "run", "start"]