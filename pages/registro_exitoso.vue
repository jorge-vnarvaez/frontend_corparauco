<template>
  <div class="flex justify-center flex-col align-center py-20">
    <p class="text-3xl text-center font-bold">Tu cuenta se ha creado exitosamente</p>
    <p class="text-xl"><nuxt-link :to="{ name: 'iniciar_sesion' }">Haz clic aquí </nuxt-link><span>para iniciar sesión</span></p>

    <v-img src="/registro_exitoso.jpg" width="500" height="500" contain>
    </v-img>
  </div>
</template>
