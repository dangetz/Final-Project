var clientApp = new Vue({
  el: '#clientVue',
  data: {
    client: [ ],
    clientForm: { },
  },

  methods: {
    handleClientForm(e) {
      e.preventDefault();

      const s = JSON.stringify(this.clientForm);

      fetch('api/client.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s
      })
      .then( response => response.json() )
      .then( json => {this.client.push(json)})
      .catch( err => {
        console.error('POST ERROR:');
        console.error(err);
      })

      this.clientForm = this.getEmptyClientForm();
    },

    getEmptyClientForm() {
      return {
        comment: null
        }
      },
    },


  created() {

    //this.clientForm = this.getEmptyClientForm();

    console.log('IS THIS BEING CALLED');

    fetch('api/client.php')
    .then( response => response.json() )
    .then( json => {clientApp.client = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  }
})
