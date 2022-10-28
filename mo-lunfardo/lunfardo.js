// Runs at https://minimo.io/diccionario-de-lunfardo-2020062059/, loaded via jsdelivr (fetched from Github)
// @minimo-io

const App = Vue.createApp({
  data(){
    return {
      placeholder: 'Buscá che...',
      searchQuery: '',
      noResults: false,
      showLoadMore: true,
      loadMoreSlice: 100,
      wordsJson: []
    }
  },
  methods:{
    matches(obj) {
      const term = this.searchQuery.toLowerCase();
      
      //return obj.t.toLowerCase().includes(term) || obj.d.toLowerCase().includes(term);
      // search only on terms not descriptions for it not to be so messy
      return obj.t.toLowerCase().includes(term);
    },
    loadMore(){
      this.loadMoreSlice += 100;

      if (this.loadMoreSlice >= this.wordsJson.length) this.showLoadMore = false;
    }
  },

  async mounted(){
    const res = await fetch("https://cdn.jsdelivr.net/gh/minimo-io/appticles@v0.0.2-7/mo-lunfardo/data/lunfardo-dict-es.json");
    //const res = await fetch("data/dicc-merged.json");
    // const res = await fetch("dart_tools/data/lunfardo-dict-es.json");
    this.wordsJson = await res.json();
    
  },
  
  computed:{
      listValues() {
        return Object.values(this.wordsJson);
      },
      countWords(){
        return Object.keys(this.wordsJson).length;
      },
      filteredList() {
        if (!this.searchQuery) {
          //return this.listValues.slice(0, 10);
          return this.listValues.slice(0, this.loadMoreSlice);
        }
        var filteredValues = this.listValues
        .map((v) => {
          if (this.matches(v)) {
            return v;
          }
        })
        .filter((v) => v);
        if (filteredValues.length <= 0) this.noResults = true;
        return filteredValues;
      }
    },

  }).mount("#app");


  