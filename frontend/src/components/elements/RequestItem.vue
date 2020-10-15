<template>
    <v-row>
        <!--
        <v-col style="width:20px;"> <!-- instead of cols use pixels -->
            <!--
            <v-img>
            </v-img>
            -->
            <!--
        </v-col>
        -->
        <i 
            style="margin-left:40px; margin-right:40px; height:100%;" 
            class="fas fa-minus-circle fa-5x fa-align-center"
        > </i>
        <v-col>
            <v-row align="center">
                <v-col>
                    <v-row>
                        {{ name }}
                    </v-row>
                </v-col>
                <v-col>
                    <v-row justify="center" no-gutters>
                        <v-btn style="margin-right: 10px; margin-bottom: 10px;"
                            @click.native="addQuantity(-1)"
                            :disabled="askedQuantity == 0"
                        > 
                            <i class="fas fa-minus-circle fa-lg"></i> 
                        </v-btn>

                        <v-btn style="margin-right: 10px; margin-bottom: 10px;"
                            @click.native="addQuantity(1)"
                            :disabled="askedQuantity == quantity"
                        > 
                            <i class="fas fa-plus-circle fa-lg"></i> 
                        </v-btn>
                        <!-- v icon v icon -->
                    </v-row>
                </v-col>
            </v-row>
            <v-divider/>
            <v-row align="center" no-gutters>
                <v-col>
                    <v-row>
                        Em stock: {{ quantity }}
                    </v-row>
                </v-col>
                <v-col>
                    <v-row justify="center" align="center">
                       A pedir: &nbsp; <b style="font-size:150%; text-decoration: underline;"> {{ askedQuantity }} </b>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'RequestItem',

    model: {
    prop: 'askedQuantity',
    event: 'change'
    },

    props: {
        name: String,
        quantity: Number,
        askedQuantity: Number,
    },
    
    methods: {
        addQuantity(howMuch)
        {
            var wantedQuantity = this.askedQuantity;
            console.log("test");
            if(wantedQuantity + howMuch < 0 ||
                wantedQuantity + howMuch > this.quantity) 
            {
                return;
            }
            console.log("test2");
            wantedQuantity += howMuch;
            console.log(wantedQuantity);
            this.$emit("changeQuantity", wantedQuantity);
        }
    },

}

</script>