// Runs at https://minimo.io/diccionario-de-lunfardo-2020062059/, loaded via jsdelivr (fetched from Github)
// @minimo-io

const App = Vue.createApp({
  data(){
    return {
      placeholder: 'Buscá che...',
      searchQuery: '',
      wordsJson: {
        'word-1':  { "title": "sonamos", "description": "pop. ¡Estamos perdidos!"},
        'word-2': { "title": "percanta", "description": "(pop.) Mujer (LCV.), amante (LCV.), querida (LCV.), concubina."},
      }
    }
  },
  methods:{
    matches(obj) {
      const term = this.searchQuery.toLowerCase();
      return obj.title.toLowerCase().includes(term) || obj.description.toLowerCase().includes(term);
    }
  },

  mounted(){
      // const res = fetch("");

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
          return this.listValues;
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


  