import { beforeEach, describe, expect, test } from 'vitest';
import { primoSearch, guidesSearch } from '@/utils/searchRedirects.js';

import appConfig from '../../../config';

// A single TAB followed by three spaces
const ALL_WHITESPACE_SEARCH = '    ';
const EMPTY_SEARCH = '';
const NON_EMPTY_SEARCH = 'monk and music';
const expectedUrls = {
    NYU: {
        [ EMPTY_SEARCH ]    : 'https://search.library.nyu.edu/discovery/search?vid=01NYU_INST:NYU_DEV&search_scope=CI_NYU_CONSORTIA',
        [ NON_EMPTY_SEARCH ]: 'https://search.library.nyu.edu/discovery/search?vid=01NYU_INST:NYU_DEV&tab=Unified_Slot&search_scope=CI_NYU_CONSORTIA&query=any,contains,monk%20and%20music',
    },
    NYUAD: {
        [ EMPTY_SEARCH ]    : 'https://search.abudhabi.library.nyu.edu/discovery/search?vid=01NYU_AD:AD_DEV&search_scope=CI_NYU_CONSORTIA',
        [ NON_EMPTY_SEARCH ]: 'https://search.abudhabi.library.nyu.edu/discovery/search?institution=NYUAD&vid=01NYU_AD:AD_DEV&tab=Unified_Slot&search_scope=CI_NYU_CONSORTIA&mode=basic&displayMode=full&bulkSize=10&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en',
    },
    NYUSH: {
        [ EMPTY_SEARCH ]    : 'https://search.shanghai.library.nyu.edu/discovery/search?vid=01NYU_US:SH_DEV&search_scope=CI_NYU_CONSORTIA',
        [ NON_EMPTY_SEARCH ]: 'https://search.shanghai.library.nyu.edu/discovery/search?institution=NYUSH&vid=01NYU_US:SH_DEV&tab=Unified_Slot&search_scope=CI_NYU_CONSORTIA&mode=basic&displayMode=full&bulkSize=10&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en',
    },
    NYU_HOME: {
        [ EMPTY_SEARCH ]    : 'https://search.library.nyu.edu/discovery/search?vid=01NYU_INST:NYU_DEV&search_scope=CI_NYU_CONSORTIA',
        [ NON_EMPTY_SEARCH ]: 'https://search.library.nyu.edu/discovery/search?vid=01NYU_INST:NYU_DEV&tab=Unified_Slot&search_scope=CI_NYU_CONSORTIA&query=any,contains,monk%20and%20music',
    },
}

describe( 'primoSearch', () => {
    let commonParams;

    describe.each(
        Object.keys( appConfig.institutions ).map(
            function ( institution ) {
                return { institution };
            },
        ) )( '$institution', ( { institution } ) => {
        beforeEach( () => {
            const currentConfig = appConfig.institutions[ institution ][ 0 ];

            commonParams = {
                tab        : 'Unified_Slot',
                scope      : 'CI_NYU_CONSORTIA',
                primoUrl   : currentConfig.engine.primoUrl,
                institution: currentConfig.engine.institution,
                vid        : currentConfig.engine.vid,
            };
        } );

        test( 'returns the correct URL for empty search ""', () => {
            const params = { ...commonParams, search: EMPTY_SEARCH };
            expect( primoSearch( params ) ).toEqual( expectedUrls[ institution ][ EMPTY_SEARCH ] );
        } );

        test( 'returns the correct URL for an all whitespace search', () => {
            const params = { ...commonParams, search: ALL_WHITESPACE_SEARCH };
            expect( primoSearch( params ) ).toEqual( expectedUrls[ institution ][ EMPTY_SEARCH ] );
        } );

        test( 'returns the correct search URL for a non-empty search', () => {
            const params = {
                ...commonParams,
                search: NON_EMPTY_SEARCH,
            };
            expect( primoSearch( params ) )
                .toEqual( expectedUrls[ institution ][ NON_EMPTY_SEARCH ] );
        } );

        test( 'can modify the search method', () => {
            const params = {
                ...commonParams,
                search      : NON_EMPTY_SEARCH,
                searchMethod: 'jsearch',
            };
            expect( primoSearch( params ) )
                .toEqual(
                    expectedUrls[ institution ][ NON_EMPTY_SEARCH ]
                        .replace( '/discovery/search?', '/discovery/jsearch?' ),
                );
        } );
    } );
} );

describe( 'guidesSearch', () => {
    test( 'should return an appropriately composed search url', () => {
        expect(
            guidesSearch( {
                search   : 'this is a search',
                guidesUrl: 'http://guides.university.edu',
            } ), //'this%20is%20a%20search'
        ).toEqual( 'http://guides.university.edu/srch.php?&q=this%20is%20a%20search' );
    } );
} );
