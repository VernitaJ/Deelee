<template>
  <div>
    <div>
      <gmap-autocomplete
        class="input-pan-to"
        @place_changed="initMarker"
      ></gmap-autocomplete>
      <button @click="panTo">Go to</button>
      <br />
    </div>
    <br />
    <GmapMap
      ref="mapRef"
      :zoom="15"
      :center="center"
      :clickable="true"
      map-type-id="roadmap"
      style="width: 80%; height: 900px; margin-left: 5em; margin-top: 0"
    >
      <GmapMarker
        :key="index"
        v-for="(deal, index) in deals"
        :position="deal.position"
        @click="toggleWindow(index)"
       :icon="findIcon(deal)"
      >
        <gmap-info-window
          :options="{
            maxWidth: 300,
            pixelOffset: { width: 0, height: 0 },
            content: setContent(deal)
          }"
          :position="infoWindow.position"
          :opened="infoWindow.open === index"
        >
          <div v-html="infoWindow.template"></div>
        </gmap-info-window>
      </GmapMarker>
    </GmapMap>
    <div v-if="adding">
      <add-deal
        v-bind:position="position"
        v-bind:adding="adding"
        v-bind:user="user"
        @toggle="toggle()"
      />
    </div>
  </div>
</template>

<script>
import { gmapApi } from 'gmap-vue'
import AddDeal from './addDeal.vue'

export default {
  components: {
    AddDeal
  },
  computed: {
    google: gmapApi
  },
  name: 'GoogleMap',
  props: {
    deals: Array,
    user: String
  },
  data: function () {
    return {
      map: null,
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      adding: false,
      infoWindow: {
        open: false,
        content: ''
      },
      position: {
        lat: 0,
        lng: 0
      },
      locationMarkers: [
        {
          position: {
            lat: 57.70697,
            lng: 11.93802
          },
          text: 'This'
        }
      ],
      locPlaces: [],
      existingPlace: null
    }
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map
      this.initMap()
    })
    this.locateGeoLocation()
  },
  methods: {
    findIcon(deal) {
      if (deal.category === 'Clothes') {
        return '/images/icon-purple.png'
      } else {
        console.log(deal.category)
        return '/images/icon-orange.png'
      }
    },
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
        this.locPlaces.push(this.existingPlace)
        this.center = marker
        this.existingPlace = null
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      })
    },
    toggleWindow(index) {
      this.infoWindow.open = this.infoWindow.open === index ? null : index
    },
    toggle() {
      this.adding = false
      this.$emit('toggle', {})
    },
    setContent(deal) {
      this.content = `<div class="info-content">
                      <a href="deals/${deal._id}">${deal.name}</a>
                      <div>${deal.category}</div>
                      <img src="https://picsum.photos/200" class="infowindow-img">
                      </div>`
      return this.content
    },
    addAMarker() {
      console.log('position', this.position)
      this.router.push({ name: 'user', params: { position: this.position } })
    },
    initMap() {
      // Configure the click listener.
      this.map.addListener('click', (mapsMouseEvent) => {
        this.position = mapsMouseEvent.latLng
        this.adding = !this.adding
      })
    }
  }
}
</script>

<style>
.info-content {
  margin: 5px;
  padding: 2px;
  color: whitesmoke;
  background-color: rgb(25, 131, 145);
  border-radius: 5px;
}
.input-pan-to {
  width: 200px;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 0;
}
.infowindow-img {
  width: 30%;
}
.logo {
  width: 35vh;
  height: 35vh;
}
</style>
