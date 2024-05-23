const qsSortBy = ( orderArr ) => ( m, n ) => orderArr.indexOf( m ) - orderArr.indexOf( n );

const queryStringify = ( dict, { sort, encode = true } ) =>
    Object.keys( dict )
        .sort( sort )
        .reduce( ( res, k, idx, keys ) => {
            const v = dict[k];
            const noop = el => el
            const [ encodedKey, encodedValue ] = [ k, v ].map( encode ? encodeURIComponent : noop );
            const isNotLast = idx !== keys.length - 1;
            const queryString = v ? `${ encodedKey }=${ encodedValue }${ isNotLast ? '&' : '' }` : '';
            return `${ res }${ queryString }`;
        }, '' );

export const getitSearch = ( { institution, issn, title, type, getitUrl } ) => {
    const baseGetIt = `${ getitUrl }/search/journal_search?`;

    const staticParams = {
        rfr_id: 'info:sid/sfxit.com:citation',
    };
    const dynamicParams = {
        'umlaut.title_search_type': title ? type : undefined,
        'rft.jtitle'              : title,
        'rft.issn'                : issn,
        'umlaut.institution'      : institution,
    };
    const qsOrder = [
        'rfr_id',
        'umlaut.title_search_type',
        'rft.jtitle',
        'rft.issn',
        'umlaut.institution',
    ];
    const qsParams = queryStringify(
        { ...staticParams, ...dynamicParams },
        { sort: qsSortBy( qsOrder ) },
    );

    if ( issn || title ) {
        return `${ baseGetIt }${ qsParams }`;
    } else {
        return `${ getitUrl }/?umlaut.institution=${ institution }`;
    }
};

export const primoSearch = ( { tab, scope, bobcatUrl, search, institution, vid, searchMethod = 'search' } ) => {
    let qsParams;

    // Redirect to BobCat search if `search` is non-empty.
    // If `search` is empty of meaningful user input, redirect to the BobCat home
    // page instead of redirecting to a BobCat blank search, which returns error messages
    // that are potentially confusing.
    //
    // For details, see:
    //     https://nyu-lib.monday.com/boards/765008773/views/76580587/pulses/2183176320
    //     "Update bobcat embed to send users to bobcat homepage on blank search"
    if ( search.match( /\S+/ ) ) {
        const staticParams = {
            mode        : 'basic',
            displayMode : 'full',
            bulkSize    : '10',
            dum         : 'true',
            displayField: 'all',
            sortby      : 'rank',
            lang        : 'en_US',
        };

        const dynamicParams = {
            institution,
            vid,
            tab,
            search_scope  : scope,
            query         : `any,contains,${ encodeURIComponent( search ) }`,
            primoQueryTemp: encodeURIComponent( search ),
        };

        const qsOrder = [
            'institution',
            'vid',
            'tab',
            'search_scope',
            'mode',
            'displayMode',
            'bulkSize',
            'highlight',
            'dum',
            'displayField',
            'primoQueryTemp',
            'query',
            'sortby',
            'lang',
        ];
        qsParams = queryStringify(
            { ...staticParams, ...dynamicParams },
            { sort: qsSortBy( qsOrder ), encode: false },
        );
    } else {
        qsParams = `vid=${ vid }`;
    }

    return `${ bobcatUrl }/discovery/${ searchMethod }?${ qsParams }`;
};

export const guidesSearch = ( { search, guidesUrl } ) => {
    return `${ guidesUrl }/srch.php?&q=${ encodeURIComponent( search ) }`;
};

export default {
    guidesSearch,
    getitSearch,
    primoSearch,
};
