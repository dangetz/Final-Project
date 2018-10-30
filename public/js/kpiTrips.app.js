var kpiTripsApp = new Vue({
  el: '#kpiTrips',
  data: {

    sensorTime: [],

  },

  methods:{
    fetchSensorTime (turbineDeployedId){
      fetch('api/metrics.php?turbineDeployedId='+turbineDeployedId)
      .then( response => response.json() )
      .then( json => {
        kpiTripsApp.sensorTime = json;
        kpiTripsApp.formatSensorTime();
        kpiTripsApp.buildTripsChart();
      } )
      .catch( err => {
        console.log('Time Series Get ERROR:');
        console.log(err);
      })
    },

    formatSensorTime(){
      this.sensorTime.forEach(
        (entry, index, arr) => {
          entry.trips = Number(entry.trips);
          entry.dateCollected = Date.parse(entry.dataCollectedDate);
        }
      )
    },


  buildTripsChart() {
    Highcharts.chart('tripsChart', {
        chart: {
          type: 'pie',
            zoomType: 'x'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Output'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Output/Date',
            data: kpiTripsApp.sensorTime.map( entry=>
              [entry.dateCollected, entry.trips]
            )
        }]
    });

  },
},

    created () {

      // Do data fetch
      const url = new URL(window.location.href);
      const turbineDeployedId = url.searchParams.get('turbineDeployedId');
      console.log('Turbine: '+ turbineDeployedId);
      this.turbineDeployedId = turbineDeployedId;

      this.fetchSensorTime(turbineDeployedId);

    }
  })
