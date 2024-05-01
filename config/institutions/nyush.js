import shared from '../shared.js';

const vid = import.meta.env.PROD ? '01NYU_US:SH' : '01NYU_US:SH_DEV';

const shanghaiPrimoEngine = {
    type       : 'primo',
    institution: 'NYUSH',
    bobcatUrl  : 'https://search.shanghai.library.nyu.edu',
    vid        : vid,
    scope      : 'CI_NYUSH',
    tab        : 'default_slot',
};

export default [
    {
        ...shared.tabs.bobcatBooks,
        engine: { ...shanghaiPrimoEngine },
        more  : [
            `<a href="https://search.shanghai.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
            `Need the full text of an article? <a href="https://search.shanghai.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    shared.tabs.guidesArticles,
    shared.tabs.aresReserves,
    {
        ...shared.tabs.subjectGuides,
        engine: {
            ...shared.engines.guidesEngine,
            placeholder: 'Enter Search Words (e.g. "learning Chinese")',
        },
        more: [
            '<a href="https://guides.nyu.edu/" target="_blank">All Subject Guides</a>',
            '<a href="https://guides.nyu.edu/?group_id=5748" target="_blank">Shanghai Library Guides</a>',
            `Need the full text of an article? <a href="https://search.shanghai.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    {
        ...shared.tabs.myAccounts,
        more: [
            '<a href="https://ill.library.nyu.edu/" target="_blank">Interlibrary Loan</a>',
            `<a href="https://search.shanghai.library.nyu.edu/discovery/account?vid=${ vid }&section=overview" target="_blank">Library Account</a>`,
            `Need the full text of an article? <a href="https://search.shanghai.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
];
