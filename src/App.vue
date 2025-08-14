<script>
  import FinanceTable from './components/FinanceTable.vue';

  export default {
    name: 'App',
    components: {
      FinanceTable,
    },
  }
</script>

<template>
  <div class="app">
    <div class="app__content-wrapper">
      <FinanceTable></FinanceTable>
    </div>
  </div>
</template>

<style lang="scss">
@use './assets/styles/scss/index' as *;

.app {
  background-color: white;
  padding: 25px 16px 50px;
  @include flex(row, center, center);
  @media (min-width: 680px) {
    padding: 35px 20px 60px;
  }
  @media (min-width: 1100px) {
    padding: 45px 45px 80px;
  }
  &__content-wrapper {
    width: 100%;
    max-width: 1500px;
  }
}
</style>
