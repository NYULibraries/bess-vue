# Primo Search Embed

Embed a JS search form to your Primo (new) UI in any webpage.

![Example image of primo-explore-search-embed](https://user-images.githubusercontent.com/22364063/61538747-11680200-aa08-11e9-8468-05740ff71f31.png)


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
  - key: articles
    label: Articles & Databases
    title: Search databases for articles or browse databases by subject
    alt: Search databases for articles or browse databases by subject
    # "open" property means clicking tab will open a link (href) at specifed target
    open:
      href: http://guides.nyu.edu/arch
      target: _blank
  - key: books
    label: Books & More
    title: Search NYU's catalog for books, journals, scripts, scores, archival
      materials, NYU dissertations, videos, sound recordings
    alt: Search NYU's catalog for books, journals, scripts, scores, archival materials,
      NYU dissertations, videos, sound recordings
    # "engine" property means it will create a search form ('primo', 'getit', or 'guides')
    engine:
      type: primo
      # values to be used in search function (see js/utils/searchRedirects.js)
      bobcatUrl: "{{ bobcatUrl }}"
      institution: NYU
      vid: NYU
      scope: all
      tab: all
    # ordered list of links with text (label) and location (href). Always with target=_blank
    links:
    - label: Advanced search
      href: "{{ bobcatUrl }}/primo-explore/search?vid=NYU&mode=advanced"
  - key: journals
    label: Journals
    title: Search for journals by title or for articles by citation
    alt: Search for journals by title or for articles by citation
    engine:
      type: getit
      getitUrl: "{{ getitUrl }}"
      searchTypes:
        # label: what is shown in select element
      - label: contains
        # value: what is used to compose getit query
        value: contains
      - label: begins with
        value: begins
      - label: exact match
        value: exact
      institution: NYU
    links:
     - label: Advanced search
       href: "{{ getitUrl }}"
  - key: reserves
    engine:
      type: primo
      institution: NYUAD
      bobcatUrl: "{{ bobcatUrl }}"
      vid: NYUAD
      scope: nyuadcr
      tab: nyuadcr
    label: Course Reserves
    title: Search for library materials that are held at one location for a particular course
    alt: Search for library materials that are held at one location for a particular course
    links:
    - label: Advanced search
      href: "{{ bobcatUrl }}/primo-explore/search?tab=reserves&search_scope=bobstcr&vid=NYU&mode=advanced"
  - key: guides
    label: Subject Guides
    title: Subject Guides
    alt: Subject Guides
    engine:
      type: guides
      guidesUrl: "{{ guidesUrl }}"
      # 'guides' and 'primo' can set placeholder text (with accompanying aria-describedby) in the main search input
      placeholder: Search within the library guides index
  - key: accounts
    # you can exclude both 'href' and 'engine' if you simply want to display a list of links
    label: My Accounts
    title: My Accounts
    alt: My Accounts
    links:
    - label: Interlibrary Loan
      href: https://ill.library.nyu.edu/
    - label: Library Account
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
