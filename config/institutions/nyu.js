import shared from '../shared.js';

const vid = shared.isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

export default [
    {
        ...shared.tabs.catalogSearch,
        engine: shared.engines.nyuPrimoEngine,
        more  : [
            `<a href="https://search.library.nyu.edu/discovery/search?vid=${ vid }&lang=en&mode=advanced" target="_blank">Advanced search</a>`,
            `Need the full text of an article? <a href="https://search.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    {
        label: 'Databases',
        title: 'Search databases for articles or browse databases by subject',
        open : {
            href  : 'http://guides.nyu.edu/arch',
            target: '_blank',
        },
    },
    {
        label: 'Research Guides',
        title: 'Guides to help you find library resources on specific subjects and courses',
        open : {
            href  : 'https://guides.nyu.edu',
            target: '_blank',
        },
    },
    shared.tabs.aresReserves,
];
