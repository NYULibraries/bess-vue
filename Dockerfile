FROM node:8.15.0-alpine

ENV INSTALL_PATH /app
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH

ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

ADD . $INSTALL_PATH

WORKDIR $INSTALL_PATH

CMD NODE_ENV=production yarn build:prod