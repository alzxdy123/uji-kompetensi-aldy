export default {
  authHeaderLogin() {
    // let loginColor = FunctionService.ReadSessionCustom('colorMenu')
    // let readToken = FunctionService.DecodeJWT(FunctionService.ReadSessionCustom("token"));
    // let token = FunctionService.ReadSessionCustom("token");
    let config = {
        "headers": {
            "Content-Type": "application/json",
            // "Company-Code": readToken.companyCode,
            // "channel": readToken.channel === undefined ? 'web-admin' : readToken.channel,
            "channel": 'web-admin',
            // "Authorization": "Bearer " + token,
            // "Terminal-Type": 'IBBADMIN',
            // "Term-Id": loginColor === 'konven' ? 'IBBA' : 'IBBAS',
            // "Branch-Code": readToken.branchCode
        }
    };
    return config;
},
};
