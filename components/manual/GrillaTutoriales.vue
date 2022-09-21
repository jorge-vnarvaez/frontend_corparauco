<template>
  <div class="grid grid-cols-12 gap-y-8 mt-8" v-if="tutoriales">
    <CoolLightBox  :items="tutoriales" :index="index" @close="index = null">
    </CoolLightBox>

    <div
      v-for="(video, videoIndex) in tutoriales"
      :key="videoIndex"
      :class="'cursor-pointer ' + col_span"
      @click="index = videoIndex"
    >
      <div class="w-[340px] h-[240px]">
        <v-img
          :src="getThumbnail(video.src)"
          contain
        ></v-img>
      </div>


      <div class="mt-8">
        <span class="block mt-4 text-lg font-medium w-[340px]">
          {{ videoIndex + 1 }}.- {{ video.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Youtube } from "vue-youtube";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  components: { Youtube, CoolLightBox },
  data() {
    return {
      tutoriales: [],
      index: null,
    };
  },
  async fetch() {
    const response = await fetch(
      `${this.$config.apiUrl}/api/videos-manual`
    ).then((response) => response.json());

    this.tutoriales = response.data.map((video) => {
      return {
        'title': video.attributes.titulo,
        'src': video.attributes.url_youtube,
      }
    });
  },
  methods: {
    getId(url) {
      const getYoutubeID = require("get-youtube-id");

      const id = getYoutubeID(url);

      return id;
    },
    getThumbnail(url) {
      const id = this.getId(url);

      return `https://img.youtube.com/vi/${id}/0.jpg`;
    },
  },
  computed: {
    col_span() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'col-span-12';
        case 'sm':
          return 'col-span-6';
        case 'md':
          return 'col-span-6';
        case 'lg':
          return 'col-span-4';
        case 'xl':
          return 'col-span-3';
      }
    }
  }
};
</script>

<style></style>
