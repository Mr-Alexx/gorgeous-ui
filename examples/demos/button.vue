<template>
  <div>
    <div>
      <h3>type</h3>
      <div>
        <gg-button
          v-for="(type, i) in types"
          :key="i"
          :type="type">{{type}}</gg-button>
      </div>
      <div>
        <gg-button
          v-for="(type, i) in types"
          :key="i"
          :type="type"
          icon="gg-icon-search">{{type}}</gg-button>
      </div>
    </div>

    <div>
      <h3>light</h3>
      <div>
        <gg-button
          v-for="(type, i) in types"
          :key="i"
          :type="type"
          light>{{type}}</gg-button>
      </div>
    </div>

    <div>
      <h3>nativeType</h3>
      <div>
        <gg-button>button</gg-button>
        <gg-button :native-type="'submit'">submit</gg-button>
        <gg-button :native-type="'reset'">reset</gg-button>
      </div>
    </div>

    <div>
      <h3>size</h3>
      <gg-button
        v-for="(size, i) in sizes"
        :key="i"
        :size="size">
        {{size || 'default'}}
      </gg-button>
    </div>
    <div>
      <h3>shape</h3>
      <div>
        <gg-button shape="round">
          round
        </gg-button>
        <gg-button shape="round" icon="gg-icon-arrow-left">round</gg-button>
        <gg-button shape="circle" icon="gg-icon-search"></gg-button>
      </div>
    </div>
    <div>
      <h3>text</h3>
      <gg-button type="text">text</gg-button>
    </div>
    <div>
      <h3>icon</h3>
      <div>
        <gg-button icon="gg-icon-arrow-left">gorgeous</gg-button>
        <gg-button>
          gorgeous
          <i class="gg-icon-arrow-right"></i>
        </gg-button>
        <gg-button icon="gg-icon-arrow-left" type="fancy">gorgeous</gg-button>
        <gg-button type="primary">
          gorgeous
          <i class="gg-icon-arrow-right"></i>
        </gg-button>
      </div>
    </div>

    <div>
      <h3>disabled</h3>
      <div>
        <gg-button
          v-for="(type, i) in types"
          :key="i"
          disabled
          :type="type">
          {{type}}
        </gg-button>

        <gg-button disabled shape="circle" icon="gg-icon-search" @click="testDisabledClick"></gg-button>
      </div>
    </div>

    <div>
      <h3>loading</h3>
      <gg-button type="fancy" :loading="loading">loading</gg-button>
      <gg-button type="text" @click="loading = true">showLoading</gg-button>
      <gg-button type="text" @click="loading = false">hideLoading</gg-button>
    </div>

    <div>
      <h3>link</h3>
      <div>
        <gg-button to="https://www.baidu.com" target="_blank">a</gg-button>
        <gg-button type="text" target="_self" to="https://www.baidu.com" >self</gg-button>
        <gg-button type="text" replace to="https://www.baidu.com" >replace</gg-button>
        <gg-button type="text" target="_blank" to="https://www.baidu.com" >blank</gg-button>
      </div>
    </div>

    <div>
      <h3>shadow</h3>
      <div>
        <gg-button
          v-for="(type, i) in types"
          :key="i"
          :type="type"
          shadow>{{type}}</gg-button>
      </div>
    </div>

    <div>
      <h3>按钮组</h3>
      <div>
        <gg-button-group>
          <gg-button type="fancy">aa</gg-button>
          <gg-button type="fancy">bb</gg-button>
          <gg-button type="fancy">cc</gg-button>
        </gg-button-group>

        <gg-button-group>
          <gg-button type="fancy" shadow>aa</gg-button>
          <gg-button type="fancy" shadow>bb</gg-button>
          <gg-button type="fancy" shadow>cc</gg-button>
        </gg-button-group>

        <gg-button-group>
          <gg-button>aa</gg-button>
          <gg-button>bb</gg-button>
          <gg-button>cc</gg-button>
        </gg-button-group>

        <gg-button-group>
          <gg-button shape="round" type="primary">aa</gg-button>
          <gg-button shape="round" type="primary">bb</gg-button>
        </gg-button-group>

        <gg-button-group>
          <gg-button shape="round" type="primary">aa</gg-button>
          <gg-button shape="round" type="primary" disabled>bb</gg-button>
          <gg-button shape="round" type="primary">cc</gg-button>
        </gg-button-group>

        <gg-button-group>
          <gg-button>
            <i class="gg-icon-arrow-left"></i>
            aa
          </gg-button>
          <gg-button>
            bb
            <i class="gg-icon-arrow-right"></i>
          </gg-button>
        </gg-button-group>

        <gg-button-group>
          <gg-button icon="gg-icon-arrow-left" shape="circle"></gg-button>
          <gg-button icon="gg-icon-arrow-right" shape="circle"></gg-button>
        </gg-button-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonPage',
  data () {
    return {
      types: ['text', 'default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'fancy'],
      sizes: ['small', '', 'large'],
      loading: false
    }
  },
  methods: {
    testDisabledClick () {
      alert(1)
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 15px;
  div {
    margin-bottom: 15px;
  }
}
</style>
