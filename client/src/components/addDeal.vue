<template>
  <div class="overlay">
    <h1 class="heading">Add a deal</h1>
    <form class="form-container">
      <div class="form-item">
        <label class="label">Title </label>
        <input type="text" class="input" v-model="name" placeholder="name" />
      </div>

      <div class="form-item">
        <label class="label">Tags</label>
        <b-form-tags input-id="tags-basic" v-model="tags"></b-form-tags>
      </div>
      <div class="form-item">
        <label class="label" for="example-datepicker"
          >Offer end date (optional)</label
        >
        <b-form-datepicker
          id="example-datepicker"
          class="input"
          v-model="date"
        ></b-form-datepicker>
      </div>
      <div>
        <label class="label" for="example-datepicker">Category</label>
        <b-form-select
          v-model="category"
          :options="categoryList"
          size="sm"
          class="mt-3"
        ></b-form-select>
      </div>
      <div class="form-item">
        <label class="label">Company </label>
        <b-form-select v-model="selectedCompany">
          <option>Manual Option</option>
          <option
            v-for="company in companies"
            :value="company._id"
            :key="company._id"
          >
            {{ company.name }}
          </option>
        </b-form-select>
        <div class="addbutton-container">
          <button class="addnewbutton" type="button" @click="addCompany">
            {{ text }}
          </button>
        </div>
        <div v-if="show">
          <add-company @setChanges="setChanges" v-bind:position="position" />
        </div>
      </div>
      <b-button
        v-if="!show"
        pill
        variant="info"
        type="submit"
        @click="createDeal"
        class="submit-button"
        >Add this deal</b-button
      >
    </form>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AddCompany from './AddCompany.vue'

export default {
  name: 'addDeal',
  components: {
    AddCompany
  },
  props: {
    adding: Boolean,
    position: Object,
    user: String
  },
  data() {
    return {
      categoryList: [
        { value: null, text: 'Please select an option' },
        { value: 'Food', text: 'Food' },
        { value: 'Drinks', text: 'Drinks' },
        { value: 'Clothes', text: 'Clothing' },
        { value: 'Groceries', text: 'Groceries' }
      ],
      text: 'New Company',
      name: '',
      tags: [],
      support: '0',
      companies: [],
      show: false,
      date: '',
      category: '',
      selectedCompany: {}
    }
  },
  mounted() {
    this.getCompanies()
  },
  methods: {
    handleToggle() {
      this.$emit('toggle', false)
    },
    getCompanies() {
      Api.get('/companies')
        .then((response) => {
          this.companies = response.data.companies
          console.log(this.user)
        })
        .catch((error) => {
          this.message = error
        })
    },
    setCompany(selected) {
      this.selectedCompany = selected
      console.log(this.selectedCompany)
    },
    addCompany() {
      this.text === 'New Company'
        ? (this.text = 'Cancel')
        : (this.text = 'New Company')
      this.show = !this.show
    },
    setChanges(value) {
      this.company = value
      console.log(this.company)
      this.addCompany()
      this.getCompanies()
    },
    createDeal() {
      const newDeal = {
        name: this.name,
        tag: this.tag,
        support: this.support,
        company: this.selectedCompany,
        position: this.position,
        category: this.category,
        user: this.user
      }
      Api.post(`companies/${this.selectedCompany}/deals`, newDeal)
        .then((response) => {
          console.log(response)
          this.$emit('toggle', false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.btn-primary {
  margin-bottom: 1em;
  text-align: center;
}
.form-item {
  max-width: 100%;
  margin-left: 5px;
  padding: 0px 0 15px 0;
}
.heading {
  color: rgb(255, 255, 255);
  padding-top: 100px;
}
.label {
  color: rgb(255, 255, 255);
  display: inline-block;
  margin: 25px 15px 5px;
  font-size: 0.9em;
  text-transform: uppercase;
  box-sizing: border-box;
}
.input {
  display: block;
  margin: 15px 10px;
  height: 40px;
  width: 300px;
  box-sizing: border-box;
  border: none;
  text-align: left;
  border-radius: 5px;
}
.deal-container {
  width: 80%;
  margin: 30px auto;
  background: rgb(33, 189, 189, 0.5);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
.form-container {
  background: rgba(10, 10, 10, 0);
  padding: 5px;
}
.overlay {
  position: fixed;
  overflow: scroll;
  width: 35%;
  height: 100%;
  padding-left: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer; /* Add a pointer on hover */
}
.addbutton-container {
  margin-top: 2em;
  width: 100%;
}
.addnewbutton {
  float: right;
  margin-top: 1em;
  padding: 5px;
  background-color: rgb(80, 138, 134);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
}
.submit-button {
  margin-left: 20px;
  margin-top: 3em;
  font-size: 2em;
  height: 50px;
}
</style>
