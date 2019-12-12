# Set the base image to Ubuntu
FROM node:latest

MAINTAINER Lavesh Panjwani

RUN yarn global add pm2

RUN mkdir -p /opt/fintech

RUN mkdir -p /opt/fintech/node

WORKDIR /opt/fintech/node

ADD . /opt/fintech/node

RUN yarn install

EXPOSE 5555

# Run app
CMD ["pm2-runtime", "start", "server.config.js"]