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
        tooltip: {
          enabled:true,
          formatter: function () {
            return 'Reliability rate was ' + this.y + ' ';
          },
        },
        title: {
            text: ''
        },
        series: [//{
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
