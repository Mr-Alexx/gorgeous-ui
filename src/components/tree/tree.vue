<template>
  <div class="gg-tree"></div>
</template>

<script>
export default {
  name: 'GgTree',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    showCheckbox: Boolean,
    multiple: Boolean,
    accordion: Boolean
  }
}
</script>
