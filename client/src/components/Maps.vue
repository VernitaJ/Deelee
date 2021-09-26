<template>
  <div>
    <div>
      <h2>Vue Js Search and Add Marker</h2>

      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>

        <button @click="addLocationMarker">Add</button>
      </label>
      <br/>
    </div>
    <br>
    <ul v-for="deal in deals" :key="deal.name">
      {{ deal.name }}
  </ul>
    <gmap-map
        :zoom="14"
        :center="center"
        style="width:100%;  height: 600px;"
      >
      <gmap-marker
        icon="https://img.icons8.com/color/48/000000/map-pin.png"
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="toggleWindow(index)"
      >
        <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: 0 },
          content: infoWindow.content,
        }"
        :position="infoWindow.position"
        :opened="infoWindow.open === index"
        >
        <div v-html="infoWindow.template"></div>
    </gmap-info-window>
     <gmap-info-window :opened="true"
                         :options="{
                            pixelOffset: { width: 0, height: 0 },
                            content: `<b>Destination Address <br>
                            ${m.position.lat} , ${m.position.lng}</b>`,
                          }"
        ></gmap-info-window>
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: ['deals'],
  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      infoWindow: {
        open: false,
        content: '<img src="https://ik.imagekit.io/ikmedia/women-dress-2.jpg" width="150" height="200">'
      },
      locationMarkers: [{
        position: {
          lat: 57.706970,
          lng: 11.938020
        },
        text: 'This'
      }],
      locPlaces: [],
      existingPlace: null
    }
  },

  mounted() {
    this.locateGeoLocation()
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        }
        this.locationMarkers.push({ position: marker })
        this.locPlaces.push(this.existingPlace)
        this.center = marker
        this.existingPlace = null
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      })
    },
    toggleWindow(index) {
      this.infoWindow.open = this.infoWindow.open === index ? null : index
    }
  }
}
</script>
