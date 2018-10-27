var metricsApp = new Vue({
  el: '#metricsVue',
  data: {
    metrics: [ ],

  },



  created() {



    fetch('api/metrics.php')
    .then( response => response.json() )
    .then( json => {metricsApp.metrics = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  },
  
  }
)
