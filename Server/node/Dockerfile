# Set the base image to Ubuntu
FROM node:latest

MAINTAINER Lavesh Panjwani

RUN yarn global add pm2

RUN mkdir -p /home/lavesh/

RUN mkdir -p /home/lavesh/node

WORKDIR /home/lavesh/node

ADD . /home/lavesh/node

RUN yarn install

EXPOSE 5555

# Run app
CMD ["pm2-runtime", "start","server.config.js"]
# CMD ["yarn", "start"]