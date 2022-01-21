<template>
  <div>
    <Heading heading="LEXUS 取扱い全車"/>
    <AnchorSalesType />
    <CarLineup brandType="lexus" salesType="web"/>
    <CarLineup brandType="lexus" salesType="dealer"/>
    <CtaBtnType />
  </div>
</template>

<script>
import Heading from "../../components/Heading.vue"
import CtaBtnType from "../../components/CtaBtnType.vue"
import AnchorSalesType from "../../components/AnchorSalesType.vue"
import CarLineup from "../../src/javascripts/contents/lineup/views/CarLineup.vue"

export default {
  name: "Lexus",
  components: {
    Heading,
    AnchorSalesType,
    CarLineup,
    CtaBtnType
  }
}
</script>

<style>

</style>