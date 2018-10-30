var kpiCompressorApp = new Vue({
  el: '#kpiCompressor',
  data: {

    sensorTime: [],

  },

  methods:{
    fetchSensorTime (turbineDeployedId){
      fetch('api/metrics.php?turbineDeployedId='+turbineDeployedId)
      .then( response => response.json() )
      .then( json => {
        kpiCompressorApp.sensorTime = json;
        kpiCompressorApp.formatSensorTime();
        kpiCompressorApp.buildCompressorChart();
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
          entry.compressorEfficiency = Number(entry.compressorEfficiency);
        }
      )
    },



    //Output Chart
    buildCompressorChart() {
      //var dataArray = [];

    //  kpiCompressorApp.sensorTime.map( entry=>
      //  [entry.dateCollected, entry.compressorEfficiency]

       Highcharts.chart('compressorChart', {
           chart: {
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
               name: 'Efficiency',
               data: kpiCompressorApp.sensorTime.map( entry=>
                 [entry.dateCollected, entry.compressorEfficiency]
               )
           }]
       });
     },
  },

  created () {

    // Do data fetch
    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log(this.sensorTime);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTime(turbineDeployedId);



  }
})
