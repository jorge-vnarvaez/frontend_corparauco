import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";
import "tippy.js/themes/light.css";


Vue.use(VueTippy);
// or
Vue.use(VueTippy, {
  directive: "tippy", // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  },
  theme: "light"
});

Vue.component("tippy", TippyComponent);