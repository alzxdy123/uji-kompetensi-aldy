<template>
  <div class="containers">
    <div class="sidebar" v-if="showSidebar">
      <div class="sidebar-head">Uji Kompetensi</div>
      <div class="sidebar-body">
        <router-link
          class="menu"
          v-for="page in pages"
          :key="page.name"
          :to="page.href"
          :class="{ 'isActive': $route.path === page.href }"
        >
          <div class="wrapper">
            <i :class="page.icon"></i>
            <span>{{ page.text }}</span>
          </div>
        </router-link>
      </div>
      <div class="sidebar-foot">
        <div class="menu">
          <i class="jam jam-log-out"></i>
          <span>Log Out</span>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="navbar">
        <div class="wrapper">
          <div class="hamburger-menu" @click="handleSidebar()">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
          </div>
          <div class="navbar-content">
            <div class="content">language</div>

            <div class="content">Username</div>
            <div class="content" @click="Logout()">
              <i class="jam jam-power log-out"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="main-page">
        <div class="main-page-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <notifications class="notifications" />
  </div>
</template>

<script>
import FunctionService from '@/tools/FunctionService';
import authService from "../service/authService"
export default {
  data() {
    return {
      showSidebar: true,
      router: this.$route
    }
  },

  methods:{
    handleSidebar() {
      this.showSidebar = !this.showSidebar
    },

    Logout() {
      authService.logout();
      // this.$store.dispatch('AuthLogout');
    }
  },

  mounted() {
    FunctionService.ToPage("/dashboard")
  },

  computed: {
    pages() {
      return [
        {
          name: "dashboard",
          text: "dashboard",
          icon: "jam jam-dashboard",
          href: "/dashboard",
          children: []
        },
        {
          name: "holiday-parameter",
          text: "holiday parameter",
          icon: "jam jam-calendar",
          href: "/holiday-parameter",
          children: []
        },
        {
          name: "authorization",
          text: "Authorization",
          icon: "jam jam-calendar",
          href: "/authorization",
          children: []
        }
      ]
    }
  }
}
</script>

<style>
@import "../assets//scss/home.scss"
</style>
