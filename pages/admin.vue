<template>
  <div class="bg-gradient-to-b from-slate-50 to-white px-2 h-full">
    <div class="py-[20px] lg:py-[50px]">
      <admin-dashboard />
    </div>
  </div>
</template>

<script>
import AdminDashboard from '~/components/administracion/AdminDashboard.vue';

export default {
  middleware: ["auth", "admin"],
  components: { AdminDashboard },
};
</script>

<style></style>
