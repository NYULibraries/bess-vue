import shared from '../shared.js';

const vid = shared.isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

export default [
    {
        ...shared.tabs.catalogSearch,
        open: {
            'href'  : `https://search.library.nyu.edu/discovery/search?vid=${ vid }`,
            'target': '_blank',
        },
        engine: shared.engines.nyuPrimoEngine,
        more  : [
            `<a href="https://search.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
            `<a href="https://search.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">For full text articles use the search by citation tool</a>`,
            `<a href="https://search.library.nyu.edu/discovery/account?vid=${ vid }&section=overview" target="_blank" class="external-link">My Library Account</a>`,
        ],
    },
    shared.tabs.guidesArticles,
    shared.tabs.aresReserves,
];
