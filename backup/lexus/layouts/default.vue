<template>
  <div>
    <!-- Header -->
    <div id="glonav" data-src='/customer/header' />
    <main>
      <nuxt />
    </main>
    <!-- Footer -->
    <div id="footerContainer" data-src='/customer/footer' />
  </div>
</template>

<script>
export default {
  name: 'default',
  }

</script>
