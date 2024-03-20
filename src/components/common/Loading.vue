<template>
  <div clas="status-loading">
    <div class="page-loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import FunctionService from '@/tools/FunctionService';
export default {
    data() {
        return {

        }
    },
    methods: {
        Loading() {
            let PageRefresh         =       FunctionService.ReadSessionCustom('page_router');
            setTimeout(() => {
                return Functions.ToPage(PageRefresh);
            }, 200);
        }
    },
    mounted: function() {
        this.Loading();
    }
}
</script>

<style lang="scss">
.page-loading {
    position: relative;
    top: 231px;
}
</style>
