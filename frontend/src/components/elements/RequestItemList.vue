<template>
    <div>
        <v-row justify="center" v-for="(item,index) in itemList" :key="index">
            <v-col cols=12 lg=8 md=10>
                <!--
                <RequestItem
                    name="test"
                    askedQuantity="1"
                    quantity="3"
                > </RequestItem>
                -->
                <RequestItem
                    :name="item.name"
                    :askedQuantity="item.askedQuantity"
                    :quantity="item.quantity"
                > </RequestItem>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import RequestItem from '@/components/elements/RequestItem.vue';

export default {
    name: 'RequestItemList',

    components: {
        RequestItem,
    },

    data() {
        return {
            itemList: [ {
                name: "test",
                quantity: 1,
                askedQuantity: 1,
            },{
                name: "test2",
                quantity: 3,
                askedQuantity: 1,
            },],
        }
    },
}

</script>