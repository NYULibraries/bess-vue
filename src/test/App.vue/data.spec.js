import { beforeEach, describe, expect, it } from 'vitest';
import { config, shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import appConfig from './config/minimal-fake.js';

describe( 'data', () => {
    let wrapper;
    config.global.mocks = {
        $config: appConfig,
    };
    beforeEach( () => {
        wrapper = shallowMount( App );
    } );

    describe( 'selectedTab', () => {
        it( 'exists', () => {
            expect( wrapper.vm.selectedTab ).toBeDefined();
        } );

        it( 'defaults to first tab', () => {
            expect( wrapper.vm.selectedTab ).toEqual( 1 );
        } );
    } );

    describe( 'tabs', () => {
        it( 'exists', () => {
            expect( wrapper.vm.tabs ).toBeDefined();
        } );
        it( 'has tabs mapped from config', () => {
            const tabsWithId = appConfig.map( ( tab, idx ) => ( { id: idx + 1, ...tab } ) );
            expect( wrapper.vm.tabs ).toEqual( tabsWithId );
        } );
    } );
} );
