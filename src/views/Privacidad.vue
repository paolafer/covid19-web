<template>
  <div class="row">
    <div class="col-lg-12 d-flex d-lg-block">
      <h1 class="display-16">{{$t('privacy')}}</h1>
    </div>

    <div class="ml-3 mr-3">
      <p class="text-left" v-html="$t('privacyText')"></p>
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
