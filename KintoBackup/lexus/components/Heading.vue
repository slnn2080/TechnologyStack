<template>
  <div class="l-cnt__full">
    <div class="m-hero__heading m-hero__heading--small">
      <h1 class="m-hdg__01" v-html="heading"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    heading: {
      type:String,
      default:""
    }
  }
}
</script>
