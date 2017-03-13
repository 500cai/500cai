;(function (window, document, $) {
    window.TCG = {};
    var TCG = window.TCG;

    $.alerts = {

        // These properties can be read/written by accessing $.dialogbox.propertyName from your scripts at any time

        verticalOffset: 0,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: 0.6,                // transparency level of overlay
        overlayColor: '#000',               // base color of overlay
        draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '确定',         // text for the OK button
        cancelButton: '取消', // text for the Cancel button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs
        size: {
            //XS:{width:'379px',height:'259px'},
            S: {width: '275px', height: '75px'},
            M: {width: '275px', height: '130px'},
            L: {width: '257px', height: '185px'}
            //L:{width:'561px',height:'580px'},
            //CL:{width:'511px',height:'514px'}
        },
        // Public methods
        //alert it's only two size,'XS' and 'L'
        alert: function (type, message, callback, okBtnTxt, cancelBtnTxt) {
            $.alerts._show(type, message, callback, okBtnTxt, cancelBtnTxt, false);
        },

        confirm: function (message, callback, onBtnTxt, cancelBtnTxt) {
            $.alerts._show("confirm", message, callback, onBtnTxt, cancelBtnTxt, false);
        },

        quickPrompt: function (type, message, callback, timer) {
            $.alerts._show(type, message, callback, "", "", true, timer);
        },

        // Private methods
        _show: function (type, msg, callback, okBtn, cancelBtn, noBtn, timer) {
            var isOkBtnOnly = (cancelBtn == null || cancelBtn == "" || cancelBtn == undefined);
            var cancelBtnHtml = (isOkBtnOnly || noBtn) ? "" : '<span onclick="void(0)" id="promptCancelBtn" class="cancel box_flex">' + cancelBtn + '</span>';
            var btnHandle = (isOkBtnOnly || noBtn) ? "one" : "multiple";
            var btnFlex = isOkBtnOnly ? "" : "box_flex";
            var okBtnHtml = noBtn ? '' : '<span onclick="void(0)" id="promptOkBtn" class="determine ' + btnFlex + '">' + okBtn + '</span>';

            var _html = '<section id="dialogBox" class="dialog show">' +
                '<div class="wrapper">' +
                '<div class="dialog_main">' +
                '<p class="title"><span class="icon bet-user ' + type + '"></span></p>' +
                '<p class="title">' + msg + '</p>' +
                '<div class="actions ' + btnHandle + ' flex_child">' +
                okBtnHtml +
                cancelBtnHtml +
                '</div>' +
                '</div>' +
                '</div>' +
                '</section>';

            $("BODY").append(_html);

            $("#promptOkBtn").unbind("click").bind("click", function () {
                $.alerts._hide();
                if (callback) {
                    callback(true);
                }
            });

            $("#promptCancelBtn").unbind("click").bind("click", function () {
                $.alerts._hide();
            });

            var timeOut;
            if (noBtn && timer) {
                if (timeOut) {
                    clearTimeout(timeOut);
                }

                timeOut = setTimeout(function () {
                    $.alerts._hide();
                    if (callback) {
                        callback();
                    }
                }, timer);
            }
        },

        _hide: function () {
            $("#dialogBox").remove();
        }
    };
    /**
     * this alert dialog box
     * @param type {String} value is:errors,success,alerts
     * @param message {String}
     * @param callback {Function} ,this is on click after need run function.
     * @param okBtnTxt,ok button text. {String}
     * @param cancelBtnTxt {String}
     */
    TCG.Alert = function (type, message, callback, okBtnTxt, cancelBtnTxt) {
        // remove current alert and show a new one
        $.alerts._hide();
        var okBtn = okBtnTxt == undefined || okBtnTxt == null || okBtnTxt == '' ? '确定' : okBtnTxt;
        $.alerts.alert(type, message, callback, okBtn, cancelBtnTxt);
    };

    /**
     *
     * @param type {String} - icon
     * @param message {String} - message
     * @param callback {Function} - callback to run
     */
    TCG.QuickPrompt = function (type, message, callback) {
        $.alerts._hide();
        $.alerts.quickPrompt(type, message, callback, 3000);
    };

    /**
     * this confirm dialog box
     * @param message {String}
     * @param callback {Function}
     * @param okBtnTxt {String}
     * @param cancelBtnTxt {String}
     */
    TCG.Confirm = function (message, callback, okBtnTxt, cancelBtnTxt) {
        $.alerts._hide();
        var okBtn = okBtnTxt == undefined || okBtnTxt == null || okBtnTxt == '' ? '确定' : okBtnTxt;
        var cancelBtn = cancelBtnTxt == undefined || cancelBtnTxt == null || cancelBtnTxt == '' ? '取消' : cancelBtnTxt;
        $.alerts.confirm(message, callback, okBtn, cancelBtn);
    };

    /**
     * 浮动层插件
     * $.popups.show的使用方法
     */
    $.popups = {
        id: '',//容器ID也是引入页面内容中的第一个DIV的id
        opacity: 0.6,//遮罩层透明度
        overlayColor: '#000',
        show: function (arguments, openCallback, closeCallback) {
            var defaultParams = {text: '', isWindow: true, transparent: false, width: '1270px', height: '657px'};

            defaultParams.text = arguments.text !== undefined ? arguments.text : defaultParams.text;
            defaultParams.isWindow = arguments.isWindow !== undefined ? arguments.isWindow : defaultParams.isWindow;
            defaultParams.transparent = arguments.transparent !== undefined ? arguments.transparent : defaultParams.transparent;
            defaultParams.width = arguments.width !== undefined ? arguments.width : defaultParams.width;
            defaultParams.height = arguments.height !== undefined ? arguments.height : defaultParams.height;

            $.popups.opacity = defaultParams.transparent ? 0.01 : 0.6;//透明度为true,遮罩层为透明,默认60%
            $.popups.overlayColor = defaultParams.isWindow ? '#000' : '#fff';
            $.popups.hide();
            $.popups.overlay('show');//创建遮罩层

            if (defaultParams.isWindow) {
                $.popups.id = '#theme_popup';
                $("body").append('<div id="theme_popup"><div id="popup_close"></div><div id="popup_content"></div></div>');//显示内容
                $($.popups.id).css({
                    width: defaultParams.width,
                    height: defaultParams.height
                });
                $("#popup_content").html(defaultParams.text);
            } else {
                $.popups.id = '#loading';
                $("body").append('<div id="loading"></div>');
                ;
            }

            // IE6 Fix
            var pos = ('undefined' == typeof(document.body.style.maxHeight)) ? 'absolute' : 'fixed';

            $($.popups.id).css({
                position: pos,
                zIndex: 199,
                padding: 0,
                margin: 0
            });
            $("#loading").css({
                position: "fixed",
                "z-index": 199,
                "padding": "0px",
                "margin": "0px",
                "top": "30%",
                "bottom": 0,
                "right": 0,
                "left": 0,
                "margin": "0 auto"
            });
            $.popups.reposition();
            $.popups.maintainPosition(true);

            $("#popup_close").unbind("click");
            $("#popup_close").bind("click", function () {//绑定关闭窗口的事件
                $.popups.hide();
                if (closeCallback) {
                    closeCallback()
                }
                ;
            });
            if (openCallback) {
                openCallback();
            }
        },

        hide: function () {
            $($.popups.id).remove();//清除窗口
            $.popups.overlay('hide');//清除遮罩层
            $.popups.maintainPosition(false);//取消窗口监听事件
            $.popups.id = '';
        },

        overlay: function (status) {//创建遮罩层
            switch (status) {
                case 'show':
                    $.popups.overlay('hide');//清除之前的窗口以及遮罩层
                    $("BODY").append('<div id="popups_overlay"></div>');
                    $("#popups_overlay").css({
                        position: 'absolute',
                        zIndex: 198,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(document).height(),
                        background: $.popups.overlayColor,
                        opacity: $.popups.opacity
                    });
                    break;
                case 'hide':
                    $("#popups_overlay").remove();
                    break;
            }
        },

        reposition: function () {
            var top = (($(window).height() / 2) - ($($.popups.id).offsetHeight / 2)) + 0;
            var left = (($(window).width() / 2) - ($($.popups.id).offsetWidth / 2)) + 0;
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
            if ('undefined' == typeof(document.body.style.maxHeight)) top = top + $(window).scrollTop();

            $($.popups.id).css({
                top: top + 'px',
                left: left + 'px'
            });
            $("#popups_overlay").height($(document).height());
        },

        maintainPosition: function (status) {
            switch (status) {
                case true:
                    $(window).bind('resize', $.popups.reposition);
                    break;
                case false:
                    $(window).unbind('resize', $.popups.reposition);
                    break;
            }
        }
    };
    /**
     * this is popups
     * @param arguments is object,the parameter is :
     * {
	 * text:'',--page content support html tag
	 * transparent:true,-- have overlay opacity,default false
	 * width:'1270px', --popups width size
	 * height:'657px'-- popups height size
	 * }
     * @param openCallback is function,the popups open after the need to perform the function
     * @param closeCallback is function,,the popups close after the need to perform the function
     */
    TCG.WinOpen = function (arguments, openCallback, closeCallback) {
        $.popups.show(arguments, openCallback, closeCallback);
    };
    /**
     * lock page and show loading image
     */
    TCG.showLoading = function () {
        $.popups.show({isWindow: false});
    };

    /**
     * unlock page and remove loading image
     */
    TCG.hideLoading = function () {
        $.popups.hide();
    };

    //var defaultParams={text:'',isWindow:true,opacity:true,width:'1270px',height:'657px'};

    TCG.Ajax = function (arguments, callback, callbackError) {
        var url = arguments.url;
        if (!arguments.type) {
            arguments.type = 'GET';
        }
        if (!arguments.dataType) {
            arguments.dataType = 'json';
        }
        if (!arguments.async || typeof arguments.async !== 'boolean') {
            arguments.async = true;
        }
        if (!arguments.lock || typeof arguments.lock !== 'boolean') {
            arguments.lock = false;
        }
        if (!arguments.cache) {
            arguments.cache = false;
        }
        arguments.beforeSend = function (xhr) {
            // if(this.id){
            // $(this.id).html("<div id="loading"></div>");
            // }
            if (this.lock) {
                //TCG.showLoading();
            }
        };
        if (!arguments.error) {
            arguments.error = function (xhr) {
                if (xhr.status == 500) {
                    // run error callback if we have an error
                    if (callbackError) {
                        callbackError();
                    }

                    var response = JSON.parse(xhr.response);
                    TCG.Alert("error", TCG.Prop(response.errorCode));

                    TCG.hideLoading();
                } else {
                    if (callbackError) {
                        callbackError(xhr);
                    }
                }
            }
        }

        var dataType = this.Ajax.arguments[0];
        arguments.success = function (result) {
            if ((dataType.dataType === 'text' || dataType.dataType === 'html') && dataType.id) {
                $(dataType.id).html(result);
            }

            if (dataType.dataType === 'json') {
                if (window.location.hash != "#home" && (!result.status) && result.description == 'login.not.session') {
                    ui.alert.show(TCG.Prop(result.description), 'OK', 'error', function () {
                        window.sessionStorage.clear();
                        window.location.hash = "#home";
                    });
                }
                if (result.success) {
                    if (this.id && typeof result.data === 'string') {
                        $(this.id).html(result.data);
                    } else {
                        result.status = result.success;
                        result.result = {value: {}};
                        result.result.value = result.value;
                    }
                }
            }
            if (callback) {
                callback(result);
            }
        };
        arguments.complete = function (xhr, textStatus) {
            if (this.lock) {
                //TCG.hideLoading();//响应成功后清除之前的遮罩层
            }
        };
        return $.ajax(arguments);
    }
    ;
    /**
     * 加载指定语系的Properties文档,如果没有指定语系,
     * 并且cookie中也为找到以前存放的语系,默认为zh-CN
     * @param language
     * @param callback
     * @return
     */
    TCG.loadLanguageProperties = function (language, callback) {
        if (language == undefined || language == "undefined" || language == "") {
            language = "zh-CN";
        }
        $.i18n.properties({
            name: "message",
            path: "resource/",
            mode: "map",
            language: language,
            cache: true,
            callback: function () {
                if (callback) {
                    callback();
                }
            },
            error: function () {
                // TODO: handle error
            }
        });
    };

    /**
     * 根据KEY获取在Properties中的对应值
     * 列如Properties中如下定义
     * button.cancel.text=Cancel{0}Are you sure?
     * button.submit.text=Submit
     * 获取值时：
     * Yx.Prop("button.submit.text")
     * Yx.Prop("button.cancel.text",",")
     */
    TCG.Prop = $.i18n.prop;
    TCG.loadLanguageProperties();
    /**
     * DES 加密函数
     */
    TCG.desEncrypt = function (message, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    };
    /**
     * DES解密函数
     */
    TCG.desDecrypt = function (ciphertext, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        // direct decrypt ciphertext
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    /**
     * 时间格式化
     * @param t 毫秒值
     * @param fmt (hh:mm:ss 或者 mm:ss)
     * @returns {string}
     */
    TCG.fmtTimeTohhmmss = function (t, fmt) {
        var timeStr = '';
        if (!t) {
            t = 0;
        }
        if (fmt == 'hh:mm:ss') {
            var ss = Math.floor(t % 60);//当前数据%60=剩余秒
            var tm = Math.floor(t / 60);//当前数据/60=剩余总分钟
            var mm = Math.floor(tm % 60);//剩余总分钟%60=剩余分钟
            var hh = Math.floor(tm / 60);//剩余总分钟/60=剩余小时
            if (!ss || ss < 0) {
                ss = 0;
            }
            if (!mm || mm < 0) {
                mm = 0;
            }
            if (!hh || hh < 0) {
                hh = 0;
            }
            timeStr = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
        }
        if (fmt == 'mm:ss') {
            var ss = Math.floor(t % 60);//当前数据%60=剩余秒
            var mm = Math.floor(t / 60);//当前数据/60=剩余总分钟
            if (!ss || ss < 0) {
                ss = 0;
            }
            if (!mm || mm < 0) {
                mm = 0;
            }
            timeStr = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
        }
        return timeStr;
    };


    /*
     * return a date time format
     * @param time {Number}
     * @param type {String} - input: date return YYYY-MM-DD, dateTime return YYYY-MM-DD hh:mm:ss, MonthDateTime MM-DD hh:mm:ss
     * @return {String}
     */
    TCG.timeToDateFormat = function (time, type) {
        var temp_date = new Date(time);
        temp_date.setTime((temp_date.getTime() + (new Date().getTimezoneOffset() * 60000)) + 28800000);
        var type = type || "date",
            newDateFormat,
            date = temp_date,
            month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
            day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
            seconds = date.getSeconds(),
            minutes = date.getMinutes(),
            hour = date.getHours();

        switch (type) {
            case "date":
                newDateFormat = date.getFullYear() + "-" + month + "-" + day;
                break;
            case "dateTime":
                newDateFormat = date.getFullYear() + "-" + month + "-" + day + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
                break;
            case "MonthDateTime":
                newDateFormat = month + "-" + day + " " + (hour < 10 ? "0" + hour : hour ) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
                break;
            default:
        }
        return newDateFormat;
    }

    /**
     * get phone, browser and android/ios version
     * @return {Object} phone and browser info
     */
    TCG.getPhoneVersion = function () {
        var info = {};
        var browserVersion = function () {
            var ua = navigator.userAgent, tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[:]+(\d+)/g.exec(ua) || [];
                return 'IE' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

            M = M.join('');
            return M;
        };

        // set the browser version
        info.browser = browserVersion();

        var getPhoneType = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (getPhoneType.Android() || getPhoneType.BlackBerry() || getPhoneType.iOS() || getPhoneType.Opera() || getPhoneType.Windows());
            }
        };

        // get android information
        var phoneInfo = navigator.userAgent.split(" (")[1].split(") ")[0];

        /*if (getPhoneType.Android()) {
         phoneInfo = phoneInfo.split("; ");
         var phone = phoneInfo[1].split(" ");
         info.platform = phone[0];
         info.version = phone[1];
         info.modelNumber = phoneInfo[2];
         }

         // get IOS information
         if (getPhoneType.iOS()) {
         phoneInfo = phoneInfo.split(" ");
         var version = phoneInfo[4].replace(/_/g, ".");
         info.platform = phoneInfo[2];
         info.version = version;
         info.modelNumber = phoneInfo[3] + " " + version;
         }*/

        return {os: $.os, browser: $.browser}; //info; //$.os and $.browser
    };

    /**
     * 格式化数字并保留指定位小数,进行精度取值
     * value:需要格式化的数字字符串
     * t:保留的小数位数
     * m:是否进行四舍五入
     */
    TCG.formatNumber = function (value, t, m) {
        if (!m) {
            value = Math.round(value * 10000) / 10000;
        }
        var a = value + '', b, c, i, num = t;
        b = a.indexOf(".");
        c = a.length;
        if (num == 0) {
            if (b != -1) {
                a = a.substring(0, b);
            }
        } else {
            if (b == -1) {
                a = a + '.';
                for (i = 1; i <= num; i++) {
                    a = a + '0';
                }
            } else {
                a = a.substring(0, b + num + 1);
                for (i = c; i <= b + num; i++) {
                    a = a + '0';
                }
            }
        }
        return a;
    }
    /**
     * 阶乘计算函数
     * @param n
     * @returns {number}
     */
    TCG.factorial = function (n) {
        var vl = 1;
        for (var i = 1; i <= n; i += 1) {
            vl *= i;
        }
        return vl;
    }

    TCG.sameComparer = function (arg0, arg1) {
        var count = 0;
        var arr0, arr1;
        if (typeof arg0 == 'string' && typeof arg1 == 'string') {
            if (arg0 == "" || arg1 == "") {
                return count;
            }
            arg0 = arg0.replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, '$1_');
            arr0 = arg0.split("_");
            arg1 = arg1.replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, '$1_');
            arr1 = arg1.split("_");
        } else {
            arr0 = arg0;
            arr1 = arg1;
        }
        for (var i = 0; i < arr0.length; i++) {
            if (arr1.indexOf(arr0[i]) > -1) {
                count++;
            }
        }
        return count;
    }
    /**
     * object 是否为空，如果为空返回true,否则为false
     * @param obj
     * @returns {boolean}
     */
    TCG.isEmptyObject = function (obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
    /**
     * 随机生成指定的范围内的指定个数
     * @param start
     * @param end
     * @param step
     * @param sameBit
     */
    TCG.arrRandom = function (start, end, step, sameBit, isAddZero) {
        var original = new Array;//原始数组
        switch (sameBit) {
            case 3:
                for (var i = start; i <= end; i++) { //屏蔽三个连续相同的数字
                    if (!(/^(\d)\1\1$/.test(i))) {
                        original[i] = i;
                    }
                }
                break;
            case 2:
                for (var i = start; i <= end; i++) { //屏蔽两个连续相同的数字
                    if (!(/^(\d)\1$/.test(i))) {
                        original[i] = i;
                    }
                }
                break;
            case 0:
                for (var i = start; i <= end; i++) { //给原始数组original赋值
                    original[i] = i;
                }
                break;
        }
        original.sort(function () {
            return 0.5 - Math.random();
        });
        var ball = [];
        for (var i = 0; i < step; i++) {
            if (isAddZero) {
                ball.push(lott.addZero(original[i] + '', (end + '').length));
            } else {
                ball.push(original[i] + '');
            }
        }
        return ball;
    },
        TCG.numberRandom = function (start, end, n) {
            var rdmArray = [n];
            for (var i = 0; i < n; i++) {
                var rdm = 0;
                do {
                    var exist = false;//此随机数是否已存在
//                rdm = getRandom(minNum, maxNum);	//取得随机数
                    rdm = Math.floor(Math.random() * (end - start + 1)) + start;
                    if (rdmArray.indexOf(rdm) != -1) exist = true;
                } while (exist);	//产生没有出现过的随机数
                rdmArray[i] = rdm;
            }
            return rdmArray;
        }
    /**
     * 根据字符串长度自动补0
     * @param str
     * @param lengths
     * @returns {string}
     */
    TCG.addZero = function (str, len) {
        if (str.length > len * 1) {
            return '';
        }
        var strTmp = '';
        for (var i = 0; i < len * 1 - str.length; i++) {
            strTmp += '0';
        }
        return strTmp + str;
    }

    /**********************************************************
     Encode URI  and Encrypt RSA
     **********************************************************/
    TCG.encodeRSA = function (arr) {
        var encodedData = [];
        for (var i = 0; i < arr.length; i++) {
            encodedData.push(encodeURI(arr[i]));
        }
        console.log(arr);
        return {values: getEncryptedText(encodedData)};
    };

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    TCG.debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var k;
            // 1. Let O be the result of calling ToObject passing
            //    the this value as the argument.
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get
            //    internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If len is 0, return -1.
            if (len === 0) {
                return -1;
            }

            // 5. If argument fromIndex was passed let n be
            //    ToInteger(fromIndex); else let n be 0.
            var n = +fromIndex || 0;

            if (Math.abs(n) === Infinity) {
                n = 0;
            }

            // 6. If n >= len, return -1.
            if (n >= len) {
                return -1;
            }

            // 7. If n >= 0, then Let k be n.
            // 8. Else, n<0, Let k be len - abs(n).
            //    If k is less than 0, then let k be 0.
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            // 9. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the
                //    HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                //    i.  Let elementK be the result of calling the Get
                //        internal method of O with the argument ToString(k).
                //   ii.  Let same be the result of applying the
                //        Strict Equality Comparison Algorithm to
                //        searchElement and elementK.
                //  iii.  If same is true, return k.
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }

})(window, document, Zepto);
