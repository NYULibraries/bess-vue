# Primo Search Embed

Embed a JS search form to your Primo (new) UI in any webpage.

## Installation

Clone this repo:

```
git clone ...
```

Configure your Primo institutions in `config.yml`:

```yaml
# values that are accessible as {{ mustache values }} based on NODE_ENV value
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
    tabs:
    # specify a list of tabs and general properties
    - key: articles
      label: Articles & Databases
      title: Search databases for articles or browse databases by subject
      alt: Search databases for articles or browse databases by subject
      # "href" property means clicking tab will link out
      href: http://guides.nyu.edu/arch
      target: _blank
    - key: books
      # "engine" property means it will create a search form ('primo', 'getit', or 'guides')
      engine: primo
      label: Books & More
      title: Search NYU's catalog for books, journals, scripts, scores, archival
        materials, NYU dissertations, videos, sound recordings
      alt: Search NYU's catalog for books, journals, scripts, scores, archival materials,
        NYU dissertations, videos, sound recordings
    - key: journals
      engine: getit
      label: Journals
      title: Search for journals by title or for articles by citation
      alt: Search for journals by title or for articles by citation
    - key: reserves
      engine: primo
      label: Course Reserves
      title: Search for library materials that are held at one location for a particular course
      alt: Search for library materials that are held at one location for a particular course
    - key: guides
      label: Subject Guides
      title: Subject Guides
      alt: Subject Guides
      engine: guides
    - key: accounts
      # you can exclude both 'href' and 'engine' if you simply want to display a list of tabLinks (below)
      label: My Accounts
      title: My Accounts
      alt: My Accounts
    tabLinks:
      # list of links to add underneath the search (if 'engine' is present) in each tab
      books:
      - label: Advanced search
        href: "{{ bobcatUrl }}/primo-explore/search?vid=NYU&mode=advanced"
      journals:
      - label: Advanced search
        href: "{{ getitUrl }}"
      reserves:
      - label: Advanced search
        href: "{{ bobcatUrl }}/primo-explore/search?tab=reserves&search_scope=bobstcr&vid=NYU&mode=advanced"
    # Search engine configuration values on a per-tab basis (according to key).
    # For more details, values correspond to named arguments in searchRedirects.js
    engineValues:
      primo:
        # for the books tab using the primo engine...
        books:
          bobcatUrl: "{{ bobcatUrl }}"
          institution: NYU
          vid: NYU
          scope: all
          tab: all
      getit:
        # for the journals tab using the getit engine...
        journals:
          getitUrl: "{{ getitUrl }}"
          # list of search values
          searchTypes:
            # label: what is shown in select element
            # value: what is used to compose getit query
          - label: contains
            value: contains
          - label: begins with
            value: begins
          - label: exact match
            value: exact
          institution: NYU
      guides:
        # for the guides tab using the guides engine...
        guides:
          guidesUrl: "{{ guidesUrl }}"
```

## Usage

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


### Embed in HTML, JS, and CSS

```html
<!-- container where embeddable search will be injected -->
<div id="primo_explore_search_embed_container_nyuad"></div>
<!-- ensure that the injectable element's id matches the element_id value in query string -->
<script type="text/javascript" id="primo_explore_search_embed" src="dist/app.min.js?institution=NYUAD&element_id=primo_explore_search_embed_container_nyuad"></script>
<!-- Component comes unstyled. Optionally embed CSS -->
<link type="text/css" rel="stylesheet" href="//your.cdn.com/primo_explore_search_embed_nyu-min.css"/>
```