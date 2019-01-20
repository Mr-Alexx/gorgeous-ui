<template>
  <div>
    <gg-row>
      <gg-col span="24">
        <h3>基础用法</h3>
        <gg-radio v-model="r1">radio</gg-radio>
      </gg-col>
      <gg-col span="24">
        <h3>radio group</h3>
        <gg-radio-group v-model="group">
          <gg-radio
            v-for="i in 5"
            :key="i"
            :label="i"></gg-radio>
        </gg-radio-group>
        <div>{{ group }}</div>
      </gg-col>
    </gg-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      r1: '',
      group: ''
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style>

</style>
