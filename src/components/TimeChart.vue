<script>
  import { Line, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins

  export default {
    extends: Line,
    mixins: [reactiveProp],
    props: {
      title: String,
      ylabel: String,
      scale: String,
    },
    computed: {
      options: function () {
        return {
          title:      {
            display: true,
            text:    this.title
          },
          legend: {
            display: false
          },
          scales:     {
            xAxes: [{
              type:       "time",
              time:       {
                format: 'DD/MM/YYYY',
                tooltipFormat: 'll'
              },
              scaleLabel: {
                display:     true,
                labelString: ''
              }
            }],
            yAxes: [{
              type: this.scale,
              scaleLabel: {
                display:     true,
                labelString: this.ylabel
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    watch: {
      options: function (newvalue, oldvalue) {
        this.updatePlot()
      },
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
    methods: {
      updatePlot: function () {
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
    },
    mounted () {
      this.updatePlot()
    },
  }
</script>
