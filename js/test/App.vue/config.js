export default Object.freeze([
  {
    label: 'external link',
    title: 'this is tab one title',
    open: {
      href: 'http://example.external.com',
      target: '_blank',
    },
    more: [
      /*html*/`<a href="example1.com" target="_blank">Example1 Link</a>`,
    ],
  },
  {
    label: 'search tab',
    title: 'this is tab two title',
    engine: {
      type: 'elastic',
    },
    more: [
      /*html*/`<a href="example2.com" target="_blank">Example2 Link</a>`,
      /*html*/`<a href="example3.com">Example3 Link</a>`,
    ]
  },
]);