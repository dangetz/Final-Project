var siteApp = new Vue({
  el: '#siteVue',
  data: {
    site: [ ],
    siteForm: { },
  },

  methods: {
    handleSiteForm(e) {
      e.preventDefault();

      const s = JSON.stringify(this.siteForm);

      fetch('api/site.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s
      })
      .then( response => response.json() )
      .then( json => {this.site.push(json)})
      .catch( err => {
        console.error('POST ERROR:');
        console.error(err);
      })

      this.siteForm = this.getEmptyClientForm();
    },

    getEmptySitesForm() {
      return {
        comment: null
        }
      },
    },


  created() {

    this.siteForm = this.getEmptySiteForm();

    console.log('IS THIS BEING CALLED');

    fetch('api/client.php')
    .then( response => response.json() )
    .then( json => {siteApp.site = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  }
})
