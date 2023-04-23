<template>
  <div class="md:mx-auto border-b">
    <div class="h-12 md:ml-10 md:pr-4 md:space-x-8 flex justify-center">
      <a
        href="/"
        class="font-medium text-gray-500 hover:text-gray-900 flex items-center"
        >Home</a
      >
      <a
        href="https://celestia.org/"
        class="font-medium text-gray-500 hover:text-gray-900 flex items-center"
        >Celestia</a
      >
      <a
        href="https://celestia.wiki/"
        class="font-medium text-gray-500 hover:text-gray-900 flex items-center"
        >Wiki</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PfbHeader'
};
</script>

<style scoped>
img {
  width: 100%;
  object-fit: contain;
}
</style>
