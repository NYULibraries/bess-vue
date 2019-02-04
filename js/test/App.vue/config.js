export default Object.freeze({
  tabs: [
    {
      key: 'one',
      label: 'external link',
      title: 'this is tab one title',
      alt: 'this is tab one alt',
      href: 'http://example.external.com',
      target: '_blank'
    },
    {
      key: 'two',
      label: 'search tab',
      title: 'this is tab two title',
      alt: 'this is tab two alt',
      engine: 'elastic',
    },
  ],
  tabLinks: {
    one: [{
      label: 'tab1-link1',
      href: 'example1.com',
    }],
    two: [{
        label: 'tab2-link1',
        href: 'example2.com',
      },
      {
        label: 'tab2-link2',
        href: 'example3.com',
      }
    ]
  }
});