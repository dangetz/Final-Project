var sensorApp = new Vue({
  el: '#sensorVue',
  data: {
    sensorData: [ ],

  },



  created() {



    fetch('api/turbineKpis.php')
    .then( response => response.json() )
    .then( json => {sensorApp.sensorData = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  },

  }
)
