# Had to downgrade from Node 20 to 18 to work around this bug:
#     "[BUG] npm install will randomly hang forever and cannot be closed when this occurs #4028"
#     https://github.com/npm/cli/issues/4028
# So far the bug has only occurred in Docker.  `npm install` using Node 20 in
# MacOS is fine.
FROM node:18-bullseye

ENV INSTALL_PATH /app
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH

ADD package.json package-lock.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

ADD . $INSTALL_PATH

WORKDIR $INSTALL_PATH

CMD NODE_ENV=production npm run build:prod
