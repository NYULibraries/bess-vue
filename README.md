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
  "institutions": [
    {
      "vid": "NYU",
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
  ]
}

```

## Usage

### Compile Your Widget

```
gulp js
```

### Use Default CSS

```
gulp css --vid=NYU
```

```html
<link type="text/css" rel="stylesheet" href="//your.cdn.com/primo_search_embed_nyu-min.css"/>
```

### Embed JavaScript

```html
<script type="text/javascript" src="//your.cdn.com/primo_search_embed-min.js?vid=NYU&element_id=my_primo_search_embed"></script>
<div id="my_primo_search_embed"></div>
```
