var clientApp = new Vue({
  el: '#clientVue',
  data: {
    client: [ ],
    clientForm: { },
    clientService: [ ],
    commentForm: { }
  },

  methods: {
    handleCommentForm(e) {
      e.preventDefault();

      const s = JSON.stringify(this.commentForm);

      fetch('api/clientService.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s
      })
      .then( response => response.json() )
      .then( json => {this.clientService.push(json)})
      .catch( err => {
        console.error('POST ERROR:');
        console.error(err);
      })

      this.commentForm = this.getEmptyCommentForm();
    },

    getEmptyCommentForm() {
      return {
        comment: null
        }
      }
    },


  created() {

    this.clientForm = this.getEmptyCommentForm();

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
