<template>
  <div>
    <h3>grid</h3>
    <div>
      <h3>基础</h3>
      <gg-row gutter="20">
        <gg-col class="gg-fill--primary" span="6">aa</gg-col>
        <gg-col class="gg-fill--secondary" span="12">bb</gg-col>
      </gg-row>
    </div>

    <div>
      <h3>offset</h3>
      <gg-row>
        <gg-col class="gg-fill--primary" span="10" offset="4">offset</gg-col>
      </gg-row>
    </div>

    <div>
      <h3>push: left => right</h3>
      <gg-row>
        <gg-col class="gg-fill--primary" span="8" push="4">push</gg-col>
      </gg-row>
    </div>

    <div>
      <h3>pull: right => left</h3>
      <gg-row>
        <gg-col class="gg-fill--primary" span="10" offset="4" pull="2">pull</gg-col>
      </gg-row>
    </div>

    <div>
      <h3>flex</h3>
      <gg-row flex gutter="20" justify="center">
        <gg-col class="gg-fill--primary" span="4">aa</gg-col>
        <gg-col class="gg-fill--secondary" span="5">bb</gg-col>
      </gg-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid'
}
</script>

<style lang="scss">
  .gg-row {
    border: 1px solid #ebebeb;
    padding: 10px;
  }
  .gg-col {
    padding: 5px 0;
    border-radius: 3px;
  }
</style>
