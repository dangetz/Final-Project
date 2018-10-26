var turbinesApp = new Vue({
  el: '#turbinesVue',
  data: {
    turbines: [ ],

  },



  created() {



    fetch('api/turbineDeployed.php')
    .then( response => response.json() )
    .then( json => {turbinesApp.site = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  }
})
