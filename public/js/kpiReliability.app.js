var kpiReliabilityApp = new Vue({
  el: '#kpiReliability',
  data: {

    sensorTime: [],

  },

  methods:{
    fetchSensorTime (turbineDeployedId){
      fetch('api/metrics.php?turbineDeployedId='+turbineDeployedId)
      .then( response => response.json() )
      .then( json => {
        kpiReliabilityApp.sensorTime = json;
        kpiReliabilityApp.formatSensorTime();
        kpiReliabilityApp.buildReliabilityChart();
      } )
      .catch( err => {
        console.log('Time Series Get ERROR:');
        console.log(err);
      })
    },

    formatSensorTime(){
      this.sensorTime.forEach(
        (entry, index, arr) => {
          entry.dateCollected = Date.parse(entry.dataCollectedDate);
          entry.reliability = Number(entry.reliability);
        }
      )
    },

    buildReliabilityChart(){
        Highcharts.chart('reliabilityChart', {
        xAxis: {
            enabled:true,
            type: 'datetime'
        },
        yAxis: {
            enabled:true
        },
        title: {
            text: 'Scatter plot with regression line'
        },
        series: [//{
        //     type: 'line',
        //     name: 'Regression Line',
        //     data: [[0, 1.11], [5, 4.51]],
        //     marker: {
        //         enabled: false
        //     },
        //     states: {
        //         hover: {
        //             lineWidth: 0
        //         }
        //     },
        //     enableMouseTracking: false
        // },
        {
            type: 'scatter',
            name: 'Observations',
            data: kpiReliabilityApp.sensorTime.map( entry=>
              [entry.dateCollected, entry.reliability]
            ),
            marker: {
                radius: 4
            }
        }]
    });
    }
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
