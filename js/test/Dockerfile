FROM quay.io/nyulibraries/chromium_headless_node:12-chromium_latest

ENV INSTALL_PATH /app
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH

ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p $INSTALL_PATH && cp -a /tmp/node_modules $INSTALL_PATH

# Add Chrome as a user
RUN mkdir -p /usr/src/app \
  && adduser -D chrome \
  && chown -R chrome:chrome /usr/src/app
# Run Chrome as non-privileged
USER chrome
WORKDIR /usr/src/app

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/

WORKDIR $INSTALL_PATH

COPY . .

# Autorun chrome headless with no GPU
# ENTRYPOINT ["chromium-browser", "--headless", "--disable-gpu", "--disable-software-rasterizer", "--disable-dev-shm-usage"]