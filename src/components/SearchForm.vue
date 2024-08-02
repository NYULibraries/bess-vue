<template>
  <search-redirect-form
    :search-key="searchKey"
    :search-function="searchFunction"
    :search-engine-props="localEngine"
    :input-aria-label="inputAriaLabel"
    @update:searchEngineProps="updateSearchEngineProps"
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
            return this.localEngine && this.localEngine.type;
        },
        searchFunction() {
            const fxns = {
                primo : primoSearch,
                guides: guidesSearch,
            };

            return fxns[this.engineType];
        },
        inputAriaLabel() {
            const labels = {
                primo : 'Search Bobcat',
                guides: 'Search for research guides',
            }

            return labels[this.engineType];
        },
    },
    methods: {
        updateSearchEngineProps(newProps) {
            this.localEngine = { ...this.localEngine, ...newProps };
        }
    },
    watch: {
        engine: {
            handler(newEngine) {
                this.localEngine = { ...newEngine };
            },
            immediate: true,
        },
    },
};
</script>
