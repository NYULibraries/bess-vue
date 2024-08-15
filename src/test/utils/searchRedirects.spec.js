import { describe, expect, it } from 'vitest';
import { primoSearch, guidesSearch } from '../../utils/searchRedirects';

describe( 'primoSearch', () => {
    const commonParams = {
        tab        : 'all',
        scope      : 'uniscope',
        primoUrl   : 'http://bobcat.university.edu',
        institution: 'UNI',
        vid        : 'UNI-NUI',
    };

    const expectedEmptySearchURL =
        'http://bobcat.university.edu/discovery/search?vid=UNI-NUI&search_scope=uniscope';

    it( 'returns the correct URL for empty search ""', () => {
        const params = { ...commonParams, search: '' };
        expect( primoSearch( params ) ).toEqual( expectedEmptySearchURL );
    } );

    it( 'returns the correct URL for an all whitespace search', () => {
        const params = { ...commonParams, search: '       ' };
        expect( primoSearch( params ) ).toEqual( expectedEmptySearchURL );
    } );

    it( 'returns the correct search URL for a non-empty search', () => {
        const params = {
            ...commonParams,
            search: 'monk and music', // "monk%20and%20music"
        };
        expect( primoSearch( params ) )
            .toEqual(
                'http://bobcat.university.edu/discovery/search?institution=UNI&vid=UNI-NUI&tab=all&search_scope=uniscope&mode=basic&displayMode=full&bulkSize=10&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en_US',
            );
    } );

    it( 'can modify the search method', () => {
        const params = {
            ...commonParams,
            search      : 'monk and music', // "monk%20and%20music"
            searchMethod: 'jsearch',
        };
        expect( primoSearch( params ) )
            .toEqual(
                'http://bobcat.university.edu/discovery/jsearch?institution=UNI&vid=UNI-NUI&tab=all&search_scope=uniscope&mode=basic&displayMode=full&bulkSize=10&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en_US',
            );
    } );
} );

describe( 'guidesSearch', () => {
    it( 'should return an appropriately composed search url', () => {
        expect(
            guidesSearch( {
                search   : 'this is a search',
                guidesUrl: 'http://guides.university.edu',
            } ), //'this%20is%20a%20search'
        ).toEqual( 'http://guides.university.edu/srch.php?&q=this%20is%20a%20search' );
    } );
} );
