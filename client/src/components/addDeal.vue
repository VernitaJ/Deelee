<template>
  <div class="overlay">
    <h1 class="heading">Add a deal</h1>
    <button class="cancel" @click="handleToggle">Cancel</button>
    <form class="form-container">
      <div class="form-item">
        <input type="input" class="input" v-model="name" placeholder="Title" />
      </div>
      <div class="form-item">
        <textarea
          class="input"
          placeholder="Describe the deal"
          id="floatingTextarea"
        ></textarea>
      </div>
      <div class="form-item">
        <b-form-tags
          input-id="tags-basic"
          v-model="tags"
          class="input"
          placeholder="Tags"
        ></b-form-tags>
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
      <div class="form-item">
        <button class="addnewbutton" type="button" @click="addCompany">
          {{ text }}
        </button>
        <label class="label" for="example-datepicker">Company</label>
        <b-form-select
          class="input"
          placeholder="Company"
          v-model="selectedCompany"
        >
          <option
            v-for="company in companies"
            :value="company._id"
            :key="company._id"
          >
            {{ company.name }}
          </option>
        </b-form-select>
      </div>
      <div v-if="show">
        <add-company @setChanges="setChanges" v-bind:position="position" />
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
  max-width: 80%;
  margin-left: 10px;
  margin-top: 10px;
}
.heading {
  color: rgb(255, 255, 255);
  padding-top: 30px;
}
.label {
  color: rgb(255, 255, 255);
  display: inline-block;
  margin: 0px 15px 2px;
  font-size: 1em;
  text-transform: none;
  box-sizing: border-box;
}
.input {
  display: block;
  margin: 15px 10px;
  padding-left: 10px;
  height: 40px;
  width: 300px;
  box-sizing: border-box;
  border: none;
  text-align: left;
  border-radius: 5px;
  border-bottom: 0ch;
}
.form-container {
  background: rgba(10, 10, 10, 0);
  padding: 2px;
}
.overlay {
  position: fixed;
  overflow-y: auto;
  max-width: 35%;
  height: 100%;
  padding-left: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer; /* Add a pointer on hover */
}
.addnewbutton {
  float: right;
  margin-right: 0;
  padding: 5px;
  font-size: 0.8em;
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
.cancel {
  display: none;
}
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
  .heading {
    font-size: 40px;
  }
  .overlay {
    max-width: 90%;
  }
  .cancel {
    display: inline-block;
    margin-right: 10px;
    background-color: rgb(27, 118, 146);
    border-radius: 5px;
    border: none;
    color: white;
  }
}
</style>
