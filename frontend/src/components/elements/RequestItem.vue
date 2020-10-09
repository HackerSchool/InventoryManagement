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
                        <v-btn style="margin-right:20px;"> <i class="fas fa-plus-circle fa-lg"></i> </v-btn>
                        <v-btn> <i class="fas fa-minus-circle fa-lg"></i> </v-btn>
                        <!-- v icon v icon -->
                    </v-row>
                </v-col>
            </v-row>
            <v-divider/>
            <v-row align="center" no-gutters>
                <v-col>
                    <v-row>
                        Quantidade: {{ quantity }}
                    </v-row>
                </v-col>
                <v-col>
                    <v-row justify="center">
                        A pedir: {{ askedQuantity }}
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'RequestItem',

    props: {
        name: String,
        quantity: Number,
        askedQuantity: Number,
    },

}

</script>