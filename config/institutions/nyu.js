import shared from '../shared.js';

const vid = shared.isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

// For details on why we are using empty strings for all `placeholder` values,
// see https://nyu-lib.monday.com/boards/765008773/pulses/7296310519.
export default [
    {
        ...shared.tabs.catalogSearch,
        engine: {
            ...shared.engines.nyuPrimoEngine,
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
                options      : {
                    CI_NYU_CONSORTIA: {
                        label      : 'Library catalog',
                        placeholder: '',
                    },
                    NYU_CONSORTIA: {
                        label      : 'Library catalog (excluding articles)',
                        placeholder: '',
                    },
                    ARTICLES: {
                        label      : 'Articles',
                        placeholder: '',
                    },
                    NYUBAFC: {
                        label      : 'NYU Avery Fisher Center (A/V materials)',
                        placeholder: '',
                    },
                    NYUSC: {
                        label      : 'NYU Special Collections',
                        placeholder: '',
                    },
                },
            },
        },
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
