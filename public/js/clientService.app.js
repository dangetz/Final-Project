var clientServiceApp = new Vue({
  el: '#clientServiceVue',
  data: {
    clientService: [ ],
    commentForm: { },
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
      },
    },


  created() {

    this.commentForm = this.getEmptyCommentForm();

    console.log('IS THIS BEING CALLED');

    fetch('api/clientService.php')
    .then( response => response.json() )
    .then( json => {clientServiceApp.clientService = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  }
})
