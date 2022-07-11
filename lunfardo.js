const App = new Vue({
    el: '#app',
    data: {
      placeholder: 'Buscá che...',
      searchQuery: '',
      wordsJson: {
          'word_1': { "title": "sonamos", "description": "pop. ¡Estamos perdidos!"},
          'word_2': { "title": "percanta", "description": "(pop.) Mujer (LCV.), amante (LCV.), querida (LCV.), concubina."},
          'word_3': { "title": "antro", "description": "Local, establecimiento, vivienda, etc., de mal aspecto o mala reputación."},
          'word_4': { "title": "caverna", "description": "Sinónimo de antro/bar; o de los aposentos humildes."},
          'word_5': { "title": "covacha", "description": "Vivienda, casa, o aposento pobre, incómodo, oscuro, pequeño."},
          'word_6': { "title": "lenocínio", "description": "Acción de servir de intermediario en las relaciones sexuales de una pareja. Oficio de alcahuete. Una casa de lenocinio es una casa de prostitución."},
          'word_7': { "title": "boliche", "description": "Bar (Uruguay)."},
          'word_8': { "title": "trastornado", "description": "Loco, rayado."},
          'word_9': { "title": "rayado", "description": "Loco."},
          'word_10': { "title": "malandra", "description": "Delincuente."},
          'word_11': { "title": "punga", "description": "Robo en que el ladrón saca los objetos del bolsillo del robado. Pungista es el que se dedica a este oficio."},
          'word_12': { "title": "escrucho", "description": "Robo en que el ladrón entra a una casa o edificio para hacer el trabajo. Escruchante es el que se dedica a este oficio."},
          'word_13': { "title": "banquina", "description": "Término que usaban los obreros genoveses que construyeron las rutas para llamar al arcén (margen lateral de una carretera)."},
          'word_14': { "title": "macanudo", "description": "(pop.) Hermoso (LS), soberbio (LS), algo espléndido (LCV.), muy superior (LCV.), muy bueno (TG.), excelente (TG.), magnífico (TG.), óptimo, extraordinario, estupendo/ amable/ generoso, liberal."},
          'word_15': { "title": "camorra", "description": "(pop.) Pendencia, pelea, riña, gresca, discusión."},
          'word_16': { "title": "a gatas", "description": "a duras penas, con dificultad."},
          'word_17': { "title": "abombado", "description": "adj. Arg., C. Rica, Nic., R. Dom. y Ur. Tonto, falto o escaso de entendimiento o razón. U. t. c. s."},
          'word_18': { "title": "abombado", "description": "vulg. Arg., Bol. y Ur. Morir o padecer una enfermedad mortal. Fulano sonó. Nuestro amigo está sonado."},
          'word_19': { "title": "(terminar) encuneteado", "description": "Terminar muerto (Nicolás)."},
          'word_20': { "title": "(hacer la) fajina", "description": "las tareas ('innobles') de mantenimiento, diarias."},
          'word_21': { "title": "malevo", "description": "Maleante, malhechor. De hábitos vulgares, propio de los arrabales."},
          'word_21': { "title": "rastrillo", "description": "El que roba al quién está desprevenido, o en mal estado. Ladronzuelo de poca monta."},
          'word_22': { "title": "porfiado, da", "description": "adj. Dicho de una persona terca y obstinada."},
          'word_23': { "title": "ratero", "description": "Dicho de un ladrón: Que hurta con maña y cautela cosas de poco valor."},
          'word_24': { "title": "ciruja / cirujano / cirujear", "description": "Rescatar algo dela basura de los otros."},
          'word_25': { "title": "compadrito", "description": "en general, hombre provocador, jactancioso y pendenciero. 'compadrito se llamaba al joven de condición social modesta que habitaba en las orillas de la ciudad... algo así como un gaucho que hubiera desensillado'."},
          'word_26': { "title": "orillero / arrabalero", "description": "[persona] Que habita en las orillas o parte extrema de un pueblo."},
          'word_27': { "title": "pendenciero", "description": "Propenso a riñas o pendencias."},
          'word_28': { "title": "hampón", "description": "Marginal que se dedica al delito organizado."},
          'word_29': { "title": "marginal", "description": "Que vive o actúa de modo voluntario o forzoso, fuera de las normas sociales admitidas."},
          'word_30': { "title": "", "description": "Descuidista, carterista."},
          'word_31': { "title": "(un) mareado", "description": "Borracho."},
          'word_32': { "title": "ventajero / garronero", "description": "Que saca ventaja ilícitamente."},
          'word_33': { "title": "comeorejas", "description": "Persona con facilidad para incitar a otro a hacer o a convencerlo de algo."},
          'word_34': { "title": "cara rota", "description": "Sin vergüenza."},
          'word_35': { "title": "chúcaro", "description": "Rebelde, solitario."}
  
  
  
  
  
  
  
      }
    },
    methods:{
      matches(obj) {
        const term = this.searchQuery.toLowerCase();
        return obj.title.toLowerCase().includes(term) || obj.description.toLowerCase().includes(term);
      }
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
              //
              // const matchingSubcats = Object.values(v.subcats)
              //   .filter((v) => this.matches(v));
              //
              // if (matchingSubcats.length > 0) {
              //   return Object.assign({}, v, {subcats: matchingSubcats});
              // }
            })
            .filter((v) => v);
        }
    }
  })
  
  (function($) {
    // menu escape function
    setTimeout(function(){
      $(document).unbind('keyup');
    },1000)
  })( jQuery );
  