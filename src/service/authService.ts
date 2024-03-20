import { AXIOS_LOGIN } from "./server";
import header from "./header";
import Crypto from "../tools/crypto";
import router from "../router";
import FunctionService from "../tools/FunctionService";

class AuthService {
  AuthLogin(data: any) {
    let config: {};
    config = header.authHeaderLogin();
    return AXIOS_LOGIN.post("/admin/v2/auth/signin", data, config);
  }

  // AuthLogout(userID: any) {
  //   let config: {};
  //   config = header.authHeader();
  //   return AXIOS_LOGIN.post(
  //     "/admin/v1/auth/signout?username=" + userID,
  //     config
  //   );
  // }

  SaveSessionCustom(key: string, value: any) {
    let ToJson = JSON.stringify(value);
    let encrypt = Crypto.encryption(ToJson);
    return localStorage.setItem(key, encrypt);
  }

  ToPage(page: any) {
    this.SaveSessionCustom("page", page);
    return router.replace(page).catch((error) => {
      return error;
    });
  }

  EnkripsiSha256(data: string) {
    return Crypto.encryptionSha256(data);
  }

  ValidationResponseBoolean(data: { data: { code: string } }) {
    return data.data.code === "00";
  }

  AuthLogout(userID: any) {
    let config: {};
    config = header.authHeader();
    return AXIOS_LOGIN.post(
      "/admin/v1/auth/signout?username=" + userID,
      config
    );
  }

  logout() {
    this.AuthLogout(FunctionService.ReadSessionCustom("userID"));
    FunctionService.ClearSessionCustom("colorMenu");
    FunctionService.ClearSessionCustom("linkData");
    FunctionService.ClearSessionCustom("token");
    FunctionService.ClearSessionCustom("newToken");
    localStorage.clear();
    return this.ToPage("/login");
  }
}

export default new AuthService();
