<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'StatsLayout',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  }
}
</script>
<style>
.q-card {
  border-radius: 10px;
}
.custom-bg {
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
