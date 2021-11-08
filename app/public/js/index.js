
const refApp = {
    data() {
      return {
        referees: [],
        selectedReferee: null,
        games: [],
        gameForm: {},
        selectedGame: null
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectReferee(r) {
            if (r == this.selectedReferee) {
                return;
            }
            this.selectedReferee = r;
            this.games = [];
            this.fetchGameData(this.selectedReferee);
        },
        fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchGameData(g) {
            console.log("Fetching game data for ", g);
            fetch('/api/game/?referee=' + g.ref_id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.offers = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postGame(evt) {
          if (this.selectedOffer === null) {
              this.postNewOffer(evt);
          } else {
              this.postEditOffer(evt);
          }
        },
        postNewGame(evt) {
          fetch('api/game/create.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              this.resetGameForm();
            });
        },
        postEditGame(evt) {
          fetch('api/game/update.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              this.resetGameForm();
            });
        },
        postDeleteGame(g) {
          if (!confirm("Are you sure you want to delete the offer from "+g.game_id+"?")) {
              return;
          }
          
          fetch('api/game/delete.php', {
              method:'POST',
              body: JSON.stringify(g),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              this.resetGameForm();
            });
        },
        selectGame(g) {
          this.selectedGame = g;
          this.gameForm = Object.assign({}, this.selectedGame);
        },
        resetGameForm() {
          this.selectedGame = null;
          this.gameForm = {};
        }
    },
    created() {
        this.fetchRefereetData();
    }
  
  }
  
  Vue.createApp(refApp).mount('#refApp');