
const refApp = {
    data() {
      return {
        referees: [],
        refereeForm: {},
        selectedReferee: null,
        games: [],
        game: [],
        gameForm: {},
        selectedGame: null,
        assigned: [],
        assignForm: {},
        selectedAssign: null,
        reportOne: false
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
            fetch('/api/referee/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchGData() {
          fetch('/api/game/index.php')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.games = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
        },
        fetchGameData(g) {
            fetch('/api/game/?referee=' + g.ref_id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postReferee(evt) {
          if (this.selectedReferee === null) {
              this.postNewReferee(evt);
          } else {
              this.postEditReferee(evt);
          }
        },
        postNewReferee(evt) {
          fetch('api/referee/create.php', {
              method:'POST',
              body: JSON.stringify(this.refereeForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              this.resetRefereeForm();
              this.fetchRefereeData();
            });
        },
        postEditReferee(evt) {
          fetch('api/referee/update.php', {
              method:'POST',
              body: JSON.stringify(this.refereeForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              this.resetRefereeForm();
              this.fetchRefereeData();
            });
        },
        postDeleteReferee(ref) {
          if (!confirm("Are you sure you want to delete the referee from "+ref.ref_id+"?")) {
              return;
          }
          
          fetch('api/referee/delete.php', {
              method:'POST',
              body: JSON.stringify(ref),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              this.resetRefereeForm();
              this.fetchRefereeData();
            });
        },
        selectReferee(ref) {
          this.selectedReferee = ref;
          this.refereeForm = Object.assign({}, this.selectedReferee);
        },
        resetRefereeForm() {
          this.selectedReferee = null;
          this.refereeForm = {};
        },
        postGame(evt) {
          if (this.selectedGame === null) {
              this.postNewGame(evt);
          } else {
              this.postEditGame(evt);
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
              this.games = json;
              
              this.resetGameForm();
              this.fetchGData();
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
              this.games = json;
              
              this.resetGameForm();
              this.fetchGData();
            });
        },
        postDeleteGame(g) {
          if (!confirm("Are you sure you want to delete game "+g.game_id+"?")) {
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
              this.games = json;
              
              this.resetGameForm();
              this.fetchGData();
            });
        },
        selectGame(g) {
          this.selectedGame = g;
          this.gameForm = Object.assign({}, this.selectedGame);
        },
        resetGameForm() {
          this.selectedGame = null;
          this.gameForm = {};
        },
        fetchAssignData() {
          fetch('/api/assigned/index.php')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.assigned = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
        },
        postNewAssign(evt) {
          fetch('api/assigned/create.php', {
              method:'POST',
              body: JSON.stringify(this.assignForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              this.fetchAssignData();
              this.resetAssignForm();
            });
        },
        postDeleteAssign(as) {
          if (!confirm("Are you sure you want to decline the assignment?")) {
              return;
          }
          
          fetch('api/assigned/delete.php', {
              method:'POST',
              body: JSON.stringify(as),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assign = json;
              this.fetchAssignData();
              this.resetAssignForm();
            });
        },
        selectAssign(a) {
          this.selectedAssign = a;
          this.assignForm = Object.assign({}, this.selectedAssign);
        },
        resetAssignForm() {
          this.assignForm = {};
        },
        fetchReportsData() {
          fetch('/api/reports/?ref=' + this.refereeForm.ref_id + '&startDate=' + this.refereeForm.startDate + '&endDate=' + this.refereeForm.endDate)
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log( "assign data", responseJson);
              this.games = responseJson;
              this.reportOne = true;
          })
          .catch( (err) => {
              console.error(err);
          })
          .catch( (error) => {
              console.error(error);
          });
        },
        fetchRepData() {
          fetch('/api/reports/unassigned.php')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.game = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
          .catch( (error) => {
              console.error(error);
          });
        }
    },
    created() {
        this.fetchRefereeData();
        this.fetchGData();
        this.fetchAssignData();
        this.fetchRepData();
    }
  
  }
  
  Vue.createApp(refApp).mount('#refApp');