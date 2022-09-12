<template>
  <div class="flex flex-wrap mt-8 lg:space-x-8 spaace-y-8" v-if="tutoriales">
    <CoolLightBox  :items="tutoriales" :index="index" @close="index = null">
    </CoolLightBox>

    <div
      v-for="(video, videoIndex) in tutoriales"
      :key="videoIndex"
      class="cursor-pointer"
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
};
</script>

<style></style>
