<template>
  <pfb-transaction />
</template>

<script>
import PfbTransaction from "./components/PFBTransaction/pfb-transaction.vue";

export default {
  name: "App",
  components: {
    'pfb-transaction': PfbTransaction,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
}

a {
  color: #fff;
}
</style>
