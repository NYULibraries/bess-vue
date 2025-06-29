import shared from '../shared.js';

// See function header comment for `makeNewConfig()` in index.js for the reason
// we need these factor methods.
function makeNewConfig() {
    const sharedConfig = shared.makeNewConfig();

    const vid = shared.isDeployEnvProd() ? '01NYU_US:SH' : '01NYU_US:SH_DEV';

    const shanghaiPrimoEngine = {
        type       : 'primo',
        institution: 'NYUSH',
        primoUrl   : 'https://search.shanghai.library.nyu.edu',
        vid        : vid,
        scope      : 'CI_NYUSH',
        tab        : 'default_slot',
    };

    return [
        {
            ...sharedConfig.tabs.catalogSearch,
            engine: { ...shanghaiPrimoEngine },
            more  : [
                `<a href="https://search.shanghai.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
                `Need the full text of an article? <a href="https://search.shanghai.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
            ui: {
                // Source: search scopes dropdown in Primo
                // xpath query as of 2024-08-15: /html/body/primo-explore/div/prm-explore-main/div/prm-search-bar/div[1]/div/div[2]/div/form/div/div/div[2]/prm-tabs-and-scopes-selector/div/md-input-container/md-select/div/md-select-menu/md-content/div[2]
                searchScopeDropdown: {
                    defaultOption: 'CI_NYUSH',
                    options      : [
                        {
                            label      : 'All at Shanghai',
                            placeholder: '',
                            value      : 'CI_NYUSH',
                        },
                        {
                            label      : 'All at NYU',
                            placeholder: '',
                            value      : 'CI_NYUSH_NYU_CONSORTIA',
                        },
                        // Do not change this to CI_ARTICLES.  The search scope query
                        // parameter is apparently case-sensitive.  Compare results:
                        //
                        // * "CI_articles": https://search.shanghai.library.nyu.edu/discovery/search?query=any,contains,art&tab=default_slot&search_scope=CI_articles&vid=01NYU_US:SH&offset=0
                        // * "CI_ARTICLES": https://search.shanghai.library.nyu.edu/discovery/search?query=any,contains,art&tab=default_slot&search_scope=CI_ARTICLES&vid=01NYU_US:SH&offset=0
                        //
                        // As of 2024-09-16, the CI_ARTICLES URL redirects to:
                        // https://search.shanghai.library.nyu.edu/discovery/search?query=any,contains,art&tab=default_slot&vid=01NYU_US:SH&offset=0
                        // ...`search_scope` query param is removed.
                        {
                            label      : 'All Articles',
                            placeholder: '',
                            value      : 'CI_articles',
                        },
                        {
                            label      : 'Classic Search',
                            placeholder: '',
                            value      : 'NYUSH',
                        },
                    ],
                },
            },
        },
        {
            ...sharedConfig.tabs.guidesArticles,
        },
        sharedConfig.tabs.aresReserves,
        {
            ...sharedConfig.tabs.subjectGuides,
            engine: {
                ...sharedConfig.engines.guidesEngine,
                placeholder: 'Enter Search Words (e.g. "learning Chinese")',
            },
            more: [
                '<a href="https://guides.nyu.edu/" target="_blank">All Research Guides</a>',
                '<a href="https://guides.nyu.edu/?group_id=5748" target="_blank">Shanghai Library Research Guides</a>',
                `Need the full text of an article? <a href="https://search.shanghai.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
        },
        {
            ...sharedConfig.tabs.myAccounts,
            more: [
                '<a href="https://ill.library.nyu.edu/" target="_blank">Interlibrary Loan</a>',
                `<a href="https://search.shanghai.library.nyu.edu/discovery/account?vid=${ vid }&section=overview" target="_blank">Library Account</a>`,
                `Need the full text of an article? <a href="https://search.shanghai.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
        },
    ];
}

export default {
    makeNewConfig,
}
