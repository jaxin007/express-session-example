FROM node:14.16.0-alpine3.10

WORKDIR /backend_app

COPY package*.json ./

RUN npm install && npm cache clean --force

RUN apk add build-base && apk add python3 && apk add openssl

COPY . .

EXPOSE 3030

CMD [ "npm", "run", "dev" ]
