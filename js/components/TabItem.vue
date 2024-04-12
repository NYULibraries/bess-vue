<template>
  <li>
    <a :href="tab.open && tab.open.href || '#'"
      :title="tab.title"
      :target="tab.open && tab.open.target"
      @click="updateTab($event, tab)"
    ><slot></slot></a>
  </li>
</template>

<script>
  export default {
    name: 'tab-item',
    props: ['tab', 'updateTab'],
  };
</script>
