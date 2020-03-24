<template>
  <div>
    <div class="row">
      <div class="col-lg-2 d-flex d-lg-block">
        <form>
          <div class="form-group form-inline">
            <!-- div class="slidecontainer" -->
              <label for="rangeR0"><h3>R0: {{ r0 }}</h3></label>
              <input type="range" min="0" max="7" step="0.1" v-model="r0" :class="sliderClass" id="rangeR0" :disabled="!enabled">

              <label for="rangeT"><h3>T: {{ t }}</h3></label>
              <input type="range" min="1" max="15" step="1" v-model="t" :class="sliderClass" id="rangeT" :disabled="!enabled">

              <label for="rangeTi"><h3>Ti: {{ ti }}</h3></label>
              <input type="range" min="1" max="15" step="1" v-model="ti" :class="sliderClass" id="rangeTi" :disabled="!enabled">

              <label for="rangeTm"><h3>Tm: {{ tm }}</h3></label>
              <input type="range" min="0" max="30" step="1" v-model="tm" class="slider" id="rangeTm">

              <label for="rangeM"><h3>m: {{ m }}</h3></label>
              <input type="range" min="0" max="1" step="0.01" v-model="m" class="slider" id="rangeM">

              <label for="rangeDays"><h3>{{$t('days')}}: {{ days }}</h3></label>
              <input type="range" min="50" max="700" step="10" v-model="days" class="slider" id="rangeDays">

              <div class="checkbox">
                <br>
                <label><input type="checkbox" v-model="enabled">{{$t('enableAll')}}</label>
              </div>
            <!--/div -->
          </div>
        </form>
      </div>

      <div class="col-lg-8 d-lg-block">
        <div class="row" v-for="(regionTranche, index1) in regionSplit">
          <div class="col-sm-12 col-lg-4 d-flex d-lg-block"  v-for="(region, index2) in regionTranche">
            <line-chart key='chart1' chart-id="line-daily" v-if="loaded" :chartData="datasetsAll[region]"
              :height="height" :title="region" :xlabel="$t('labelDays')" :ylabel="$t('labelCases')"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import LineChart from "./LineChart.vue"
  import i18n from '../plugins/i18n'
  import _ from "lodash"

  export default {
    components: {
      LineChart,
    },
    computed: {
      sliderClass : function() {
        if (this.enabled)
          return "slider"
        else
          return "noslider"
      },
      regionSplit: function() {
        return _.chunk(this.regions, 3)
      },
      locale : function (){
        return i18n.locale
      },
    },
    data () {
      return {
        regions : ['Andalucía', 'Aragón', 'Asturias',
                   'Baleares', 'Canarias', 'Cantabria', 'Cas-León', 'Cas-Mancha',
                   'Cataluña', 'Valencia', 'Extremadura', 'Galicia',
                   'Madrid', 'Murcia', 'Navarra', 'Euskadi',
                   'Rioja', 'Ceuta', 'Melilla'],
        height : 300,
        loaded : true,
        t : 7,
        ti: 5,
        r0 : 3,
        days : 400,
        m : 0.35,
        tm : 15,
        enabled : false,

        datasetsAll : {
          'Andalucía'   : {labels: [], datasets: []},
          'Aragón'      : {labels: [], datasets: []},
          'Asturias'    : {labels: [], datasets: []},
          'Baleares'    : {labels: [], datasets: []},
          'Canarias'    : {labels: [], datasets: []},
          'Cantabria'   : {labels: [], datasets: []},
          'Cas-León'    : {labels: [], datasets: []},
          'Cas-Mancha'  : {labels: [], datasets: []},
          'Cataluña'    : {labels: [], datasets: []},
          'Valencia'    : {labels: [], datasets: []},
          'Extremadura' : {labels: [], datasets: []},
          'Galicia'     : {labels: [], datasets: []},
          'Madrid'      : {labels: [], datasets: []},
          'Murcia'      : {labels: [], datasets: []},
          'Navarra'     : {labels: [], datasets: []},
          'Euskadi'     : {labels: [], datasets: []},
          'Rioja'       : {labels: [], datasets: []},
          'Ceuta'       : {labels: [], datasets: []},
          'Melilla'     : {labels: [], datasets: []},
        },
      }
    },
    watch: {
      r0: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(newvalue, this.t, this.ti, this.tm, this.m, this.days)
        },
        500),
      t: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, newvalue, this.ti, this.tm, this.m, this.days)
        },
        500),
      ti: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, this.t, newvalue, this.tm, this.m, this.days)
        },
        500),
      tm: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, this.t, this.ti, newvalue, this.m, this.days)
        },
        500),
      m: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, this.t, this.ti, this.tm, newvalue, this.days)
        },
        500),
      days: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, this.t, this.ti, this.tm, this.m, newvalue)
        },
        500),
      locale : _.debounce(
        function (newvalue, oldvalue) {
          this.datasetsAll = {
            'Andalucía'   : {labels: [], datasets: []},
            'Aragón'      : {labels: [], datasets: []},
            'Asturias'    : {labels: [], datasets: []},
            'Baleares'    : {labels: [], datasets: []},
            'Canarias'    : {labels: [], datasets: []},
            'Cantabria'   : {labels: [], datasets: []},
            'Cas-León'    : {labels: [], datasets: []},
            'Cas-Mancha'  : {labels: [], datasets: []},
            'Cataluña'    : {labels: [], datasets: []},
            'Valencia'    : {labels: [], datasets: []},
            'Extremadura' : {labels: [], datasets: []},
            'Galicia'     : {labels: [], datasets: []},
            'Madrid'      : {labels: [], datasets: []},
            'Murcia'      : {labels: [], datasets: []},
            'Navarra'     : {labels: [], datasets: []},
            'Euskadi'     : {labels: [], datasets: []},
            'Rioja'       : {labels: [], datasets: []},
            'Ceuta'       : {labels: [], datasets: []},
            'Melilla'     : {labels: [], datasets: []},
          },
          this.fetchData(this.r0, this.t, this.ti, this.tm, this.m, this.days)
        },
        500),
    },
    beforeMount() {
      this.fetchData(this.r0, this.t, this.ti, this.tm, this.m, this.days)
    },
    methods: {
      repeat: function(item,times){
          return new Array(times).fill(item);
      },
      fetchData: function (r0, t, ti, tm, m, days) {
        const baseURI = 'https://kzlecbpuc5.execute-api.us-east-2.amazonaws.com/prod/model'
        this.$http.post(baseURI, {
          'model' : 'beds',
          'params' : {
            'R0': r0,
            'T': t,
            'Ti': ti,
            'days' : days,
            "Tm": tm,
            "M": m,
          }
        })
        .then((result) => {
          this.loaded = false
          var region = ''
          for (region in this.datasetsAll) {
            this.fillDataset(region, result)
          }
          this.loaded = true
        })
      },
      fillDataset: function (region, result) {
        this.datasetsAll[region] = {
          labels: result.data.t,
          datasets: [
            {
              label: region,
              borderColor: '#bd221c',
              backgroundColor : 'rgba(189, 34, 28, 0.3)',
              pointBackgroundColor: 'rgba(0,0,0,0)',
              pointBorderColor: 'rgba(0,0,0,0)',
              pointHoverBorderColor: '#bd221c',
              pointHoverBackgroundColor: '#fff',
              pointHoverRadius: 4,
              pointHitRadius: 10,
              pointHoverBorderWidth: 1,
              borderWidth: 1,
              data: result.data[region].camas
            },
            {
              label: 'Capacidad',
              borderColor: '#249EBF',
              backgroundColor : 'rgba(36, 158, 191, 0.3)',
              pointBackgroundColor: 'rgba(0,0,0,0)',
              pointBorderColor: 'rgba(0,0,0,0)',
              pointHoverBorderColor: '#249EBF',
              pointHoverBackgroundColor: '#fff',
              pointHoverRadius: 4,
              pointHitRadius: 10,
              pointHoverBorderWidth: 1,
              borderWidth: 1,
              data: this.repeat(result.data[region].capacity, result.data.t.length)
            },
          ],
        }
      },
    }
  }
</script>
