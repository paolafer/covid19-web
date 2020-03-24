<template>
  <div class="row">
    <div class="col-lg-2 d-flex d-lg-block">
      <form>
        <div class="form-group form-inline">
          <!-- div class="slidecontainer" -->
            <label for="rangeR0"><h3>R0: {{ r0 }}</h3></label>
            <input type="range" min="0" max="7" step="0.1" v-model="r0" class="slider" id="rangeR0">

            <label for="rangeT"><h3>T: {{ t }}</h3></label>
            <input type="range" min="1" max="15" step="1" v-model="t" class="slider" id="rangeT">

            <label for="rangeTi"><h3>Ti: {{ ti }}</h3></label>
            <input type="range" min="1" max="15" step="1" v-model="ti" class="slider" id="rangeTi">

            <label for="rangeDays"><h3>{{$t('days')}}: {{ days }}</h3></label>
            <input type="range" min="50" max="500" step="10" v-model="days" class="slider" id="rangeDays">
          <!--/div -->
        </div>
      </form>
    </div>

    <div class="col-lg-8 d-lg-block">
      <line-chart key='chart1' chart-id="line-daily" v-if="loaded" :chartData="datasets"
        legend :title="''" :xlabel="$t('labelDays')" :ylabel="$t('labelCases')"/>
    </div>

  </div>
</template>

<script>
  import LineChart from "./LineChart.vue"
  import _ from "lodash"
  import i18n from '../plugins/i18n'

  export default {
    components: {
      LineChart,
    },
    data () {
      return {
        loaded : true,
        t : 7,
        ti: 5,
        r0 : 3,
        days : 400,

        datasets : {
          labels: [],
          datasets: [],
        },
      }
    },
    computed : {
      locale : function (){
        return i18n.locale
      },
    },
    watch: {
      r0: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(newvalue, this.t, this.ti, this.days)
        },
        500),
      t: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, newvalue, this.ti, this.days)
        },
        500),
      ti: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, this.t, newvalue, this.days)
        },
        500),
      days: _.debounce(
        function (newvalue, oldvalue) {
          this.fetchData(this.r0, this.t, this.ti, newvalue)
        },
        500),
      locale: function (newvalue, oldvalue) {
        this.fetchData(this.r0, this.t, this.ti, this.days)
      },
    },
    beforeMount() {
      this.fetchData(this.r0, this.t, this.ti, this.days)
    },
    methods: {
      fetchData: function (r0, t, ti, days) {
        const baseURI = 'https://kzlecbpuc5.execute-api.us-east-2.amazonaws.com/prod/model'
        this.$http.post(baseURI, {
          'model' : 'SEIR',
          'params' : {
            'R0': r0,
            'T': t,
            'Ti': ti,
            'days' : days,
          }
        })
        .then((result) => {
          this.loaded = false

          this.datasets = {
            labels: result.data.t,
            datasets: [
              {
                label: i18n.t('susceptible'),
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
                data: result.data.S
              },
              {
                label: i18n.t('exposed'),
                borderColor: '#7a7777',
                backgroundColor : 'rgba(122, 119, 119, 0.3)',
                pointBackgroundColor: 'rgba(0,0,0,0)',
                pointBorderColor: 'rgba(0,0,0,0)',
                pointHoverBorderColor: '#bd221c',
                pointHoverBackgroundColor: '#fff',
                pointHoverRadius: 4,
                pointHitRadius: 10,
                pointHoverBorderWidth: 1,
                borderWidth: 1,
                data: result.data.E
              },
              {
                label: i18n.t('infected'),
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
                data: result.data.I
              },
              {
                label: i18n.t('recovered'),
                borderColor: '#00590c',
                backgroundColor: 'rgba(0, 89, 12, 0.3)',
                pointBackgroundColor: 'rgba(0,0,0,0)',
                pointBorderColor: 'rgba(0,0,0,0)',
                pointHoverBorderColor: '#00590c',
                pointHoverBackgroundColor: '#000',
                //pointHoverBackgroundColor: '#fff',
                pointHoverRadius: 4,
                pointHitRadius: 10,
                pointHoverBorderWidth: 1,
                borderWidth: 1,
                data: result.data.R
              }
            ]
          }

          this.loaded = true
        })
      }
    }
  }
</script>
