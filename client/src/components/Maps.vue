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
    <div>{{deals}}</div>
    <ul v-for="deal in deals" :key="deal.name">
      {{ deal.name }}
  </ul>
  <button v-on:click="initMap()"></button>
    <GmapMap
        ref="mapRef"
        :zoom="14"
        :center="center"
        :clickable="true"
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
    </GmapMap>
  </div>
</template>

<script>

import { gmapApi } from 'gmap-vue'

export default {
  computed: {
    google: gmapApi
  },
  name: 'GoogleMap',
  props: ['deals'],
  data: function () {
    return {
      map: null,
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      infoWindow: {
        open: false,
        content: '<img src="https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_217089/cf_259/smash_burger.jpg" width="150" height="200"><a href="http://localhost:8080/deals">DEALS</a>'
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
    this.$refs.mapRef.$mapPromise.then((map) => {
      console.log('this')
      this.map = map
    })
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
    },
    panning() {
      this.map.panTo({ lat: 1.38, lng: 103.80 })
    },
    initMap() {
      // info.open(this.map)
      // Configure the click listener.
      this.map.addListener('click', (mapsMouseEvent) => {
        // Close the current InfoWindow.
        // Create a new InfoWindow.
        const info = new this.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng
        })
        info.setContent(
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        )
        info.open(this.map)
      })
    }
  }
}

</script>
