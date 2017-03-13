/**
 * Created by air.zhao on 2017/2/13.
 */
var globalVar = {
    merchantCode: "500cai",
    isTrial: false,
    trialMerchantCode: "500caitrial",
    themeURL: "http://dev.dev-500cai.com/m/css/membercenter_theme.css",
    hostUrl: ""
};
var lib = {
    _formatParams: function (url, data, type) {
        return {
            url: globalVar.hostUrl + "wps/" + url,
            data: data,
            headers: {
                Merchant: (globalVar.isTrial ? globalVar.trialMerchantCode : globalVar.merchantCode),
                Authorization: window.sessionStorage.getItem("token")
            },
            contentType: "application/json",
            type: type
        };
    },
    postLogin: function (data, callback) {
        var params = lib._formatParams("session/login", data, "POST");
        var desKey = rndString();
        params.headers = {
            "Merchant": (globalVar.isTrial ? globalVar.trialMerchantCode : globalVar.merchantCode),
            "Encryption": RSAEncrypt(desKey.split('').reverse().join(''))
        };
        params.data = desEncrypt(JSON.stringify(data), desKey);
        TCG.Ajax(params, callback);
    },
    getMemberInfo: function (callback, errCallback) {
        TCG.Ajax(lib._formatParams("member/info", null, "GET"), callback, errCallback);
    },
    putMemberRegister: function (data, callback) {
        var params = lib._formatParams("member/register", data, "PUT");
        params.headers.Encryption = RSAEncrypt(globalVar.desKey.split('').reverse().join(''));

        TCG.Ajax(params, callback);
    },
    deleteSessionLogout: function (token, callback, errCallback) {
        var params = lib._formatParams("session/logout", null, "DELETE");
        params.headers.Authorization = token;
        TCG.Ajax(params, callback, errCallback);
    },
    getSystemAnnouncement: function (callback, errCallback) {
        TCG.Ajax(lib._formatParams("system/announcements", null, "GET"), callback, errCallback);
    },
    // wps anouncement advance
    getAnnouncementAdvance: function (data, callback) {
        TCG.Ajax(lib._formatParams("system/announcements/advanced", data, "GET"), callback);
    },
    getTrialUser: function (callback) {
        TCG.Ajax(lib._formatParams("member/trialuser", {}, "GET"), callback);
    },
    getPasswordByEmail: function (data, callback) {
        var params = lib._formatParams("member/password/email", data, "POST");
        params.headers["Content-Type"] = "application/x-www-form-urlencoded";
        TCG.Ajax(params, callback);
    },
    getJackpot: function (callback, errCallback) {
        var rs={"status":true,"description":"request.success","value":{"jackpot_amount":4.8079495358E8,"game_jackpot":[{"amount":590.04,"game_name":"adv-1"},{"amount":2164.75,"game_name":"adv-2"},{"amount":25503.36,"game_name":"adv-3"},{"amount":59320.55,"game_name":"ashabw-1"},{"amount":2861.46,"game_name":"ashadv-1"},{"amount":4359118.36,"game_name":"ashbob-1"},{"amount":1047098.39,"game_name":"ashcpl-1"},{"amount":890495.8,"game_name":"ashfta-1"},{"amount":645236.28,"game_name":"ashglss-1"},{"amount":1922.49,"game_name":"ashjcb-1"},{"amount":3889128.35,"game_name":"ashlcl-1"},{"amount":493608.13,"game_name":"ashlob-1"},{"amount":568.66,"game_name":"ashtmd-1"},{"amount":472106.96,"game_name":"ashwnoz-1"},{"amount":2772256.26,"game_name":"ashwwm-1"},{"amount":1.404411681E7,"game_name":"bl"},{"amount":378944.77,"game_name":"bls"},{"amount":114000.0,"game_name":"ci2"},{"amount":553261.74,"game_name":"cifr"},{"amount":1156571.22,"game_name":"cnpr1"},{"amount":2313142.43,"game_name":"cnpr2"},{"amount":5782856.08,"game_name":"cnpr3"},{"amount":1.156571216E7,"game_name":"cnpr4"},{"amount":7375.27,"game_name":"csjp-1"},{"amount":3522399.1,"game_name":"ctivj-1"},{"amount":3026.0,"game_name":"dcjp-1"},{"amount":40148.55,"game_name":"dcjp-2"},{"amount":177491.3,"game_name":"dcjp-3"},{"amount":3076486.97,"game_name":"dcjp-4"},{"amount":4123.24,"game_name":"dirtdj-1"},{"amount":65928.5,"game_name":"dirtdj-2"},{"amount":105230.14,"game_name":"dond_i-1"},{"amount":374718.09,"game_name":"dond_i-2"},{"amount":757861.65,"game_name":"dond_i-3"},{"amount":1210944.46,"game_name":"drgj-1"},{"amount":44553.03,"game_name":"drgj-2"},{"amount":1371.73,"game_name":"drgj-3"},{"amount":170.07,"game_name":"drgj-4"},{"amount":328285.06,"game_name":"drts1"},{"amount":656570.12,"game_name":"drts2"},{"amount":1391318.6,"game_name":"drts3"},{"amount":2126067.07,"game_name":"drts4"},{"amount":185411.43,"game_name":"esm1"},{"amount":452130.43,"game_name":"esm2"},{"amount":2007350.37,"game_name":"esm3"},{"amount":1694629.92,"game_name":"esm4"},{"amount":149657.31,"game_name":"esmk7"},{"amount":1787254.86,"game_name":"evjj-1"},{"amount":135938.51,"game_name":"fdtjp-1"},{"amount":2368048.97,"game_name":"fdtjp-2"},{"amount":21272.44,"game_name":"fmn1"},{"amount":719785.0,"game_name":"fnfrj1"},{"amount":1439569.99,"game_name":"fnfrj2"},{"amount":3598924.98,"game_name":"fnfrj3"},{"amount":7197849.96,"game_name":"fnfrj4"},{"amount":6808.31,"game_name":"frtf1-1"},{"amount":20907.64,"game_name":"frtf2-1"},{"amount":27840.24,"game_name":"frtf3-1"},{"amount":66868.19,"game_name":"frtf4-1"},{"amount":2403.69,"game_name":"frtf1-2"},{"amount":3390.0,"game_name":"frtf2-2"},{"amount":24692.68,"game_name":"frtf3-2"},{"amount":4332.21,"game_name":"frtf4-2"},{"amount":431.59,"game_name":"frtf1-3"},{"amount":396.97,"game_name":"frtf2-3"},{"amount":3240.87,"game_name":"frtf3-3"},{"amount":36871.26,"game_name":"frtf4-3"},{"amount":75.76,"game_name":"frtf1-4"},{"amount":359.81,"game_name":"frtf2-4"},{"amount":789.05,"game_name":"frtf3-4"},{"amount":1027.21,"game_name":"frtf4-4"},{"amount":38.99,"game_name":"frtf1-5"},{"amount":94.76,"game_name":"frtf2-5"},{"amount":279.4,"game_name":"frtf3-5"},{"amount":545.11,"game_name":"frtf4-5"},{"amount":7061.99,"game_name":"ftg1-1"},{"amount":45542.03,"game_name":"ftg2-1"},{"amount":15115.66,"game_name":"ftg3-1"},{"amount":41731.81,"game_name":"ftg4-1"},{"amount":5055.57,"game_name":"ftg1-2"},{"amount":3277.8,"game_name":"ftg2-2"},{"amount":13183.79,"game_name":"ftg3-2"},{"amount":49440.9,"game_name":"ftg4-2"},{"amount":509.03,"game_name":"ftg1-3"},{"amount":1744.6,"game_name":"ftg2-3"},{"amount":4696.95,"game_name":"ftg3-3"},{"amount":5153.41,"game_name":"ftg4-3"},{"amount":247.6,"game_name":"ftg1-4"},{"amount":627.94,"game_name":"ftg2-4"},{"amount":1088.03,"game_name":"ftg3-4"},{"amount":2428.96,"game_name":"ftg4-4"},{"amount":96.0,"game_name":"ftg1-5"},{"amount":280.41,"game_name":"ftg2-5"},{"amount":541.32,"game_name":"ftg3-5"},{"amount":988.53,"game_name":"ftg4-5"},{"amount":4802.97,"game_name":"ghlj1"},{"amount":9605.94,"game_name":"ghlj2"},{"amount":19211.88,"game_name":"ghlj3"},{"amount":48029.69,"game_name":"ghlj4"},{"amount":8829594.85,"game_name":"glrjj-1"},{"amount":562500.0,"game_name":"gr3"},{"amount":4393209.37,"game_name":"grel"},{"amount":714214.49,"game_name":"gs2"},{"amount":1232111.55,"game_name":"gtscirsj-1"},{"amount":26730.82,"game_name":"jb10p"},{"amount":4.119125376E7,"game_name":"jpgt1-1"},{"amount":4.119125376E7,"game_name":"jpgt2-1"},{"amount":4.119125376E7,"game_name":"jpgt3-1"},{"amount":4.119125376E7,"game_name":"jpgt4-1"},{"amount":4.119125376E7,"game_name":"jpgt5-1"},{"amount":4.119125376E7,"game_name":"jpgt6-1"},{"amount":556992.6,"game_name":"lndg-1"},{"amount":147505.34,"game_name":"lnjp-1"},{"amount":7375.27,"game_name":"lnjp-2"},{"amount":737.53,"game_name":"lnjp-3"},{"amount":73.75,"game_name":"lnjp-4"},{"amount":106926.8,"game_name":"ls"},{"amount":73752.67,"game_name":"lvb-1"},{"amount":73752.67,"game_name":"lvb1-1"},{"amount":73752.67,"game_name":"lvb10-1"},{"amount":73752.67,"game_name":"lvb11-1"},{"amount":73752.67,"game_name":"lvb12-1"},{"amount":73752.67,"game_name":"lvb13-1"},{"amount":73752.67,"game_name":"lvb14-1"},{"amount":73752.67,"game_name":"lvb2-1"},{"amount":73752.67,"game_name":"lvb3-1"},{"amount":73752.67,"game_name":"lvb4-1"},{"amount":73752.67,"game_name":"lvb5-1"},{"amount":73752.67,"game_name":"lvb6-1"},{"amount":73752.67,"game_name":"lvb7-1"},{"amount":73752.67,"game_name":"lvb8-1"},{"amount":73752.67,"game_name":"lvb9-1"},{"amount":2964.87,"game_name":"mj1"},{"amount":4313.66,"game_name":"mrj-1"},{"amount":8230.83,"game_name":"mrj-2"},{"amount":56285.63,"game_name":"mrj-3"},{"amount":960369.92,"game_name":"mrj-4"},{"amount":51563.51,"game_name":"ms1"},{"amount":206194.04,"game_name":"ms2"},{"amount":1030970.18,"game_name":"ms3"},{"amount":103097.02,"game_name":"ms4"},{"amount":4000.0,"game_name":"multm1-1"},{"amount":800.0,"game_name":"multm1-2"},{"amount":300.0,"game_name":"multm1-3"},{"amount":100.0,"game_name":"multm1-4"},{"amount":4000.0,"game_name":"multm2-1"},{"amount":800.0,"game_name":"multm2-2"},{"amount":300.0,"game_name":"multm2-3"},{"amount":100.0,"game_name":"multm2-4"},{"amount":4000.0,"game_name":"multm3-1"},{"amount":800.0,"game_name":"multm3-2"},{"amount":300.0,"game_name":"multm3-3"},{"amount":100.0,"game_name":"multm3-4"},{"amount":4000.0,"game_name":"multm4-1"},{"amount":800.0,"game_name":"multm4-2"},{"amount":300.0,"game_name":"multm4-3"},{"amount":100.0,"game_name":"multm4-4"},{"amount":4000.0,"game_name":"multm5-1"},{"amount":800.0,"game_name":"multm5-2"},{"amount":300.0,"game_name":"multm5-3"},{"amount":100.0,"game_name":"multm5-4"},{"amount":737.53,"game_name":"mysr-1"},{"amount":18438.17,"game_name":"mysr-2"},{"amount":184381.67,"game_name":"mysr-3"},{"amount":8013.06,"game_name":"nbl"},{"amount":802.85,"game_name":"ngrel"},{"amount":126292.68,"game_name":"pba_sb1"},{"amount":252585.36,"game_name":"pba_sb2"},{"amount":631463.39,"game_name":"pba_sb3"},{"amount":918755.47,"game_name":"pbj"},{"amount":918755.47,"game_name":"pbj_mh5"},{"amount":918755.47,"game_name":"pbj_mp"},{"amount":62581.6,"game_name":"phot1"},{"amount":118085.75,"game_name":"phot2"},{"amount":78846.43,"game_name":"phot3"},{"amount":453685.21,"game_name":"phot4"},{"amount":41388.61,"game_name":"photk9"},{"amount":455286.58,"game_name":"plba_sb1"},{"amount":985573.16,"game_name":"plba_sb2"},{"amount":2276432.9,"game_name":"plba_sb3"},{"amount":4552865.79,"game_name":"plba_sb4"},{"amount":36358.87,"game_name":"pyrr7"},{"amount":46575.49,"game_name":"pyrr8"},{"amount":225334.68,"game_name":"pyrr9"},{"amount":258244.65,"game_name":"pyrr10"},{"amount":86088.85,"game_name":"pyrrk7"},{"amount":155702.42,"game_name":"qop1"},{"amount":259370.7,"game_name":"qop2"},{"amount":8.86969679E7,"game_name":"ririshc-1"},{"amount":592094.0,"game_name":"ririshc-2"},{"amount":18620.06,"game_name":"ririshc-3"},{"amount":7497.39,"game_name":"ririshc-4"},{"amount":1468569.66,"game_name":"ririshc-5"},{"amount":116029.06,"game_name":"ririshc-6"},{"amount":2848.23,"game_name":"ririshc-7"},{"amount":858.56,"game_name":"ririshc-8"},{"amount":19887.62,"game_name":"sc1"},{"amount":79430.48,"game_name":"sc2"},{"amount":397152.38,"game_name":"sc3"},{"amount":39715.24,"game_name":"sc4"},{"amount":18438.17,"game_name":"slion-1"},{"amount":5997.1,"game_name":"sol1"},{"amount":12018.16,"game_name":"sol2"},{"amount":6495.62,"game_name":"sol3"},{"amount":16736.09,"game_name":"sol4"},{"amount":42979.96,"game_name":"sol5"},{"amount":228157.0,"game_name":"sol6"},{"amount":5711.42,"game_name":"spmj-1"},{"amount":1.037956821E7,"game_name":"spmj-2"},{"amount":282482.0,"game_name":"str_sb"},{"amount":88011.14,"game_name":"tht08"},{"amount":953172.33,"game_name":"tht09"},{"amount":1207598.09,"game_name":"tht10"},{"amount":2590603.79,"game_name":"tht11"},{"amount":1137837.4,"game_name":"thtk09"},{"amount":73752.67,"game_name":"vonv-1"},{"amount":368763.35,"game_name":"vonv-2"},{"amount":737526.7,"game_name":"vonv-3"},{"amount":3264.4,"game_name":"vpcj-1"},{"amount":42634.66,"game_name":"vpcj-2"},{"amount":37500.0,"game_name":"wc1"},{"amount":75000.0,"game_name":"wc2"},{"amount":544439.85,"game_name":"wc3"},{"amount":1361099.62,"game_name":"wc4"},{"amount":8870.6,"game_name":"wlcsh1-1"},{"amount":62925.13,"game_name":"wlcsh2-1"},{"amount":32994.07,"game_name":"wlcsh3-1"},{"amount":27418.51,"game_name":"wlcsh4-1"},{"amount":5019.31,"game_name":"wlcsh1-2"},{"amount":4575.29,"game_name":"wlcsh2-2"},{"amount":5175.89,"game_name":"wlcsh3-2"},{"amount":61570.43,"game_name":"wlcsh4-2"},{"amount":675.66,"game_name":"wlcsh1-3"},{"amount":1747.15,"game_name":"wlcsh2-3"},{"amount":4162.41,"game_name":"wlcsh3-3"},{"amount":5929.84,"game_name":"wlcsh4-3"},{"amount":241.15,"game_name":"wlcsh1-4"},{"amount":569.33,"game_name":"wlcsh2-4"},{"amount":1392.0,"game_name":"wlcsh3-4"},{"amount":2250.31,"game_name":"wlcsh4-4"},{"amount":101.49,"game_name":"wlcsh1-5"},{"amount":311.4,"game_name":"wlcsh2-5"},{"amount":472.47,"game_name":"wlcsh3-5"},{"amount":1359.17,"game_name":"wlcsh4-5"},{"amount":11250.0,"game_name":"wsf1"},{"amount":556170.61,"game_name":"wsffr"},{"amount":176295.58,"game_name":"wv_s"},{"amount":106505.39,"game_name":"car"}]},"errCount":0};
        //TCG.Ajax(lib._formatParams("game/jackpot", null, "GET"), callback(rs), errCallback);
        callback(rs);
    },
    /*----------------- LGW ----------------------*/
    getGamesPopular: function (headers, data, callback) {
        var param = {
            url: globalVar.hostUrl + 'lgw/games/popular',
            headers: headers,
            data: data
        };
        TCG.Ajax(param, callback);
    }
};