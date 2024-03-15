// @ts-ignore
import CryptoJS from "crypto-js";
import router from "../router";

const hash = require("hash.js");
const uuid = require("device-uuid");
const kunci_akses = uuid.DeviceUUID().get();
export default {
  encryption: function (data: string) {
    try {
      if (data == null) {
        return null;
      } else {
        let enkripsi = CryptoJS.AES.encrypt(data, kunci_akses).toString();
        return enkripsi;
      }
    } catch (error) {
      return null;
    }
  },
  dencrytion: function (data: null) {
    try {
      if (data == null) {
        return null;
      } else {
        let bytes = CryptoJS.AES.decrypt(data, kunci_akses);
        let terjemaah = bytes.toString(CryptoJS.enc.Utf8);
        return terjemaah;
      }
    } catch (error) {
      return null;
    }
  },
  mengecek: function (data: string) {
    try {
      if (data == "") {
        return router.replace("/");
      } else {
        return data;
      }
    } catch (error) {
      return error;
    }
  },
  HmacSHA1(data: any) {
    try {
      return CryptoJS.HmacSHA1(data, kunci_akses);
    } catch (e) {
      return e;
    }
  },
  encryptionSha256: function (data: string) {
    try {
      if (data == null) {
        return null;
      } else {
        const encryptSHA256 = hash.sha256().update(data).digest("hex");
        return encryptSHA256;
      }
    } catch (e) {
      return e;
    }
  },
};
