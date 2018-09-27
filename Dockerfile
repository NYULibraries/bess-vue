FROM node:8-slim

ENV INSTALL_PATH /app
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH

RUN apt-get update && apt-get install -y \
  libfontconfig \
  libpython-dev \
  python \
  python-pip

RUN pip install --upgrade pip && pip install awscli

ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

ADD . $INSTALL_PATH

WORKDIR $INSTALL_PATH

RUN yarn build
