var kpiAvailabilityApp = new Vue({
  el: '#kpiAvailability',
  data: {

    sensorTime: [],

  },

  methods:{
    fetchSensorTime (turbineDeployedId){
      fetch('api/metrics.php?turbineDeployedId='+turbineDeployedId)
      .then( response => response.json() )
      .then( json => {
        kpiAvailabilityApp.sensorTime = json;
        kpiAvailabilityApp.formatSensorTime();
        kpiAvailabilityApp.buildAvailabilityChart();
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
          entry.availability = Number(entry.availability);
        }
      )
    },

    buildAvailabilityChart(){
        Highcharts.chart('availabilityChart', {
        xAxis: {
            enabled:true,
            type: 'datetime'
        },
        yAxis: {
            enabled:true
        },
        title: {
            text: ''
        },
        tooltip: {
          enabled:true,
          formatter: function () {
<<<<<<< HEAD
            return 'Avability rate is ' + this.y;
=======
            return 'Avability rate is ' + this.y + ' on date ' + this.x;
>>>>>>> f515fad15fa4403150dd0664de89c5337e252c12
          },
        },
        series: [
        {
            type: 'scatter',
            name: 'Observations',
            data: kpiAvailabilityApp.sensorTime.map( entry=>
              [entry.dateCollected, entry.availability]
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
