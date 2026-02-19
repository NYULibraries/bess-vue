import shared from '../shared.js';

// See function header comment for `makeNewConfig()` in index.js for the reason
// we need these factor methods.
function makeNewConfig() {
    const sharedConfig = shared.makeNewConfig();

    const vid = shared.isDeployEnvProd() ? '01NYU_AD:AD' : '01NYU_AD:AD_DEV';

    const abuDhabiPrimoEngine = {
        type       : 'primo',
        institution: 'NYUAD',
        primoUrl   : 'https://search.abudhabi.library.nyu.edu',
        vid        : vid,
        tab        : 'default_slot',
    };

    return [
        {
            ...sharedConfig.tabs.catalogSearch,
            engine: {
                ...abuDhabiPrimoEngine,
                scope: 'CI_NYUAD_NYU',
            },
            more: [
                `<a href="https://search.abudhabi.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
                `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
            ui: {
                // Source: search scopes dropdown in Primo
                // xpath query as of 2025-01-02: /html/body/primo-explore/div/prm-explore-main/div/prm-search-bar/div[1]/div/div[2]/div/form/div/div/div[2]/prm-tabs-and-scopes-selector/div/md-input-container/md-select/div/md-select-menu/md-content/div[2]
                searchScopeDropdown: {
                    defaultOption: 'CI_NYUAD_NYU',
                    options      : [
                        {
                            label      : 'Search Everything',
                            placeholder: '',
                            value      : 'CI_NYUAD_NYU',
                        },
                        {
                            label      : 'NYUAD Resources',
                            placeholder: '',
                            value      : 'NYUAD_ALL',
                        },
                        {
                            label      : 'Books & Ebooks',
                            placeholder: '',
                            value      : 'NYUAD_NYU_books',
                        },
                        {
                            label      : 'Articles',
                            placeholder: '',
                            value      : 'Articles',
                        },
                        {
                            label      : 'NYUAD Special Collections',
                            placeholder: '',
                            value      : 'NYUAD_SpecCol',
                        },
                    ],
                },
            },
        },
        {
            ...sharedConfig.tabs.guidesArticles,
        },
        {
            // We don't want the `open` from `aresReserves`, just `label`
            // and `title`.
            label : sharedConfig.tabs.aresReserves.label,
            title : sharedConfig.tabs.aresReserves.title,
            engine: {
                ...abuDhabiPrimoEngine,
                scope: 'CourseReserves',
            },
            more: [
                `<a href="https://search.abudhabi.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
                `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
        },
        {
            ...sharedConfig.tabs.subjectGuides,
            engine: {
                ...sharedConfig.engines.guidesEngine,
                placeholder: 'Enter Search Words (e.g. Company research)',
            },
            more: [
                '<a href="https://guides.nyu.edu/" target="_blank">All Research Guides</a>',
                '<a href="https://guides.nyu.edu/abudhabi" target="_blank">Abu Dhabi Library Research Guides</a>',
                `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
        },
        {
            ...sharedConfig.tabs.myAccounts,
            more: [
                `<a href="https://search.abudhabi.library.nyu.edu/discovery/account?vid=${ vid }&section=overview" target="_blank">Library Account</a>`,
                '<a href="https://ill.library.nyu.edu/" target="_blank">Interlibrary Loan</a>',
                `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
        },
    ];
}

export default {
    makeNewConfig,
};
