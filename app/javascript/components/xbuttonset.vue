<template>
  <div>
    <button v-if="display == 'block'" @click="display = 'inline-block'" >Grid</button>
    <button v-else @click="display = 'block' ">Lista</button>
    <hr/>
    <XButton v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" :display="display"></XButton>
  </div>
</template>

<script>
import XButton from 'components/xbutton'
import {mapGetters} from 'vuex'

export default {
  data: function(){
    return {
      display: 'block'
    }
  },
  computed: {
    ...mapGetters({
      sensors: "allSensors"
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
