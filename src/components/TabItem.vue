<template>
  <li role="presentation">
    <a
      :href="tab.open && tab.open.href || '#'"
      :title="tab.title"
      :target="tab.open && tab.open.target"
      :aria-selected="isSelected ? 'true' : 'false'"
      role="tab"
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
        selectedTab: {
            type    : Number,
            required: true,
        },
    },
    computed: {
        isSelected() {
            return this.tab.id === this.selectedTab;
        },
    },
};
</script>
