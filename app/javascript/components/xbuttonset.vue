<template>
  <div>
    <button v-if="display == 'block'" @click="display = 'inline-block'" >Grid</button>
    <button v-else @click="display = 'block' ">Lista</button>


    <button v-if="badOnly" @click="badOnly= false" >Todos</button>
    <button v-if="!badOnly" @click="badOnly= true" >Problemas</button>
    <hr/>
    <XButton v-if="badOnly" v-for="sensor in badSensors" :key="'B' + sensor.id" :sensor="sensor" :display="display"></XButton>
    <XButton v-if="!badOnly" v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" :display="display"></XButton>
  </div>
</template>

<script>
import XButton from 'components/xbutton'
import {mapGetters} from 'vuex'

export default {
  data: function(){
    return {
      display: 'block',
      badOnly: false,
    }
  },
  computed: {
    ...mapGetters({
      sensors: "allSensors",
      badSensors: "problematicSensors"
    })
  },
  methods: {
    addSensor() {
      var value = prompt('title');
      this.$store.commit('addSensor', {title: value});
    },
    
  },
  created () {
    this.$store.dispatch('fetchSensors')
    const received = data => this.$store.commit(data.event, data.sensor)
    this._channel = this.$cable.subscriptions.create({ channel: "SensorsChannel" }, { received: received })
  },
  components: {
    XButton
  }
}
</script>
