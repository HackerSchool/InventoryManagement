<template>
    <div>
        <v-row justify="space-between">
            <v-col cols=6 lg=4 md=6>
                <v-text-field
                    v-model="searchText"
                    placeholder="Pesquisa por nome"
                ></v-text-field>
            </v-col>
            <v-col cols=2>
                <v-btn 
                    @click.native="changeSortOrder()"
                > 
                    <i v-if="normalSort" class="fas fa-sort-alpha-down fa-lg"></i> 
                    <i v-else class="fas fa-sort-alpha-up fa-lg"></i> 
                </v-btn>
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
        <v-row>
            <v-col 
                v-if="$vuetify.breakpoint.xs">
                <v-btn block>
                    Pedir materiais
                </v-btn>
            </v-col>
            <v-col v-else
                cols=4 offset=8
            >
                <v-btn block>
                    Pedir materiais
                </v-btn>
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
            normalSort: true,
            updateKey: 0,
            searchText: "",
            itemList: [ 
                {
                    name: "test",
                    quantity: 1,
                    askedQuantity: 1,
                },{
                    name: "test2",
                    quantity: 3,
                    askedQuantity: 1,
                },
            ],
        }
    },

    methods: {
        changeSortOrder() {
            this.normalSort = !this.normalSort;
            this.itemList.reverse();
        }
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