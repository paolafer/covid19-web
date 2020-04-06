<script>
  import { Line, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins

  export default {
    extends: Line,
    mixins: [reactiveProp],
    props: {
      title: String,
      legend : Boolean,
      xlabel : String,
      ylabel : String,
    },
    computed : {
      options: function () {
        return {
          title: {
            display: true,
            text: this.title,
          },
          legend: {
            display: this.legend,
          },
          showScale: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                callback: (value, index, values) => {
                  return this.formatNumber(value)
                }
              },
              gridLines: {
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15]
              },
              scaleLabel: {
                display: true,
                labelString: this.ylabel,
              }
            }],
            xAxes: [ {
              ticks: {
                beginAtZero: false,
                callback: (value, index, values) => {
                  return this.formatNumber(value)
                }
              },
              gridLines: {
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15]
              },
              scaleLabel: {
                display: true,
                labelString: this.xlabel,
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    data () {
      return {
        gradient: null,
        tooltips: {
          backgroundColor: '#4F5565',
          titleFontStyle: 'normal',
          titleFontSize: 18,
          bodyFontFamily: "'Proxima Nova', sans-serif",
          cornerRadius: 3,
          bodyFontColor: '#20C4C8',
          bodyFontSize: 14,
          xPadding: 14,
          yPadding: 14,
          displayColors: false,
          mode: 'index',
          intersect: false,
          callbacks: {
            title: tooltipItem => {
              return `${tooltipItem[0].xLabel}`
            },
            label: (tooltipItem, data) => {
              let dataset = data.datasets[tooltipItem.datasetIndex]
              let currentValue = dataset.data[tooltipItem.index]
              return `${currentValue.toLocaleString()}`
            }
          }
        },
      }
    },
    watch: {
      options: function (newvalue, oldvalue) {
        this.updatePlot()
      },
    },
    mounted () {
      this.updatePlot()
    },
    methods: {
      updatePlot() {
        console.log("update plot")
        this.gradient = this.$refs.canvas
          .getContext('2d')
          .createLinearGradient(0, 0, 0, 450)

        this.gradient.addColorStop(0, 'rgba(52, 217, 221, 0.6)')
        this.gradient.addColorStop(0.5, 'rgba(52, 217, 221, 0.25)')
        this.gradient.addColorStop(1, 'rgba(52, 217, 221, 0)')

        this.renderChart({
          labels: this.chartLabels,
          datasets: [
            {
              label: 'casos',
              borderColor: '#249EBF',
              pointBackgroundColor: 'rgba(0,0,0,0)',
              pointBorderColor: 'rgba(0,0,0,0)',
              pointHoverBorderColor: '#249EBF',
              pointHoverBackgroundColor: '#fff',
              pointHoverRadius: 4,
              pointHitRadius: 10,
              pointHoverBorderWidth: 1,
              borderWidth: 1,
              backgroundColor: this.gradient,
              data: this.chartData
            }
          ]
        }, this.options)
      },
      formatNumber (num) {
        let numString = Math.round(num).toString()
        if (num <= 1){
          numString = Math.round(num*100).toString()
        }
        let numberFormatMapping = [[6, 'M'], [3, 'k']]
        for (let [numberOfDigits, replacement] of numberFormatMapping) {
          if (numString.length > numberOfDigits) {
            let decimal = ''
            if (numString[numString.length - numberOfDigits] !== '0') {
              decimal = '.' + numString[numString.length - numberOfDigits]
            }
            numString = numString.substr(0, numString.length - numberOfDigits) + decimal + replacement
            break
          }
        }
        return numString
      }
    }
  }
</script>
