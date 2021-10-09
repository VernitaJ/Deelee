<template>
  <div>
    <h4 class="heading">New company</h4>

    <div class="addcompanycontainer">
      <div class="form-item">
        <label class="label"> Name </label>
        <input class="input" type="text" v-model="name" placeholder="name" />
      </div>

      <div class="form-item">
        <label class="label"> Contact </label>
        <input
          class="input"
          type="text"
          v-model="contact.email"
          placeholder="email"
        />
        <input
          class="input"
          type="text"
          v-model="contact.phone"
          placeholder="phone"
        />
      </div>
      <div class="form-item">
        <label class="label"> Category </label>
        <input
          class="input"
          type="text"
          v-model="category"
          placeholder="category"
        />
      </div>
      <button @click.prevent="createCompany" class="btn btn-primary btn-block">
        ADD
      </button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'company',
  props: {
    position: Object,
    show: Boolean
  },
  data() {
    return {
      name: '',
      address: {
        street: '',
        number: '',
        postcode: '',
        city: ''
      },
      contact: {
        email: '',
        phone: ''
      },
      category: '',
      deals: '',
      company_id: ''
    }
  },
  methods: {
    createCompany() {
      const newCompany = {
        name: this.name,
        email: this.contact.email,
        phone: this.contact.phone,
        category: this.category,
        position: this.position
      }
      Api.post('/companies', newCompany)
        .then((response) => {
          this.company_id = response.data._id
          this.$emit('setChanges', this.company_id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.company-heading {
  margin-top: 20px;
  color: white;
}
.btn-primary {
  margin-bottom: 1em;
  text-align: center;
}
</style>
