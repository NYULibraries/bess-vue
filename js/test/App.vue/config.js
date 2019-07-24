export default Object.freeze([
  {
    label: 'external link',
    title: 'this is tab one title',
    open: {
      href: 'http://example.external.com',
      target: '_blank',
    },
    more: [{
      text: 'tab1-link1',
      href: 'example1.com',
    }],
  },
  {
    label: 'search tab',
    title: 'this is tab two title',
    engine: {
      type: 'elastic',
    },
    more: [{
        text: 'tab2-link1',
        href: 'example2.com',
      },
      {
        text: 'tab2-link2',
        href: 'example3.com',
      }
    ],
  },
]);