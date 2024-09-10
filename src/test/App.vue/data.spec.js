import { beforeEach, describe, expect, test } from 'vitest';
import { config, shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import appConfig from '../../../config';

describe( 'data', () => {
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

        describe( 'selectedTab', () => {
            test( 'exists', () => {
                expect( wrapper.vm.selectedTab ).toBeDefined();
            } );

            test( 'defaults to first tab', () => {
                expect( wrapper.vm.selectedTab ).toEqual( 1 );
            } );
        } );

        describe( 'tabs', () => {
            test( 'exists', () => {
                expect( wrapper.vm.tabs ).toBeDefined();
            } );
            test( 'has tabs mapped from config', () => {
                const tabsWithId = currentAppConfig.map( ( tab, idx ) => ( { id: idx + 1, ...tab } ) );
                expect( wrapper.vm.tabs ).toEqual( tabsWithId );
            } );
        } );
    } );
} );
