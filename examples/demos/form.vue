<template>
  <div class="gg-form-container">
    <gg-form :model="form" :rules="rules" label-width="70px">
      <gg-form-item prop="name" label="姓名">
        <gg-input placeholder="输入姓名" v-model="form.name"></gg-input>
      </gg-form-item>
      <gg-form-item prop="age" label="年龄">
        <gg-input v-model="form.age"></gg-input>
      </gg-form-item>
      <gg-form-item prop="love" label="描述">
        <gg-input v-model="form.love"></gg-input>
      </gg-form-item>
    </gg-form>
  </div>
</template>

<script>
export default {
  name: 'FormDemo',
  data () {
    return {
      form: {
        name: '',
        age: '',
        love: ''
      },
      rules: {
        name: [
          { required: true, message: '名字为必填项', trigger: 'blur' },
          { min: 3, max: 10, message: '必须介于3~10个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '必填' }
        ],
        love: [
          { required: true, message: '必填' }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
  .gg-form-container {
    width: 350px;
  }
</style>
