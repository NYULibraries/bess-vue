<template>
  <search-redirect-form
    :search-key="searchKey"
    :search-function="searchFunction"
    :search-engine-props="engine"
    :input-aria-label="inputAriaLabel"
    :ui="ui"
  />
</template>

<script>
import SearchRedirectForm from '@/components/searchForms/SearchRedirectForm.vue';
import { primoSearch, guidesSearch } from '@/utils/searchRedirects';

export default {
    components: {
        SearchRedirectForm,
    },
    props: {
        engine: {
            type   : String,
            default: undefined,
        },
        searchKey: {
            type    : String,
            required: true,
        },
        ui: {
            type   : Object,
            default: {},
        },
    },
    computed: {
        engineType() {
            return this.engine?.type;
        },
        searchFunction() {
            const fxns = {
                primo : primoSearch,
                guides: guidesSearch,
            };

            return fxns[ this.engineType ];
        },
        inputAriaLabel() {
            const labels = {
                primo : 'Search Bobcat',
                guides: 'Search for research guides',
            }

            return labels[ this.engineType ];
        },
    },
};
</script>
