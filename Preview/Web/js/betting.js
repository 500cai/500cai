var newMerchantCode;
if(window.localStorage.getItem("merchantCode") == undefined){
	newMerchantCode = "500cai";
}
else{
	newMerchantCode = window.localStorage.getItem("merchantCode");
}

var globalVar = {
	result:{},
	merchantCode: newMerchantCode,
	defaultAgent: "",
	getAddressResult: null,
	lottBetTimer:[],
	lottDrawNumberTimer:[],
	syncRate:1,
	quotaObj:[],
	globeRebate:[],
	currentLottery:{},
	headers: {},
	hotGameCount:8,
	activity:[],
	bankCardLengh: 0,
	BANK_CARD_MAX_LIMIT: 5,
	cid:"",
	messageRecipientList: [],
	messageSelectedRecipient: [],
	pvpGameWindows: null,
	fishingGameWindows: null,
	onlinePaymentWindows: null,
	channelPaymentWindows: null,
	walletList: {},
	affCode: "",
	games:[],
	expiredAffCode: false	
};
var betting = {
	init: function(){
		betting.form();
		betting.events();
		control_betting.init();
		betting.lobby_page();
		betting.getSystemAnnouncements();
	},
	form: function(){
		// Submit Form On Enter
		$(document).off("keyup", "form .form-control").on("keyup", "form .form-control", function(e){
			if(e.which == 13){
				$(this).parents("form").find(".form-submit").click();
			}
		});
	},
	interval: function(){	
	    setInterval(function(){
	    	control_betting.sessionTouch();
	    }, 180000);
	},
	events: function(){

		$(document).off("click", "#header_user_login .download").on("click", "#header_user_login .download", function(elem){
			window.opener.CallParent();
		});
		$(document).off("click", "#mCSB_1_container ul li a").on("click", "#mCSB_1_container ul li a", function(elem){
			var element = $(elem.target);
			if(element.attr("game") == "true"){
			control_betting.launchGame(elem.target.title);
			}
		});
		$(document).off("click", "#_lottery_menu_head button").on("click", "#_lottery_menu_head button", function(elem){
			if(elem.target.className == "_close" || elem.target.className == "_open"){
				if($("#_lottery_menu_head div[name='hide']").hasClass("hide")){
					$(this).removeClass("_open");
					$(this).addClass("_close");
					$("#_lottery_menu_head div[name='hide']").removeClass("hide");

				}
				else{
					$(this).addClass("_open");
					$(this).removeClass("_close");
					$("#_lottery_menu_head div[name='hide']").addClass("hide");
				}
			}
			else{

				var modal=$(this).attr("data-modal");
				if(modal!=undefined&&modal!=null&&modal!=''){
					if(globalVar.merchantCode == "500caitrial"){
						tcg.lib.alert("alerts","抱歉，试玩账号不能操作该功能！");
					}
					else{
						if(window.sessionStorage.getItem("isLogin")=='false' && $(this).hasClass('login_required')){
	                	TCG.Alert("alerts","您还未登录,请先登录!");
	                	return;
	            	}
					var tmp=modal.split("/");
					if(tmp[0]=='customerservice'){
						betting.customerService();
						return;
					}
					var txt=UI_500vip.popupsModel(tmp[0]);
					window.sessionStorage.setItem("mainMenu",tmp[0]);
					tcg.lib.open({text:txt,width:'1274px',height:'600px'},function(){
						UI_500vip.checkUserType();
						betting.popupsModelMenu(tmp[0]);
						betting.popupSubMenu(tmp[0]);
						if(tmp.length>1){
							$('.model_child_menus li[data-submenu="'+tmp[1]+'"]').trigger('click');
						}else{
							$('.model_child_menus li:first-child').trigger('click');
						}
						betting.closePopOnESC("on");
					},function(){
						betting.closePopOnESC("off");
						window.sessionStorage.removeItem("mainMenu");
						window.sessionStorage.removeItem("childMenu");
					});
					}
					

			}
			
			}
		});
		$(document).off("click", "#mCSB_1_container ul").on("click", "#mCSB_1_container ul", function(elem){
			//console.log("here: "+JSON.stringify(elem.target))
			var childUl = $(elem.target.parentNode.parentNode.childNodes[3]);
			var iconChild = $(elem.target.parentNode.childNodes[0]);
			var childUl2 = $(elem.target.parentNode.parentNode.parentNode.childNodes[3]);
			if(elem.target.className == "nav-btn"){
				if(childUl.attr("hidden") == "hidden"){
					childUl.removeAttr("hidden");
					iconChild.removeClass("icon-attr-down")
					iconChild.addClass("icon-attr-up")
				}
				else{
					childUl.attr("hidden","");
					iconChild.addClass("icon-attr-down")
					iconChild.removeClass("icon-attr-up")
				}
			}
		});

		$(document).off("click", "#mCSB_1_container div div").on("click", "#mCSB_1_container div div", function(elem){
			//console.log("here: "+elem.target.className)
			var childUl = $(elem.target.parentNode.childNodes[3]);
			var iconChild = $(elem.target.childNodes[0]);
			var childUl2 = $(elem.target.parentNode.parentNode.parentNode.childNodes[3]);
			var childUl3 = $(elem.target.parentNode.parentNode.childNodes[3]);
			if(elem.target.className == "main-tit" || elem.target.className == "main-top" || elem.target.className == "gao-ul"){
				
					if(iconChild.hasClass("icon-hall-icon")){

					}
					else{
						if(childUl.attr("hidden") == "hidden"){

							childUl.removeAttr("hidden");
							iconChild.removeClass("icon-attr-down")
							iconChild.addClass("icon-attr-up")
						}
						else{
							childUl.attr("hidden","");
							iconChild.addClass("icon-attr-down")
							iconChild.removeClass("icon-attr-up")
						}
					}
			}
			else if(elem.target.className == "icon-attr-down"|| elem.target.className == "icon-attr-up"){

						if(childUl3.attr("hidden") == "hidden"){

							childUl3.removeAttr("hidden");
							$(elem.target).removeClass("icon-attr-down")
							$(elem.target).addClass("icon-attr-up")
						}
						else{
							childUl3.attr("hidden","");
							$(elem.target).addClass("icon-attr-down")
							$(elem.target).removeClass("icon-attr-up")
						}
			}
			else if(elem.target.className == "lot-text"){
				if(childUl2.attr("hidden") == "hidden"){
					childUl2.removeAttr("hidden");
					iconChild.removeClass("icon-attr-down")
					iconChild.addClass("icon-attr-up")
				}
				else{
					childUl2.attr("hidden","");
					iconChild.addClass("icon-attr-down")
					iconChild.removeClass("icon-attr-up")
				}
			}
			//console.log("here: "+elem.target.parentNode.parentNode.childNodes[3].id);	
		});
		$(document).off("click", ".live-logo").on("click", ".live-logo", function(elem){
			//console.log("click."+elem.target.innerHTML);
			window.close();
			//window.open("/?token="+window.sessionStorage.getItem("token") ,"_self");
		});
		$(document).off("click", "#gameLobby").on("click", "#gameLobby", function(elem){
			control_betting.launchGame("lobby");
		});
		$(document).off("click", "#customerService").on("click", "#customerService", function(elem){
			betting.customerService();
		});
	},
	login: function(){
		var form = $("#loginForm");
		var submit = form.find(".form-submit");
		submit.unbind("click").bind("click", function(){
			var username = form.find("[name='username']");
			var password = form.find("[name='password']");
			var data2;
			if(username.val().split(0,5)[0] == "guest"){
				data2 = true;
			}
			else{
				data2 = false;
			}
			if(!submit.hasClass("processing")){
				tcg.lib.showLoading();
				submit.addClass("processing");
				var data = {
					"username": username.val(),
					"password": password.val(),
  					"uuId": 11111
				};
				control_betting.login(data, function(rs){
					if(rs.success){
						window.sessionStorage.setItem("token", rs.value.token);
						window.localStorage.setItem("token", rs.value.token);
						//window.location.href="/";
						betting.lobby_page();
					}else{
						tcg.lib.Alert("errors", tcg.lib.prop(rs.errorCode));
					}
					tcg.lib.hideLoading();
					submit.removeClass("processing");
				}, data2);
			}
		});
	},
	lobby_page: function(){
		window.sessionStorage.setItem("isLogin",false);
		betting.checkLogin(function(rs){
			// Init Member/Agent Center

			if(rs.success){
			//control_betting.getMemberInfo();
			control_betting.getAllWalletBalance();
			//member_center.init();
				// UI.lotteryMenus();
				//betting.afterLogin(rs.value);
				$('#header_user_login').attr("hidden","");
				$('#header_user').removeAttr("hidden");
				betting.interval();
			}else{
				window.sessionStorage.clear();
				window.localStorage.clear();
				betting.login();
				$('#header_user_login').removeAttr("hidden");
				$('#header_user').attr("hidden","");

			}

		betting.pageMenu(".user-center ul li");
			//control_500vip.carousel();
			//control_500vip.getAgentAnnouncements();
			//control_500vip.getPromotionAnnouncements('home');
			//control_500vip.lobby();


		});
	},	
	checkLogin: function(callback){
		if(window.localStorage.getItem("token") != null || window.sessionStorage.getItem("token") != null){
		control_betting.getMemberInfo(function(rs){
			if(rs.success){
				window.sessionStorage.setItem("isLogin", true);
				window.sessionStorage.setItem("isAgent",rs.value.type);
				window.sessionStorage.setItem("nickname",rs.value.nickname);
				window.sessionStorage.setItem("username",rs.value.account);
				window.sessionStorage.setItem("customerId",rs.value.id);	
				$('#user_name')[0].innerHTML = rs.value.account;		
			}
			callback(rs);
		});
	}
	},
	getSystemAnnouncements: function(){
		control_betting.getSystemAnnouncements(function(rs){
			if(rs.success){
				UI_500vip.loadSystemAnnouncements(rs.value);
			}else{
				tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
			}
		});
	},
	pageMenu:function(selector){
		$(document).off("click", selector).on("click", selector, function(){

			if(globalVar.merchantCode == "500caitrial" && $(this).html() == '<a><i class="icon-Shape-47"></i>消息中心</a>' ){
				tcg.lib.alert("alerts","抱歉，试玩账号不能操作该功能！");
			}
			else{
			var modal=$(this).attr("data-modal");
			if(modal!=undefined&&modal!=null&&modal!=''){
				if(window.sessionStorage.getItem("isLogin")=='false' && $(this).hasClass('login_required')){
                	tcg.lib.alert("errors","您还未登录,请先登录!");
                	return;
            	}
				var tmp=modal.split("/");
				if(tmp[0]=='customerservice'){
					betting.customerService();
					return;
				}
				var txt=UI_500vip.popupsModel(tmp[0]);
				window.sessionStorage.setItem("mainMenu",tmp[0]);
				tcg.lib.open({text:txt,width:'1274px',height:'600px'},function(){
					UI_500vip.checkUserType();
					betting.popupsModelMenu(tmp[0]);
					betting.popupSubMenu(tmp[0]);
					if(tmp.length>1){
						$('.model_child_menus li[data-submenu="'+tmp[1]+'"]').trigger('click');
					}else{
						$('.model_child_menus li:first-child').trigger('click');
					}
					betting.closePopOnESC("on");
				},function(){
					betting.closePopOnESC("off");
					window.sessionStorage.removeItem("mainMenu");
					window.sessionStorage.removeItem("childMenu");
				});
			}
		}
		});
	},
	popupsModelMenu:function(menu){
		$(document).off("click",".model_main_menus dt, .model_main_menus dd").on("click",".model_main_menus dt, .model_main_menus dd",function(){
			var menu = $(this).attr("data-modal").split("/");
			var model=menu[0];
			if(model==window.sessionStorage.getItem("mainMenu")){
				return;
			}
			window.sessionStorage.setItem("mainMenu",model);
			if(model!=undefined&&model!=null&&model!=''){
				if(window.sessionStorage.getItem("isLogin")=='false'&&model!='customerservice'&&model!='help'&&model!='activity'){
					tcg.lib.alert("errors",tcg.lib.prop("login_failed"));
					return;
				}
				if(model=='customerservice'){
					betting.customerService();
					return;
				}
				$(".model_child_menus").html(UI_500vip.modalSubMenu(model));
				betting.popupSubMenu(menu);
				if( menu[1] != undefined ){
					$(".model_child_menus li[data-submenu='" +menu[1]+ "']").trigger('click');
				}else{
					$('.model_child_menus li:first-child').trigger('click');
				}
			}
		});
	},
	popupSubMenu:function(menu){
		$(document).off("click",".model_child_menus li").on("click",".model_child_menus li",function(){
				var submenu=$(this).attr("data-submenu");
				if(submenu==window.sessionStorage.getItem("childMenu")){
					return;
				}
				window.sessionStorage.setItem("childMenu",submenu);
				$(".model_child_menus li").removeClass("sub-act");
				if(submenu!=undefined&&submenu!=null&&submenu!=''){
					if(menu == "agent"){
						tcg.ac.lott[submenu](".model_child_content", "lott")
					}
					else if(menu == "help"){
						$(".model_child_content").prepend('<div id="loading"></div>')
						tcg.lib.ajax({id:".model_child_content",url:"./xml/"+submenu+".xml",dataType:'html'},function(){
							UI.loadUserInfo();
							// Activate Clicked Submenu
							var functions=new Function('return control.'+submenu+'();');
							//functions();
							$.when(functions()).done(function(){
								$("div.model_child_content #loading").remove();
							})
						});
					}
					else{
						tcg.mc.lott[submenu](".model_child_content", "lott")
					}
					
					$('.model_child_menus li[data-submenu="'+submenu+'"]').addClass("sub-act");
				}
			
		});
	},
	closePopOnESC: function(type){
		if(type == "on"){
			$(document).on("keyup", function(e){
				if(e.keyCode == 27) $("#popup_close").click();
			});
		}else{
			$(document).off("keyup");
		}
	},	
	customerService: function(){
		var cServiceURL = globalVar.customerServiceLink;
	   // Fixes dual-screen position                         Most browsers      Firefox
	   var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	   var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	   var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	   var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	   var left = ((width / 2) - (800 / 2)) + dualScreenLeft;
	   var top = ((height / 2) - (560 / 2)) + dualScreenTop;
	   var newWindow = window.open(cServiceURL, "CustomerService", 'resizable= no, menubar=no, status=no, toolbar=no, scrollbars=no, width=800, height=560, top=' + top + ', left=' + left);

	   // Puts focus on the newWindow
	   if (window.focus) {
		   newWindow.focus();
	   }
	},
}
betting.init();