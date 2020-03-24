<template>
  <div>
    <div class="row">
      <div class="col-lg-12 d-flex d-lg-block">
        <h1 class="display-16" v-html="$t('sirTitle')"></h1>
      </div>

      <div class="col-lg-12 d-flex d-lg-block">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{$t('modelParameters')}}</h4>
            <ul>
              <li><span class="font-weight-bold">R0</span>: {{$t('growthRate')}}</li>
              <li><span class="font-weight-bold">T</span>: {{$t('duration')}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <sir-model/>
    <hr>
    <sir-model-comparison/>
  </div>
</template>

<script>
import SirModel from "../components/SirModel.vue"
import SirModelComparison from "../components/SirModelComparison.vue"

export default {
  name: 'app',
  components: {
    SirModel,
    SirModelComparison,
  },
}
</script>
