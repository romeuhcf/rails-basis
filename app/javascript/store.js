import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    buttons: [{a: 1}, {a: 2}]
  },
  getters: {
    allButtons(state){
      return state.buttons;
    }
  },
  mutations: { //setters but not async
    addButton(state, title){
      state.buttons.push({a: title})
    }
  },
  actions: {
    //addButton(context, title) {
    // context.commit('addButton', title);
    //},
    fetchButtons(context) {},
    addButton({commit}, title) {
      //      axios.post('/button', {title})
      // .then(function() {
          commit('addButton', title);
      // })
      //  .catch(function(e) { console.log(e) })
    }
  }
});
