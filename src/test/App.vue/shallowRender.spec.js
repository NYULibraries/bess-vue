import { beforeEach, describe, expect, it } from 'vitest';
import { config, shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import appConfig from './config/minimal-fake.js';

describe( 'App', () => {
    let wrapper;
    config.global.mocks = {
        $config: appConfig,
    };
    beforeEach( () => {
        wrapper = shallowMount( App );
    } );

    it( 'has a list of tabs', () => {
        expect( wrapper.find( 'div.bobcat_embed_tabs ul' ).exists() ).toBeTruthy();
    } );

    it( 'lists the first tab\'s advanced links', () => {
        const linksWrapper = wrapper.find( '.bobcat_embed_links' );
        const links = linksWrapper.findAll( '.bobcat_embed_links ul li a' );
        const expectedLinks = [
            {
                text  : 'Example1 Link',
                href  : 'example1.com',
                target: '_blank',
            },
        ];

        expect( links.length ).toEqual( expectedLinks.length );

        links.forEach( ( link, idx ) => {
            expect( link.attributes( 'href' ) ).toEqual( expectedLinks[idx].href );
            expect( link.text() ).toEqual( expectedLinks[idx].text );
            expect( link.attributes( 'target' ) ).toEqual( '_blank' );
        } );
    } );

    describe( '<tab-item>', () => {
        let tabWrappers;
        beforeEach( () => {
            tabWrappers = wrapper.findAllComponents( { name: 'tab-item' } );
        } );

        it( 'has an appropriate number of tabs', () => {
            expect( tabWrappers.length ).toEqual( 2 );
        } );

        describe( 'initial state', () => {
            describe( 'the first tab', () => {
                const tabProps = { id: 1, ...config[0] };
                let firstTab;
                beforeEach( () => {
                    firstTab = tabWrappers[0];
                } );

                it( 'is selected by default', () => {
                    expect( firstTab.classes( 'bobcat_embed_tabs_selected' ) ).toBeTruthy();
                } );

                it( 'has the appropriate "first" class', () => {
                    expect( firstTab.classes( 'bobcat_embed_tabs_first' ) ).toBeTruthy();
                } );

                it( 'does not have inner, last classes', () => {
                    expect( firstTab.classes( 'bobcat_embed_tabs_inner' ) ).toBeFalsy();
                    expect( firstTab.classes( 'bobcat_embed_tabs_last' ) ).toBeFalsy();
                } );

                it( 'has a tab with the appropriate properties', () => {
                    const vm = firstTab.vm;

                    expect( vm.tab ).toBeDefined();
                    Object.keys( tabProps ).forEach( prop => {
                        expect( vm.tab[prop] ).toEqual( tabProps[prop] );
                    } );
                } );

                it( 'has an update-tab function', () => {
                    expect( firstTab.vm.updateTab ).toBeDefined();
                    expect( typeof firstTab.vm.updateTab ).toEqual( 'function' );
                } );

                it( 'has an attribute role=tab', () => {
                    expect( firstTab.attributes( 'role' ) ).toEqual( 'tab' );
                } );
            } );

            describe( 'the second tab', () => {
                const tabProps = { id: 2, ...config[1] };
                let secondTab;
                beforeEach( () => {
                    secondTab = tabWrappers[1];
                } );

                it( 'is not selected by default', () => {
                    expect( secondTab.classes( 'bobcat_embed_tabs_selected' ) ).toBeFalsy();
                } );

                it( 'has the appropriate "last" class', () => {
                    expect( secondTab.classes( 'bobcat_embed_tabs_last' ) ).toBeTruthy();
                } );

                it( 'does not have inside, first classes', () => {
                    expect( secondTab.classes( 'bobcat_embed_tabs_inside' ) ).toBeFalsy();
                    expect( secondTab.classes( 'bobcat_embed_tabs_first' ) ).toBeFalsy();
                } );

                it( 'has a tab with the appropriate properties', () => {
                    const vm = secondTab.vm;

                    Object.keys( tabProps ).forEach( prop => {
                        expect( vm.tab[prop] ).toEqual( tabProps[prop] );
                    } );
                } );

                it( 'has an update-tab function', () => {
                    expect( secondTab.vm.updateTab ).toBeDefined();
                    expect( typeof secondTab.vm.updateTab ).toEqual( 'function' );
                } );

                it( 'has an attribute role=tab', () => {
                    expect( secondTab.attributes( 'role' ) ).toEqual( 'tab' );
                } );
            } );
        } );

        describe( 'when second tab selected', () => {
            beforeEach( async () => {
                await wrapper.setData( {
                    selectedTab: 2,
                } );
            } );

            describe( 'the first tab', () => {
                let firstTab;
                beforeEach( () => {
                    firstTab = tabWrappers[0];
                } );

                it( 'does not have the \'selected\' class', () => {
                    expect( firstTab.classes( 'bobcat_embed_tabs_selected' ) ).toBeFalsy();
                } );
            } );

            describe( 'the second tab', () => {
                let secondTab;
                beforeEach( () => {
                    secondTab = tabWrappers[1];
                } );

                it( 'has the \'selected\' class', () => {
                    expect( secondTab.classes( 'bobcat_embed_tabs_selected' ) ).toBeTruthy();
                } );
            } );

            describe( '\'more\' list items', () => {
                it( 'lists the second tab\'s advanced links', () => {
                    const linksWrapper = wrapper.find( '.bobcat_embed_links' );
                    const listItems = linksWrapper.findAll( '.bobcat_embed_links ul li a' );
                    const expectedLinks = [
                        {
                            text  : 'Example2 Link',
                            href  : 'example2.com',
                            target: '_blank',
                        },
                        {
                            text  : 'Example3 Link',
                            href  : 'example3.com',
                            target: undefined,
                        },
                    ]

                    expect( listItems.length ).toEqual( expectedLinks.length );

                    listItems.forEach( ( link, idx ) => {
                        expect( link.attributes( 'href' ) ).toEqual( expectedLinks[idx].href );
                        expect( link.text() ).toEqual( expectedLinks[idx].text );
                        expect( link.attributes( 'target' ) ).toEqual( expectedLinks[idx].target );
                    } );
                } );
            } );
        } );
    } );
} );
