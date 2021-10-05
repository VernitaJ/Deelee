<template>
    <div><input v-model="input" @input="handleInput"><div class="bordered" v-if="input"><ul><li v-for="(item, i) in list" :key="i" @click="setInput(item)">{{ item }}</li></ul></div></div>
</template>

<script>

export default ({
  name: 'AutoComplete',
  props: ['list'],
  data() {
    return {
      input: null
    }
  },
  template: '',
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    setInput(value) {
      this.input = value
      this.$emit('input', value)
    }
  }
})
</script>

<style scoped>
.bordered {
  border: 1px solid black;
  display: block;
}

ul li {
  cursor: pointer;
}

ul li:hover {
  background: rgba(0, 0, 0, 0.3)
}
</style>