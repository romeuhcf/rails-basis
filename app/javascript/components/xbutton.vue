<template>
  <div>button {{button.a}}</div>
</template>

<script>
console.log('importing button')  
export default {
    props: ['button']
  }
</script>
