var turbinesApp = new Vue({
  el: '#turbinesVue',
  data: {
    turbines: [ ],

  },



  created() {

    const url = new URL(window.location.href);
    console.log(url);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Site: ' + turbineDeployedId);
    this.siteId = turbineDeployedId;

    fetch('api/turbineDeployed.php?siteId=' + turbineDeployedId)
    .then( response => response.json() )
    .then( json => {turbinesApp.turbines = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  },
  methods: {
  goToMetrics(tid) {
    window.location ='metrics.html?siteId=' + tid;
  }
}
})
