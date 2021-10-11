<template>
  <div class="card-deck">
    <div class="card">
      <div class="card-body">
        <b-icon icon="briefcase-fill" font-scale="2"></b-icon>
        <h3 class="card-title">{{ company.name }}</h3>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <b-icon icon="envelope-fill" font-scale="2"></b-icon>
        <h3 class="card-title">{{ company.contact.email }}</h3>
        <b-icon icon="telephone-fill" font-scale="2"></b-icon>
        <h3 class="card-title">{{ company.contact.phone }}</h3>
        <b-icon icon="tag-fill" font-scale="2"></b-icon>
        <h3 class="card-title">{{ company.category }}</h3>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <span @mouseover="hover = true" @mouseleave="hover = false">
          <b-icon icon="geo-alt-fill" font-scale="2"></b-icon>
        </span>
        <span v-if="hover">
          <h3>{{ company.address.street }}</h3>
        </span>
        <span v-if="hover">
          <h3>{{ company.address.number }}</h3>
        </span>
        <span v-if="hover">
          <h3>{{ company.address.postcode }}</h3>
        </span>
        <span v-if="hover">
          <h3>{{ company.address.city }}</h3>
        </span>
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
form {
  max-width: 800px;
  margin: 30px auto;
  background: #343633;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: black;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.9em;
  text-transform: uppercase;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  color: rgb(255, 250, 250);
}
.card-body {
  background: #343633;
  color: white;
}
.card-deck {
  margin: 50px auto;
  background: #f7fff1;
  text-align: center;
  padding: 40px;
  border-radius: 5px;
}
</style>
