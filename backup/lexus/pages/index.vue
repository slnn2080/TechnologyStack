<template>
  <div>
    <Heading heading="KINTO 取扱い全車種"/>
    <CtaBtnTypeb />
    <AnchorSalesType />
    <CarLineup salesType="web"/>
    <CarLineup salesType="dealer"/>
  </div>
</template>

<script>
import Heading from "../components/Heading.vue"
import CtaBtnTypeb from "../components/CtaBtnTypeb.vue"
import AnchorSalesType from "../components/AnchorSalesType.vue"
import CarLineup from "../src/javascripts/contents/lineup/views/CarLineup.vue"

export default {
  name: "Index",
  components: {
    Heading,
    CtaBtnTypeb,
    AnchorSalesType,
    CarLineup
  }
}
</script>

<style lang="scss" scoped>

</style>
