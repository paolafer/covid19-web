<template>
  <div class="row">
    <div class="col-lg-2 d-flex d-lg-block">
      <form>
        <div class="form-group form-inline">
          <!-- div class="slidecontainer" -->
            <label for="rangeR01"><h3>R0: {{ r01 }}</h3></label>
            <input type="range" min="0" max="7" step="0.1" v-model="r01" class="slider" id="rangeR01">

            <label for="rangeR02"><h3>R0: {{ r02 }}</h3></label>
            <input type="range" min="0" max="7" step="0.1" v-model="r02" class="slider" id="rangeR02">

            <label for="rangeR02"><h3>R0: {{ r03 }}</h3></label>
            <input type="range" min="0" max="7" step="0.1" v-model="r03" class="slider" id="rangeR03">

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
      <h4>{{$t('exposed')}}</h4>
      <line-chart key='comparison-chart1' chart-id="line-daily1" :chartData="datasets1"
        legend :title="''" :xlabel="$t('labelDays')" :ylabel="$t('labelCases')"/>
      <h4>{{$t('infected')}}</h4>
      <line-chart key='comparison-chart2' chart-id="line-daily2" :chartData="datasets2"
        legend :title="''" :xlabel="$t('labelDays')" :ylabel="$t('labelCases')"/>
      <h4>{{$t('recovered')}}</h4>
      <line-chart key='comparison-chart3' chart-id="line-daily3" :chartData="datasets3"
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
        r01 : 1.5,
        r02 : 1.8,
        r03 : 3,
        t  : 7,
        ti : 5,
        days : 300,

        datasets1 : { labels: [], datasets: []},
        datasets2 : { labels: [], datasets: []},
        datasets3 : { labels: [], datasets: []},

        ready1 : false,
        ready2 : false,
        ready3 : false,

        times : [],
        e1 : [],
        e2 : [],
        e3 : [],

        i1 : [],
        i2 : [],
        i3 : [],

        r1 : [],
        r2 : [],
        r3 : [],
      }
    },
    computed : {
      locale : function (){
        return i18n.locale
      },
    },
    watch: {
      ready1 : function(newvalue, oldvalue){
        this.updateData()
      },
      ready2 : function(newvalue, oldvalue){
        this.updateData()
      },
      ready3 : function(newvalue, oldvalue){
        this.updateData()
      },
      r01: _.debounce(
        function (newvalue, oldvalue) {
          this.ready1 = false
          this.fetchData1(this.r01, this.t, this.ti, this.days)
        },
        500),
      r02: _.debounce(
        function (newvalue, oldvalue) {
          this.ready2 = false
          this.fetchData2(this.r02, this.t, this.ti, this.days)
        },
        500),
      r03: _.debounce(
        function (newvalue, oldvalue) {
          this.ready3 = false
          this.fetchData1(this.r03, this.t, this.ti, this.days)
        },
        500),
      t: _.debounce(
        function (newvalue, oldvalue) {
          this.ready1 = false
          this.ready2 = false
          this.ready3 = false
          this.fetchData1(this.r01, this.t, this.ti, this.days)
          this.fetchData2(this.r02, this.t, this.ti, this.days)
          this.fetchData3(this.r03, this.t, this.ti, this.days)
        },
        500),
      ti: _.debounce(
        function (newvalue, oldvalue) {
          this.ready1 = false
          this.ready2 = false
          this.ready3 = false
          this.fetchData1(this.r01, this.t, this.ti, this.days)
          this.fetchData2(this.r02, this.t, this.ti, this.days)
          this.fetchData3(this.r03, this.t, this.ti, this.days)
        },
        500),
      days: _.debounce(
        function (newvalue, oldvalue) {
          this.ready1 = false
          this.ready2 = false
          this.ready3 = false
          this.fetchData1(this.r01, this.t, this.ti, this.days)
          this.fetchData2(this.r02, this.t, this.ti, this.days)
          this.fetchData3(this.r03, this.t, this.ti, this.days)
        },
        500),
      locale: function (newvalue, oldvalue) {
        this.datasets1 = { labels: [], datasets: []},
        this.datasets2 = { labels: [], datasets: []},
        this.datasets3 = { labels: [], datasets: []},
        this.ready1 = false
        this.ready2 = false
        this.ready3 = false
        this.fetchData1(this.r01, this.t, this.ti, this.days)
        this.fetchData2(this.r02, this.t, this.ti, this.days)
        this.fetchData3(this.r03, this.t, this.ti, this.days)
      },
    },
    beforeMount() {
      this.fetchData1(this.r01, this.t, this.ti, this.days)
      this.fetchData2(this.r02, this.t, this.ti, this.days)
      this.fetchData3(this.r03, this.t, this.ti, this.days)
    },
    methods: {
      updateData : function () {
        if ((this.ready1 & this.ready2) & this.ready3){
          this.datasets1 = {
            labels: this.times,
            datasets: [
              {
                label: 'R='+this.r01,
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
                data: this.e1
              },
              {
                label: 'R='+this.r02,
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
                data: this.e2
              },
              {
                label: 'R='+this.r03,
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
                data: this.e3
              }
            ]
          },
          this.datasets2 = {
            labels: this.times,
            datasets: [
              {
                label: 'R='+this.r01,
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
                data: this.i1
              },
              {
                label: 'R='+this.r02,
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
                data: this.i2
              },
              {
                label: 'R='+this.r03,
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
                data: this.i3
              }
            ]
          },
          this.datasets3 = {
            labels: this.times,
            datasets: [
              {
                label: 'R='+this.r01,
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
                data: this.r1
              },
              {
                label: 'R='+this.r02,
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
                data: this.r2
              },
              {
                label: 'R='+this.r03,
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
                data: this.r3
              }
            ]
          }
        }
      },
      fetchData1: function (r01, t, ti, days) {
        const baseURI = ' https://kzlecbpuc5.execute-api.us-east-2.amazonaws.com/prod/model'
        this.$http.post(baseURI, {
          'model' : 'SEIR',
          'params' : {
            'R0': r01,
            'T': t,
            'Ti': ti,
            'days' : days,
          }
        })
        .then((result) => {
          this.times  = result.data.t
          this.e1 = result.data.E
          this.i1 = result.data.I
          this.r1 = result.data.R
          this.ready1 = true
        })
      },
      fetchData2: function (r02, t, ti, days) {
        const baseURI = ' https://kzlecbpuc5.execute-api.us-east-2.amazonaws.com/prod/model'
        this.$http.post(baseURI, {
          'model' : 'SEIR',
          'params' : {
            'R0': r02,
            'T': t,
            'Ti': ti,
            'days' : days,
          }
        })
        .then((result) => {
          this.times  = result.data.t
          this.e2 = result.data.E
          this.i2 = result.data.I
          this.r2 = result.data.R
          this.ready2 = true
        })
      },
      fetchData3: function (r03, t, ti, days) {
        const baseURI = ' https://kzlecbpuc5.execute-api.us-east-2.amazonaws.com/prod/model'
        this.$http.post(baseURI, {
          'model' : 'SEIR',
          'params' : {
            'R0': r03,
            'T': t,
            'Ti': ti,
            'days' : days,
          }
        })
        .then((result) => {
          this.times  = result.data.t
          this.e3 = result.data.E
          this.i3 = result.data.I
          this.r3 = result.data.R
          this.ready3 = true
        })
      },
    }
  }
</script>
