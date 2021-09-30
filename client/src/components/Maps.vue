<template>
  <div>
    <div>
      <h2>Search</h2>
      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>
        <button @click="panTo">Go to</button>
      </label>
      <br/>
    </div>
    <br>
    <GmapMap
        ref="mapRef"
        :zoom="14"
        :center="center"
        :clickable="true"
        map-type-id= "roadmap"
        style="width:80%;  height: 500px;"
      >
      <gmap-marker
        icon="https://img.icons8.com/color/48/000000/map-pin.png"
        :key="index"
        v-for="(deal, index) in deals"
        :position="deal.position"
        @click="toggleWindow(index)"
      >
        <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: 0 },
          content: setContent(deal),
        }"
        :position="infoWindow.position"
        :opened="infoWindow.open === index"
        >
        <div v-html="infoWindow.template"></div>
        </gmap-info-window>
      </gmap-marker>
    </GmapMap>
  </div>
</template>

<script>

import { gmapApi } from 'gmap-vue'
import InfoContent from './infoContent.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    InfoContent
  },
  computed: {
    google: gmapApi
  },
  name: 'GoogleMap',
  props: ['deals'],
  data() {
    return {
      map: null,
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      infoWindow: {
        open: false,
        content: ''
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
      this.initMap()
    })
    this.locateGeoLocation()
  },
  methods: {
    initMarker(loc) {
      this.existingPlace = loc
    },
    panTo() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        }
        const latLng = new this.google.maps.LatLng(marker)
        this.map.panTo(latLng)
      }
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
    setContent(deal) {
      this.content = `<div>
                      <a href="http://localhost:8080/${deal._id}">${deal.name}</a>
                      <img src="https://picsum.photos/200">
                      </div>`
      return this.content
    },
    initMap() {
      // info.open(this.map)
      // Configure the click listener.
      this.map.addListener('click', (mapsMouseEvent) => {
        // Create a new InfoWindow.
        const info = new this.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng
        })
        info.setContent(
          `<button>
          <router-link to = "/add-deal">Router Link 1</router-link>
          </button>`
          // JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        )
        info.open(this.map)
      })
    }
  }
}

</script>
