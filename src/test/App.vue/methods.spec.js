import { beforeEach, describe, expect, test } from 'vitest';
import { config, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import appConfig from '../../../config';

describe( 'methods', () => {
    let currentAppConfig;
    let wrapper;

    describe.each(
        Object.keys( appConfig.institutions ).map(
            function ( institution ) {
                return { institution };
            },
        ) )( '$institution', ( { institution } ) => {
        beforeEach( () => {
            currentAppConfig = appConfig.institutions[ institution ];

            config.global.mocks = {
                $config: currentAppConfig,
            };

            wrapper = shallowMount( App );
        } );

        describe( 'updateTab', () => {
            let firstTabConfigWithEngine_Id;
            let firstTabConfigWithEngine_Index;

            let firstTabConfigWithOpenAndNoEngine_Id;
            let firstTabConfigWithOpenAndNoEngine_Index;

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

                // - `currentAppConfig` does not appear to be defined in outer
                // scope, so need to reference it here.
                // - Note that NYU_HOME tab 1 is configured with an `engine` and
                // an `open`, and has no tabs with `engine` only.
                firstTabConfigWithEngine_Index = currentAppConfig.findIndex(
                    tabConfig => tabConfig.engine,
                );
                firstTabConfigWithEngine_Id = firstTabConfigWithEngine_Index + 1;

                firstTabConfigWithOpenAndNoEngine_Index = currentAppConfig.findIndex(
                    tabConfig => tabConfig.open && !tabConfig.engine,
                );
                firstTabConfigWithOpenAndNoEngine_Id = firstTabConfigWithOpenAndNoEngine_Index + 1;
            } );

            describe( 'if given an \'engine\' tab', () => {
                beforeEach( () => {
                    wrapper.vm.updateTab( eventSpy, {
                        id: firstTabConfigWithEngine_Id,
                        ...currentAppConfig[ firstTabConfigWithEngine_Index ],
                    } );
                } );

                // NYU_HOME tab 1 is configured with an `engine` and an `open`,
                // and has no tabs with `engine` only.
                test.skipIf( !firstTabConfigWithOpenAndNoEngine_Id )( 'does preventDefault the event', () => {
                    expect( eventSpy.called ).toBeTruthy();
                } );

                test( 'changes the selectedTab data', () => {
                    expect( wrapper.vm.selectedTab ).toEqual( firstTabConfigWithEngine_Id );
                } );
            } );

            describe( 'if given an \'href\' (external link) tab', () => {
                beforeEach( () => {
                    wrapper.setData( {
                        selectedTab: firstTabConfigWithEngine_Id,
                    } );

                    wrapper.vm.updateTab( eventSpy, {
                        id: firstTabConfigWithOpenAndNoEngine_Id,
                        ...currentAppConfig[ firstTabConfigWithOpenAndNoEngine_Index ],
                    } );
                } );

                test( 'does not preventDefault the event', () => {
                    expect( eventSpy.called ).toBeFalsy();
                } );

                test( 'does not change the selectedTab data', () => {
                    expect( wrapper.vm.selectedTab ).toEqual( firstTabConfigWithEngine_Id );
                } );
            } );
        } );

        describe( 'tabClasses', () => {
            let klasses;
            beforeEach( () => {
                wrapper.setData( {
                    selectedTab: 2,
                    tabs       : [
                        {
                            id: 1,
                            ...currentAppConfig[ 0 ],
                        },
                        {
                            id: 2,
                            ...currentAppConfig[ 1 ],
                        },
                        {
                            id: 3,
                            ...currentAppConfig[ 2 ],
                        },
                    ],
                } );
            } );

            describe( 'given the first, unselected tab', () => {
                beforeEach( () => {
                    klasses = wrapper.vm.tabClasses( { id: 1 } );
                } );

                test( 'has the \'first\' class only', () => {
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

                    test( 'has the \'inside\' and \'selected\' classes', () => {
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

                    test( 'has the \'last\' class', () => {
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
} );

