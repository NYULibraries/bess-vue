# While we were running Node 20 we had to downgrade the Node version in Docker
# to version 18 to work around this bug (which only occurred in Docker, for us):
#     "[BUG] npm install will randomly hang forever and cannot be closed when this occurs #4028"
#     https://github.com/npm/cli/issues/4028
#
# PR https://github.com/NYULibraries/bess-vue/pull/141 upgraded all direct
# dependencies, after which Node 18 could no longer run the tests:
# https://app.circleci.com/pipelines/gh/NYULibraries/bess-vue/434/workflows/944632e7-7d71-4ad7-9e90-79909c5a0f09/jobs/396
# We had no choice but to upgrade Node to the latest, version 24.  At the moment
# the test container seems to be fine, but the bug ticket linked to above was
# apparently never fixed, despite the ticket being closed.
# We therefore need to continue to be on the lookout for NPM install errors in
# Docker containers, and perhaps ready to try some of the workarounds mentioned
# in comments of the GitHub bug ticket.
FROM node:24.14.0

ENV INSTALL_PATH /app
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH

ADD package.json package-lock.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

ADD . $INSTALL_PATH

WORKDIR $INSTALL_PATH

CMD NODE_ENV=production npm run build:prod
