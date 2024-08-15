const DEPLOY_ENV_PROD = 'prod';

const vid = isDeployEnvProd() ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

function isDeployEnvProd() {
    return import.meta.env.VITE_DEPLOY_ENV?.toLowerCase().trim() === DEPLOY_ENV_PROD;
}

export default {
    isDeployEnvProd,
    tabs: {
        aresReserves: {
            label: 'Course Reserves',
            title: 'Search for library materials that are held at one location for a particular course',
            open : {
                href  : 'https://ares.library.nyu.edu/',
                target: '_blank',
            },
        },
        catalogSearch: {
            label: 'Catalog Search',
            title: 'Search NYU\'s catalog for books, journals, scripts, scores, archival materials, NYU dissertations, videos, sound recordings',
        },
        guidesArticles: {
            label: 'Articles & Databases',
            title: 'Search databases for articles or browse databases by subject',
            open : {
                href  : 'http://guides.nyu.edu/arch',
                target: '_blank',
            },
        },
        subjectGuides: {
            label: 'Research Guides',
            title: 'Guides to help you find library resources on specific subjects and courses',
        },
        myAccounts: {
            label: 'My Accounts',
            title: 'My Accounts',
        },
    },
    engines: {
        guidesEngine: {
            type     : 'guides',
            guidesUrl: 'https://guides.nyu.edu',
        },
        nyuPrimoEngine: {
            type        : 'primo',
            institution : 'NYU',
            primoUrl    : 'https://search.library.nyu.edu',
            vid         : vid,
            defaultScope: 'CI_NYU_CONSORTIA',
            scopesMap   : {
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
            tab         : 'Unified_Slot',
            showDropdown: false,
        },
    },
};
