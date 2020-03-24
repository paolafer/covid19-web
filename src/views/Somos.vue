<template>
  <div class="row">
    <div class="col-lg-12 d-flex d-lg-block">
      <h1 class="display-16">Quiénes somos</h1>
    </div>

    <div class="ml-3 mr-3">
      <p class="text-left" v-html="$t('whoText')"></p>

      <a href="http://next.ific.uv.es">
        <img src="dist/next_logo.png" class="img-fluid float-left" alt="NEXT logo">
      </a>
    </div>


  </div>
</template>

<script>
import Evolucion from "../components/Evolucion.vue"

export default {
  components: {
    Evolucion,
  },
}
</script>
