<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn color="secondary" dark class="mb-2 ml-2 d-none d-sm-flex" v-bind="attrs" v-on="on">
        <v-icon left>mdi-table-large-plus</v-icon>
        Bulk Import from CSV
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline"> Import Members from CSV </v-card-title>

      <v-card-text>
        Paste the CSV content below. It should be separated by commas (
        <pre class="d-inline">,</pre>
        ), and the other of the columns is <strong>name</strong>, <strong>IST ID</strong>,
        <strong>role</strong> (user or admin).
      </v-card-text>

      <v-textarea
        v-model="csv"
        class="mx-3"
        outlined
        label="CSV Content"
        placeholder="Name,ist111111,admin"
      ></v-textarea>

      <v-progress-linear :value="(progressDone / progressTotal) * 100" color="primary" height="25">
        <template #default="{ value: v }">
          <strong>{{ Math.ceil(v) }}%</strong>
        </template>
      </v-progress-linear>

      <div class="mx-2">
        <p v-for="msg in result" :key="msg" class="my-1">{{ msg }}</p>
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
        <v-btn color="primary" text :disabled="loading" @click="importCsv()"> Import </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      csv: '',
      loading: false,
      progressTotal: 0,
      progressDone: 0,
      result: [],
    };
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(dialog) {
        this.$emit('input', dialog);
      },
    },
  },
  methods: {
    async importCsv() {
      const data = this.csv
        .split('\n')
        .map((line) => line.trim() && line.trim().split(','))
        .filter((line) => line);

      this.progressTotal = data.length;
      this.progressDone = 0;
      this.result = [];
      this.loading = true;

      await Promise.all(
        data.map(async (user) => {
          if (user.length >= 3) {
            const [name, istId, role] = user;
            try {
              await this.createMember({ name, istId, role });
            } catch (e) {
              this.result.push(`Member ${name} already existed. Skipped.`);
            }
          }
          this.progressDone++;
        })
      );

      this.loading = false;
    },

    ...mapActions('members', ['createMember']),
  },
};
</script>

<style></style>
