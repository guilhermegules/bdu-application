FROM node:lts-alpine

WORKDIR /home/app

RUN npm install -g @angular/cli

COPY . /home/app

RUN npm install -g @angular/cli && npm install

CMD ["npm", "start"]
