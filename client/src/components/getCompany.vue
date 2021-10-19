<template>
  <div>
    <div class="card-deck" id="container">
      <div class="card" id="card">
        <div class="card-body">
          <b-icon icon="briefcase-fill" font-scale="2" id="icon"></b-icon>
          <h3 class="card-title text-info">{{ company.name }}</h3>
          <b-icon icon="tag-fill" font-scale="2" id="icon"></b-icon>
          <h4 class="card-title">{{ company.category }}</h4>
        </div>
      </div>
      <div class="card" id="card">
        <div class="card-body">
          <b-icon icon="envelope-fill" font-scale="2" id="icon"></b-icon>
          <h3 class="card-title">{{ company.contact.email }}</h3>
          <b-icon icon="telephone-fill" font-scale="2" id="icon"></b-icon>
          <h3 class="card-title">{{ company.contact.phone }}</h3>
        </div>
      </div>
      <div class="card" id="card">
        <div class="card-body">
          <span @mouseover="hover = true" @mouseleave="hover = false">
            <b-icon icon="geo-alt-fill" font-scale="2" id="icon"></b-icon>
          </span>
          <span v-if="hover" id="hover-position">
            <h5>{{ company.position.lat }}</h5>
            <h5>{{ company.position.lng }}</h5>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'company',
  props: ['company'],
  data() {
    return {
      hover: false
    }
  }
}
</script>
<style>
.card-body {
  background: #2b3133;
  color: white;
}
#card {
  border: none;
}
#container {
  margin: 5px 40px;
  background: #1b8391;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}
#icon {
  margin-bottom: 10px;
  height: 11%;
}
</style>
