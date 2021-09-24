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
    <GmapMap
      :zoom="14"
      :center="center"
      :streetViewControl=false
      style="width:100%;  height: 600px;"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'AddGoogleMap',
  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [{ lat: 0, lng: 0 }, { lat: 4, lng: 4 }, { lat: 10, lng: 10 }, { lat: 20, lng: 20 }],
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
    }
  }
}
</script>
