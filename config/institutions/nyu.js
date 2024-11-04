import shared from '../shared.js';

// See function header comment for `makeNewConfig()` in index.js for the reason
// we need these factor methods.
function makeNewConfig() {
    const sharedConfig = shared.makeNewConfig();

    const vid = shared.isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

    // For details on why we are using empty strings for all `placeholder` values,
    // see https://nyu-lib.monday.com/boards/765008773/pulses/7296310519.
    return [
        {
            ...sharedConfig.tabs.catalogSearch,
            engine: {
                ...sharedConfig.engines.nyuPrimoEngine,
            },
            more: [
                `<a href="https://search.library.nyu.edu/discovery/search?vid=${ vid }&lang=en&mode=advanced" target="_blank">Advanced search</a>`,
                `Need the full text of an article? <a href="https://search.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
            ],
            ui: {
                // Source: search scopes dropdown in Primo
                // xpath query as of 2024-08-15: /html/body/primo-explore/div/prm-explore-main/div/prm-search-bar/div[1]/div/div[2]/div/form/div/div/div[2]/prm-tabs-and-scopes-selector/div/md-input-container/md-select/div/md-select-menu/md-content/div[2]
                searchScopeDropdown: {
                    defaultOption: 'CI_NYU_CONSORTIA',
                    options      : [
                        {
                            label      : 'Library catalog',
                            placeholder: '',
                            value      : 'CI_NYU_CONSORTIA',
                        },
                        {
                            label      : 'Library catalog (excluding articles)',
                            placeholder: '',
                            value      : 'NYU_CONSORTIA',
                        },
                        {
                            label      : 'Articles',
                            placeholder: '',
                            value      : 'ARTICLES',
                        },
                        {
                            label      : 'NYU Avery Fisher Center (A/V materials)',
                            placeholder: '',
                            value      : 'NYUBAFC',
                        },
                        {
                            value      : 'NYUSC',
                            label      : 'NYU Special Collections',
                            placeholder: '',
                        },
                    ],
                },
            },
        },
        {
            ...sharedConfig.tabs.guidesArticles,
            label: 'Databases',
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
};
