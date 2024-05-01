# Bess Vue

[![CircleCI](https://circleci.com/gh/NYULibraries/bess-vue.svg?style=svg)](https://circleci.com/gh/NYULibraries/bess-vue)

Embed a JS search form to your Primo (new) UI in any webpage.

![Example image of bess-vue](https://user-images.githubusercontent.com/22364063/61538864-43796400-aa08-11e9-95a5-acb88ff07edc.png)

---

## Usage

```html
<!-- container where embeddable search will be injected -->
<div id="bess_vue_container_nyuad"></div>
<!-- ensure that the injectable element's id matches the element_id value in query string -->
<script type="text/javascript" id="bess_vue" src="https://cdn.library.nyu.edu/bess-vue/app.min.js?institution=NYUAD&element_id=bess_vue_container_nyuad">
</script>
<!-- Component comes unstyled. Optionally embed CSS. -->
<!-- NOTE: See "Project rename: primo-explore-search-embed to bess-vue" in this
           README for the reason why the previous widget name primo-explore-search-embed
           is being used for the CSS file name. -->
<link type="text/css" rel="stylesheet" href="https://cdn.library.nyu.edu/bess-vue/primo_explore_search_embed.min.css" />
```

---

## Prerequisites

* Node 18 or higher ([nvm](https://github.com/nvm-sh/nvm) recommended)

---

## Getting started

* [Install](https://github.com/NYULibraries/bess-vue#install)
* [Run in dev server with HMR](https://github.com/NYULibraries/bess-vue#run-in-dev-server-with-hmr)
* To preview all configurations simultaneously in the example local HTML file:
  * [Build](https://github.com/NYULibraries/bess-vue#build)
  * [Preview configurations for all institutions on one page](https://github.com/NYULibraries/bess-vue#preview-configurations-for-all-institutions-on-one-page)
* To view the dev CDN build in the sample institution HTML pages:
  [View dev CDN build in sample institution HTML pages](https://github.com/NYULibraries/bess-vue#view-dev-cdn-build-in-sample-institution-html-pages)

---

## Install

```shell
git clone git@github.com:NYULibraries/bess-vue.git
cd bess-vue/
npm install
```

---

## Build

Build for distribution.  The components self-configure based on Vite mode
(see Vite [Modes](https://vitejs.dev/guide/env-and-mode#modes)).  Currently two
modes are supported: dev and prod.
Builds can be run in watch mode:
[Rebuild on files changes](https://vitejs.dev/guide/build#rebuild-on-files-changes)

```shell
npm run build:dev
npm run build:prod
# Trigger rebuild on file changes
npm run build:dev:watch
npm run build:prod:watch
```

Using Docker Compose:

```shell
docker compose up build-dev
docker compose up build-prod
# Trigger rebuild on file changes
docker compose up build-dev-watch
docker compose up build-prod-watch
```

---

## Run in dev server with HMR

```shell
npm run dev:nyu
npm run dev:nyuad
npm run dev:nyush
npm run dev:nyu-home
```

Using Docker Compose:

```shell
docker compose up dev-nyu
docker compose up dev-nyuad
docker compose up dev-nyush
docker compose up dev-nyu-home
```

---

## Preview configurations for all institutions on one page

Open file _index-all-institutions.html_ directly in a browser.  This HTML page
contains instances for all institution configurations on a single page, loaded
from the local repo clone and un-styled.

---

## View dev CDN build in sample institution HTML pages

There aren't always live dev instances of the websites that use bess-vue, and in
cases where there are dev instances, we don't always have the ability configure
them to load bess-vue from the dev CDN in order to preview changes.
We can work around this limitation somewhat but making use of local overrides.

For Chromium-based browsers:

* Follow these instructions for setting up local overrides,
  setting the override folder to _browser-overrides/_:
[Override web content and HTTP response headers locally](https://developer.chrome.com/docs/devtools/overrides)
* Navigate to the URLs for the institutions that currently use bess-vue:
  * NYU: https://library.nyu.edu/
  * NYUAD: https://nyuad.nyu.edu/library.html
  * NYUSH: https://guides.nyu.edu/nyushcscapstone/books
  * NYU HOME: https://globalhome.nyu.edu/

---

## ESLint

### Fix ESLint errors

To fix all ESLint errors in files for which we enforce ESLint rules:

```shell
npm run eslint:fix
```

Using Docker Compose:

```shell
docker compose up eslint-fix
```

---

## Tests

```shell
npm run test
```

Using Docker Compose:

```shell
docker compose up test
```

---

## References

* [Vite](https://vitejs.dev/)
  * Uses [rollup\.js](https://rollupjs.org/) for bundling 
* [Vitest](https://vitest.dev/)
* [Vue.js](https://vuejs.org/)

---

## Caveats

### HMR and `--watch` of `vite build` might not work on some machines and in some Docker containers
  
* HMR and `--watch` might work on one Mac running one
  version of MacOS but not work on another Mac with different hardware running
  another version of MacOS.  This is likely due to bugs in
  [chokidar](https://github.com/paulmillr/chokidar), which is the file watcher
  used by rollup.js (which Vite uses for bundling).
* There are many bug tickets in the [vite](https://github.com/vitejs/vite/issues),
  [rollup](https://github.com/rollup/rollup/issues), and
  [chokidar](https://github.com/paulmillr/chokidar/issues) projects.
  Some examples:
  * vite
    * [Vite HMR not working \. Changing code does not reflect on page until restart vite server \#16284](https://github.com/vitejs/vite/issues/16284)
  * rollup.js
    * [Rollup build \-\-watch not works on docker with Vite \#5331](https://github.com/rollup/rollup/issues/5331)
  * chokidar
    * [Add events not fired for external drives on MacOS \+ Docker \#1014](https://github.com/paulmillr/chokidar/issues/1014)
    * [Chokidar doesn't notice changes inside Docker \#1051](https://github.com/paulmillr/chokidar/issues/1051)
    * [Not Detecting New Files on External Drive in macOS \#1296](https://github.com/paulmillr/chokidar/issues/1296)
    * [Resource starved CPU prevents ready from happening \#873](https://github.com/paulmillr/chokidar/issues/873) 
* Workarounds
  * In the terminal running the HMR dev server, hit "R" and then enter.
  * For `vite build --watch` scripts, re-run the script of re-run the Docker
    Compose service.  Alternatively, can use a file watcher like Facebook's
    [Watchman](https://facebook.github.io/watchman/) external to the project
    to watch application code files and re-run the build.

### Must use Node 18 in Dockerfile due to npm install error in Docker: "npm ERR! network request to https://registry.npmjs.org/[WHATEVER] failed"
  * There are many open bug tickets in npm dealing with this error.  Here's one:
    [\[BUG\] npm install will randomly hang forever and cannot be closed when this occurs \#4028](https://github.com/npm/cli/issues/4028)
  * This bug has only occurred in this project in Docker, so we don't require
    an "engines" field in _package.json_ setting Node to version 18.

---

## Project rename: primo-explore-search-embed to bess-vue

This project was renamed bess-vue in 10/2022.  The original name for this
project was primo-explore-search-embed, which could at times cause a little confusion
given it shared a prefix with the Primo customization packages.  Internally the
project/widget was referred to as BESS, so a decision was made to make this the
official name.  Note that there is one reference which was not changed - the name
of the compiled CSS file.  The HTML of the websites that have already embedded this
widget and are linking to the CSS file cannot easily be changed by us.
