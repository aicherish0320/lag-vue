<template>
  <div>
    <h1>Header</h1>
    <div>
      <router-view></router-view>
    </div>
    <h1>Footer</h1>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped></style>
