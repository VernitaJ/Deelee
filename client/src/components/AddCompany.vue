<template>
  <div>
    <h4 class="company-heading">New company</h4>

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
        <label class="label">Category</label>
        <b-form-select
          v-model="category"
          :options="categoryList"
          size="sm"
          class="input"
          placeholder="Category"
        ></b-form-select>
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
      company_id: '',
      categoryList: [
        { value: null, text: 'Please select an option' },
        { value: 'Restaurant', text: 'Restaurant' },
        { value: 'Pub', text: 'Pub' },
        { value: 'Clothing store', text: 'Clothing store' },
        { value: 'Grocery store', text: 'Grocery store' }
      ]
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
  margin: 20px 0 0 20px;
  color: rgb(57, 171, 175);
}
.btn-primary {
  margin-bottom: 1em;
  text-align: center;
}
</style>
