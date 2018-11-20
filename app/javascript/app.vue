<template>
  <div id="app">
    <p>{{ message }}</p>
    <XButtonSet/>
  </div>
</template>

<script>
console.log("importing app.vue")
import XButtonSet from 'components/xbuttonset'
export default {
  data: function () {
    return {
      message: "Hello Vueee!"
    }
  },
  components: {
    XButtonSet
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
