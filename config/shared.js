const vid = import.meta.env.PROD ? '01NYU_INST:NYU' : '01NYU_INST:NYU_DEV';

export default {
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
            type       : 'primo',
            institution: 'NYU',
            bobcatUrl  : 'https://search.library.nyu.edu',
            vid        : vid,
            scope      : 'CI_NYU_CONSORTIA',
            tab        : 'Unified_Slot',
        },
    },
};
