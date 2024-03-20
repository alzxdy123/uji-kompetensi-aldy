import { AXIOS } from "./server";
import header from "./header";

class DestinationListService {
  getDestinationListOnlineTransfer() {
    let config: {};
    config = header.authHeader();
    return AXIOS.get("master/bank/v1/list?isTransferOnline=Y", config);
  }

  getListParameter(query?: any) {
    let config = {
      ...header.authHeader(),
      params: {
        pageSize: 10000,
        ...query,
      },
    };
    return AXIOS.get("/admin/parameter", config);
  }

  getListParameterHoliday(params?: any) {
    const config = {
      ...header.authHeader(),
      params: params,
    };

    return AXIOS.get("/admin/v2/parameter_holiday", config);
  }

  getCompanyData(id: string) {
    let config: {};
    config = header.authHeader();
    return AXIOS.get("/company/v1/data?id=" + id, config);
  }
  postAuthorizationRequest(reqBody: any) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.post("/admin/authorization/parameter", reqBody, config);
  }

  postHolidayParameterAuthorizationRequest(reqBody: any) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.post(
      "/admin/authorization/parameter_holiday",
      reqBody,
      config
    );
  }

  putHolidayParameterAuthorizationApproval(reqBody: any) {
    const config = {
      ...header.authHeader(),
    };

    return AXIOS.put("/admin/authorization/parameter_holiday", reqBody, config);
  }

  holidayParameterAuthorization(params?: any) {
    const config = {
      ...header.authHeader(),
      params: {
        dataType: "PARAM_HOLIDAY",
        ...params,
      },
    };

    return AXIOS.get("/admin/v2/authorization/parameter/list", config);
  }
}

export default new DestinationListService();
