import shared from '../shared.js';

// See function header comment for `makeNewConfig()` in index.js for the reason
// we need these factor methods.
function makeNewConfig() {
    const sharedConfig = shared.makeNewConfig();

    const vid = shared.isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

    return   [
        {
            ...sharedConfig.tabs.catalogSearch,
            open: {
                'href'  : `https://search.library.nyu.edu/discovery/search?vid=${ vid }`,
                'target': '_blank',
            },
            engine: {
                ...sharedConfig.engines.nyuPrimoEngine,
                scope: 'CI_NYU_CONSORTIA',
            },
            more: [
                `<a href="https://search.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
                `<a href="https://search.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">For full text articles use the search by citation tool</a>`,
                `<a href="https://search.library.nyu.edu/discovery/account?vid=${ vid }&section=overview" target="_blank" class="external-link">My Library Account</a>`,
            ],
        },
        {
            ...sharedConfig.tabs.guidesArticles,
        },
        {
            ...sharedConfig.tabs.subjectGuides,
            open: {
                href  : 'https://guides.nyu.edu',
                target: '_blank',
            },
        },
        sharedConfig.tabs.aresReserves,
    ];
}

export default {
    makeNewConfig,
}
