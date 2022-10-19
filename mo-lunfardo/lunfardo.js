// Runs at https://minimo.io/diccionario-de-lunfardo-2020062059/, loaded via jsdelivr (fetched from Github)
// @minimo-io
// v.0.1

const App = Vue.createApp({
  data(){
    return {
      placeholder: 'Buscá che...',
      searchQuery: '',
      wordsJson: []
    }
  },
  methods:{
    matches(obj) {
      const term = this.searchQuery.toLowerCase();
      
      //return obj.t.toLowerCase().includes(term) || obj.d.toLowerCase().includes(term);
      // search only on terms not descriptions for it not to be so messy
      return obj.t.toLowerCase().includes(term);
    }
  },

  async mounted(){
    const res = await fetch("https://cdn.jsdelivr.net/gh/minimo-io/appticles@v0.0.2-3/mo-lunfardo/data/lunfardo-dict-es.json");
    // const res = await fetch("tools/dicc.json");
    // const res = await fetch("data/lunfardo-dict-es.json");
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
          return this.listValues.slice(0, 50);
        }
        return this.listValues
          .map((v) => {
            if (this.matches(v)) {
              return v;
            }
          })
          .filter((v) => v);
      }
    },

  }).mount("#app");


  