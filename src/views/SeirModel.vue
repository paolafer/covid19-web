<template>
  <div>
    <div class="row">
      <div class="col-lg-12 d-flex d-lg-block">
        <h1 class="display-16" v-html="$t('seirTitle')"></h1>
      </div>

      <div class="col-lg-12 d-flex d-lg-block">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{$t('modelParameters')}}</h4>
            <ul>
              <li><span class="font-weight-bold">R0</span>: {{$t('growthRate')}}</li>
              <li><span class="font-weight-bold">T</span>: {{$t('duration')}}</li>
              <li><span class="font-weight-bold">Ti</span>: {{$t('incubation')}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <seir-model/>
    <hr>
    <seir-model-comparison/>
  </div>
</template>

<script>
import SeirModel from "../components/SeirModel.vue"
import SeirModelComparison from "../components/SeirModelComparison.vue"

export default {
  name: 'app',
  components: {
    SeirModel,
    SeirModelComparison,
  },
}
</script>
