# Primo Search Embed

[![CircleCI](https://circleci.com/gh/NYULibraries/primo-explore-search-embed.svg?style=svg)](https://circleci.com/gh/NYULibraries/primo-explore-search-embed)

Embed a JS search form to your Primo (new) UI in any webpage.

![Example image of primo-explore-search-embed](https://user-images.githubusercontent.com/22364063/61538864-43796400-aa08-11e9-95a5-acb88ff07edc.png)

## Usage

```html
<!-- container where embeddable search will be injected -->
<div id="primo_explore_search_embed_container_nyuad"></div>
<!-- ensure that the injectable element's id matches the element_id value in query string -->
<script type="text/javascript" id="primo_explore_search_embed" src="https://cdn.library.nyu.edu/bess-vue/app.min.js?institution=NYUAD&element_id=primo_explore_search_embed_container_nyuad">
</script>
<!-- Component comes unstyled. Optionally embed CSS -->
<link type="text/css" rel="stylesheet" href="https://cdn.library.nyu.edu/bess-vue/primo_explore_search_embed.min.css" />
```

## Development

### Installation

Clone this repo:

```
git clone ...
```

Configure your Primo institutions in `config.yml`:

```yaml
# values that are accessible as {{ mustache values }} based on NODE_ENV value
# Ensure that strings with {{ mustache }} interpolation are enclosed in quoatation marks ("") for valid YAML parsing
# e.g. url: "{{ bobcatUrl }}/search?"
environments:
  production:
    bobcatUrl: http://bobcat.library.nyu.edu
    getitUrl: https://getit.library.nyu.edu/
    guidesUrl: https://guides.nyu.edu/
  staging:
    bobcatUrl: http://bobcatdev.library.nyu.edu
    getitUrl: https://qa.getit.library.nyu.edu/
    guidesUrl: https://guides.nyu.edu/
  development:
    bobcatUrl: http://bobcatdev.library.nyu.edu
    getitUrl: https://qa.getit.library.nyu.edu/
    guidesUrl: https://guides.nyu.edu/

institutions:
  NYU:
  # specify a list of tabs and general properties
  - label: Articles & Databases
    title: Search databases for articles or browse databases by subject
    # "open" property means clicking tab will open a link (href) at specifed target
    open:
      href: http://guides.nyu.edu/arch
      target: _blank
  - label: Books & More
    title: Search NYU's catalog for books, journals, scripts, scores, archival
      materials, NYU dissertations, videos, sound recordings
      NYU dissertations, videos, sound recordings
    # "engine" property means it will create a search form ('primo' or 'guides')
    engine:
      type: primo
      # values to be used in search function (see js/utils/searchRedirects.js)
      bobcatUrl: "{{ bobcatUrl }}"
      institution: NYU
      vid: NYU
      scope: all
      tab: all
    # ordered list of more with text and href options.
    # Can accept arbitrary formatted HTML in "text"
    # links open in target=_blank
    more:
    - text: Advanced search
      href: "{{ bobcatUrl }}/primo-explore/search?vid=NYU&mode=advanced"
    - text: <strong>Looking for Journals? Use "Books & More" to search!</strong>
  - label: Course Reserves
    title: Search for library materials that are held at one location for a particular course
    open:
      href: https://ares.library.nyu.edu/
      target: _blank
    more:
    - text: Advanced search
      href: "{{ bobcatUrl }}/primo-explore/search?tab=reserves&search_scope=bobstcr&vid=NYU&mode=advanced"
  - label: Subject Guides
    title: Subject Guides
    engine:
      type: guides
      guidesUrl: "{{ guidesUrl }}"
      # Search engines can set placeholder text (with accompanying aria-describedby) in the main search input
      placeholder: Search the library guides index (e.g. archaeology)
  # You can exclude both 'open' and 'engine' if you simply want to display a list of text/links
  - label: My Accounts
    title: My Accounts
    more:
    - text: Interlibrary Loan
      href: https://ill.library.nyu.edu/
    - text: Library Account
      href: https://eshelf.library.nyu.edu/account
```

### Compile Your Widget

Natively:

```bash
yarn build:prod
# Or to actively develop
yarn build:dev --watch
```

Or in docker:

```bash
docker-compose run webpack
# Or to actively develop, with index.html accessible at localhost
# Ensure 'volumes' are enabled in docker-compose.yml
docker-compose up web-dev
```
