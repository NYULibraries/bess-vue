import shared from '../shared.js';

const vid = import.meta.env.PROD ? '01NYU_AD:AD' : '01NYU_AD:AD_DEV';

const abuDhabiPrimoEngine = {
    type       : 'primo',
    institution: 'NYUAD',
    bobcatUrl  : 'https://search.abudhabi.library.nyu.edu',
    vid        : vid,
    tab        : 'default_slot',
};

export default [
    {
        ...shared.tabs.bobcatBooks,
        engine: {
            ...abuDhabiPrimoEngine,
            scope: 'CI_NYUAD_NYU',
        },
        more: [
            `<a href="https://search.abudhabi.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
            `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    {
        ...shared.tabs.guidesArticles,
        // Override `open`
        open: {
            href  : 'http://guides.nyu.edu/adarch',
            target: '_blank',
        },
    },
    {
        // We don't want the `open` from `aresReserves`, just `label`
        // and `title`.
        label : shared.tabs.aresReserves.label,
        title : shared.tabs.aresReserves.title,
        engine: {
            ...abuDhabiPrimoEngine,
            scope: 'CI_NYUAD_NYU',
        },
        more: [
            `<a href="https://search.abudhabi.library.nyu.edu/discovery/search?vid=${ vid }&mode=advanced" target="_blank">Advanced search</a>`,
            `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    {
        ...shared.tabs.subjectGuides,
        engine: {
            ...shared.engines.guidesEngine,
            placeholder: 'Enter Search Words (e.g. Company research)',
        },
        more: [
            '<a href="https://guides.nyu.edu/" target="_blank">All Research Guides</a>',
            '<a href="https://guides.nyu.edu/abudhabi" target="_blank">Abu Dhabi Library Research Guides</a>',
            `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
    {
        ...shared.tabs.myAccounts,
        more: [
            '<a href="https://ill.library.nyu.edu/" target="_blank">Interlibrary Loan</a>',
            `<a href="https://search.abudhabi.library.nyu.edu/discovery/account?vid=${ vid }&section=overview" target="_blank">Library Account</a>`,
            `Need the full text of an article? <a href="https://search.abudhabi.library.nyu.edu/discovery/citationlinker?vid=${ vid }" target="_blank">Use the search by citation tool</a>.`,
        ],
    },
];
