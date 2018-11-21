<template>
  <div>
    <XButton v-for="sensor in sensors" :key="sensor.title" :sensor="sensor"></XButton>
  </div>
</template>

<script>
import XButton from 'components/xbutton'
import {mapGetters} from 'vuex'

export default {
  data: function(){
    return {
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
    }
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
