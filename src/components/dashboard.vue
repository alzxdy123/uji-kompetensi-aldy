<template>
  <div class="dashboard">
    <div class="judul">Uji Kompetensi Aldy Balya SMK Setia Bhakti</div>
    <div style="display: flex; gap: 30px;">
      <router-link to="/holiday-parameter" class="content">
        <div class="content-head">
          <i class="jam jam-calendar"></i>
        </div>
        <div class="content-body">
          <div class="wrapper">
            <h2>Holiday Parameter</h2>
            <div class="status">
              <i class="jam jam-circle-f"></i>
              <span>Status: Done</span>
            </div>
          </div>
        </div>
        <div class="content-foot">
          <i class="jam jam-chevrons-right"></i>
        </div>
      </router-link>
      <router-link
        to="/authorization"
        class="content"
        style="width: 600px !important;"
      >
        <div class="content-head">
          <i class="jam jam-calendar"></i>
        </div>
        <div class="content-body">
          <div class="wrapper">
            <h3>Authorization Holiday Parameter</h3>
            <div class="status">
              <i class="jam jam-circle-f"></i>
              <span>Status: Done</span>
            </div>
          </div>
        </div>
        <div class="content-foot">
          <i class="jam jam-chevrons-right"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default{}
</script>

<style>
@import "../assets/scss/pages.scss";
</style>
