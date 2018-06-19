import Vue from 'vue';
import App from './App.vue';
import qs from 'query-string';

const queryString = document.currentScript.src.replace(/^[^?]+\??/,'');
const { element_id: id } = qs.parse(queryString);

const app = new Vue({
  el: `#${id}`,
  render: h => h(App)
});
