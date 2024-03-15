<template>
  <div>
    <div class="login">
      <div class="container">
        <!-- <div class="image-container"></div> -->
        <div class="login-form">
          <form
            data-vv-scope="loginAdmin"
            @submit.prevent="handdleLogin('loginAdmin')"
          >
            <div class="group-form">
              <label>Username</label>
              <input
                type="text"
                v-model="user.username"
                id="username"
                name="username"
                v-validate="{ required: true }"
              />
            </div>
            <div class="group-form">
              <label>Password</label>
              <input
                type="password"
                v-model="user.password"
                id="password"
                name="password"
                v-validate="{ required: true }"
              />
            </div>
          </form>

          <button class="button-login" @click="handdleLogin('loginAdmin')">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FunctionService from "@/tools/FunctionService";
import User from "@/models/user";
import AuthService from "@/service/authService";

export default {
  data() {
    return {
      loading: false,
      submitted: false,
      message: "",
      isBusy: false,
      user: new User(),
      InputCaptcha: "",
      chaptcha: "",
      MessageCapcha: ""
    };
  },
  methods: {
    handdleLogin(val) {
      this.submitted = true;
      this.loading = false;

      this.$validator.validateAll(val).then((isValid) => {
        if(!isValid) {
          this.loading = false;
          return;
        } else {
          let loginData = {
            username: this.user.username,
            password: AuthService.EnkripsiSha256(
              this.user.password +
              this.user.username.substring(
                this.user.username.length - 2,
                this.user.username.length
              ) +
              this.user.username.substring(0, 2)
            ),
          };
          this.isBusy = true;
          this.loading = true;
          AuthService.AuthLogin(loginData)
          .then((result) => {
            if (FunctionService.ValidationResponseBoolean(result)) {

            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      })
    },
  },
}
</script>

<style scoped>
@import "../assets/scss/global.scss";
</style>
