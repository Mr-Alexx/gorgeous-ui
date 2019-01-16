<template>
  <div class="gg-input-demo">
    <gg-row>
      <gg-col span="24">
        <h3>default input</h3>
        <gg-input v-model="v1" placeholder="Enter something"></gg-input>
      </gg-col>

      <gg-col span="24">
        <h3>disabled input</h3>
        <gg-input v-model="v1" placeholder="disabled" disabled></gg-input>
      </gg-col>

      <gg-col span="24">
        <h3>size</h3>
        <gg-row :gutter="20">
          <gg-col :span="6">
            <gg-input v-model="v2" placeholder="large size" size="large"></gg-input>
          </gg-col>
          <gg-col :span="6">
            <gg-input v-model="v3" placeholder="default size"></gg-input>
          </gg-col>
          <gg-col :span="6">
            <gg-input v-model="v4" placeholder="small size" size="small"></gg-input>
          </gg-col>
          <gg-col :span="6">
            <gg-input v-model="v5" placeholder="small size" size="mini"></gg-input>
          </gg-col>
        </gg-row>
      </gg-col>

      <gg-col span="24">
        <h3>clearable</h3>
        <gg-input v-model="v1" clearable></gg-input>
      </gg-col>

      <gg-col span="24">
        <h3>icon</h3>
        <gg-row gutter="20">
          <gg-col span="6">
            <gg-input v-model="v6" prefix="search"></gg-input>
          </gg-col>
          <gg-col span="6">
            <gg-input v-model="v6" suffix="search"></gg-input>
          </gg-col>
        </gg-row>
      </gg-col>

      <gg-col span="24">
        <h3>search</h3>
        <gg-row gutter="20">
          <gg-col span="24">
            <gg-input search v-model="v7"></gg-input>
          </gg-col>
          <gg-col span="24">
            <gg-input search search-button v-model="v7"></gg-input>
          </gg-col>
          <gg-col span="24">
            <gg-input search search-button="search" v-model="v7"></gg-input>
          </gg-col>

          <gg-col span="24">
            <gg-input search search-button="search" v-model="v7" size="large" placeholder="large search"></gg-input>
          </gg-col>
          <gg-col span="24">
            <gg-input search search-button="search" v-model="v7" size="small" placeholder="small search" @click="handleClick"></gg-input>
          </gg-col>
        </gg-row>
      </gg-col>
    </gg-row>
  </div>
</template>

<script>
export default {
  name: 'inputDemo',
  data () {
    return {
      v1: 'dsf',
      v2: '',
      v3: '',
      v4: '',
      v5: '',
      v6: '',
      v7: '',
      v8: ''
    }
  },
  methods: {
    handleClick () {
      alert(1)
    }
  }
}
</script>

<style lang="scss">
  .gg-input-demo {
    width: 500px;
  }
  .gg-row {
    margin-bottom: 20px;
  }
  [class*="gg-col"] {
    margin-bottom: 15px;
  }
</style>
