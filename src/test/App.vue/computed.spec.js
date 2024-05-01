import { beforeEach, describe, expect, it } from 'vitest';
import { config, shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import appConfig from './config/minimal-fake.js';

describe( 'computed', () => {
    let wrapper;
    config.global.mocks = {
        $config: appConfig,
    };
    beforeEach( () => {
        wrapper = shallowMount( App );
    } );

    describe( 'more', () => {
        it( 'starts with first tab\'s more by default', () => {
            expect( wrapper.vm.more ).toEqual( appConfig[0].more );
        } );

        describe( 'when selectedTab is manipulated', () => {
            it( 'updates the more', () => {
                wrapper.setData( {
                    selectedTab: 2,
                } );
                expect( wrapper.vm.more ).toEqual( appConfig[1].more );
            } );
        } );
    } );

    describe( 'engine', () => {
        it( 'starts with first tab\'s engine by default', () => {
            expect( wrapper.vm.engine ).toEqual( appConfig[0].engine );
        } );

        describe( 'when selectedTab is manipulated', () => {
            it( 'updates the engine', () => {
                wrapper.setData( {
                    selectedTab: 2,
                } );
                expect( wrapper.vm.engine ).toEqual( appConfig[1].engine );
            } );
        } );
    } );
} );
