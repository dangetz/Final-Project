var selectApp = new Vue({
  el: '#dropDown',
  data: {
    siteName : '',
    selectedValue: null
  },
  mounted(){
    setTimeout(()=> this.filters = [Name1, Name2], 3000)
  }
})
