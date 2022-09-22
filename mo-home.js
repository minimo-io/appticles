// Runs at minimo.io homepage, loaded via jsdelivr (fetched from Github)
// @minimo-io
jQuery(document).ready(function(){

  var READMORELANG, READLESSLANG;
  const app = Vue.createApp({
      data() {
          return {
              readMoreActive: false,
              readMoreText: "Leer más",
              readMoreIcon: "fa fa-arrow-right",
          }
      },
      mounted(){
          READMORELANG = jQuery(".readMoreBtn").data("readmorelang");
          READLESSLANG = jQuery(".readMoreBtn").data("readlesslang");


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

              jQuery(".d-none").toggle("fast", function(){
                  
              });


          }
      }
  })
  app.mount('#mo-home-vue-app')

});