var control_500vip = {
	checkLogin: function(callback){
		if(window.localStorage.getItem("token") != null || window.sessionStorage.getItem("token") != null){
				WPS.getMemberInfo(function(rs){
				if(rs.success){
					window.sessionStorage.setItem("isLogin", true);
					window.sessionStorage.setItem("isAgent",rs.value.type);
					window.sessionStorage.setItem("nickname",rs.value.nickname);
					window.sessionStorage.setItem("username",rs.value.account);
					window.sessionStorage.setItem("customerId",rs.value.id);
					window.sessionStorage.setItem('token', rs.value.token);
					globalVar.userAccountInfo = rs.value.type;	
					control_500vip.interval();		
				}
				callback(rs);
			});

		}
		else{
			var rs = {status:"failed"};
			callback(rs)
		}
		
	},
	interval: function(){	
	    setInterval(function(){
	    	control_500vip.sessionTouch();
	    }, 180000);
	},
	requestHandler: function(data){
		data.error(function(httpObj, textStatus) {
		    if(httpObj.status==401){
		        //warning(data);
		        //var result = JSON.parse(httpObj.responseText);
		        
		        // if(result.errorCode == "user.or.token.invalid"){
		        // 	localStorage.clear();
		        // 	window.localStorage.setItem("t", httpObj.responseText);
		        // }

		        tcg.lib.alert("errors", tcg.lib.prop("login.not.session"));
		        $('#wl_lott')[0].style.display = "none";
				window.sessionStorage.clear();
				window.localStorage.clear();
				betting.login();
				$('#header_user_login').removeAttr("hidden");
				$('#header_user').attr("hidden","");

		    }
		    else if(httpObj.status==500){
		        var result = JSON.parse(httpObj.responseText);
				var newMessage = result.errorCode;//JSON.parse(result.responseText).errorCode;
				
		        tcg.lib.alert("errors", tcg.lib.prop(result.errorCode));
		    }
		    else{
		        console.log("success")
		    }
		});
	},
	lobby_page: function(){
		window.sessionStorage.setItem("isLogin",false);
		control_500vip.checkLogin(function(rs){
			// Init Member/Agent Center

			if(rs.success){
			//member_center.init();
				// UI.lotteryMenus();
				//control_500vip.getAllWalletBalance();
				UI_500vip.afterLogin(rs.value);
			}else{
				window.sessionStorage.clear();
				window.localStorage.clear();
				UI_500vip.login();
			}
			//control_500vip.carousel();
			control_500vip.form();
			control_500vip.getAgentAnnouncements();
			control_500vip.getSystemAnnouncements();
			control_500vip.pageMenu("#header_user td a");
			control_500vip.getPromotionAnnouncements('home');
			control_500vip.lobby();
			control_500vip.draw();
		});
	},	
	getSystemAnnouncements: function(){
		WPS.getSystemAnnouncements(function(rs){
			if(rs.success){
				UI_500vip.loadSystemAnnouncements(rs.value);
			}else{
				tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
			}
		});
	},
	getAgentAnnouncements: function(){
		var data = {
			merchantCode: globalVar.merchantCode,
			type: "M",
			category: "P"
		};

		var isAgent = parseInt(window.sessionStorage.getItem('isAgent'));
		var isLogin = Boolean(window.sessionStorage.getItem('isLogin'));

		if(isLogin && isAgent > 0 && isAgent != null){
			data = { merchantCode: globalVar.merchantCode };
		}		

		WPS.getAgentAnnouncements(data, function(rs){
			if(rs.success){
				UI_500vip.loadAgentAnnouncements(rs.value);
			}else{
				tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
			}
		});
	},
	openAgentAnnouncement: function(){
		$("#agentAnnouncementList a").unbind("click").bind("click", function(){
			var modal=$(this).attr("data-modal");
			var content=$(this).attr("data-content");
			window.sessionStorage.setItem("activity",content);
			var tmp=modal.split("/");
			var txt=UI_500vippopupsModel(tmp[0]);
			tcg.lib.open({text:txt,width:'1274px',height:'600px'},function(){
				UI_500vipcheckUserType();
				control_500vip.popupsModelMenu();
				control_500vip.popupSubMenu();
				window.sessionStorage.setItem("childMenu","");
				if(tmp.length>=1){
					$('.model_child_menus li[data-submenu="'+tmp[1]+'"]').trigger('click');
				}else{
					$('.model_child_menus li:first-child').trigger('click');
				}
				control.closePopOnESC("on");
			}, function(){
				control.closePopOnESC("off");				
			});			
		});
	},
	login: function(){
		var form = $("#loginForm");
		var submit = form.find(".form-submit");
		submit.unbind("click").bind("click", function(){
			var username = form.find("[name='username']");
			var password = form.find("[name='password']");
			var captcha = form.find("[name='captcha']");
			var data2;
			if(username.val().slice(0,5) == "guest"){
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
						window.localStorage.setItem('token', rs.value.token);
						window.location.href="/";
					}else{
						tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
					}
					tcg.lib.hideLoading();
					submit.removeClass("processing");
				}, data2);
			}
		});
	},
	logout: function(){
		$("#logout").unbind("click").bind("click", function(){
			tcg.lib.confirm(tcg.lib.prop("logout"), "XL", function(ok){
				if(ok){
					tcg.lib.showLoading();					
					WPS.logout(function(rs){
						window.sessionStorage.clear();
						window.localStorage.clear();
						window.location.href="/";				
					});
				}
			});
		});
	},
	carousel: function(){
		$("#carousel").carouFredSel({
			circular: true,
			auto: {
				duration: 1000,
	            pauseOnHover: true,
	            width: "702px"
			},
			pagination: {
				pauseOnHover: true,
				container: "#sliderNav",
				anchorBuilder: function(nr, item) {
    				return "<li class='pic_logo'><a href='#"+nr+"' class='nav'>"+nr+"</a></li>";
				}
			}
		});
	},
	pageMenu:function(selector){
		$(document).off("click", selector).on("click", selector, function(){
			if(globalVar.merchantCode == "500caitrial" && $(this).html() == "充值" || globalVar.merchantCode == "500caitrial" && $(this).html() == "提现" || globalVar.merchantCode == "500caitrial" && $(this).html() == "个人讯息"){
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
			}
			
		});
	},
	agentClick:function(elem, elem2){
			if(elem.target.innerHTML == "代理"){
			//window.open("register.html","_self");
			if(globalVar.userAccountInfo != "0"){
				var modal=elem2.attr("data-modal");
				if(modal!=undefined&&modal!=null&&modal!=''){
					if(window.sessionStorage.getItem("isLogin")=='false' && $(this).hasClass('login_required')){
	                	tcg.lib.alert("alerts","您还未登录,请先登录!");
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
			}
			else{
			window.open("agentInvestment.html?token="+window.sessionStorage.getItem("token") ,"_self");
			}

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

			
	},
	lobby:function(){
		$(document).off("click", "#forgotPasswordForm .form-submit")
				   .on("click", "#forgotPasswordForm .form-submit", function(){
			var form = $("#forgotPasswordForm"),
				formInput = form.find(".form-control"),
				resetBtn = form.find(".reset-btn"),
				submitBtn = form.find(".submit-btn");
			control_500vip.validateFormInput(formInput, function(invalid, data){
				if( invalid > 0 ){
					for(var i=0; i < data.length; i++){
						if(data[i].invalid.length > 0){
							var message = "forgotPassword_error_" + data[i].elem.attr("name") +"_"+ data[i].invalid[0].replace("data-","");
							break;
						}
					}
					tcg.lib.alert("errors",tcg.lib.prop(message));		
				}else{
					var merchantCode = globalVar.merchantCode,
						username = form.find("[name='username']"),
						email = form.find("[name='email']"),
						encryptValues = {username:username.val(), email:email.val()},
						data = encryptValues;
						//data = { values: encryptValues };
					submitBtn.attr("disabled",true);
					control_500vip.forgotPassword(data);
					submitBtn.attr("disabled",false);
				}
			});
		});
		$(document).off("click", ".forgotPass").on("click", ".forgotPass", function(){
			var txt=UI_500vip.forgotPassword();
			tcg.lib.open({text:txt,width:'489px',height:'405px'},function(){
				control_500vip.closePopOnESC("on");
			}, function(){
				control_500vip.closePopOnESC("off");				
			});
		});
		$(document).off("click", "#slides").on("click", "#slides", function(){
			window.open("promotion.html","_self");
		});
		$(document).off("click", "#refreshBalance").on("click", "#refreshBalance", function(){
				control_500vip.getAllWalletBalance();
		});
		$(document).off("click", ".bztz").on("click", ".bztz", function(){
				
			window.open("trendList.html","_self")
		});
		$(document).off("click", ".nav-plus li a").on("click", ".nav-plus li a", function(elem){
			//console.log("click."+elem.target.innerHTML);
			if(elem.target.innerHTML == "购彩大厅"){
			window.open("lobby.html?token="+window.sessionStorage.getItem("token")+"&gameCode="+"CQSSC"+"&default=YES" ,"betting", "height=1000,width=1610");
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
			window.open("/?token="+window.sessionStorage.getItem("token") ,"_self");
			}
		});
		$(document).off("click", "#lottery-list-box a").on("click", "#lottery-list-box a", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			window.open("lobby.html?token="+window.sessionStorage.getItem("token")+"&gameCode="+$(this).attr("data") ,"betting", "height=1000,width=1610");
		});
		$(document).off("click", ".notice-main a").on("click", ".notice-main a", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			if($(this).html() == "走势"){
				window.open("draw.html", "_self");
			}
			else{
				window.open("lobby.html?token="+window.sessionStorage.getItem("token")+"&gameCode="+$(this).attr("data") ,"betting", "height=1000,width=1610");
			}
			
		});
		$(document).off("mouseover", ".tab-sel").on("mouseover", ".tab-sel", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			$(".notice-tab li").removeClass('on');
			$(this).addClass('on');
			if(elem.target.innerHTML == "高频" || elem.target.innerHTML == "<a>高频</a>"){
				$('#tab-cont-1').removeAttr("hidden");
				$('#tab-cont-2').attr("hidden","");
			}
			else{
				$('#tab-cont-2').removeAttr("hidden");
				$('#tab-cont-1').attr("hidden","");
			}
		});
		$(document).off("click", ".tab-sel1 a").on("click", ".tab-sel1 a", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			window.open("draw.html?token="+window.sessionStorage.getItem("token") ,"_self");
		});

		$(document).off("mouseover", ".quick-tab-list li").on("mouseover", ".quick-tab-list li", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			var thisVar = $(this);
			globalVar.mouseOverTimer = setTimeout(function(){ 

			$(".quick-tab-list li").removeClass('on');
			thisVar.addClass('on');
			
			control_500vip.clearLottDrawNumberTimer();
			control_500vip.drawGameId(thisVar.attr("data-gameid"));

			 }, 300);


		});
		$(document).off("mouseout", ".quick-tab-list li").on("mouseout", ".quick-tab-list li", function(elem){
			clearTimeout(globalVar.mouseOverTimer)

		});
		$(document).off("click", "._float_AD div[name='close_btn']").on("click", "._float_AD div[name='close_btn']", function(elem){
			$(this).parent().attr("hidden","")
			
		});
		$(document).off("click", "#agentAnnouncementList a").on("click", "#agentAnnouncementList a", function(elem){
			window.open("news.html?token="+window.sessionStorage.getItem("token") ,"_self");
			
		});
		$(document).off("mouseover", ".help-tab li").on("mouseover", ".help-tab li", function(elem){
			//console.log("click: "+elem.target.innerHTML);
			$(".help-tab li").removeClass('on');
			$(this).addClass('on');
			if(elem.target.innerHTML == "网站公告" || elem.target.innerHTML == '<a class="web-notice">网站公告</a>'){
				
				$('#cont_help_hot').removeAttr("hidden");
				$('#cont_help_newer').attr("hidden","");
			}
			else{
				$('#cont_help_newer').removeAttr("hidden");
				$('#cont_help_hot').attr("hidden","");
			}
			
		});
		$(document).off("click", "#drawContent .dg-tz-btn").on("click", "#drawContent .dg-tz-btn", function(elem){
			window.open("lobby.html?token="+window.sessionStorage.getItem("token")+"&gameCode="+$(this).attr("data") ,"betting", "height=1000,width=1500");

			
		});
		$(document).off("click", ".quick-list a").on("click", ".quick-list a", function(elem){
			//console.log("click."+elem.target.innerHTML);
			control_500vip.agentClick(elem, $(this));
			
		});
		$(document).off("click", "#_rightAD .top1_btn").on("click", "#_rightAD .top1_btn", function(elem){
			control_500vip.customerService(elem);
			
		});
		
		$(document).off("click", "#_leftAD .top2_btn").on("click", "#_leftAD .top2_btn", function(elem){
			window.open("/regPlay.html","_self");
			
		});
		$(document).off("click", ".help-tab-box .help-ul li").on("click", ".help-tab-box .help-ul li", function(elem){
			//console.log("here: "+$("a",this).html())
			if( $("a",this).html() == '入款须知'){
			window.open("helpInfo.html#help-1?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if($("a",this).html() == '如何注册成为500vip彩票会员？'){
			window.open("helpInfo.html#help-1?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else if($("a",this).html() == '忘记登录密码了怎么办？'){
			window.open("helpInfo.html#help-3?token="+window.sessionStorage.getItem("token") ,"_self");
			}
			else{
			window.open("helpInfo.html#help-7?token="+window.sessionStorage.getItem("token") ,"_self");
			}
		});
		$(document).off("click", ".cnTop li a").on("click", ".cnTop li a", function(elem){
			//console.log("here: "+$(this).attr("data"))
			window.open("helpInfo.html#help-"+$(this).attr("data")+"?token="+window.sessionStorage.getItem("token") ,"_self");
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
					control_500vip.customerService();
					return;
				}
				else if(model=='help'){
					window.open("helpInfo.html","Help", "height=1000,width=1610");
				}
				$(".model_child_menus").html(UI_500vip.modalSubMenu(model));
				control_500vip.popupSubMenu(menu);
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
				// else if(menu == "help"){
				// 	$(".model_child_content").prepend('<div id="loading"></div>')
				// 	tcg.lib.ajax({id:".model_child_content",url:"./xml/"+submenu+".xml",dataType:'html'},function(){
				// 		UI.loadUserInfo();
				// 		// Activate Clicked Submenu
				// 		var functions=new Function('return control.'+submenu+'();');
				// 		//functions();
				// 		$.when(functions()).done(function(){
				// 			$("div.model_child_content #loading").remove();
				// 		})
				// 	});
				// }
				else{
					if(submenu == "myProfile"){
						$('span.customer_service_btn').off('click').on('click', function(){
						    control_500vip.customerService();
						});
					}
					tcg.mc.lott[submenu](".model_child_content", "lott")
				}
				
				$('.model_child_menus li[data-submenu="'+submenu+'"]').addClass("sub-act");
			}
		});
	},
	form: function(){
		// Submit Form On Enter
		$(document).off("keyup", "form .form-control").on("keyup", "form .form-control", function(e){
			if(e.which == 13){
				$(this).parents("form").find(".form-submit").click();
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
	getPromotionAnnouncements: function(page){
		var data = { type: "P", category: "S", platform: "W" };
		var data2 = localStorage.getItem("token");
		WPS.getAnnouncementsAdvanced(data, function(result){
			if(result.success){
				if(page == 'home'){
					UI_500vip.homePromotionAnnouncements(result);
				} else {
					UI_500vip.promoPagePromotionAnnouncements(result);
				}
				setTimeout(function(){
				control_500vip.getNewsAnnouncements("home");}, 200);
			}
			else {
				tcg.lib.alert("errors", tcg.lib.prop(result.errorCode));
			}
		});
	},
	getNewsAnnouncements: function(page){

		var data = { type: "P", category: "P", platform: "W" };
		var data2 = localStorage.getItem("token");
		WPS.getAnnouncementsAdvanced(data, function(rs){
			if(rs.success){
					if(page == "home"){
					UI_500vip.homeNewsAnnouncements(rs);
					}
					else if(page == "news"){
					$("#newsList").html(UI_500vip.news(rs.value));
					}
					else if(page == "newsContent"){

					$("#newsCOntent").html(UI_500vip.newsContent(rs.value));
					}
				}
			else{
				tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
			}
		});
	},
	lotteryMenus:function(){
        var pathName = window.location.pathname;
        var hash = '';
        var rs;
        if (pathName == "/game-lobby.html") {
           hash= '#lottery';
        } else {
           hash=window.location.hash==''?'#lobby':window.location.hash;
        }

        tcg.lib.ajax({url:'lgw/games',
							headers:{Merchant: globalVar.merchantCode}},function(g){
        					rs = control_500vip.lottSort(g);

        					if(rs.length>0){
						        	UI_500vip.lottMenuGames(rs);
						        /*
						            switch (hash){
						                case "#lobby":UI.lottMenusByLobby(rs);break;
						                case "#lottery":UI.lottMenusByLottery(rs);break;
						            }*/
						        }

						})

        
    },
    draw:function(){
        tcg.lib.ajax({url:'lgw/draw',
							headers:{Merchant: globalVar.merchantCode}},function(g){

								UI_500vip.draw(g);
						})

        
    },
    drawGameId:function(rs){
    	//var data = {gameId:"", page:0, size:10};
    	tcg.lib.ajax({url:'lgw/draw/'+rs,headers:{Merchant: globalVar.merchantCode},data:{page:0,size:10}},function(data){


								UI_500vip.drawGameId(data, rs);
								UI_500vip.lottBetTimes(false);
						})
        
    },
    formatDateFull: function (old_date, pattern) {

		if (pattern == null) {
			pattern = "yyyy-MM-dd hh:mm:ss";
		}

		var date = new Date(old_date);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		hour = hour < 10 ? "0" + hour : hour;
		minute = minute < 10 ? "0" + minute : minute;
		second = second < 10 ? "0" + second : second;

		var formatedDate = pattern;
		// Mon Sep 17 2012 15:44:16 GMT+0800 (CST) to 2012-09-17 15:44:16
		formatedDate = formatedDate.replace("yyyy", year);
		formatedDate = formatedDate.replace("MM", month);
		formatedDate = formatedDate.replace("dd", day);
		formatedDate = formatedDate.replace("hh", hour);
		formatedDate = formatedDate.replace("mm", minute);
		formatedDate = formatedDate.replace("ss", second);

		return formatedDate;
	},
	promotion_page: function(){
		var data = { type: "P", category: "U", platform: "W" };
		WPS.getAnnouncementsAdvanced(data, function(rs){
			if(rs.success){
				$("#promotionList").html(UI_500vip.promotioList(rs.value));
				$("#promotionList .showDetails").unbind("click").bind("click", function(){
					var promo = $(this).parents(".promo-wrp");
					if( promo.find(".promoDetails").is(":visible") ){
						promo.find(".promoDetails").hide();
					}else{
						promo.find(".promoDetails").show();
					}
				});
			}else{
				tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
			}
		});
	},
	free_play: function(){
		tcg.lib.ajax({ url: "/wps/member/trialuser", headers:{"Merchant": "500caitrial"}, contentType: "application/json",type: "GET"
		}, 
			function(g){
				$("#regUsername").attr("value", g.value);
		},  function(x){
			})
	},
	submitFreePlay: function(){
		var form = $("#registerForm");
		form.find(".form-submit").unbind("click").bind("click", function(){
			var username = form.find("[name='username']");
			var password = form.find("[name='password']");
			var confirmPass = form.find("[name='confirmPass']");
			var submitBtn = form.find(".form-submit");
			if(control_500vip.validateForm() == true && !submitBtn.hasClass("processing")){
				submitBtn.addClass("processing");
				var data = {
					"username": username.val(),
				  	"password": password.val(),
				  	"confirmPassword": confirmPass.val()
				};
				tcg.lib.showLoading();
				control_500vip.register(data, function(rs){
					tcg.lib.hideLoading();
					if(rs.success){
						tcg.lib.alert("success", "注册成功 <br /> 帐号："+username.val() , "", function(){
							tcg.lib.showLoading();
							var data = { "username": username.val(), "password": password.val(), "uuId": 11111 };
							WPS.login(data, function(rs){
								tcg.lib.showLoading();								
								if(rs.success){
									window.sessionStorage.setItem("token", rs.value.token);
									window.localStorage.setItem("token", rs.value.token);
									window.location.href="/";
								}else{
									submitBtn.removeClass("processing");
									tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
								}

						}, true);	
						});												
					}else{
						submitBtn.removeClass("processing");
						tcg.lib.alert("errors", tcg.lib.prop(rs.errorCode));
					}
				})
			}
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
	sessionTouch: function(){
		var token = window.sessionStorage.getItem("token")
		tcg.lib.ajax({ url: "/wps/session/touch", headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json",type: "GET"
		}, 
			function(g){
				//callback(g);
		},  function(x){
			})
	},
	betTimer:function(){
		if(globalVar.syncRate%32==0){
			UI_500vip.lottBetTimes(false);
			globalVar.syncRate=1;
		}else{
			var numero=$('span[name="issue"]').attr("numero");
			$('span[name="issue"]').text(numero);
			globalVar.currentLottery.numero=numero;
			var bet_times=$('.sale_end_timer').attr("bet-times");
			var lock_times=$('.sale_end_timer').attr("lock-times")*1-1;
			if(bet_times*1-lock_times*1==0){
				var btnTimer=null;
				var times=1;
				tcg.lib.alert("alerts", tcg.lib.prop("gameName_"+globalVar.currentLottery.game)+'第<span style="color: yellow">'+numero+'</span>期已结束<br/>请留意投注期号。');
				btnTimer=window.setInterval(function(){
					times--;
					if(times*1<=0){
						window.clearInterval(btnTimer);
						//TCG.hideMessage();
						dialog_box_ok.click()
					}
				},1800);
				//如果追号窗口打开并且,当前期存在，而且和投注期号不相等，需要更新期号列表
				/*if(lott.chase.isChase&&lott.chase.currNumero!=''){
					window.setTimeout(function(){
						lott.chase.listNumeros(false);
					},500);
				}*/
			}
			if(lock_times*1-bet_times*1>=0&&lock_times*1-bet_times*1<=lock_times*1+1){
				globalVar.currentLottery.isLockTimes=true;
				$('.c-gray').text("开奖锁定");
				$('.c-gray').css({color:'#ff8282'});
				if(!globalVar.currentLottery.isSale){
					$('.sale_end_timer').text("--:--:--");
				}else{
					//$('.sale_end_timer').text(control_500vip.formatDateFull(bet_times*1,"hh:mm:ss"));
					$('span[name="day"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1, "dd"));
					$('span[name="h"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1, "hh"));
					$('span[name="m"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1, "mm"));
					$('span[name="s"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1, "ss"));
				}
				if(bet_times*1==-1) {
					globalVar.currentLottery.isUpdate=true;
					UI_500vip.lottBetTimes(false);
					globalVar.syncRate = 1;
					globalVar.clearTimer = false;


					setTimeout(function(){ 
					control_500vip.drawGameId(globalVar.currentLottery.gameId);
			 		}, 15000);
					//UI.showDrawUI();
				}
			}else{
				globalVar.currentLottery.isUpdate=false;
				globalVar.currentLottery.isLockTimes=false;
				$('.c-gray').text("投注剩余");
				$('.c-gray').css({color:'#608df1'});
				if(!globalVar.currentLottery.isSale){
					//$('.sale_end_timer').text("--:--:--");
					$('span[name="day"]').text("--");
					$('span[name="h"]').text("--");
					$('span[name="m"]').text("--");
					$('span[name="s"]').text("--");
				}else {
					$('span[name="day"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1 - (lock_times * 1 + 1), "dd"));
					$('span[name="h"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1 - (lock_times * 1 + 1), "hh"));
					$('span[name="m"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1 - (lock_times * 1 + 1), "mm"));
					//$('span[name="s"]').text(control_500vip.formatDateFull(bet_times * 1 - (lock_times * 1 + 1), "ss"));
					$('span[name="s"]').text(control_500vip.fmtTimeTohhmmss(bet_times * 1 - (lock_times * 1 + 1), "ss"));
					//console.log("here: "+15652);
				}
			}
			bet_times--;
			$('.sale_end_timer').attr("bet-times",bet_times);
		}
		globalVar.syncRate++;
	},
	clearLottDrawNumberTimer:function(){
		if(globalVar.lottDrawNumberTimer.length>0){
			for(var i=0;i<globalVar.lottDrawNumberTimer.length;i++){
				window.clearTimeout(globalVar.lottDrawNumberTimer[i]);
			}
			globalVar.lottDrawNumberTimer=[];
		}
	},
	form: function(){
		// Submit Form On Enter
		$(document).off("keyup", "form .form-control").on("keyup", "form .form-control", function(e){
			if(e.which == 13){
				$(this).parents("form").find(".form-submit").click();
			}
		});
	},
	fmtTimeTohhmmss:function(t,fmt){
        var timeStr='';
        if(!t){t=0;}
        if(fmt=='hh:mm:ss'){
            var ss=Math.floor(t%60);//当前数据%60=剩余秒
            var tm=Math.floor(t/60);//当前数据/60=剩余总分钟
            var mm=Math.floor(tm%60);//剩余总分钟%60=剩余分钟
            var hh=Math.floor(tm/60);//剩余总分钟/60=剩余小时
            if(!ss||ss<0){ss=0;}
            if(!mm||mm<0){mm=0;}
            if(!hh||hh<0){hh=0;}
            timeStr=(hh<10?'0'+hh:hh)+':'+(mm<10?'0'+mm:mm)+':'+(ss<10?'0'+ss:ss);
        }
        if(fmt=='mm:ss'){
            var ss=Math.floor(t%60);//当前数据%60=剩余秒
            var mm=Math.floor(t/60);//当前数据/60=剩余总分钟
            if(!ss||ss<0){ss=0;}
            if(!mm||mm<0){mm=0;}
            timeStr=(mm<10?'0'+mm:mm)+':'+(ss<10?'0'+ss:ss);
        }
        if(fmt=='ss'){
            var ss=Math.floor(t%60);//当前数据%60=剩余秒
            if(!ss||ss<0){ss=0;}
            timeStr=(ss<10?'0'+ss:ss);
        }
        if(fmt=='mm'){
            var tm=Math.floor(t/60);//当前数据/60=剩余总分钟
            var mm=Math.floor(tm%60);//剩余总分钟%60=剩余分钟
            if(!mm||mm<0){mm=0;}
            timeStr=(mm<10?'0'+mm:mm);
        }
        if(fmt=='hh'){
            var tm=Math.floor(t/60);//当前数据/60=剩余总分钟
            var hh=Math.floor(tm/60);//剩余总分钟/60=剩余小时
            if(!hh||hh<0){hh=0;}
            timeStr=(hh<10?'0'+hh:hh);
        }
        if(fmt=='dd'){
            var tm=Math.floor(t/60);//当前数据/60=剩余总分钟
            var hh=Math.floor(tm/60);//剩余总分钟/60=剩余小时
            var dd=Math.floor(hh/12);//剩余总分钟/60=剩余小时
            if(!dd||dd<0){dd=0;}
            timeStr=(dd<10?'0'+dd:dd);
        }
        return timeStr;
    },
    
	lottSort:function(games){
        var sort = ["SSC","11X5","LF","PK10"];
        var rs = [];
        for (var n = 0; n < sort.length; n++) {
            for (var i = 0; i < games.length; i++) {
                if (sort[n] == games[i].code) {
                    rs.push(games[i]);
                }
            }
        }
        return rs;
    },
	getCustomerSeries: function(){
        $.ajax({ url: "./wps/member/lottoGamesSeries", type: "GET", headers: { "Merchant": globalVar.merchantCode},
            complete: function(res){
                //callback(response);
                globalVar.result.customerSeries=res.value;

                control_500vip.lotteryMenus();
            }
        }); 
    },
	getPopularGames: function(){
        var data = {count: 6};
        tcg.lib.ajax({url:'/lgw/games/popular', data:data,
                            headers:{Merchant: globalVar.merchantCode}},function(g){
                            rs = g;

                            if(rs.length>0){

                                   UI_500vip.lottMenusByLobby(rs);
                                }

                        })
    },
    register: function(data, callback){
		var deskey = tcg.lib.rndString();
		var encryption = tcg.lib.RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = tcg.lib.DESEncrypt(JSON.stringify(data), deskey);
		tcg.lib.ajax({ url: "/wps/member/register", data: dataRSA, headers:{"Merchant": "500caitrial" , Encryption: encryption }, contentType: "application/json", type: "PUT", 
		}, 
			function(g){
				callback(g);
		},  function(x){
			});
	},
    validateForm: function(){
		var form = $("#registerForm");
		var username = form.find("[name='username']");
		var password = form.find("[name='password']");
		var confirmPass = form.find("[name='confirmPass']");
		var isValid;
		if( globalVar.expiredAffCode == true ){
			tcg.lib.alert("errors", "Expired Aff. Code!");
			isValid=false;			
		}else if( username.val() == "" || !control_500vip.regExp("username", username.val()) ){
			tcg.lib.alert("errors", "账号必须以字母开头，由4~16个字母或数字组成");
			isValid=false;
		}else if( password.val() == "" || !control_500vip.regExp("password", password.val()) ){
			tcg.lib.alert("errors", "密码不能使用特殊字符，由 6 到 12 位数字或字母组成");
			isValid=false;
		}else if( confirmPass.val() !=  password.val() ){
			tcg.lib.alert("errors", "请再次输入密码,必须和上面输入的密码保持一致");
			isValid=false;
		}else{
			isValid=true;
		}
		return isValid;
	},
	validateFormInput: function(formInput, callback){
	var data = [],
		invalid = 0;
		$.each(formInput, function(i){
			var input = $(this),
				inputVal = input.val(),
				inputLength = inputVal.length,
				inputType = input.attr("type"),
				inputValid = input.attr("data-valid"),
				minLength = input.attr("data-minLength"),
				maxLength = input.attr("data-maxLength"),
				minVal = input.attr("data-minVal"),
				maxVal = input.attr("data-maxVal");
				data.push({ "elem": input, "invalid": [] });
			if( hasAttr(input,"required") ){
				if( inputType == "checkbox" ){
					if( input.is(":checked") == false ) data[i].invalid.push( "required" ); 
				}else{
					if( $.trim( inputVal ) == "" ) data[i].invalid.push( "required" );
				}
				if( hasAttr(input, "data-valid") ){
					regExPattern( inputValid, inputVal, function(valid){
						if( valid == false ) data[i].invalid.push("data-valid");
					});
				}
			}else{
				if( hasAttr(input, "data-valid") ){
					if( inputVal != "" ){
						regExPattern( inputValid, inputVal, function(valid){
							if( valid == false ) data[i].invalid.push("data-valid");
						});
					}
				}				
			}
			if( hasAttr(input, "data-minLength") ){
				if( inputLength < minLength ) data[i].invalid.push("data-minLength");
			}
			if( hasAttr(input, "data-maxLength") ){
				if( inputLength > maxLength ) data[i].invalid.push("data-maxLength");
			}

			if( hasAttr(input, "data-minVal") ){
				if( parseFloat(inputVal) < parseFloat(minVal) ) data[i].invalid.push("data-minVal");
			}

			if( hasAttr(input, "data-maxVal") ){
				if( parseFloat(inputVal) > parseFloat(maxVal) ) data[i].invalid.push("data-maxVal");
			}
		});
		for(var i=0; i < data.length; i++){ 
			if( data[i].invalid.length > 0 ) invalid++;
		}
		callback(invalid, data);
	},
	forgotPassword: function(data){

		WPS.forgotPassword(data, function(result){
			if(result.success){
				openAlert({
					type: "success",
					message: "forgotPassword_success"
				}, function(){
					//resetBtn.click();
				});
			}else{
				openAlert({
					type: "warning",
					message: result.errorCode
				});
			}
		});
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
				pattern = /^[\w]{6,11}$/;
				break;
			case "password":
				pattern = /^[\w]{6,16}$/;
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

window.CallParent = function() {
        window.open("/mobile.html","_self");
        }