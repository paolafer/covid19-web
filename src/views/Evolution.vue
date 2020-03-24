<template>
  <div class="row">
    <div class="col-lg-12 d-flex d-lg-block">
      <h1 class="display-16">{{$t('evolutionTitle')}}</h1>
    </div>


    <div class="col-lg-12 d-flex d-lg-block">
      <div class="card">
        <div class="card-body">
          <span class="font-weight-bold">{{$t('evolutionDataSource')}}</span>:
          <a href='https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide'>
            European Center for Disease Control (ECDC)
          </a>
        </div>
      </div>
    </div>

    <evolucion/>

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
