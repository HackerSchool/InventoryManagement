<template>
    <div>
        <v-row justify="center">
            <v-col cols=12 lg=8 md=10>
                <v-row>
                    <v-col cols=10 lg=6 md=8>
                        <v-text-field
                            v-model="searchText"
                            placeholder="Pesquisa por nome"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <div :key="updateKey">
                    <v-row v-for="(item,index) in filteredItemList" :key="index">
                        <v-col>
                            <!--
                            <RequestItem
                                name="test"
                                askedQuantity="1"
                                quantity="3"
                            > </RequestItem>
                            :askedQuantity="item.askedQuantity"
                            -->
                            <RequestItem
                                :name="item.name"
                                v-model="item.askedQuantity"
                                :quantity="item.quantity"
                                @changeQuantity="item.askedQuantity = $event"
                            > </RequestItem>
                        </v-col>
                    </v-row>
                </div>
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
            updateKey: 0,
            searchText: "",
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

    methods: {
        
    },

    computed: {
        filteredItemList() {
            return this.itemList.filter(item => item.name.includes(this.searchText));
        }
    },

    watch: {
        searchText() {
            this.updateKey++;
        }
    }
}

</script>