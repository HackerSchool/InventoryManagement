<template>
  <div>
    <v-row justify="center">{{ hello }}</v-row>
    <MembersTest />
    <v-row justify="center"> Lista de itens que podes requesitar </v-row>
    <v-row justify="center">
      <v-col cols="11" lg="8" md="10">
        <v-row>
          <v-col>
            <RequestItemList> </RequestItemList>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RequestItemList from '@/components/elements/RequestItemList.vue';
import MembersTest from '@/components/membersTest/MembersTest.vue';
import { getHelloWorld } from '@/api/helloWorld.api';

export default {
  name: 'MyRequestsComponent',

  components: {
    RequestItemList,
    MembersTest,
  },

  data: function () {
    return {
      hello: 'Nothing :(',
    };
  },

  async mounted() {
    this.hello = (await getHelloWorld()).data;
  },
};
</script>
