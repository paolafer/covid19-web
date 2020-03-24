<template>
  <div>
      <div class="col-lg-12 d-flex d-lg-block">
      <form>
        <div class="form-group form-inline">
          <label for="selCountry"><h3>{{$t('country')}}:</h3></label>
          <select v-model="country" class="custom-select" id="selCountry">
            <option v-bind:value="item.code" v-for="(item, key, index) in countries">{{item.value}}</option>
          </select>
        </div>

        <div class="form-group form-inline">
          <div class="checkbox">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="scale" v-model="logScale">
              <label class="custom-control-label" for="scale">{{$t('logScale')}}</label>
            </div>
          </div>
        </div>
      </form>
    </div>


    <div class="col-lg-12 col-sm-12 d-lg-block">
      <div class="row">
        <div class="col-sm-12 col-lg-6 d-flex d-lg-block">
          <time-chart key='chart1' v-if="loaded" :chartData="deaths" :height="height"
            :title="$t('deathsTitle')" :ylabel="$t('deathsLabel')" :scale="scale"/>
        </div>
        <div class="col-sm-12 col-lg-6 d-flex d-lg-block">
          <time-chart key='chart3' v-if="loaded" :chartData="deathsCum" :height="height"
            :title="$t('deathsCumTitle')" :ylabel="$t('deathsCumLabel')" :scale="scale"/>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-6 d-flex d-lg-block">
          <time-chart key='chart2' v-if="loaded" :chartData="cases" :height="height"
            :title="$t('casesTitle')" :ylabel="$t('casesLabel')" :scale="scale"/>
        </div>
        <div class="col-sm-12 col-lg-6 d-flex d-lg-block">
          <time-chart key='chart4' v-if="loaded" :chartData="casesCum" :height="height"
            :title="$t('casesCumTitle')" :ylabel="$t('casesCumLabel')" :scale="scale"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeChart from "./TimeChart.vue"
import _ from "lodash"
import i18n from '../plugins/i18n'

export default {
  components: {
    TimeChart,
  },
  data () {
    return {
      logScale : true,
      loaded : true,
      country : 'ES',
      countries : [],
      threshold : 2,
      height : 400,
      deaths: {
        labels: [],
        datasets: [],
      },
      cases: {
        labels: [],
        datasets: [],
      },
      deathsCum: {
        labels: [],
        datasets: [],
      },
      casesCum: {
        labels: [],
        datasets: [],
      },
    }
  },
  beforeMount() {
    this.fetchCountries()
    this.fetchData()
  },
  computed: {
    scale: function () {
      return this.logScale ? 'logarithmic' : 'linear'
    },
    locale : function (){
      return i18n.locale
    }
  },
  watch: {
    country: _.debounce(
      function (newvalue, oldvalue) {
        this.fetchData()
      },
      500),
    scale: function (newvalue, oldvalue) {
        this.fetchData()
      },
    locale: function (newvalue, oldvalue) {
      this.fetchCountries()
      this.fetchData()
    },
  },
  methods : {
    fetchCountries: function () {
      const baseURI = 'https://firestore.googleapis.com/v1/projects/covid19-simulator/databases/(default)/documents/countries/list_'
      this.$http.get(baseURI + i18n.locale)
      .then((result) => {
        var countries = _.toPairs(result.data.fields)
        countries = _.map(countries, function(array) {
            return {
              ['code'] : array[0],
              ['value']: array[1].stringValue}
          })
        countries = _.sortBy(countries, 'value')
        this.countries = countries
      })
    },
    extractIntProperty: function (array, property){
      var data_tmp = _.map(array, property)
      var data     = _.map(data_tmp, _.ary(parseInt, 1))
      return data
    },
    cumulativeSum : function (array){
      return _.reduce(array, function (acc, n) {
         acc.push( (acc.length > 0 ? acc[acc.length-1] : 0) + n); return acc
       }, [])
    },
    applyThreshold : function (item) {
      return item > this.threshold
    },
    fetchData: function () {
      const baseURI = 'https://firestore.googleapis.com/v1/projects/covid19-simulator/databases/(default)/documents/countries/'
      this.$http.get(baseURI + this.country)
      .then((result) => {
        var data_tmp = result.data.fields.data.arrayValue.values
        this.loaded = false

        var deaths = this.extractIntProperty(data_tmp, 'mapValue.fields.deaths.stringValue')
        var cases  = this.extractIntProperty(data_tmp, 'mapValue.fields.cases.stringValue')

        deaths = _.reverse(deaths)
        cases = _.reverse(cases)

        var deathsCum = this.cumulativeSum(deaths)
        var casesCum  = this.cumulativeSum(cases)

        var dates = _.map(data_tmp, 'mapValue.fields.dateRep.stringValue')
        dates = _.reverse(dates)

        //Apply threshold
        var idx = _.findIndex(cases, this.applyThreshold)
        dates     = dates.slice(idx)
        cases     = cases.slice(idx)
        deaths    = deaths.slice(idx)
        casesCum  = casesCum.slice(idx)
        deathsCum = deathsCum.slice(idx)

        this.deaths = {
          labels: dates,
           datasets: [
             {
               label: 'Muertes',
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
               data: deaths,
             }
           ]
         }

         this.cases = {
           labels: dates,
            datasets: [
              {
                label: 'Casos',
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
                data: cases,
              }
            ]
          }

          this.deathsCum = {
            labels: dates,
             datasets: [
               {
                 label: 'Muertes',
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
                 data: deathsCum,
               }
             ]
           }

           this.casesCum = {
             labels: dates,
              datasets: [
                {
                  label: 'Casos',
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
                  data: casesCum,
                }
              ]
            }
        this.loaded = true
      })
    }
  }
}
</script>
