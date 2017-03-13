var register = {
	init: function(){
		// register.getDefaultAgent();
		register.checkAffUrl();
	},
	getDefaultAgent: function(){
		tcg.lib.showLoading();
		WPS.getDefaultAgent(function(rs){
			tcg.lib.hideLoading();
			if(rs.success){
				globalVar.default=rs.value;
				register.submit();				
			}else{
				tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
			}
		});
	},
	checkAffUrl: function(){
		var hostname=window.location.hostname;
		var affCode=hostname.substring(0,hostname.indexOf(".",0));
		globalVar.expiredAffCode == false;
		globalVar.default = "";
		if(affCode!='www'){
			var data = { code: affCode };
			tcg.lib.showLoading();
			WPS.getAffiliate(data, function(rs){
				tcg.lib.hideLoading();
				if(rs.success){
					/*if( rs.value.qq != null ){
						//var url = rs.value.qq;
						// 	_link = "<li><a href='http://wpa.qq.com/msgrd?v=3&uin="+ url +"&site=qq&menu=yes' target='_blank'>联系代理</a></li>";
						// $("#csLink").after(_link);
						//console.log();
					}*/
					if( rs.errorCode == "expired.affiliate.url" ){
						tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
						globalVar.expiredAffCode = true;
						globalVar.default = "";
					}else{
						globalVar.default = affCode;
						globalVar.expiredAffCode = false;
					}
				}else{
					globalVar.expiredAffCode = false;
				}
				register.submit();				
			});
		}else{
			register.submit();				
		}	
	},	
	submit: function(){
		var form = $("#registerForm");
		form.find(".form-submit").unbind("click").bind("click", function(){
			var username = form.find("[name='username']");
			var password = form.find("[name='password']");
			var confirmPass = form.find("[name='confirmPass']");
			var qq = form.find("[name='qq']");
			var email = form.find("[name='email']");
			var mobile = form.find("[name='mobile']");
			var submitBtn = form.find(".form-submit");
			if(register.validateForm() == true && !submitBtn.hasClass("processing")){
				submitBtn.addClass("processing");
				var data = {
					"username": username.val(),
				  	"password": password.val(),
				  	"confirmPassword": confirmPass.val(),
				  	"email": email.val(),
				  	"mobileNum": mobile.val(),
				  	"qqNum": qq.val(),
				  	"affiliateCode": globalVar.default,
				  	"registerUrl": window.location.href, 
				  	"thirdPartyUrl": document.referrer, 
				  	"registerMethod": "WEB"
				};
				tcg.lib.showLoading();
				WPS.register(data, function(rs){
					tcg.lib.hideLoading();
					if(rs.success){
						tcg.lib.alert("success", "注册成功 <br /> 帐号："+username.val() , "", function(){
							tcg.lib.showLoading();
							var data = { "username": username.val(), "password": password.val(), "uuId": 11111 };
							WPS.login(data, function(rs){
								tcg.lib.showLoading();								
								if(rs.success){
									window.sessionStorage.setItem("token", rs.value.token);
									window.location.href="/";
								}else{
									submitBtn.removeClass("processing");
									tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
								}
							});
						});												
					}else{
						submitBtn.removeClass("processing");
						tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
					}
				})
			}
		});
	},
	validateForm: function(){
		var form = $("#registerForm");
		var username = form.find("[name='username']");
		var password = form.find("[name='password']");
		var confirmPass = form.find("[name='confirmPass']");
		var qq = form.find("[name='qq']");
		var email = form.find("[name='email']");
		var mobile = form.find("[name='mobile']");
		var terms = form.find("[name='reg_checkbox']");
		var isValid;
		if( globalVar.expiredAffCode == true ){
			tcg.lib.alert("errors", "Expired Aff. Code!");
			isValid=false;			
		}else if(username.val().split(0,5)[0] == "guest"){
			tcg.lib.alert("errors", "账号必须以字母开头，由4~16个之母或数字组成，而且不能以guest开头");
			isValid=false;
		}else if( username.val() == "" || !register.regExp("username", username.val()) ){
			tcg.lib.alert("errors", "账号必须以字母开头，由4~16个字母或数字组成");
			isValid=false;
		}else if( password.val() == "" || !register.regExp("password", password.val()) ){
			tcg.lib.alert("errors", "密码不能使用特殊字符，由 6 到 12 位数字或字母组成");
			isValid=false;
		}else if( confirmPass.val() !=  password.val() ){
			tcg.lib.alert("errors", "请再次输入密码,必须和上面输入的密码保持一致");
			isValid=false;
		}else if( qq.val() == "" || !register.regExp("qq", qq.val()) ){
			tcg.lib.alert("errors", "请输入正确的QQ号码");
			isValid=false;
		}else if( email.val() == "" || !register.regExp("email", email.val()) ){
			tcg.lib.alert("errors", "请输入正确的邮箱");
			isValid=false;
		}else if( mobile.val() == "" || !register.regExp("mobileNo", mobile.val()) ){
			tcg.lib.alert("errors", "请输入正确的手机号码");
			isValid=false;
		}else if( terms.is(":not(:checked)") ){
			tcg.lib.alert("errors", "请您阅读并同意《 用户协议 》后继续注册");
			isValid=false;
		}else{
			isValid=true;
		}
		return isValid;
	},
	// RegEX
	regExp: function(type, inputVal){
		var pattern;
		switch(type){
			case "email":
				pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z|a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
				break;
			case "remark":
				pattern = /^.{0,255}$/;
				break;
			case "alphaNum":
				pattern = /\w+/;
				break;
			case "username":
				pattern = /^[\w]{4,16}$/;
				break;
			case "password":
				pattern = /^[\w]{6,12}$/;
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
				pattern = /^[1-9]\d{4,9}$/;
				break;
			case "url":
				pattern = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
				break;
			default:
				return false;
		}	
		return pattern.test( inputVal );		
	}
}