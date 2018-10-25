var siteApp = new Vue({
  el: '#siteVue',
  data: {
    site: [ ],

  },



  created() {



    fetch('api/site.php')
    .then( response => response.json() )
    .then( json => {siteApp.site = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  }
})
