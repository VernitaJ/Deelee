<template>
    <div>
        <button>
            <router-link :to="{name: 'addDeal', params:{id: 'hello'}}">Go </router-link>
          Go
          </button>
    </div>
</template>

<script>

export default {
  name: 'InfoContent',
  props: ['data'],
  data() {
  }
}

</script>
