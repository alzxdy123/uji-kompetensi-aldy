import router from "../router";
import Crypto from "../tools/crypto";
import jwt_decode from "jwt-decode";
// import $ from "jquery";

class FunctionService {
  SaveSessionCustom(key: string, value: any) {
    let ToJson = JSON.stringify(value);
    let encrypt = Crypto.encryption(ToJson);
    return localStorage.setItem(key, encrypt);
  }

  ReadSessionCustom(key: string) {
    let read: any = localStorage.getItem(key);
    if (read == "null") {
      return null;
    } else {
      let dencrypt = Crypto.dencrytion(read);
      if (dencrypt == "" || dencrypt == undefined) {
        return null;
      } else {
        let JsonToData = JSON.parse(dencrypt);
        return JsonToData;
      }
    }
  }

  ClearSessionCustom(key: string) {
    let read: any = localStorage.removeItem(key);
    if (read == "null") {
      return null;
    } else {
      let dencrypt = Crypto.dencrytion(read);
      if (dencrypt == "" || dencrypt == undefined) {
        return null;
      } else {
        let JsonToData = JSON.parse(dencrypt);
        return JsonToData;
      }
    }
  }

  GenerateChaptcha(length: number) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  ResultResponse(data: any) {
    let result = false;
    switch (data.data.code) {
      case "00":
        result = true;
        break;
      case "70":
        result = false;
        break;
      case "71":
        result = false;
        break;
    }

    return result;
  }

  SimpleLanguage(message: string) {
    let language = localStorage.getItem("locale");
    if (language == null) {
      language = "id";
    }
    try {
      if (message.indexOf("|") > -1) {
        if (language == "id") {
          return this.GetTextLeft(message);
        } else if (language == "en") {
          return this.GetTextRight(message);
        } else {
          return "Bahasa tidak di temukan";
        }
      } else {
        return message;
      }
    } catch (e) {
      return e;
    }
  }

  GetTextLeft(text: string) {
    try {
      var TextLeft = text.substr(0, text.indexOf("|"));
      return TextLeft;
    } catch (e) {
      return e;
    }
  }

  GetTextRight(text: string) {
    try {
      const TextRight = text.slice(text.indexOf("|") - text.length);
      const RemoveCharacter = TextRight.replace("|", "");
      return RemoveCharacter;
    } catch (e) {
      return e;
    }
  }

  ToPage(page: string) {
    this.SaveSessionCustom("page", page);
    return router.replace(page).catch((error) => {
      return error;
    });
  }

  DecodeJWT(token: any) {
    let result: any = [];
    try {
      result = jwt_decode(token);
    } catch (e) {
      return e;
    }
    return result;
  }

  getDefaultPaginationProps(perPage: number = 5) {
    return {
      isBusy: false,
      currentPage: 1,
      perPage: perPage,
      errorMessage: "",
      totalRows: 0,
    };
  }

  hasSubstring(strA: string, strB: string) {
    if (!strA || !strB) return true;
    return strA.toLowerCase().includes(strB.toLowerCase());
  }

  parseJSONSafe(jsonString: any) {
    try {
      if (typeof jsonString === "string") {
        if (
          jsonString.trim().charAt(0) === "{" &&
          jsonString.trim().slice(-1) === "}"
        ) {
          const parsedJson = JSON.parse(jsonString);

          if (typeof parsedJson === "object" && parsedJson !== null) {
            for (const key in parsedJson) {
              if (typeof parsedJson[key] === "string") {
                parsedJson[key] = this.parseJSONSafe(parsedJson[key]);
              }
            }
          }

          return parsedJson || jsonString;
        } else {
          return jsonString;
        }
      } else {
        return jsonString;
      }
    } catch (error: any) {
      console.error("Error parsing JSON:", error.message);
      return jsonString;
    }
  }

  getAuthStatusTextKey(status: string) {
    switch (status) {
      case "A":
        return "Di Setujui";
      case "R":
        return "Di Tolak";
      default:
        return "Menunggu Persutujuan";
    }
  }

  getAuthStatusTextColor(status: string) {
    switch (status) {
      case "A":
        return "text-success";
      case "R":
        return "text-danger";
      default:
        return "text-warning";
    }
  }

  getDiffKeys(obj1: Record<string, any>, obj2: Record<string, any>): string[] {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const commonKeys = keys1.filter((key) => keys2.includes(key));

    const differentKeys = commonKeys.filter((key) => obj1[key] !== obj2[key]);

    return differentKeys;
  }

  // ErrorTableClose(id: any) {
  //   $(document).ready(function () {
  //     $(".loading-table#" + id).removeClass("active");
  //   });
  // }
}

export default new FunctionService();
