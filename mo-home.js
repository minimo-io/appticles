// Runs at minimo.io homepage, loaded via jsdelivr (fetched from Github)
// @minimo-io
// v0.1

jQuery(document).ready(function(){
  var READMORELANG, READLESSLANG;
  const app = Vue.createApp({
      data() {
          return {
              readMoreActive: false,
              readMoreText: "-",
              readMoreIcon: "fa fa-arrow-right",
          }
      },
      mounted(){
          READMORELANG = jQuery(".readMoreBtn").data("readmorelang");
          READLESSLANG = jQuery(".readMoreBtn").data("readlesslang");
          this.readMoreText = READMORELANG;

      },
      methods:{
          readMore(){
              if (this.readMoreActive){
                  this.readMoreText = READMORELANG;
                  this.readMoreIcon = "fa fa-arrow-right";

              }else{
                  this.readMoreText = READLESSLANG;
                  this.readMoreIcon = "fa fa-minus";
              }
              this.readMoreActive = ! this.readMoreActive;

              jQuery(".profile-more").toggle("200", function(){
                  
              });


          }
      }
  })
  app.mount('#mo-home-vue-app')

});