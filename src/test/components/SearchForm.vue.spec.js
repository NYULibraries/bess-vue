import { beforeEach, describe, expect, it } from 'vitest'
import { guidesSearch, primoSearch } from '../../utils/searchRedirects';

import SearchForm from '../../components/SearchForm.vue';
import { shallowMount } from '@vue/test-utils';

const props = {
    searchKey: 'test',
    engine   : {
        type : 'primo',
        prop1: 'prop1',
        prop2: 'prop2',
    },
};

describe( 'SearchForm', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallowMount( SearchForm, {
            props,
        } );
    } );

    it( 'is a Vue instance', () => {
        expect( wrapper ).toBeTruthy();
    } );

    it( 'has the correct HTML', () => {
        expect( wrapper.html() ).toMatchSnapshot();
    } );

    describe( 'props', () => {
        it( 'includes searchKey and engine', () => {
            expect( Object.keys( wrapper.props() ).length ).toEqual( 2 );
            expect( wrapper.props().searchKey ).toEqual( props.searchKey );
            expect( wrapper.props().engine ).toEqual( props.engine );
        } );
    } );

    describe( 'computed', () => {
        describe( 'engineType', () => {
            it( 'evaluates engine type', () => {
                expect( wrapper.vm.engineType ).toBe( props.engine.type );
            } );

            it( 'is undefined if engine is undefined', async () => {
                await wrapper.setProps( { engine: undefined } );
                expect( wrapper.vm.engineType ).toBe( undefined );
            } );
        } );

        describe( 'searchFunction', () => {
            it( 'is properly mapped to engines', async () => {
                expect( wrapper.vm.searchFunction ).toBe( primoSearch );
                await wrapper.setProps( { engine: { type: 'guides' } } );
                expect( wrapper.vm.searchFunction ).toBe( guidesSearch );
            } );
        } );

        describe( 'inputAriaLabel', () => {
            it( 'has appropriate label for \'primo\' engine', () => {
                expect( wrapper.vm.inputAriaLabel ).toBe( 'Search Bobcat' );
            } );
            it( 'has appropriate label for \'guides\' engine', async () => {
                await wrapper.setProps( { engine: { type: 'guides' } } );
                expect( wrapper.vm.inputAriaLabel ).toBe( 'Search for research guides' );
            } );
        } );
    } );

    describe( 'shallow render', () => {
        it( 'renders <search-redirect-form> if primo or guides engine', async () => {
            expect( wrapper.find( 'search-redirect-form-stub' ).exists() ).toBeTruthy();
            await wrapper.setProps( { engine: { type: 'guides' } } );
            expect( wrapper.find( 'search-redirect-form-stub' ).exists() ).toBeTruthy();
            expect( wrapper.find( 'getit-search-form-stub' ).exists() ).toBeFalsy();
        } );
    } );
} );
