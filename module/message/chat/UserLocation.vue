<template>
  <map
          class="map"
          id="map"
          :longitude="longitude"
          :latitude="latitude"
          :markers="markers"
          scale="18">
  </map>
</template>

<script>
  export default {
    name: "Map",

    data () {
      return {
        longitude: '113.324520',
        latitude: '23.099994',
        markers: [],
      }
    },

    onLoad (option) {
      this.longitude = option.longitude;
      this.latitude = option.latitude;
      this.markers.push({
        latitude: this.latitude,
        longitude: this.longitude,
        width: 32,
        height: 32,
        iconPath: '/static/chat/icon-location.png',
      })
    }

  }
</script>

<style scoped>

  .map {
    width: 100%;
    height: 100vh;
  }

</style>
