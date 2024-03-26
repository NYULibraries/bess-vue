FROM node:20-alpine

ENV INSTALL_PATH /app
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH
# Prevent error: "error:0308010C:digital envelope routines::unsupported"
# See https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported
# TODO: Remove this workaround after replacing webpack.
ENV NODE_OPTIONS=--openssl-legacy-provider

ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

ADD . $INSTALL_PATH

WORKDIR $INSTALL_PATH

CMD NODE_ENV=production yarn build:prod
