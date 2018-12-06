<template>
  <div id="app" class="container">
    <div>
      <router-link
        v-for="(route, i) in routeList"
        :key="i"
        :to="route.path"
        class="gg-route">
        {{route.path.substring(1)}}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    routeList () {
      console.log(this.$router)
      return this.$router.options.routes
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 15px;
  >div {
    margin-bottom: 15px;
  }
}
.gg-route {
  padding: 10px;
  display: inline-block;
  & + .gg-route {
    margin-left: 10px;
  }
}
</style>
