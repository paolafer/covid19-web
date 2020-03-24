<template>
  <div>
    <div class="row">
      <div class="col-lg-12 d-flex d-lg-block">
        <h1 class="display-16" v-html="$t('icuBedsTitle')"></h1>
      </div>

      <div class="col-lg-12 d-flex d-lg-block">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{$t('modelParameters')}}</h4>
            <ul>
              <li><span class="font-weight-bold">R0</span>: {{$t('growthRate')}}</li>
              <li><span class="font-weight-bold">T</span>: {{$t('duration')}}</li>
              <li><span class="font-weight-bold">Ti</span>: {{$t('incubation')}}</li>
              <li><span class="font-weight-bold">Tm</span>: {{$t('mitigationDate')}}</li>
              <li><span class="font-weight-bold">m</span>: {{$t('mitigationEff')}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <camas-uci/>
  </div>
</template>

<script>
import CamasUci from "../components/CamasUCI.vue"

export default {
  name: 'app',
  components: {
    CamasUci,
  },
}
</script>
