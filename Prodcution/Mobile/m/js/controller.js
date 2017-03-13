var controller = {
    init: function () {
        controller.initDefaultEventLiteners();
        controller.initCustomPlugins();
    },
    initDefaultEventLiteners: function () {
        $(document).off("touchend", ".btn-back").on("touchend", ".btn-back", function (e) {
            window.history.back();
        });
        $(document).off("touchend", ".login_link").on("touchend", ".login_link", function (e) {
            e.preventDefault();
            window.location = "login.html";
        });
        $(document).off("touchstart", ".nav_link").on("touchstart", ".nav_link", function (e) {
            window.location = $(this).attr("data-target_loc");
        });
        $(document).off("touchstart", ".live_chat_link").on("touchstart", ".live_chat_link", function (e) {
            window.location = "live_chat.html";
        });
        $(document).off("touchstart", ".home-btn").on("touchstart", ".home-btn", function (e) {
            window.location = "lobby.html";
        });
        $(document).off("touchstart", ".session_link").on("touchstart", ".session_link", function (e) {
            var elem = this;
            var hash = $(elem).attr("data-hash");
            $("#footerNavContainer *").removeClass("active");
            $(elem).addClass("active");
            controller.checkLogin(false, function (isLoggedIn, userInfo) {
                if (isLoggedIn) {
                    if (controller.redirectionHash(hash) != undefined && controller.redirectionHash(hash) != '') {
                        var session_string = JSON.parse(window.sessionStorage.getItem("t"));
                        var username = "";
                        if (session_string.account) {
                            if (username.indexOf("@") > -1) {
                                username = (session_string.account).split("@")[1];
                            } else {
                                username = session_string.account;
                            }
                        } else if (session_string.result.userName) {
                            username = (session_string.userName).split("@")[1];
                        }
                        var url = controller.redirectionHash(hash) + "?token=" + window.sessionStorage.getItem("token") + "&customerName=" + username + "&merchantCode=" + (globalVar.isTrial ? globalVar.trialMerchantCode : globalVar.merchantCode);
                        window.sessionStorage.setItem("iframe_src", url);
                        window.location = "personal.html";
                        return false;
                    }
                } else {
                    TCG.Alert("errors", TCG.Prop("login.not.session"), function () {
                        window.location = "login.html";
                    });
                }
            }, function () {
                TCG.Alert("errors", TCG.Prop("login.not.session"), function () {
                    window.location = "login.html";
                });
            });
        });

        $(document).off("touchstart", ".log-out").on("touchstart", ".log-out", function (e) {
            TCG.Confirm("确定要登出吗？", function (ok) {
                window.sessionStorage.clear();
                TCG.showLoading();
                if (ok) {
                    TCG.hideLoading();
                    lib.deleteSessionLogout(window.sessionStorage.getItem("token"), function () {
                        window.location.reload();
                    }, function (xhr) {
                        window.location.reload();
                    });
                } else {
                    TCG.hideLoading();
                }
            });
        });
        controller.lotto.b2b_link(".draw_history", "draw_history.html");
        controller.lotto.b2b_link(".trend_chart", "trend.html");
    },
    initCustomPlugins: function () {
        $(document).off("touchstart", ".accordion-trigger").on("touchstart", ".accordion-trigger", function (e) {
            var accordion_container = $(this).closest(".accordion_container");
            var accordion_container_parent = accordion_container.parent();
            if ($(".accordion", accordion_container).hasClass("hide")) {
                //  $(".accordion", accordion_container_parent).addClass("hide");
                $(".accordion").addClass("hide");
                $(".accordion", accordion_container).removeClass("hide").addClass("active");
            } else {
                $(".accordion", accordion_container).removeClass("active").addClass("hide");
            }
        });
    },
    login: function () {
        window.sessionStorage.removeItem("isTrial");
        globalVar.isTrial = false;
        $(document).off("touchstart", "#loginForm #show_register_page").on("touchstart", "#loginForm #show_register_page", function (e) {
            window.location = "./register.html";
        });
        $(document).off("touchstart", "#loginForm #register_demo").on("touchstart", "#loginForm #register_demo", function (e) {
            window.location = "./register_demo.html";
        });
        $(document).off("touchstart", "#loginForm #forgot_password").on("touchstart", "#loginForm #forgot_password", function (e) {
            $("#loginForm").addClass("hide");
            $("#forgotPasswordForm").removeClass("hide");
        });
        $(document).off("touchstart", "#forgotPasswordForm #retrieve_password").on("touchstart", "#forgotPasswordForm #retrieve_password", function (e) {
            var has_error = false;
            $(".forgot-password-form [data-validation]").each(function (i, elem) {
                var val = $(elem).val();
                if ($(elem).val() == "") {
                    TCG.Alert("errors", TCG.Prop($(elem).attr("data-null_error")), function () {
                        $(elem).focus();
                    });
                    has_error = true;
                    return false;
                }
                if ((controller.validator($(elem).attr("data-validation"), val)).result == false) {
                    TCG.Alert("errors", TCG.Prop(controller.validator($(elem).attr("data-validation"), val).error_code), function () {
                        $(elem).focus();
                    });
                    has_error = true;
                    return false;
                }
            });
            if (has_error) {
                return false;
            }
            var username = $.trim($("input[name='retrieveUsername']").val().toLowerCase());
            var email = $("input[name='retrieveEmail']").val();
            TCG.showLoading();
            lib.getPasswordByEmail({username: username, email: email}, function (rs) {
                TCG.hideLoading();
                if (rs.status) {
                    TCG.Alert("success", TCG.Prop(rs.description), function () {
                        $("#forgotPasswordForm").addClass("hide");
                        $("#loginForm").removeClass("hide");
                    });
                }

            });
        });
        $('input[maxlength]').on('input propertychange', function (event) {
            var _this = this;
            $(_this).val(($(_this).val()).substring(0, $(_this).attr("maxlength") * 1));
        });
        $(document).off("touchstart", "#loginForm .login-btn").on("touchstart", "#loginForm .login-btn", function (e) {
            var username = $.trim($("input[name='username']").val().toLowerCase());
            var password = $("input[name='loginpass']").val();
            var checkUserName = /^\w{6,14}$/.test(username);
            var checkPassword = /^\w{6,16}$/.test(password);
            if (username == "" && password == "") {
                TCG.Alert("errors", TCG.Prop("login_userNamePassword_required"), function () {
                    $("input[name='username']").focus();
                });
                return;
            }
            if (username == "") {
                TCG.Alert("errors", TCG.Prop("login_userName_required"), function () {
                    $("input[name='username']").focus();
                });
                return;
            }
            if (password == "") {
                TCG.Alert("errors", TCG.Prop("login_password_required"), function () {
                    $("input[name='loginpass']").focus();
                });
                return;
            }
            if (!checkUserName) {
                TCG.Alert("errors", TCG.Prop("login_userName_invalid"), function () {
                    $("input[name='username']").focus();
                });
                return;
            }
            if (!checkPassword) {
                TCG.Alert("errors", TCG.Prop("login_password_invalid"), function () {
                    $("input[name='password']").focus();
                });
                return;
            }
            if (username.substring(0, 5) == "guest") {
                globalVar.isTrial = true;
                window.sessionStorage.setItem("isTrial", "true");
            } else {
                globalVar.isTrial = false;
                window.sessionStorage.removeItem("isTrial");
            }
            TCG.showLoading();
            lib.postLogin({username: username, password: password}, function (rs) {
                if (rs.status) {
                    window.sessionStorage.setItem("username", rs.value.userName);
                    window.sessionStorage.setItem("token", rs.value.token);
                    window.location = "lobby.html";
                    TCG.hideLoading();
                } else {
                    TCG.hideLoading();
                    TCG.Alert("errors", TCG.Prop(rs.description));
                }
            });

        });
    },
    checkLogin: function (isFirst, callback, errCallback, callAPI) {
        /* if (window.sessionStorage.getItem("t")) {
         if (callback) {
         callback(true, window.sessionStorage.getItem("t"));
         }
         return false;
         }
         if (!window.sessionStorage.getItem("t") || callAPI) {*/
        lib.getMemberInfo(function (rs) {
            if (rs.status) {
                window.sessionStorage.setItem("isLogin", true);
                window.sessionStorage.setItem("isAgent", rs.value.type);
                window.sessionStorage.setItem("nickname", rs.value.nickname);
                window.sessionStorage.setItem("t", JSON.stringify(rs.value));
            }
            if (callback) {
                callback(rs.status, rs.value);
            }
        }, errCallback);
        //  }

    },
    lobby: {
        init: function () {
            if (window.sessionStorage.getItem("isTrial")) {
                globalVar.isTrial = true;
            }
            // get banner images
            var data = {
                type: "P",
                category: "U",
                platform: "M"
            };

            var bannerHtml = "<img src='./images/banner.png' class='m-item active'>";
            $("#bannerPage").html(bannerHtml);
            lib.getAnnouncementAdvance(data, function (result) {
                if (result.value.length > 0) {
                    bannerHtml = "";
                }
                for (var i = 0; i < result.value.length; i++) {
                    bannerHtml += '<img src="' + result.value[i].mainPageUrl + '" class="m-item active">';
                }

                $("#bannerPage").html(bannerHtml);
                $('.index_img').scooch();

                $("#bannerPage .m-item").unbind("click").bind("click", function () {
                    window.location = './promotion.html';
                });
            });
            controller.checkLogin(false, function (isLoggedIn, userInfo) {
                if (isLoggedIn) {
                    ui.lobby.sessionHeader();
                }
            }, function (xhr) {
                if (xhr.status == 401) {
                    ui.lobby.defaultHeader();
                    window.sessionStorage.clear();
                }
            }, true);
            controller.lobby.listPopularGames();
            controller.lobby.systemAnnouncement();
            controller.lobby.getJackpot();
        },
        listPopularGames: function () {
            var data = {count: 11};
            lib.getGamesPopular({Merchant: (globalVar.isTrial ? globalVar.trialMerchantCode : globalVar.merchantCode)}, data, function (data) {
                ui.lobby.loadGamesPopular(data);
            });
            controller.initGameRedirection();
        },
        systemAnnouncement: function () {
            lib.getSystemAnnouncement(function (rs) {
                if (rs.value) {
                    ui.lobby.loadSystemAnnouncement(rs);
                }
            });
        },
        getJackpot: function () {
            lib.getJackpot(function (rs) {
                if (rs.value) {
                    ui.lobby.loadJackpot(rs);
                }
            });
        }
    },
    register: {
        init: function () {
            $(document).off("touchstart", "#register_demo").on("touchstart", "#register_demo", function (e) {
                window.location = "./register_demo.html";
            });
            $('input[maxlength]').on('input propertychange', function (event) {
                var _this = this;
                $(_this).val(($(_this).val()).substring(0, $(_this).attr("maxlength") * 1));
            });
            $('#btnSubmitRegister').on('click', function () {
                var has_error = false;
                $(".register-form [data-validation]").each(function (i, elem) {
                    var val = $(elem).val();
                    if ($(elem).attr("name") == "regUsername" && ($(elem).val()).substring(0, 5) == "guest") {
                        TCG.Alert("errors", "账号必须以字母开头，由4~16个之母或数字组成，而且不能以guest开头", function () {
                            $(elem).focus();
                        });
                        has_error = true;
                        return false;
                    }
                    if ($(elem).val() == "") {
                        TCG.Alert("errors", TCG.Prop($(elem).attr("data-null_error")), function () {
                            $(elem).focus();
                        });
                        has_error = true;
                        return false;
                    }
                    if ((controller.validator($(elem).attr("data-validation"), val)).result == false) {
                        TCG.Alert("errors", TCG.Prop(controller.validator($(elem).attr("data-validation"), val).error_code), function () {
                            $(elem).focus();
                        });
                        has_error = true;
                        return false;
                    }
                });
                if (has_error) {
                    return false;
                }
                var encryptValues = {
                    "registerUrl": "",
                    "thirdPartyUrl": "",
                    "registerMethod": "",
                    "username": $("[name=regUsername]").val(),
                    "password": $("[name=regPassword]").val(),
                    "confirmPassword": $("[name=regConfirmPass]").val(),
                    "nickname": "",
                    "payeeName": $("[name=regUsername]").val(),
                    "email": $("[name=regEmail]").val(),
                    "mobileNum": $("[name=regMobile]").val(),
                    "qqNum": $("[name=regQQ]").val(),
                    "affiliateCode": "", // this is the agent code...
                    "rebateId": "",
                    "type": 0
                };
                globalVar.desKey = rndString();
                var data = desEncrypt(JSON.stringify(encryptValues), globalVar.desKey);
                lib.putMemberRegister(data, function (result) {
                    if (result.success) {
                        lib.postLogin({
                            username: $("[name=regUsername]").val(),
                            password: $("[name=regPassword]").val()
                        }, function (rs) {
                            if (rs.status) {
                                window.sessionStorage.setItem("username", rs.value.userName);
                                window.sessionStorage.setItem("token", rs.value.token);
                                TCG.Alert("success", TCG.Prop("registerForm_success"), function () {
                                    window.location = "lobby.html";
                                });
                            } else {
                                TCG.Alert("errors", TCG.Prop(rs.description));
                            }
                        });

                    } else {
                        TCG.Alert("errors", TCG.Prop(result.message));
                    }
                });
            });
        }
    },
    register_demo: {
        init: function () {
            globalVar.isTrial = true;
            TCG.showLoading();
            lib.getTrialUser(function (rs) {
                if (rs) {
                    $("[name=demoUsername]").val(rs.value);
                    TCG.hideLoading();
                }
            });
            $('#btnSubmitRegister').on('click', function () {
                var has_error = false;
                $(".register-form [data-validation]").each(function (i, elem) {
                    var val = $(elem).val();
                    if ($(elem).val() == "") {
                        TCG.Alert("errors", TCG.Prop($(elem).attr("data-null_error")), function () {
                            $(elem).focus();
                        });
                        has_error = true;
                        return false;
                    }
                    if ((controller.validator($(elem).attr("data-validation"), val)).result == false) {
                        TCG.Alert("errors", TCG.Prop(controller.validator($(elem).attr("data-validation"), val).error_code), function () {
                            $(elem).focus();
                        });
                        has_error = true;
                        return false;
                    }
                });
                if (has_error) {
                    return false;
                }
                var encryptValues = {
                    "username": $("[name=demoUsername]").val(),
                    "password": $("[name=demoPassword]").val(),
                    "confirmPassword": $("[name=demoConfirmPass]").val(),

                };
                globalVar.desKey = rndString();
                var data = desEncrypt(JSON.stringify(encryptValues), globalVar.desKey);
                lib.putMemberRegister(data, function (result) {
                    if (result.success) {
                        lib.postLogin({
                            username: $("[name=demoUsername]").val(),
                            password: $("[name=demoPassword]").val()
                        }, function (rs) {
                            if (rs.status) {
                                window.sessionStorage.setItem("username", rs.value.userName);
                                window.sessionStorage.setItem("token", rs.value.token);
                                window.sessionStorage.setItem("isTrial", "true");
                                TCG.Alert("success", TCG.Prop("registerForm_success"), function () {
                                    window.location = "lobby.html";
                                });
                            } else {
                                TCG.Alert("errors", TCG.Prop(rs.description));
                            }
                        });

                    } else {
                        TCG.Alert("errors", TCG.Prop(result.message));
                    }
                });
            });
        }
    },
    validator: function (type, value) {
        var pattern;
        var error_code = "";
        switch (type) {
            case "email":
                pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z|a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
                error_code = "registerForm_email_invalid";
                break;
            case "remark":
                pattern = /^.{0,255}$/;
                break;
            case "alphaNum":
                pattern = /\w+/;
                break;
            case "username":
                pattern = /^[\w]{4,16}$/;
                error_code = "registerForm_username_invalid";
                break;
            case "password":
                pattern = /^[\w]{6,16}$/;
                error_code = "registerForm_password_invalid";
                break;
            case "numberOnly":
                pattern = /^[0-9]+$/;
                break;
            case "alpha":
                pattern = /[a-z|A-Z]+/;
                break;
            case "alphaOnly":
                //pattern = /^[a-zA-Z]+$/;
                pattern = /^\W+|[a-z]+$/i;
                break;
            case "mobileNo":
                pattern = /^[0-9]{11}$/;
                error_code = "registerForm_mobileNo_invalid";
                break;
            case "decimalNum":
                pattern = /^(\d+\.?\d+|\d+)$/;
                break;
            case "amount":
                pattern = /^(\d+\.?\d+|\d+)$/;
                break;
            case "bankCardNumber":
                pattern = /^[0-9]{16,19}$/;
                break;
            case "alipayAccount":
                pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z|a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b|^[0-9]{11}$/;
                break;
            case "orderNumber":
                pattern = /^[A-Z0-9]+\-\d+$/;
                break;
            case "issueNumber":
                pattern = /^\d+\-\d+$/;
                break;
            case "qq":
                pattern = /^[1-9]+\d{4,11}$/;
                error_code = "registerForm_qq_invalid";
                break;
            case "url":
                pattern = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
                break;
            case "confirmPassword":
                if (value[0] == value[1])
                    return true;
                error_code = "registerForm_confirmPass_failed";
                return false;
            case "chineseChar":
                return (value.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+\s+/g) == null && !value.toLowerCase().match(/[a-z]/i) && !value.match(/\d+/g));
                break;
            default:
                //console.log("Invalid Type!");
                return false;
        }
        return {result: pattern.test(value), error_code: error_code};
    },
    promotion: {
        init: function () {
            var data = {
                type: "P",
                category: "U",
                platform: "M"
            };

            lib.getAnnouncementAdvance(data, function (result) {
                var html = "";
                for (var i = 0; i < result.value.length; i++) {
                    html += '<div class="app-list-box accordion_container">' +
                        '<div class="list-tit">' +
                        '<h3>' + result.value[i].title + '</h3>' +
                        '<p>活动时间：' + (result.value[i].startDate).split(" ")[0] + '</p>' +
                        '</div>' +
                        '<div class="list-pic">' +
                        '<div href="help/promotionDetail.html?url=PromotionDetail1.html">' +
                        '<img src="' + result.value[i].mainPageUrl + '">' +
                        '</div>' +
                        '</div>' +
                        '<div class="join accordion-trigger">' +
                        '<div href="help/promotionDetail.html?url=PromotionDetail1.html">' +
                        '<span>查看详情</span>' +
                        '<span class="icon-arrow-right right-pro"></span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="accordion hide">' + result.value[i].content + '</div>' +
                        '</div>';
                }

                $("#promotionContainer").html(html);
            });
        }
    },
    redirectionHash: function (hash) {
        /*    var url = "";
         if ((window.location.href).indexOf("loc") > -1) {
         url = 'loc';
         } else if ((window.location.href).indexOf("dev") > -1) {
         url = 'dev';
         } else if ((window.location.href).indexOf("sit") > -1) {
         url = 'sit';
         } else if ((window.location.href).indexOf("uat") > -1) {
         url = 'uat';
         } else {
         url = 'live';
         }
         var hash_path = TCG.Prop('member.center.url.' + url) + hash;
         return hash_path;*/
        return "mc/index.html" + hash;
    },
    lottoRedirection: function () {
        /* var url = "";
         var url = "";
         if ((window.location.href).indexOf("loc") > -1) {
         url = 'loc';
         } else if ((window.location.href).indexOf("dev") > -1) {
         url = 'dev';
         } else if ((window.location.href).indexOf("sit") > -1) {
         url = 'sit';
         } else if ((window.location.href).indexOf("uat") > -1) {
         url = 'uat';
         } else {
         url = 'live';
         }
         var lotto_url = TCG.Prop('lotto.url.' + url);
         return lotto_url;*/
        return "lotto/";
    },
    personal: {
        init: function () {
            $(document).ready(function () {
                var window_height = $(window).height();
                $('#contentWrp').height(window_height);
                var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                var eventer = window[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
                eventer(messageEvent, function (e) {
                    var key = e.message ? "message" : "data";
                    var data = e[key];
                    switch (data) {

                        case 'fund_transfer':
                            window.location = "fund_transfer.html";
                            break;
                        case 'session_expired':
                            window.location = "login.html";
                            break;
                        default:
                            window.location = "lobby.html";
                            break;
                    }
                }, false);
            });
            $("#personal_iframe").attr("src", window.sessionStorage.getItem("iframe_src"));
            $('#personal_iframe').on('load', function () {
                $("#personal_iframe")[0].contentWindow.postMessage(globalVar.themeURL, "*");
            });

        }
    },
    initGameRedirection: function () {
        $(document).off("tap", ".game_link").on("tap", ".game_link", function (e) {
            var elem = this;
            controller.checkLogin(false, function (isLoggedIn, userInfo) {
                if (isLoggedIn) {
                    var session_string = JSON.parse(window.sessionStorage.getItem("t"));
                    var username = "";
                    if (session_string.account) {
                        if (username.indexOf("@") > -1) {
                            username = (session_string.account).split("@")[1];
                        } else {
                            username = session_string.account;
                        }
                    } else if (session_string.result.userName) {
                        username = (session_string.userName).split("@")[1];
                    }
                    var url = controller.lottoRedirection() + "betting.html?token=" + window.sessionStorage.getItem("token") + "&gameCode=" + $(elem).attr("data-gameCode") + "&merchantCode=" + (globalVar.isTrial ? globalVar.trialMerchantCode : globalVar.merchantCode) + "&line=vip1";
                    window.sessionStorage.setItem("iframe_src", url);
                    window.location = "lotto.html";
                    return false;
                } else {
                    TCG.Alert("errors", TCG.Prop("login.not.session"), function () {
                        window.location = "login.html";
                    });
                }
            }, function () {
                TCG.Alert("errors", TCG.Prop("login.not.session"), function () {
                    window.location = "login.html";
                });
            });
        });
        controller.lotto.b2b_link(".game_list", "game_list.html");

    },
    lotto: {
        init: function () {
            var window_height = $(window).height();
            $('#lottery').height(window_height);
            $("#lottery").attr("src", window.sessionStorage.getItem("iframe_src"));
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
            eventer(messageEvent, function (e) {
                var key = e.message ? "message" : "data";
                var data = e[key];
                switch (data) {

                    case 'fund_transfer':
                        var url = controller.redirectionHash("#funds") + "?token=" + window.sessionStorage.getItem("token") + "&customerName=" + window.sessionStorage.getItem("username") + "&merchantCode=" + (globalVar.isTrial ? globalVar.trialMerchantCode : globalVar.merchantCode);
                        window.sessionStorage.setItem("iframe_src", url);
                        window.location = "personal.html";
                        break;
                    case 'session_expired':
                        window.location = "login.html";
                        break;
                    default:
                        window.location = "lobby.html";
                        break;
                }
            }, false);
            $('#lottery').on('load', function () {
                $("#lottery")[0].contentWindow.postMessage(globalVar.themeURL, "*");
                $("#lottery")[0].contentWindow.postMessage("prizeMode:ZY", "*");
            });
        },
        b2b_link: function (element, path) {
            var removeActiveBtn = function (activeElem) {
                $("#footerNavContainer *").removeClass("active");
                activeElem.addClass("active");
            };
            $(document).off("tap", element).on("tap", element, function (e) {
                var elem = this;
                removeActiveBtn($(elem));
                controller.checkLogin(false, function (isLoggedIn, userInfo) {
                    if (isLoggedIn) {
                        var url = controller.lottoRedirection() + path + "?token=" + window.sessionStorage.getItem("token") + "&merchantCode=" + (globalVar.isTrial ? globalVar.trialMerchantCode : globalVar.merchantCode) + "&line=vip1";
                        console.log(url);
                        window.sessionStorage.setItem("iframe_src", url);
                        window.location = "lotto.html";
                        return false;
                    } else {
                        TCG.Alert("errors", TCG.Prop("login.not.session"), function () {
                            window.location = "login.html";
                        });
                    }
                }, function () {
                    TCG.Alert("errors", TCG.Prop("login.not.session"), function () {
                        window.location = "login.html";
                    });
                });
            });
        }
    }

};
controller.init();