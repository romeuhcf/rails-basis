import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
Vue.use(Vuex);


function snoozable(sensor){
  if (sensor.status == 'success') {return false}
  if (!sensor.snoozed_until){ return false };
  var snoozed_until = moment(sensor.snoozed_until);
  var now = moment()
  console.log(snoozed_until, now, snoozed_until > now)
  return snoozed_until < now;
}

export default new Vuex.Store({
  state: {
    sensors: []
  },
  getters: {
    allSensors(state){
      return state.sensors;
    },
    problematicSensors(state){
      return state.sensors.filter(sensor => snoozable(sensor) )
    }
  },
  mutations: { //setters but not async
    onSensorCreated(state, sensor){
      state.sensors.push(sensor)
    },
    onSensorUpdated(state, sensor){
      var idx = state.sensors.findIndex(s => s.id == sensor.id);
      if (idx >= 0){
        Vue.set(state.sensors, idx, sensor)
      }
    },
    onSensorDestroyed(state, sensor){
      var idx = state.sensors.findIndex(s => s.id == sensor.id);
      if (idx >= 0){
        state.sensors.splice(idx, 1)
      }
    }

  },
  actions: {
    fetchSensors(context) {
      axios.get('/sensors')
        .then(ret => ret.data.forEach(s => this.commit('onSensorCreated', s)))
    },
    snooze(context, sensorId) {
      axios.post(`/sensors/${sensorId}/snooze` );
    },
  }
});
