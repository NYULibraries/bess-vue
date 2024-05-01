import { beforeEach, describe, expect, it } from 'vitest';
import { config, shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import appConfig from './config/minimal-fake.js';

describe( 'methods', () => {
    let wrapper;
    config.global.mocks = {
        $config: appConfig,
    };
    beforeEach( () => {
        wrapper = shallowMount( App );
    } );

    describe( 'updateTab', () => {
        const eventSpy = {
            called: false,
            preventDefault() {
                this.called = true;
            },
            reset() {
                this.called = false;
            },
        };
        beforeEach( () => {
            eventSpy.reset();
        } );

        describe( 'if given an \'engine\' tab', () => {
            beforeEach( () => {
                wrapper.vm.updateTab( eventSpy, {
                    id: 2,
                    ...appConfig[1],
                } );
            } );

            it( 'does preventDefault the event', () => {
                expect( eventSpy.called ).toBeTruthy();
            } );

            it( 'changes the selectedTab data', () => {
                expect( wrapper.vm.selectedTab ).toEqual( 2 );
            } );
        } );

        describe( 'if given an \'href\' (external link) tab', () => {
            beforeEach( () => {
                wrapper.setData( {
                    selectedTab: 2,
                } );

                wrapper.vm.updateTab( eventSpy, {
                    id: 1,
                    ...appConfig[0],
                } );
            } );

            it( 'does not preventDefault the event', () => {
                expect( eventSpy.called ).toBeFalsy();
            } );

            it( 'does not change the selectedTab data', () => {
                expect( wrapper.vm.selectedTab ).toEqual( 2 );
            } );
        } );
    } );

    describe( 'tabClasses', () => {
        let klasses;
        beforeEach( () => {
            wrapper.setData( {
                selectedTab: 2,
                tabs       : [ {
                    id: 1,
                    ...appConfig[0],
                },
                {
                    id: 2,
                    ...appConfig[1],
                },
                {
                    id: 3,
                    ...appConfig[2],
                } ],
            } );
        } );

        describe( 'given the first, unselected tab', () => {
            beforeEach( () => {
                klasses = wrapper.vm.tabClasses( { id: 1 } );
            } );

            it( 'has the \'first\' class only', () => {
                expect( klasses ).toEqual( {
                    bobcat_embed_tabs_selected: false,
                    bobcat_embed_tabs_first   : true,
                    bobcat_embed_tabs_inside  : false,
                    bobcat_embed_tabs_last    : false,
                } );
            } );

            describe( 'given the second, selected tab', () => {
                beforeEach( () => {
                    klasses = wrapper.vm.tabClasses( { id: 2 } );
                } );

                it( 'has the \'inside\' and \'selected\' classes', () => {
                    expect( klasses ).toEqual( {
                        bobcat_embed_tabs_selected: true,
                        bobcat_embed_tabs_first   : false,
                        bobcat_embed_tabs_inside  : true,
                        bobcat_embed_tabs_last    : false,
                    } );
                } );
            } );

            describe( 'given the last, unselected tab', () => {
                beforeEach( () => {
                    klasses = wrapper.vm.tabClasses( { id: 3 } );
                } );

                it( 'has the \'last\' class', () => {
                    expect( klasses ).toEqual( {
                        bobcat_embed_tabs_selected: false,
                        bobcat_embed_tabs_first   : false,
                        bobcat_embed_tabs_inside  : false,
                        bobcat_embed_tabs_last    : true,
                    } );
                } );
            } );
        } );
    } );
} );
