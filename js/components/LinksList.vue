<template>
  <ul>
    <li v-for="link in links">
      <a :href="link.href" :title="link.title" :alt="link.alt">{{ link.label }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'links-list',
  props: {
    links: Array
  },
}
</script>
