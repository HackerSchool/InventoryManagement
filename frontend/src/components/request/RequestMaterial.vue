<template>
  <v-container class="">
    <v-card elevation="2">
      <v-list three line>
        <v-list-item>
          <v-list-item-avatar tile>
            <img v-if="material.image" :src="getImageSrc(material.image)" @click="Image = true" />
            <v-icon v-else>mdi-image-off</v-icon>
          </v-list-item-avatar>
          <v-divider vertical class="mr-3"></v-divider>
          <v-list-item-content>
            <v-list-item-title>
              {{ material.name }}
            </v-list-item-title>
            <v-list-item-subtitle> {{ material.stock }} available </v-list-item-subtitle>
          </v-list-item-content>
          <v-icon class="mx-2" @click="isDescriptionModalOpen = true">mdi-information</v-icon>
          <v-btn :disabled="material.stock === 0" @click="openRequest">
            {{ material.stock === 0 ? 'Out of stock ' : 'Request' }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog v-model="isDescriptionModalOpen" max-width="600">
      <v-card>
        <v-card-title>{{ material.name }}</v-card-title>
        <v-card-text>
          <v-chip-group>
            <v-chip :color="stateColors[material.state]" dark class="capitalized">
              {{ material.state }}
            </v-chip>
            <v-chip :color="typeColors[material.type]" dark class="capitalized">
              {{ material.type }}
            </v-chip>
          </v-chip-group>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                {{
                  material.description
                    ? `${material.description}`
                    : 'There is no description for this material.'
                }}
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="Image" max-width="600">
      <v-card>
        <v-img
          v-if="material.image"
          max-height="600"
          max-width="600"
          :src="getImageSrc(material.image)"
        >
        </v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { typeColors, stateColors } from '@/constants/constants';
import { getImageSrc } from '@/utils/image';
export default {
  props: {
    material: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    typeColors,
    stateColors,
    isDescriptionModalOpen: null,
    Image: null,
  }),
  methods: {
    openRequest() {
      this.$emit('request', this.material.id);
    },
    getImageSrc,
  },
};
</script>

<style></style>
