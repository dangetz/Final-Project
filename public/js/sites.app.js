var siteApp = new Vue({
  el: '#siteVue',
  data: {
    site: [],
    siteSpecific: [],
    turbine: [],
    showTurbine: false,
    showSite: false, //default value is false

  },

  created() {

    fetch('api/site.php')
    .then( response => response.json() )
    .then( json => {siteApp.site = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
    // sets the URL, fetches the data
    const url = new URL(window.location.href);
    const siteId  = url.searchParams.get('siteId');
    console.log('Site ' + siteId);
    this.siteId = siteId;

    fetch('api/siteSpecific.php?siteId='+siteId)
    .then( response=> response.json() )
    .then(json=>{
      siteApp.siteView = json;
      siteApp.showSite = true;
    })

    fetch('api/turbineDeployed.php?siteId='+siteId)
    .then( response=> response.json() )
    .then(json=>{
      siteApp.turbine = json;
      siteApp.showTurbine = true;
    })
  },
  methods: {
  goToSite(sid){
    window.location ='turbinesDeployed.html?siteId=' + sid;
  }
}}
)
