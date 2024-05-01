import shared from '../shared.js';

const vid = import.meta.env.PROD ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

export default [
    {
        ...shared.tabs.bobcatBooks,
        engine: shared.engines.nyuPrimoEngine,
        more  : [
            `<a href="https://search.library.nyu.edu/discovery/search?vid=${ vid }&lang=en&mode=advanced" target="_blank">Advanced search</a>`,
            `Need the full text of an article? <a href="https://search.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    shared.tabs.guidesArticles,
    shared.tabs.aresReserves,
];
