<template>
  <div class="PFBTransaction">
    <pfb-header />
    <pfb-main />
  </div>
</template>

<script>
import PfbHeader from './sections/pfb-header.vue';
import PfbMain from './sections/pfb-main.vue';

export default {
  name: 'PfbTransaction',
  components: {
    'pfb-header': PfbHeader,
    'pfb-main': PfbMain
  }
};
</script>

<style scoped>
.PFBTransaction {
  width: 1000px;
  height: calc(100vh - 24px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
