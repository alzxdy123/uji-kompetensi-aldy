import router from "@/router";
import Crypto from "../tools/crypto";

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
}

export default new FunctionService();
