<template>
  <div :class="styleSet()" :style="{display: display}">
    <span class="title">[{{sensor.status}}] {{sensor.title}}     <span class="source">@ {{sensor.source}}</span>
</span>
    <button v-if="snoozable()" @click="snooze" style="float:right">Soneca ⏰</button>

    <span style="float: right;font-size:1.3em;" v-if="snoozed()">💤</span>
    <span v-if="sensor.ephemeral" class="ephemeral">📌</span>
    
    
    <span v-else>
      <span v-if="isOld()">💔</span>
      <span v-else>💓</span>
    </span>
    <span class="updated_at">{{moment(sensor.updated_at).fromNow()}}</span>
    <span class="value">{{sensor.value }}</span>
    <span class="message">{{sensor.message}}</span>

  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['sensor','display'],
  data: function(){  
    return {
      ticker: Date.now()
    } //to auto re-render
  },
  mounted: function() {
        var self = this;

        setInterval(function() {//to auto re-render
            self.ticker = Date.now(); 

        }, 10000);
    },
  methods: {
    styleSet:function() {
      var status = this.sensor.status;
      var styles = [status]
      if (this.dead()) { styles.push('dead') }
      if (this.snoozed()) { styles.push('snoozed') }

      return styles
    }, 
    value: function(){
      this.sensor.value;
    },
    status:function(){
      return this.sensor.style;
    },
    isOld: function(){
      this.ticker;
      var sensorBirth = this.moment(this.sensor.updated_at);
      var oldBirth = this.moment().subtract(600, 'seconds');
      
      return sensorBirth < oldBirth;
    },
    dead:function(){
      if (this.sensor.ephemeral){
        return false;
      }else{
        return this.isOld();
      }
    },
    moment(...args){
       return moment(...args);
    },
    snoozed:function(){
      if (this.isOK()){return false}
      if (!this.sensor.snoozed_until){ return false };
      var snoozed_until = moment(this.sensor.snoozed_until);
      var now = moment()
      return snoozed_until > now;
    },
    snoozable(){
      return !(this.isOK() || this.snoozed());
    },
    isOK(){
      return this.sensor.status == 'success'
    },
    snooze(){
      this.$store.dispatch("snooze", this.sensor.id)

    },
 
  }
}
</script>

<style scoped>
div {
  font-family: Arial, Helvetica, sans-serif;
  
  border: 1px solid #ccc;
  border-left: lightgreen solid 10px;
  background-color: #eeffee;
  margin: 4px;
  padding: 4px 4px 4px 4px;
}
.title{
  display: block;
  font-weight: bold
}

.value{
  max-width:40px;
  display: inline;
  overflow: hidden;
  text-overflow: ellipsis;
}

.source{

  font-weight: bold;
  color: #444;
}

.status{
}

.warning {
  border-color:rgb(236, 185, 44);
  background-color: #ffffee;
}

.critical {
  border-color:red ;
  background-color: rgb(247, 199, 199) ;
}
.unknown {
  border-color:mediumslateblue ;
  background-image: linear-gradient(rgb(248, 218, 118), mediumslateblue);
}


.dead {
  border-color: black;
     background-image: linear-gradient(rgb(231, 175, 91), rgb(255, 255, 196));

}

.snoozed {
  background-color:#eee;
     background-image: linear-gradient(rgb(255,255,255), rgb(240, 240, 255));
}

.message{
  font-style: italic;
}
</style>
