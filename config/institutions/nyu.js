import shared from '../shared.js';

const vid = shared.isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

export default [
    {
        ...shared.tabs.catalogSearch,
        engine: {
            ...shared.engines.nyuPrimoEngine,
            showDropdown: true,
        },
        more: [
            `<a href="https://search.library.nyu.edu/discovery/search?vid=${ vid }&lang=en&mode=advanced" target="_blank">Advanced search</a>`,
            `Need the full text of an article? <a href="https://search.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    {
        ...shared.tabs.guidesArticles,
        label: 'Databases',
    },
    {
        ...shared.tabs.subjectGuides,
        open: {
            href  : 'https://guides.nyu.edu',
            target: '_blank',
        },
    },
    shared.tabs.aresReserves,
];
