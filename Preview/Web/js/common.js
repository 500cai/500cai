var common = {
	init: function(){
		var path;

		if(window.location.hash != ""){
			path = window.location.hash;
		}
		else{
			path = window.location.search;
		}
		    var res = path.split("?")[1];
			var data = ""+res;
		function queryStringToJSON(queryString) {
		  if(queryString.indexOf('?') > -1){
		    queryString = queryString.split('?')[1];
		  }
		  var pairs = queryString.split('&');
		  var result = {};
		  pairs.forEach(function(pair) {
		    pair = pair.split('=');
		    result[pair[0]] = decodeURIComponent(pair[1] || '');
		  });
		  return result;
		}

		common.form();
		common.lobby_page();
	},
	form: function(){
		// Submit Form On Enter
		$(document).off("keyup", "form .form-control").on("keyup", "form .form-control", function(e){
			if(e.which == 13){
				$(this).parents("form").find(".form-submit").click();
			}
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
				WPS.login(data, function(rs){
					if(rs.success){
						
						window.sessionStorage.setItem("token", rs.value.token);
						if(window.location.pathname == "/login.html"){
									window.location.href="/";
							/*tcg.lib.alert("success", "", function(){
									window.location.href="/";
								});*/
						}
						else{
						//window.location.href="/";
						common.lobby_page();
						}
					}else{
						tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
					}
					tcg.lib.hideLoading();
					submit.removeClass("processing");
				}, data2);
			}
		});
	},
	checkLogin: function(callback){
		if(window.localStorage.getItem("token") != null || window.sessionStorage.getItem("token") != null){
		WPS.getMemberInfo(function(rs){
			if(rs.success){
				window.sessionStorage.setItem("isLogin", true);
				window.sessionStorage.setItem("isAgent",rs.value.type);
				window.sessionStorage.setItem("nickname",rs.value.nickname);
				window.sessionStorage.setItem("username",rs.value.account);
				window.sessionStorage.setItem("customerId",rs.value.id);	
				//$('#user_name')[0].innerHTML = rs.value.account;
				$("#header_user span")[0].innerHTML = "您好, "+rs.value.account+"  |  "	;
			}
			callback(rs);
		});
		}
		else{
			var rs = {success:false};
			callback(rs)
		}

	},
	lobby_page: function(){
		window.sessionStorage.setItem("isLogin",false);
		common.checkLogin(function(rs){
			// Init Member/Agent Center

			if(rs.success){
				common.getAllWalletBalance();
				$('#header_user_login').attr("hidden","");
				$('#header_user').removeAttr("hidden");
			
			}else{
				window.sessionStorage.clear();
				window.localStorage.clear();
				common.login();
				$('#header_user_login').removeAttr("hidden");
				$('#header_user').attr("hidden","");

			}
			common.loadMenuButtons();
			common.pageMenu(".top_login span a");
			control_500vip.getCustomerSeries();
        	control_500vip.getPopularGames();	
			//control_500vip.carousel();
			//control_500vip.getAgentAnnouncements();
			common.getSystemAnnouncementsLoader();
			//control_500vip.pageMenu("#header_user td a");
			//control_500vip.getPromotionAnnouncements('home');
			common.lobby();


		});
	},
	getAllWalletBalance: function(callback){

		WPS.getAllWalletBalance(function(rs){
			if(rs.success){
				for(var i = 0; i < rs.value.balances.length; i++){
					if(rs.value.balances[i].accountName == "LOTT"){
						$('#balance')[0].innerHTML = "￥"+rs.value.balances[i].availBalance;
					}
				}
			}else{
			}
		});
	},
	lobby:function(){

		$(document).off("focus", "#loginForm [name='username']").on("focus", "#loginForm [name='username']", function(elem){
					$("#loginForm [name='username']").attr("placeholder", "")
				});
		$(document).off("focusout", "#loginForm [name='username']").on("focusout", "#loginForm [name='username']", function(elem){
					$("#loginForm [name='username']").attr("placeholder", "用户名: ")
				});
		$(document).off("focus", "#loginForm [name='password']").on("focus", "#loginForm [name='password']", function(elem){
					$("#loginForm [name='password']").attr("placeholder", "")
				});
		$(document).off("focusout", "#loginForm [name='password']").on("focusout", "#loginForm [name='password']", function(elem){
					$("#loginForm [name='password']").attr("placeholder", "密码： ")
				});
		$(document).off("click", ".nav-plus li a").on("click", ".nav-plus li a", function(elem){
			//console.log("click."+elem.target.innerHTML);
			if(elem.target.innerHTML == "购彩大厅"){
			window.open("lobby.html?token="+window.sessionStorage.getItem("token")+"&default=YES" ,"betting", "height=1000,width=1610");
			}
			else if(elem.target.innerHTML == "手机购彩"){
			window.open("mobile.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "优惠活动"){
			window.open("promotion.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "开奖公告"){
			window.open("draw.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "走势图表"){
			window.open("trendList.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "资讯"){
			window.open("news.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "首页"){
			window.open("/","_self");
			}
		});
		$(document).off("click", ".quick-list a").on("click", ".quick-list a", function(elem){
			//console.log("click."+elem.target.innerHTML);
			if(elem.target.innerHTML == "代理"){
			window.open("agentInvestment.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "玩法"){
			window.open("rule-index.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "帮助"){
			window.open("helpInfo.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if(elem.target.innerHTML == "客服"){
			control_500vip.customerService();
			//window.open("draw.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			
		});
		$(document).off("click", ".sprite-logo").on("click", ".sprite-logo", function(elem){
			//console.log("click."+elem.target.innerHTML);
			window.open("/","_self");
		});
		$(document).off("click", "._float_AD div[name='close_btn']").on("click", "._float_AD div[name='close_btn']", function(elem){
			$(this).parent().attr("hidden","")
			
		});
		$(document).off("click", "#_rightAD .top1_btn").on("click", "#_rightAD .top1_btn", function(elem){
			control_500vip.customerService();
			
		});
		
		$(document).off("click", "#_leftAD .top2_btn").on("click", "#_leftAD .top2_btn", function(elem){
			window.open("/regPlay.html","_self");
			
		});
		$(document).off("click", "#header_money_refresh").on("click", "#header_money_refresh", function(){
				control_500vip.getAllWalletBalance();
		});

		$(document).off("click", "#lottery-list-box a").on("click", "#lottery-list-box a", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			window.open("lobby.html?token="+window.sessionStorage.getItem("token")+"&gameCode="+$(this).attr("data") ,"betting", "height=1000,width=1610");
		});
		$(document).off("click", ".notice-main a").on("click", ".notice-main a", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			window.open("lobby.html?token="+window.sessionStorage.getItem("token")+"&gameCode="+$(this).attr("data") ,"betting", "height=1000,width=1610");
		});

	},
	getSystemAnnouncementsLoader: function(){
		WPS.getSystemAnnouncements(function(rs){
			if(rs.success){
				common.loadSystemAnnouncements(rs.value);
			}else{
				tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
			}
		});
	},
	loadSystemAnnouncements: function(data){
		var list = data.contentLobby;
		var _html = "";
		var arr = [];
		for(var i=0; i<list.length; i++){
			arr.push(list[i].content);
		}
		_html+=arr.join(", ");
		$("#sys_tip").text(_html);		
	},
	loadMenuButtons: function(){
		var html='<span>';
		html+='&nbsp;|&nbsp;';
        if(globalVar.merchantCode == "500caitrial"){
		html+='<a data-modal="personal/gameHistory">投注记录</a>&nbsp;|&nbsp;';
        }
        else{ 
		html+='<a data-modal="personal">用户中心</a>&nbsp;|&nbsp;';
		html+='<a data-modal="deposit">充值</a>&nbsp;|&nbsp;';
		html+='<a data-modal="withdrawal">提现</a>&nbsp;|&nbsp;';
		html+='<a data-modal="personal/transactionDetails">交易记录</a>&nbsp;|&nbsp;';
		html+='<a data-modal="message/inbox">个人消息</a>&nbsp;|&nbsp;';
        }
		html+='<a clas="logout">退出</a>&nbsp;';
		html+='</span>';
		$($('.top_login span')[7]).html(html);
	},
	pageMenu:function(selector){
		$(document).off("click", selector).on("click", selector, function(){

			var modal=$(this).attr("data-modal");
			if(modal!=undefined&&modal!=null&&modal!=''){
				if(window.sessionStorage.getItem("isLogin")=='false' && $(this).hasClass('login_required')){
                	tcg.lib.alert("errors","您还未登录,请先登录!");
                	return;
            	}
				var tmp=modal.split("/");
				if(tmp[0]=='customerservice'){
					control_500vip.customerService();
					return;
				}
				var txt=UI_500vip.popupsModel(tmp[0]);
				window.sessionStorage.setItem("mainMenu",tmp[0]);
				tcg.lib.open({text:txt,width:'1274px',height:'600px'},function(){
					UI_500vip.checkUserType();
					control_500vip.popupsModelMenu(tmp[0]);
					control_500vip.popupSubMenu(tmp[0]);
					if(tmp.length>1){
						$('.model_child_menus li[data-submenu="'+tmp[1]+'"]').trigger('click');
					}else{
						$('.model_child_menus li:first-child').trigger('click');
					}
					control_500vip.closePopOnESC("on");
				},function(){
					control_500vip.closePopOnESC("off");
					window.sessionStorage.removeItem("mainMenu");
					window.sessionStorage.removeItem("childMenu");
				});
			}
		});
	},
}
common.init();