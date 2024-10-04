#!/usr/bin/env bash

ROOT=$( cd "$(dirname "$0")" ; cd ..; pwd -P )

BROWSER_OVERRIDES_APP_BUILDS_DIR=$ROOT/browser-overrides/local/cdn-dev.library.nyu.edu/longurls
DIST_APP_BUILD_FILE=$ROOT/dist/app.min.js

# Don't do this:
#
# for overrideFile in $BROWSER_OVERRIDES_APP_BUILDS_DIR/app.min.js-*.js
# do
#    cp -p $DIST_APP_BUILD_FILE $overrideFile
# done
#
# ...because if app.min.js-*.js doesn't match anything, bash will create a single
# file that is actually named "app.min.js-*.js" (the "*" is very unsafe).

cp -p $DIST_APP_BUILD_FILE $BROWSER_OVERRIDES_APP_BUILDS_DIR/app.min.js-12eef0d3.js
cp -p $DIST_APP_BUILD_FILE $BROWSER_OVERRIDES_APP_BUILDS_DIR/app.min.js-3225a601.js
cp -p $DIST_APP_BUILD_FILE $BROWSER_OVERRIDES_APP_BUILDS_DIR/app.min.js-32524f3b.js
cp -p $DIST_APP_BUILD_FILE $BROWSER_OVERRIDES_APP_BUILDS_DIR/app.min.js-385d950c.js
cp -p $DIST_APP_BUILD_FILE $BROWSER_OVERRIDES_APP_BUILDS_DIR/app.min.js-efa2d0c.js


