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
<link type="text/css" rel="stylesheet" href="https://cdn.library.nyu.edu/bess-vue/bess.min.css" />
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
from the local repo clone and styled with the _public/bess.min.css_ stylesheet.

---

## View local and dev-CDN builds in sample institution HTML pages using _browser-overrides/_

There aren't always live dev instances of the websites that use bess-vue, and in
cases where there are dev instances, we don't always have the ability configure
them to load bess-vue from the dev CDN in order to preview changes.
We can work around this limitation somewhat but making use of local overrides.
Naturally, local overrides can also be used to load the local application build
and other assets from the local environment.  There are overrides for both local
and dev-CDN previewing in _browser-overrides/_.  For _local/_, in addition to the
bess-vue build override, in cases where we own the stylesheet, the CSS build file
is overridden as well.

For Chromium-based browsers:

* Follow these instructions for setting up local overrides,
  setting the override folder to either _dev/_ or _local/_ in _browser-overrides/_:
[Override web content and HTTP response headers locally](https://developer.chrome.com/docs/devtools/overrides)
* Navigate to the URLs for the institutions that currently use bess-vue:
  * NYU: https://library.nyu.edu/ and https://guides.nyu.edu/lockerbox/search-boxes/catalog
  * NYUAD: https://nyuad.nyu.edu/library.html and https://guides.nyu.edu/lockerbox/search-boxes/catalog
  * NYUSH: https://guides.nyu.edu/nyushcscapstone/books and https://guides.nyu.edu/lockerbox/search-boxes/catalog
  * NYU HOME: https://globalhome.nyu.edu/

Note that symlinks are apparently not supported by Chromium local overrides.
This means that _dev/_ and _local/_ can't be DRY'ed up by linking to shared assets,
and similarly in the case of _local/_, the _app.min.js_ builds cannot be links to
_dist/app.min.js_ but instead have to be separate, identical copies of it.  There
is an `npm` script "update-browser-overrides" which uses
_scripts/update-browser-overrides-app-builds.sh_ to update _browser-overrides/local/_
after a new build is created in _dist/_.

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

### Running `vitest --update` one time and commiting the snapshots changes will result in half of the snapshots being mistakenly deleted

See the long file header comment in for _src/test/App.vue/App.vue.spec.js_ for
details on why this happens and the way to work around this issue.  We will
likely be able to fix this issue later, but for now, updating the vitest snapshots
is a two-step manual process.

### For now, do not add an `update-snapshots` npm script to _package.json_

See caveat "Running `vitest --update` one time and commiting the snapshots changes will
result in half of the snapshots being mistakenly deleted".

### Do not put `<style>` tags in SFCs

* `vite` injects a `<style>` tag into the HTML containing the compiled CSS from
the Vue SFCs, which causes no problems when developing locally w/ HMR or viewing 
the embedded widgets in _index-all-institutions.html_, but when  embedding the 
widget in a web page that does not opt to use the styles from the project, this
injected `<style>` tag can override the intended styles from that web page's
stylesheets and `<style>` tags.
* This injection happens in both `development` and `production` mode.
`rollupOptions.output.assetFileNames` in _vite.config.js_ ensures the creation
of the CSS file in _dist/_, but does not suppress the injection of the `<style>`
tag.  There does not appear to be any build option for turning off injection. The
solution is to put all CSS into _public/bess.min.css_,
which is effectively copied directly into _dist/_.
* TODO: See if this feature can be used to achieve what we want:
  [Disabling CSS injection into the page](https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page)

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

### _browser-overrides/_ are not automatically kept up to date
  * The _browser-overrides/_ files should not be considered authoritative.  We
    do not currently have an automated process for updating them.  They may
    break or become stale at any time.
  * The globalhome.nyu.edu override in particular can break completely at any
    moment because the web page currently loads chunked assets whose hashes
    change.  Note that globalhome injects the `<script>` tag for `bess-vue`
    into the HTML via JavaScript in the _js/chunk-[HASH].js_ file.  When
    updating the override, search for "cdn.library.nyu.edu" in the new chunk
    file and change it to "cdn-dev.library.nyu.edu".  Delete the `<script>` tag
    in the downloaded HTML and also delete the old chunk file.  As with any of
    the overrides, this procedure could become obsolete at any time.

### Setting production mode

  * The `package.json` scripts use both `NODE_ENV=production` and `--mode=production`
    `vite` and `vitest` flags.  In theory, only the flag should be necessary, as
    it is supposed to override the `NODE_ENV` var, and the `vitest` `--mode` flag
    is supposed to override the `vite` `--mode` flag.  In practice, these rules
    don't always seem to hold.  Also, there was at least one bug that caused issues
    when trying to set `import.meta.env.PROD` dynamically:
    [\[🐞BUG\]: import\.meta\.env\.PROD has the wrong value, even if stubbed\. \#5525](https://github.com/vitest-dev/vitest/issues/5525).
    This bug was fixed in 1.5.1, but until we are sure everything has stabilized
    and that we understand exactly how it all works, we err on the side of caution.
    

---

## Project rename: primo-explore-search-embed to bess-vue

This project was renamed bess-vue in 10/2022.  The original name for this
project was primo-explore-search-embed, which could at times cause a little confusion
given it shared a prefix with the Primo customization packages.  Internally the
project/widget was referred to as BESS, so a decision was made to make this the
official name.  Note that there is one reference which was not changed - the name
of the compiled CSS file.  The HTML of the websites that have already embedded this
widget and are linking to the CSS file cannot easily be changed by us.

## Old stylesheet retired

The original stylesheet _primo_explore_search_embed.min.css_ was replaced by
the _bess.min.css_ in October 2024.  The old stylesheet has been deleted from
the repo but the last commit containing it is tagged:
[archived\_primo\_explore\_search\_embed\.min\.css](https://github.com/NYULibraries/bess-vue/releases/tag/archived_primo_explore_search_embed.min.css).
