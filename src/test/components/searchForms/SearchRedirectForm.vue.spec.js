import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import appConfig from '../../../../config';
import SearchRedirectForm from '../../../components/searchForms/SearchRedirectForm.vue';

const inputAriaLabel = 'Search in library guides';
const searchFunctionSpy = vi.fn( () => 0 );

describe( 'SearchRedirectForm', () => {
    let nyuConfig;
    let nyuProps;
    let wrapper;

    beforeEach( () => {
        nyuConfig = appConfig.institutions[ 'NYU' ][ 0 ];
        nyuProps = {
            searchEngineProps: nyuConfig.engine,
            searchKey        : 1,
            searchFunction   : searchFunctionSpy,
            inputAriaLabel,
            ui               : nyuConfig.ui,
        }

        wrapper = shallowMount( SearchRedirectForm, {
            props           : nyuProps,
            attachToDocument: false,
        } );
    } );

    afterEach( () => {
        searchFunctionSpy.mockReset();
    } );

    test( 'is a Vue instance', () => {
        expect( wrapper ).toBeTruthy();
    } );

    test( 'has the correct HTML', () => {
        expect( wrapper.html() ).toMatchSnapshot();
    } );

    describe( 'props', () => {
        nyuProps = appConfig.institutions[ 'NYU' ][ 0 ];

        test( 'includes searchKey, searchFunction, inputAriaLabel, and ui as props', () => {
            expect( Object.keys( wrapper.props() ).length ).toEqual( 5 );
            expect( wrapper.props().searchKey ).toEqual( nyuProps.searchKey );
            expect( wrapper.props().searchFunction ).toEqual( nyuProps.searchFunction );
            expect( wrapper.props().searchEngineProps ).toEqual( nyuProps.searchEngineProps );
            expect( wrapper.props().inputAriaLabel ).toEqual( nyuProps.inputAriaLabel );
            expect( wrapper.props().ui ).toEqual( nyuProps.ui );
        } );
    } );

    describe( 'data', () => {
        test( 'initializes with empty string for \'search\'', () => {
            expect( wrapper.vm.search ).toBe( '' );
        } );

        test( 'initializes selectedSearchScope with correct default scope', () => {
            expect( wrapper.vm.selectedSearchScope ).toBe( nyuProps.ui.searchScopeDropdown.defaultOption );
        } );
    } );

    describe( 'methods', () => {
        const search = 'this is a search term';

        // Suppress error "Error: Not implemented: window.open", which doesn't
        // cause the test to fail but does make test output harder to read.
        vi.stubGlobal( 'open', vi.fn() );

        describe( 'openSearch', () => {
            beforeEach( () => {
                wrapper.setData( {
                    search,
                    selectedSearchScope: 'Library catalog',
                } );

                vi.spyOn( window, 'open' );
                wrapper.vm.openSearch();
            } );

            test( 'should call open window with searchFunction', () => {
                expect( window.open ).toHaveBeenCalled();
                expect( searchFunctionSpy ).toHaveBeenCalled();
                expect( searchFunctionSpy ).toHaveBeenCalledWith( {
                    search,
                    ...nyuProps.searchEngineProps,
                    scope: 'Library catalog',
                } );
            } );
        } );
    } );

    describe( 'computed', () => {
        describe( 'searchValues', () => {
            const search = 'this is a search term';
            beforeEach( () => {
                wrapper.setData( {
                    search,
                    selectedSearchScope: 'Library catalog',
                } );
            } );
            test( 'builds required parameters for guidesSearch as POJO from this.search (data) and this.engineValues (computed)', () => {
                expect( wrapper.vm.searchValues ).toEqual( {
                    search,
                    ...nyuProps.searchEngineProps,
                    scope: 'Library catalog',
                } );
            } );
        } );
    } );

    describe( 'shallow render', () => {
        test( 'has a form', () => {
            expect( wrapper.find( 'form' ).exists() ).toBeTruthy();
        } );

        test( 'form a div with class "bobcat_embed_search_field"', () => {
            expect( wrapper.find( 'form' ).find( 'div.bobcat_embed_search_field' ).exists() ).toBeTruthy();
        } );

        describe( 'the input', () => {
            let input;
            beforeEach( () => {
                input = wrapper.find( 'input[type=text]' );
            } );

            test( 'exists', () => {
                expect( input.exists() ).toBeTruthy();
            } );

            test( 'has an aria-label based on inputAriaLabel', () => {
                expect( input.attributes( 'aria-label' ) ).toEqual( nyuProps.inputAriaLabel );
            } );

            test( 'has an id and corresponding label', () => {
                expect( input.attributes( 'id' ) ).toEqual( `tab-${ nyuProps.searchKey }-query` );
                expect( wrapper.findAll( `label[for="tab-${ nyuProps.searchKey }-query"]` ).length ).toEqual( 1 );
            } );

            test( 'has class "bobcat_embed_searchbox_textfield"', () => {
                expect( input.classes( 'bobcat_embed_searchbox_textfield' ) ).toBeTruthy();
            } );

            test( 'is wrapped in a span with class "bobcat_embed_"', () => {
                const parentEl = input.element.parentElement;
                const klasses = Array.from( parentEl.classList );
                expect( klasses.indexOf( 'bobcat_embed_' ) > -1 ).toBeTruthy();
            } );

            test( 'should be bound to \'search\' in data', () => {
                input.setValue( 'typing' );
                expect( wrapper.vm.search ).toEqual( 'typing' );
            } );

            test( 'has placeholder text, if defined', () => {
                const expectedPlaceholder = nyuProps.ui.searchScopeDropdown.options[
                    nyuProps.ui.searchScopeDropdown.defaultOption
                ].placeholder;
                expect( input.attributes( 'placeholder' ) ).toBe( expectedPlaceholder );
            } );

            test( 'has aria-describedby according to placeholder text, if defined', () => {
                const expectedPlaceholder = nyuProps.ui.searchScopeDropdown.options[
                    nyuProps.ui.searchScopeDropdown.defaultOption
                ].placeholder;
                expect( input.attributes( 'aria-describedby' ) ).toBe( expectedPlaceholder );
            } );
        } );

        test( 'includes a submit button', () => {
            expect( wrapper.findAll( 'input[type=submit]' ).length ).toEqual( 1 );
        } );

        describe( 'form submit', () => {
            // NOTE: `wrapper` is not yet defined, so we can't create the spy.
            //       We'll have to do it in the `beforeEach` callback.
            let openSearchSpy;

            afterEach( () => {
                openSearchSpy.mockReset();
            } );

            beforeEach( () => {
                // NOTE: `wrapper` isn't defined yet in the outer `describe` scope,
                //       so we have to repeatedly re-create it here.
                openSearchSpy = vi.spyOn( wrapper.vm, 'openSearch' );
                wrapper.find( 'form' ).trigger( 'submit' );
            } );

            test( 'should trigger openSearch method', () => {
                expect( openSearchSpy ).toHaveBeenCalled();
            } );
        } );
    } );
} );
