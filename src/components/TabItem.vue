<template>
  <li>
    <a
      :href="tab.open && tab.open.href || '#'"
      :title="tab.title"
      :target="tab.open && tab.open.target"
      @click="updateTab( $event, tab )"
    ><slot /></a>
  </li>
</template>

<script>
export default {
    name : 'TabItem',
    props: {
        tab: {
            type    : Object,
            required: true,
        },
        updateTab: {
            type    : Function,
            required: true,
        },
    },
};
</script>
