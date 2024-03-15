<template>
  <div>dashboard</div>
</template>

<script lang="ts">
import FunctionService from "@/tools/FunctionService";
import { Vue } from "vue-property-decorator"

export default class dashboard extends Vue {
  mounted() {
    let test = FunctionService.ReadSessionCustom("test")
    console.log(test)
  }
}
</script>

<style></style>
