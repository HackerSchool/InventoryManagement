<template>
    <div>
        <v-row>
            <v-col>
                <RequestItemList>
                </RequestItemList>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import RequestItemList from '@/components/elements/RequestItemList.vue';

export default {
    name: 'PageComponent',

    components: {
        RequestItemList,
    },
}

</script>