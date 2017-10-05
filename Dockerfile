FROM node:latest

ENV INSTALL_PATH /app

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

ADD . $INSTALL_PATH

WORKDIR $INSTALL_PATH

ENTRYPOINT ["npm", "run"]

CMD ["test"]
