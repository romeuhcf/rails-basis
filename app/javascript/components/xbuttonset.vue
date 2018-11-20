<template>
  <div>
    <button @click="addButton" >+</button>
    <XButton v-for="button in buttons" :key="button.a" :button="button"></XButton>
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
      buttons: "allButtons"
    })
  },
  methods: {
    addButton() {
      var value = prompt('title');
      this.$store.dispatch('addButton', value);
      //        ButtonManager.addButton({title: value})
    }
  },
  created () {
    this.$store.dispatch('fetchButtons')
    const received = data => this.$store.dispatch('onButtonCreated', data)
    this._channel = this.$cable.subscriptions.create({ channel: "ButtonsChannel" }, { received: received })

  },
  components: {
    XButton
  }
}
</script>
