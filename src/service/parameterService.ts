import { AXIOS } from "./server";
import header from "./header";

export default {
  getListParameterHoliday(year: any) {
    let config: {};
    config = header.authHeader();
    return AXIOS.get(
      "/admin/v2/parameter_holiday" + "?year=" + year + "&holiday_name=",
      config
    );
  },
  // getListParameterHoliday() {
  //   let config: {};
  //   config = header.authHeader();
  //   return AXIOS.get(
  //     "/admin/v2/parameter_holiday?year=&holiday_name=",
  //     config
  //   );
  // },
};
