<template>
  <div>
    <div class="login">
      <div class="containers">
        <div class="image-container">
          <div class="wrappers">
            <span>Ujian Kompetensi Aldy Balya</span>
            <div class="logo">
              <img
                src="https://pactindo.com/home/assets/img/logos/logo-pac-white.svg"
                style="width: 80px !important;"
              />
            </div>
          </div>
        </div>
        <form
          data-vv-scope="login"
          @submit.prevent="handdleLogin('login')"
          style="width: 100%; display: flex; justify-content: center; align-items: center;"
        >
          <div class="login-form">
            <div class="login-head">
              <h2>Login</h2>
            </div>
            <div class="login-body">
              <span style="color: red;">{{ errorMessage }}</span>
              <div class="group-form">
                <b-form-input
                  id="username"
                  v-model="user.username"
                  v-validate="{ required: true }"
                  name="username"
                  type="text"
                  :class="{
                        'is-invalid': true && errors.has('login.username'),
                      }"
                >
                </b-form-input>
                <b-form-invalid-feedback>
                  Username Di Wajibkan
                </b-form-invalid-feedback>
                <!-- <span>{{ errorMessage }}</span> -->
              </div>
              <div class="group-form">
                <label>Password</label>
                <b-form-input
                  id="passwords"
                  v-model="user.password"
                  v-validate="{ required: true }"
                  :class="{
                        'is-invalid': true && errors.has('login.password'),
                      }"
                  class="form-control"
                  name="password"
                  type="password"
                >
                </b-form-input>
                <!-- <i class="jam jam-eye show-eye"></i>
                <i class="jam jam-eye-close hide-eye"></i> -->
                <b-form-invalid-feedback>
                  Password Di wajibkan
                </b-form-invalid-feedback>
                <!-- <span>{{ errorMessage }}</span> -->
              </div>
              <div class="group-form-chaptca">
                <div class="chaptca">
                  <div class="chaptca-wrapper">
                    <label>{{ chaptchaShow }} </label>
                    <i
                      aria-hidden="true"
                      class="jam jam-refresh"
                      @click="Rechaptcha()"
                    ></i>
                  </div>
                  <input
                    type="text"
                    v-model="InputCaptcha"
                    id="chaptca"
                    name="chaptca"
                    v-validate="{ required: true }"
                  />
                </div>
                <span>{{ messageChaptca }}</span>
              </div>
            </div>
            <div class="login-footer">
              <input type="submit" value="Login" class="button-login" />
            </div>
          </div>
        </form>
      </div>
    </div>

    <notifications class="notifications" />
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
      isError: false,
      message: "",
      errorMessage: "",
      messageChaptca: "",
      isBusy: false,
      user: new User(),
      InputCaptcha: "",
      chaptchaShow: "",
    };
  },
  methods: {

    handdleLogin(val) {
      this.submitted = true;
      this.loading = false;

      this.$validator.validateAll(val).then((isValid) => {
        if(!isValid) {
          this.loading = false;
          this.messageChaptca = "Chaptca error"
          return;
        } else {
          if (this.InputCaptcha === this.chaptchaShow ) {
            this.messageChaptca = ""
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
              this.isError = false
              if (FunctionService.ResultResponse(result)) {
                this.isBusy = false;
                this.loading = true;
                result.data.data.map((data) => {
                  FunctionService.SaveSessionCustom("newToken", data.token);
                });

                AuthService.SaveSessionCustom(
                  "firstTimeLogin",
                  result.data.data[0].firstTimeLogin
                );

                AuthService.SaveSessionCustom(
                  "token",
                  result.data.data[0].token
                );

                AuthService.SaveSessionCustom(
                  "userInfo",
                  result.data.data[0]
                );

                AuthService.SaveSessionCustom("userID", this.user.username);

                this.$notify({
                  title: 'Success log in',
                  text: 'Success',
                  type: 'success',
                  duration: 5000
                })

                AuthService.ToPage("/");

              } else {
                throw new Error(result.data.message);
              }
            })
            .catch((error) => {
              this.isError = true
              this.errorMessage = FunctionService.SimpleLanguage(error.message)
              this.$notify({
                title: "Error Login",
                text: error.message,
                type: "error",
                duration: 5000,
              });
            });
          } else {
            this.loading = false;
            this.messageChaptca = "Captcha salah";
          }
        }
      })
    },

    Rechaptcha() {
      let chaptcha = FunctionService.GenerateChaptcha(4);
      this.chaptchaShow = chaptcha;
    }
  },

  mounted() {
    let chaptcha = FunctionService.GenerateChaptcha(4)
    this.chaptchaShow = chaptcha;
    this.Rechaptcha();
  }
}
</script>

<style scoped>
@import "../assets/scss/login.scss";
</style>
