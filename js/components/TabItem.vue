<template>
  <li role="tab">
    <a :href="tab.href || '#'"
      :title="tab.title"
      :alt="tab.alt"
      :target="tab.target"
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
