import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import qs from 'query-string';

// source: http://2ality.com/2014/05/current-script.html
const currentScript = document.currentScript || (function() {
  var scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
})();

const queryString = currentScript.src.replace(/^[^?]+\??/,'');
const { element_id: id } = qs.parse(queryString);

const app = new Vue({
  el: `#${id}`,
  render: h => h(App)
});
