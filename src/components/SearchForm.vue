<template>
  <search-redirect-form
    :search-key="searchKey"
    :search-function="searchFunction"
    :search-engine-props="localEngine"
    :input-aria-label="inputAriaLabel"
    :scopes-config="scopesConfig"
    :engine-scope="localEngine?.scope || ''"
    @update:search-engine-props="updateSearchEngineProps"
  />
</template>

<script>
import SearchRedirectForm from './searchForms/SearchRedirectForm.vue';
import { primoSearch, guidesSearch } from '../utils/searchRedirects';

export default {
    components: {
        SearchRedirectForm,
    },
    props: [
        'searchKey',
        'engine',
    ],
    data() {
        return {
            localEngine: { ...this.engine },
        };
    },
    computed: {
        engineType() {
            return this.localEngine?.type;
        },
        searchFunction() {
            const fxns = {
                primo : primoSearch,
                guides: guidesSearch,
            };

            return fxns[this.engineType] || ( () => {} );
        },
        inputAriaLabel() {
            const labels = {
                primo : 'Search Bobcat',
                guides: 'Search for research guides',
            }

            return labels[this.engineType] || '';
        },
        scopesConfig() {
            return this.localEngine.scopesMap || {};
        },
    },
    watch: {
        engine: {
            handler( newEngine ) {
                this.localEngine = { ...newEngine };
            },
            immediate: true,
        },
    },
    methods: {
        updateSearchEngineProps( newProps ) {
            const hasChanged = Object.keys( newProps ).some( key => 
                this.localEngine[key] !== newProps[key],
            );
            if ( hasChanged ) {
                this.localEngine = { ...this.localEngine, ...newProps };
            }
        },
    },
};
</script>
