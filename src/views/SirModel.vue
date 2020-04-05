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

    <div>
      <p class='text-justify' v-html="$t('sirModelParagraph1')"></p>
      <p>
        <img src="dist/sir.png" class="img float-center" alt="SIR model">
      </p>
      <br>
      <p class='text-justify' v-html="$t('sirModelParagraph2')"></p>

      <p class='text-center'>
      \(\frac{dS}{dt} = - \beta S I\) (1)
      </p>

      <p class='text-justify' v-html="$t('sirModelParagraph3')"></p>

      <p class='text-center'>
      \(\frac{dI}{dt} = \frac{\beta S I}{N} - \gamma I\) (2)
      </p>

      <p class='text-justify' v-html="$t('sirModelParagraph4')"></p>

      <p class='text-center'>
      \(\frac{dR}{dt} = \gamma R\) (3)
      </p>

      <p class='text-justify' v-html="$t('sirModelParagraph5')"></p>
      <p class='text-justify' v-html="$t('sirModelParagraph6')"></p>
      <p class='text-justify' v-html="$t('sirModelParagraph7')"></p>
      <p class='text-justify' v-html="$t('sirModelParagraph8')"></p>
      <p class='text-justify' v-html="$t('sirModelParagraph9')"></p>
      <!-- <vue-mathjax :formula="''"></vue-mathjax> -->
      <div v-if="false">
        <vue-mathjax :formula="locale"></vue-mathjax>
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
import i18n from '../plugins/i18n'

import { VueMathjax } from 'vue-mathjax'

export default {
  name: 'app',
  components: {
    SirModel,
    SirModelComparison,
    'vue-mathjax': VueMathjax,
  },
  computed: {
    locale : function(){
      return i18n.locale
    }
  }
}
</script>
