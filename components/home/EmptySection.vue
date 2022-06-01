<template>
  <div
    class="
      flex flex-col
      items-center
      h-96
      justify-center
      border-2 border-gray-300 border-dashed
      px-8
    "
  >
    <v-icon size="48">{{ icon }}</v-icon>
    <p class="text-2xl mt-4 mb-0 font-bold">{{ title }}</p>
    <p class="text-lg mt-2 text-gray-600 text-center">{{ label }}</p>
    <nuxt-link
    :to="{ name: linkTo }" target="_blank"
      ><v-btn class="mt-4 py-3 px-4 rounded-md" color="blue darken-4"
        ><v-icon v-if="addPlus" class="mr-2" color="white">mdi-plus</v-icon
        ><span class="text-white">{{ btnMsg }}</span></v-btn
      ></nuxt-link
    >
  </div>
</template>

<script>
export default {
  props: [
    "defaultTitle",
    "defaultLabel",
    "defaultIcon",
    "defaultBtnMsg",
    "addPlus",
    "linkTo"
  ],
  data() {
    return {
      title: this.defaultTitle,
      label: this.defaultLabel,
      icon: this.defaultIcon,
      btnMsg: this.defaultBtnMsg,
    };
  },
};
</script>

<style>
</style>