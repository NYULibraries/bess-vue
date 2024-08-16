import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';
import SearchRedirectForm from '../../../components/searchForms/SearchRedirectForm.vue';
import { shallowMount } from '@vue/test-utils';

const inputAriaLabel = 'Search in library guides';
const searchFunctionSpy = vi.fn( () => 0 );

const props = {
    searchKey        : 'guides',
    searchFunction   : searchFunctionSpy,
    searchEngineProps: {
        guidesUrl: 'http://guides.library.edu',
        prop1    : 'prop1',
        prop2    : 'prop2',
    },
    inputAriaLabel,
    ui: {
        searchScopeDropdown: {
            defaultOption: 'Library catalog',
            options      : {
                'Library catalog': {
                    label      : 'Library catalog',
                    placeholder: 'Search for books, articles, etc.',
                },
            },
        },
    },
};

describe( 'SearchRedirectForm', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallowMount( SearchRedirectForm, {
            props,
            attachToDocument: false,
        } );
    } );

    afterEach( () => {
        searchFunctionSpy.mockReset();
    } );

    it( 'is a Vue instance', () => {
        expect( wrapper ).toBeTruthy();
    } );

    it( 'has the correct HTML', () => {
        expect( wrapper.html() ).toMatchSnapshot();
    } );

    describe( 'props', () => {
        it( 'includes searchKey, searchFunction, inputAriaLabel, and ui as props', () => {
            expect( Object.keys( wrapper.props() ).length ).toEqual( 5 );
            expect( wrapper.props().searchKey ).toEqual( props.searchKey );
            expect( wrapper.props().searchFunction ).toEqual( props.searchFunction );
            expect( wrapper.props().searchEngineProps ).toEqual( props.searchEngineProps );
            expect( wrapper.props().inputAriaLabel ).toEqual( props.inputAriaLabel );
            expect( wrapper.props().ui ).toEqual( props.ui );
        } );
    } );

    describe( 'data', () => {
        it( 'initializes with empty string for \'search\'', () => {
            expect( wrapper.vm.search ).toBe( '' );
        } );

        it( 'initializes selectedSearchScope with correct default scope', () => {
            expect( wrapper.vm.selectedSearchScope ).toBe( props.ui.searchScopeDropdown.defaultOption );
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

            it( 'should call open window with searchFunction', () => {
                expect( window.open ).toHaveBeenCalled();
                expect( searchFunctionSpy ).toHaveBeenCalled();
                expect( searchFunctionSpy ).toHaveBeenCalledWith( {
                    search,
                    ...props.searchEngineProps,
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
            it( 'builds required parameters for guidesSearch as POJO from this.search (data) and this.engineValues (computed)', () => {
                expect( wrapper.vm.searchValues ).toEqual( {
                    search,
                    ...props.searchEngineProps,
                    scope: 'Library catalog',
                } );
            } );
        } );
    } );

    describe( 'shallow render', () => {
        it( 'has a form', () => {
            expect( wrapper.find( 'form' ).exists() ).toBeTruthy();
        } );

        it( 'form a div with class "bobcat_embed_search_field"', () => {
            expect( wrapper.find( 'form' ).find( 'div.bobcat_embed_search_field' ).exists() ).toBeTruthy();
        } );

        describe( 'the input', () => {
            let input;
            beforeEach( () => {
                input = wrapper.find( 'input[type=text]' );
            } );

            it( 'exists', () => {
                expect( input.exists() ).toBeTruthy();
            } );

            it( 'has an aria-label based on inputAriaLabel', () => {
                expect( input.attributes( 'aria-label' ) ).toEqual( props.inputAriaLabel );
            } );

            it( 'has an id and corresponding label', () => {
                expect( input.attributes( 'id' ) ).toEqual( `tab-${ props.searchKey }-query` );
                expect( wrapper.findAll( `label[for="tab-${ props.searchKey }-query"]` ).length ).toEqual( 1 );
            } );

            it( 'has class "bobcat_embed_searchbox_textfield"', () => {
                expect( input.classes( 'bobcat_embed_searchbox_textfield' ) ).toBeTruthy();
            } );

            it( 'is wrapped in a span with class "bobcat_embed_"', () => {
                const parentEl = input.element.parentElement;
                const klasses = Array.from( parentEl.classList );
                expect( klasses.indexOf( 'bobcat_embed_' ) > -1 ).toBeTruthy();
            } );

            it( 'should be bound to \'search\' in data', () => {
                input.setValue( 'typing' );
                expect( wrapper.vm.search ).toEqual( 'typing' );
            } );

            it( 'has placeholder text, if defined', () => {
                const expectedPlaceholder = props.ui.searchScopeDropdown.options[
                    props.ui.searchScopeDropdown.defaultOption
                ].placeholder;
                expect( input.attributes( 'placeholder' ) ).toBe( expectedPlaceholder );
            } );

            it( 'has aria-describedby according to placeholder text, if defined', () => {
                const expectedPlaceholder = props.ui.searchScopeDropdown.options[
                    props.ui.searchScopeDropdown.defaultOption
                ].placeholder;
                expect( input.attributes( 'aria-describedby' ) ).toBe( expectedPlaceholder );
            } );
        } );

        it( 'includes a submit button', () => {
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

            it( 'should trigger openSearch method', () => {
                expect( openSearchSpy ).toHaveBeenCalled();
            } );
        } );
    } );
} );
