FROM node:lts-alpine as angular

WORKDIR /home/app

COPY package*.json /home/app/

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

VOLUME /var/cache/nginx

COPY --from=angular /home/app/dist/bdu-app /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
