var turbinesApp = new Vue({
  el: '#turbinesVue',
  data: {
    turbines: [ ],

  },



  created() {

    const url = new URL(window.location.href);
    console.log(url);
    const siteId = url.searchParams.get('siteId');
    console.log('Site: ' + siteId);
    this.siteId = siteId;

    fetch('api/turbineDeployed.php?siteId=' + siteId)
    .then( response => response.json() )
    .then( json => {turbinesApp.turbines = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  },

  methods: {
    selectSite(sid) {
      window.location = 'site.html?siteId=' + sid;
    },
    selectTurbine(tid) {
      window.location = 'kpi.html?turbineDeployedId=' + tid;
    }
}
})
