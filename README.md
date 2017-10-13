# Primo Search Embed

**PROOF OF CONCEPT / CURRENTLY JUST A SKELETON**

Embed a JS search form to your Primo (new) UI in any webpage.

## Installation

Clone this repo:

```
git clone ...
```

Configure your Primo institutions in `config.json`:

```json
{
  "institutions": {
    "NYU": {
      "tab": "default_tab",
      "default_scope": "default_scope",
      "show_scopes": true,
      "placeholder": "Search anything",
      "advanced_search": true,
      "links": [
        { "Articles & Databases": "http://guides.nyu.edu/arch" },
        { "Journals": "https://getit.library.nyu.edu" },
        { "Course Reserves": "http://bobcat.library.nyu.edu/primo-explore/search?tab=default_tab&search_scope=nyucr&vid=NYU-NUI" }
      ]
    }
  }
}
```

## Usage

### Compile Your Widget

```
gulp
# Or to actively develop
gulp watch
```

```html
<link type="text/css" rel="stylesheet" href="//your.cdn.com/primo_explore_search_embed_nyu-min.css"/>
```

### Embed JavaScript

```html
<script type="text/javascript" id="primo_explore_search_embed" src="//your.cdn.com/primo_explore_search_embed_nyu-min.js?vid=NYU&element_id=my_primo_explore_search_embed_container"></script>
<div id="my_primo_explore_search_embed_container"></div>
```
