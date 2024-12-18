import { beforeEach, describe, expect, test } from 'vitest';
import { config, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import bessConfig from '../../../config';

const appConfig = bessConfig.makeNewConfig();

describe( 'computed', () => {
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

        describe( 'more', () => {
            test( 'starts with first tab\'s more by default', () => {
                expect( wrapper.vm.more ).toEqual( currentAppConfig[ 0 ].more );
            } );

            describe( 'when selectedTab is manipulated', () => {
                test( 'updates the more', () => {
                    wrapper.setData( {
                        selectedTab: 2,
                    } );
                    expect( wrapper.vm.more ).toEqual( currentAppConfig[ 1 ].more );
                } );
            } );
        } );

        describe( 'engine', () => {
            test( 'starts with first tab\'s engine by default', () => {
                expect( wrapper.vm.engine ).toEqual( currentAppConfig[ 0 ].engine );
            } );

            describe( 'when selectedTab is manipulated', () => {
                test( 'updates the engine', () => {
                    wrapper.setData( {
                        selectedTab: 2,
                    } );
                    expect( wrapper.vm.engine ).toEqual( currentAppConfig[ 1 ].engine );
                } );
            } );
        } );
    } );
} );
