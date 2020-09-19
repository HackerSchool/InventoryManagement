<template>
    <v-autocomplete
        :search-input="search"
        :value="value"
        :items="creatorsList"
        item-text="name"
        item-value="creator_id"
        :label="label"
        persistent-hint
        @keypress="handleEnter"
        @input="handleInput"
        attach
        color="red"
    ></v-autocomplete>
</template>


<script>
import api from '@/api'
import TextsController from '@/texts'
import Credentials from '@/login'

export default {
    name: 'testFixe',
    props: ['value', 'all', 'label'],
    texts: null,
    data() {
        return {
            creatorsList: null,
            texts: null,
            search: '',
        }
    },
    methods: {
        handleEnter(e) {
            if (event.keyCode === 13) {
                this.$emit('handleEnter', e);
            }
        },
        handleInput(value){
            this.$emit('input', value)
        },
        fetchCreators() {
            api.post('/search/creators-autocomplete', {
                name: ''
            }).then(creatorsResponse => {
                for(var i = 0; i < creatorsResponse.data.length; i++){
                    let name = []
                    if(creatorsResponse.data[i].first_name)
                        name.push(creatorsResponse.data[i].first_name)
                    if(creatorsResponse.data[i].last_name)
                        name.push(creatorsResponse.data[i].last_name)
                    creatorsResponse.data[i].name = name.join(' ')
                }
                if(this.all)
                    creatorsResponse.data.unshift({
                        name: this.texts.all,
                        creator_id: ""
                    })
                this.creatorsList = creatorsResponse.data
            })
        },
    },
    created() {
        this.fetchCreators()
        this.texts = TextsController.getTexts(Credentials.getLanguage()).authorAutoComplete
    },
    watch: {
        search() {
            this.$emit('handleText',this.search);
        }
    }
}
</script>

