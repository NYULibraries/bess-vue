import shared from '../shared.js';

const vid = shared.isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

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
                        placeholder: '"disability in higher education", Journal of Medicine, JSTOR',
                    },
                    NYU_CONSORTIA: {
                        label      : 'Library catalog (excluding articles)',
                        placeholder: 'Hamlet, Journal of Medicine, JSTOR',
                    },
                    ARTICLES: {
                        label      : 'Articles',
                        placeholder: 'race AND media, film OR movie',
                    },
                    NYUBAFC: {
                        label      : 'NYU Avery Fisher Center (A/V materials)',
                        placeholder: 'Moonlight',
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
