<template>
  <div class="row">
    <div class="col-lg-12 d-flex d-lg-block">
      <h1 class="display-16">{{$t('evolutionTitle')}}</h1>
    </div>


    <div class="col-lg-12 d-flex d-lg-block">
      <div class="card">
        <div class="card-body">
          <span class="font-weight-bold">{{$t('evolutionDataSource')}}</span>:
          <a href='https://github.com/datadista/datasets'>
            Datadista
          </a>
        </div>
      </div>
    </div>

    <evolucion/>

  </div>
</template>

<script>
import Evolucion from "../components/Comunidades.vue"

export default {
  components: {
    Evolucion,
  },
}
</script>
