/*
 * Get querystring values
 *
 * Ex.
 *  url.querystring.get('http://example.com?func=item-global', 'func') ==> 'item-global'
 */
let querystring = {
  get(url, key) {
    // Escape square brackets
    const escapedKey = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const paramMatch = new RegExp("[\\?&]" + escapedKey + "=([^&#]*)");
    const querystringMatches = paramMatch.exec(url);
    if (querystringMatches == null) {
      return ""
    } else {
      return decodeURIComponent(querystringMatches[1].replace(/\+/g, " "));
    }
  }
};

module.exports = {
  querystring: querystring
};
