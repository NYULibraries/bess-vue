FROM node:latest

ENV INSTALL_PATH /app
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH

RUN apt-get update -qq && apt-get install -y vim

ADD package.json /tmp/package.json
RUN cd /tmp && npm link gulp && npm install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

ADD . $INSTALL_PATH

WORKDIR $INSTALL_PATH

RUN npm install -g gulp
