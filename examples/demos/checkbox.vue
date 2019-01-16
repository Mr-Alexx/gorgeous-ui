<template>
  <div>
    <gg-checkbox v-model="check" label="已了解协议"></gg-checkbox>

    <gg-row>
      <gg-col span="24">
        <gg-button-group>
          <gg-button @click="check = true">true</gg-button>
          <gg-button @click="check = false">false</gg-button>
          <gg-button @click="console">console</gg-button>
        </gg-button-group>
      </gg-col>

      <gg-col span="24">
        <gg-checkbox v-model="check2" true-value="1" false-value="0">
          check2: {{ check2 }}
        </gg-checkbox>
      </gg-col>

      <gg-col span="24">
        <h3>disabled</h3>
        <gg-checkbox v-model="check3" disabled>disabled</gg-checkbox>
        <gg-checkbox v-model="check4" disabled>disabled</gg-checkbox>
      </gg-col>
    </gg-row>

    <gg-row>
      <gg-col span="24">
        <h3>checkbox group</h3>
        <gg-checkbox-group v-model="group">
          <gg-checkbox label="yan"></gg-checkbox>
          <gg-checkbox label="ling"></gg-checkbox>
        </gg-checkbox-group>
        <div style="margin-top: 15px">{{ group }}</div>
        <div style="margin-top: 15px">
          <gg-checkbox-group v-model="group" disabled>
            <gg-checkbox label="yan"></gg-checkbox>
            <gg-checkbox label="ling"></gg-checkbox>
          </gg-checkbox-group>
        </div>
      </gg-col>
    </gg-row>

    <section>
      <h3>indeterminate</h3>
      <gg-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">全选</gg-checkbox>

      <div style="margin-top: 15px">
        <gg-checkbox-group v-model="group2" @change="handleChange">
          <gg-checkbox label="1"></gg-checkbox>
          <gg-checkbox label="2"></gg-checkbox>
          <gg-checkbox label="3"></gg-checkbox>
        </gg-checkbox-group>
        <div>{{ group2 }}</div>
      </div>
    </section>

    <section>
      <h3>label为对象</h3>
      <gg-checkbox-group v-model="group3">
        <gg-checkbox
          v-for="(item, i) in data"
          :key="i"
          :label="item">
          {{ item.label }}
        </gg-checkbox>
      </gg-checkbox-group>

      <div>
        {{JSON.stringify(group3)}}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'checkboxDemo',
  data () {
    return {
      check: true,
      check2: 1,
      check3: false,
      check4: true,
      group: ['yan'],
      checkAll: false,
      group2: ['1'],
      indeterminate: true,
      group3: [],
      data: [
        { label: 1, name: 'a' },
        { label: 2, name: 'b' },
        { label: 3, name: 'c' },
        { label: 4, name: 'd' }
      ]
    }
  },
  methods: {
    console () {
      console.log(this.check)
    },
    handleCheckAll (value) {
      this.group2 = value ? ['1', '2', '3'] : []
      this.indeterminate = false
    },
    handleChange (value) {
      console.log(value)
      this.checkAll = value.length === 3
      this.indeterminate = value.length > 0 && value.length < 3
    }
  }
}
</script>

<style>
  [class*="gg-col"] {
    margin: 10px 0;
  }
</style>
