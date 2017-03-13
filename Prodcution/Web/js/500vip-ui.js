var UI_500vip = {
	login: function(){
		var _html="";
		_html += "<div class='logxinxi'>";
			_html += "<div class='top_login'>";
				_html += "<form id='loginForm' autocomplete='off'>";
					_html += "<div class='freeplay' align='right'>";
						_html += "<a style='padding-right: 20px;' id='play_free' href='/regPlay.html'>免费试玩</a>";
						_html += "<a href='/register.html'>免费注册</a>";
					_html += "</div>";
					_html += "<div class='top-login-bg'>";
						_html += "<label for='label_01'>用户名:</label>";
						_html += "<input class='top_loginip form-control' name='username' id='label_01' placeholder='' value='' type='text' />";
					_html += "</div>";
					_html += "<div class='top-login-bg'>";
						_html += "<label for='label_02'>密&nbsp;&nbsp;&nbsp;码:</label>";
						_html += "<input class='top_loginip form-control' name='password' id='label_02' placeholder='' type='password' autocomplete='new-password' />";
					_html += "</div>";
					_html += "<div class='need_captcha'>";
						_html += "<div class='top_click captcha-wrp' name='div_top_click'>验证码:</div>";
						_html += "<div class='yanzhengma'>";
							_html += "<label style=''>验证码:</label>";
							_html += "<div class='top-login-bg2'>";
								_html += "<input class='top_loginmm' name='authnum' maxlength='5' value='' type='text' />";
								_html += "<span style='position: relative; float: right; margin-left: -10px; margin-right: 2px;'>";
                                	_html += "<img class='login_img' id='loginCaptcha' />";
                                _html += "</span>";
							_html += "</div>";
						_html += "</div>";
					_html += "</div>";
					_html += "<input class='dr_anniu form-submit' value='登录' type='button' />";
				_html += "</form>";
                _html+="<div>"
                _html+="<input class='forgotPass' value='忘记密码' type='button' />"
                _html+="</div>"
			_html += "</div>";
		_html += "</div>";
		$("#header_user").html(_html);	
		// Events
        control_500vip.lotteryMenus();
        control_500vip.getPopularGames();
        control_500vip.form();
		control_500vip.login();
        control_500vip.drawGameId(14);
	},
	afterLogin: function(userInfo){
		var _html = "";
		_html += "<table class='logintable' style='min-width: 240px;'>";
			_html += "<tbody>";
				_html += "<tr>";
					_html += "<td style='color:black;padding:14px;'>您好，<a style='color:#006fe4' class='play-jl'>" +userInfo.account+ "</a></td>";
					_html += "<td><span class='logoutlink'><a href='javascript:void(0);' id='logout'>退出</a></span></td>";
				_html += "</tr>";
				_html += "<tr>";
					_html += "<td colspan='3' style='padding:3px 0px 10px 13px'>";
						_html += "<a class='balance colorRed' id='a_show_money' rel='nofollow'><span id='balance' class='orange'>￥<span data-wallet='SAFE_BOX'></span></span></a>";
						_html += "<a id='refreshBalance'><i class='icon-refresh-icon'></i></a>";
					_html += "</td>";
				_html += "</tr>";

        if(globalVar.merchantCode == "500caitrial"){
                _html += "<tr>";
                    _html += "<td><span class='userlink'><a href='javascript:void(0)' data-pageMenu='personal/gameHistory' data-modal='personal/gameHistory'>投注记录</a></span></td>";                  
                _html += "</tr>";
        }
        else
        {
                 _html += "<tr>";
                    _html += "<td><a name='doBet' class='userpaybtn' data-pageMenu='deposit' data-modal='deposit'>充值</a></td>";
                    _html += "<td><a name='doBet' class='userpaybtn' data-pageMenu='withdrawal' data-modal='withdrawal'>提现</a></td>";                       
                _html += "</tr>";
                _html += "<tr>";
                    _html += "<td><span class='userlink'><a href='javascript:void(0)' data-pageMenu='personal' data-modal='personal'>个人信息</a></span></td>";
                    _html += "<td><span class='userlink'><a href='javascript:void(0)' data-pageMenu='message/inbox' data-modal='message/inbox'>个人讯息</a></span></td>";
                    _html += "<td></td>";
                _html += "</tr>";
                _html += "<tr>";
                    _html += "<td><span class='userlink'><a href='javascript:void(0)' data-pageMenu='personal/transactionDetails' data-modal='personal/transactionDetails'>帐变明细</a></span></td>";
                    _html += "<td></td>";                                       
                _html += "</tr>";
        }
				
			_html += "</tbody>";
		_html += "</table>";		
		$("#header_user").html(_html);	

		// Events
        control_500vip.getAllWalletBalance();
        control_500vip.lotteryMenus();
        control_500vip.getPopularGames();
		control_500vip.logout();
        control_500vip.drawGameId(14);
	},
	loadSystemAnnouncements: function(data){
		var list = data.contentLobby;
		var _html = "";
		var arr = [];
		for(var i=0; i<list.length; i++){
			arr.push(list[i].content);
		}
		_html+=arr.join(", ");
		$("#systemAnnouncementList").text(_html);		
	},
	loadAgentAnnouncements: function(list){
		var _html = "";
		for(var i=0;i<list.length;i++){
			var subType=list[i].category == "P" ? "activityInfo":"announcement";
			_html += "<li class='lotNews'>";
				_html += "<a href='javascript:void(0);' data-modal='activity/" +subType+ "' data-content='" +list[i].id+ "' class='c-grey'></a>";
				_html += "<span class='pad c-grey'></span> <a href='javascript:void(0);' data-modal='activity/" +subType+ "'  data-content='" +list[i].id+ "'>" +list[i].title+ "</a>";
			_html += "</li>";
		}
		$("#agentAnnouncementList").html(_html);
		control_500vip.openAgentAnnouncement();
	},
	popupsModel:function(submenu){
        var _html='<div class="popups_model">';
        if(globalVar.merchantCode == "500caitrial"){
        _html+='<dl class="model_main_menus">';
        _html+='<dt class="member_icon" data-modal="personal"></dt>';
        _html+='<dd data-modal="personal">个人</dd>'; //message
        _html+='<dt class="service_icon" data-modal="customerservice"></dt>';
        _html+='<dd data-modal="customerservice">客服</dd>';
        _html+='<dt class="help_icon" data-modal="help"></dt>';
        _html+='<dd data-modal="help">帮助</dd>';
        }
        else{
        _html+='<dl class="model_main_menus">';
        _html+='<dt class="deposit_icon" data-modal="deposit"></dt>';
        _html+='<dd data-modal="deposit">充值</dd>';
        _html+='<dt class="withdraw_icon" data-modal="withdrawal"></dt>';
        _html+='<dd data-modal="withdrawal">提款</dd>';
        _html+='<dt class="member_icon" data-modal="personal"></dt>';
        _html+='<dd data-modal="personal">个人</dd>';
        _html+='<dt class="agent_icon" data-modal="agent"></dt>';
        _html+='<dd data-modal="agent">代理</dd>';
        _html+='<dt class="email_icon" data-modal="message/inbox"><span class="hide countUnreadMessage"></span></dt>'; //message
        _html+='<dd data-modal="message/inbox">讯息</dd>';    //message
        _html+='<dt class="service_icon" data-modal="customerservice"></dt>';
        _html+='<dd data-modal="customerservice">客服</dd>';
        _html+='<dt class="help_icon" data-modal="help"></dt>';
        _html+='<dd data-modal="help">帮助</dd>';
        }
        _html+='</dl>';
        _html+='<div class="model_content">';
        _html+='<div class="model_child_menus">';
        _html+=UI_500vip.modalSubMenu(submenu);
        _html+='</div>';
        _html+='<div class="model_child_content">';
        _html+='</div>';
        _html+='</div>';
        _html+='<div class="esc_words">';
        _html+='<p>按ESC离开</p>';
        _html+='</div>';
        _html+='</div>';
        return _html;
    },
    forgotPassword:function(){
        var _html='<dl id="rs-dbox" class="ui-draggable forget-pwd clearfix">';
        _html+='<div class="rs-cont-fpwdf rs-za">';
        _html+='<h2>找回登录密码</h2>';
        _html+='<p>请提供以下资料(误必与您帐户中的纪录相符)<br>';
        _html+='用于核对帐户信息并重新找回登录密码.</p>';
        _html+='<form id="forgotPasswordForm" novalidate="" class="fpwdf" autocomplete="off">';
        _html+='<div class="form-group rs-fpwd-usr clearfix">';
        _html+='<label>您的用户帐号:</label>';
        _html+='<input class="form-control ch-inpt" type="text" required="" name="forgetUsername" placeholder="您的用户帐号">';
        _html+='</div>';
        _html+='<div class="form-group rs-fpwd-mail clearfix">';
        _html+='<label>您的安全邮箱:</label>';
        _html+='<input class="form-control ch-inpt" type="email" required="" data-valid="email" name="forgetEmail" placeholder="您的安全邮箱">';
        _html+='</div>';
        _html+='<div class="fpwdf-btns">';
        _html+='<input type="reset" value="Reset Form" class="form-reset hide">';
        _html+='<input type="button" name="forgetSubmit" value="确认" class="form-submit">';
        _html+='</div>';
        _html+='</form>';
        _html+='</div>';
        _html+='</dl>';

        return _html;
    },
    news:function(data){
         var _html = "";
        for(var i=0; i<data.length; i++){
            _html+='<tr class="listBrief">';
            _html+='<td>'
            _html+='<a target="_blank" class="olp"></a>'
            _html+='<a href="'+"newsContent.html?id="+data[i].id+'">'+data[i].title+'</a>'
            _html+='</td>'
            _html+='<td style="text-align:right">'
            _html+='<span class="u2">'+data[i].createtime.slice(0,19)+'</span>'
            _html+='</td>'
            _html+='</tr>'
        }
        return _html;
    },
    newsContent:function(data){

        if(window.location.hash != ""){
            path = window.location.hash;
        }
        else{
            path = window.location.search;
        }
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

        var keyID = queryStringToJSON(path).id;
        var content;
        for(var i=0; i<data.length; i++){
            if(keyID == data[i].id){
                content = data[i];
            }
        }

         var _html = "";
            _html+='<div class="content_main clearfix">';
            _html+='<h1 class="title_top">'+content.title+'</h1>'
            _html+='<div class="author clearfix">'
            _html+='<div class="article_info"><span>'+content.createdBy+'</span></div>'
            _html+='</div>'
            _html+='<div class="top_links"></div>'
            _html+='<div class="content">'+content.content+'</div>'
            _html+='</div>'
        return _html;
    },
    modalSubMenu: function(menu){
        // Modal Submenu
        var _html = "";
        switch(menu){
            case "deposit":
                _html += "<p>充值</p>";
                _html += "<ul>";
                _html += "<li data-submenu='onlinePayment'>快捷支付</li>";
                _html += "<li data-submenu='quickPayment'>网银支付</li>";
                _html += "<li data-submenu='weChat'>微信支付</li>";
                _html += "<li data-submenu='alipay'>支付宝</li>";
                _html += "<li data-submenu='transferFund'>钱包转账</li>";
                _html += "<li data-submenu='depositRecords'>充值记录</li>";
                _html += "</ul>";
                break;
            case "withdrawal":
                _html += "<p>提款</p>";
                _html += "<ul>";
                _html += "<li data-submenu='withdraw'>提款申请</li>";
                _html += "<li data-submenu='withdrawRecords'>提款记录</li>";
                _html += "<li data-submenu='bindCard'>绑定提款卡</li>";
                _html += "</ul>";
                break;
            case "personal":
                if(globalVar.merchantCode == "500caitrial"){
                        _html += "<p>个人</p>";
                        _html += "<ul>";
                        _html += "<li data-submenu='bonusDetails'>奖金详情</li>";
                        _html += "<li data-submenu='gameHistory'>投注记录</li>";
                        _html += "<li data-submenu='chaseRecords'>追号记录</li>";
                        _html += "<li data-submenu='pnlRecords'>盈亏报表</li>";                //personalPalStatements
                        _html += "<li data-submenu='changePassword'>登录密码</li>";
                        _html += "</ul>";
                }
                else{
                        _html += "<p>个人</p>";
                        _html += "<ul>";
                        _html += "<li data-submenu='myProfile'>我的资料</li>";
                        _html += "<li data-submenu='bonusDetails'>奖金详情</li>";
                        _html += "<li data-submenu='gameHistory'>投注记录</li>";
                        _html += "<li data-submenu='chaseRecords'>追号记录</li>";
                        _html += "<li data-submenu='transactionDetails'>帐变明细</li>";
                        _html += "<li data-submenu='pnlRecords'>盈亏报表</li>";                //personalPalStatements
                        _html += "<li data-submenu='changePassword'>登录密码</li>";
                        _html += "<li data-submenu='withdrawPassword'>资金密码</li>";
                        _html += "<li data-submenu='securitySetting'>设置密保</li>";
                        _html += "</ul>";
                }
                break;
            case "agent":
                _html += "<p>代理</p>";
                _html += "<ul>";
                _html += "<li data-submenu='agentRegisterDownline'>精准注册</li>";
                _html += "<li data-submenu='agentGenerateAffiliateUrl'>链接注册</li>";
                _html += "<li data-submenu='linkManager'>链接管理</li>";
                _html += "<li data-submenu='memberManagement'>会员管理</li>";
                _html += "<li data-submenu='agentDownlineTransactionDetails'>帐变明细</li>";
                _html += "<li data-submenu='palStatementsAgent'>盈亏报表</li>";
                _html += "<li data-submenu='agentTeamBetting'>团队投注</li>";
                _html += "<li data-submenu='agentTeamIncomeReport'>团队收入</li>";
                _html += "<li data-submenu='agentRevenueReport'>我的收入</li>";
                _html += "<li data-submenu='agentDividendRecord'>分红记录</li>";
                _html += "</ul>";
                break;
            case "message":
                _html += "<p>讯息</p>";
                _html += "<ul>";
                _html += "<li data-submenu='writeMessage'>编写讯息</li>";
                _html += "<li data-submenu='inbox'>已收讯息</li>";
                _html += "<li data-submenu='outbox'>已发讯息</li>";
                _html += "</ul>";
                break;
            case "help":
                _html += "<p>帮助</p>";
                _html += "<ul>";
                _html += "<li data-submenu='helpPlayPrize'>玩法奖金</li>";
                _html += "<li data-submenu='helpDepositRelated'>充值相关</li>";
                _html += "<li data-submenu='helpYourWithdrawal'>提款相关</li>";
                _html += "<li data-submenu='helpAccountNumbers'>帐号相关</li>";
                _html += "<li data-submenu='helpBonusBettingIssues'>常见问题</li>";
                _html += "<li data-submenu='helpInstallation'>安装帮助</li>";
                _html += "<li data-submenu='helpAboutUs'>关于我们</li>";
                _html += "</ul>";
                break;
            case "activity":
                _html += "<p>公告</p>";
                _html += "<ul>";
                _html += "<li data-submenu='managePromotions'>奖励中心</li>";          
                _html += "<li data-submenu='announcement'>公告新闻</li>";
                _html += "<li data-submenu='activityInfo'>活动资讯</li>";
                _html += "</ul>";
                break;
        }
        return _html;
    },
    checkUserType: function(){
        if(window.sessionStorage.getItem("isAgent")!=null&&window.sessionStorage.getItem("isAgent")*1==0){
            $("[data-modal^='agent']").remove();
        }
    },  
    homePromotionAnnouncements: function(result){
        var html = '';
        var result = result.value;
            for(var i = 0; result.length > i; i++){
                html+="<a href='#promo' data-promo='promo"+[i]+"'><img src='"+result[i].mainPageUrl+"'  /></a>";
            }
            $('#featured').html(html);
            UI_500vip.orbit();
    },
    homeNewsAnnouncements: function(result){
        var html = '';
        var result = result.value;
            for(var x = 0; result.length > x; x++){
                html+='<li class="lotNews">';
                html+='<a onclick="" class="c-grey"></a>';
                html+='<span class="pad c-grey"></span>';
                html+='<a onclick="">'+result[x].title+'</a>';
                html+='</li>';
            }
            $("#agentAnnouncementList").html(html);
            //common.orbit();
    },
    promoPagePromotionAnnouncements: function(result){
        var html2 = '';
        var result = result.value;

        for(var i = 0; result.length > i; i++){
            var startDate = result[i].startDate
            var endDate = result[i].endDate
            startDate = startDate.split(/([0-9]*-[0-9]*-[0-9]*)/);
            endDate = endDate.split(/([0-9]*-[0-9]*-[0-9]*)/);
            var promoDate;              
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(startDate[1].split('-')[0],startDate[1].split('-')[1],startDate[1].split('-')[2]);
            var secondDate = new Date(endDate[1].split('-')[0],endDate[1].split('-')[1],endDate[1].split('-')[2]);

            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

            if(diffDays > 365){
                promoDate = '即日起';
            }
            else{
                promoDate = startDate[1] + ' - ' + endDate[1];
            }

            html2+="<li class='clearfix promo-item' id='promo"+[i]+"'><div class='promo-item-short'><div class='promo-item-image'><a href='javascript:void(0);'' data-rel='promo-item-"+[i]+"'><img src='"+result[i].promoPageUrl+"' /></a></div><div class='promo-item-short-details'><div class='promo-item-title'>"+result[i].title+"</div><div class='promo-item-date'>活动时间： "+ promoDate+"</div><div class='promo-item-more'><a href='javascript:void(0);'' class='promo-item-more-button' data-rel='promo-item-"+[i]+"'>了解更多</a></div></div></div><div class='promo-item-details promo-item-"+[i]+"'>"+result[i].content+"</div></li>"
        }
        $('#promotionAnnouncement').html(html2);
        if(result.length < 1){
            $(".promo-triangles").hide();
        }

        var promoSelected = localStorage.getItem('homePromoSelect');

        if(promoSelected){
            var promoContent = $('#'+promoSelected).find('.promo-item-details');
            promoContent.show();
            $("html, body").animate({ scrollTop: $('#'+promoSelected).offset().top }, 1000);            
            localStorage.removeItem('homePromoSelect');
        }
    },
    lottMenuGames:function(rs){
        globalVar.allGames = rs;
        for(var x = 0; x < rs.length; x++){
            for(var i = 0; i < rs[x].games.length; i++){
                globalVar.games.push(rs[x].games[i]);
            }
        }
    },
    lottMenusByLobbyBetting: function(rs){

        var _html="",
        _html1="",
        _html2="",
        _html3="";
        for(var x = 0; x < rs.length; x++){
            if(rs[x].code == "SSC"){
                for(var i = 0; i < rs[x].games.length; i++){
                    if(rs[x].games[i].remark.slice(0, 2) == "2K"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(2, rs[x].games[i].remark.length);
                    }
                    else if(rs[x].games[i].remark.slice(0, 4) == "2000"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(4, rs[x].games[i].remark.length);
                    }
                _html+="<ul>"
                _html+="<li class='nav-li lot"+rs[x].games[i].gameId+" "+rs[x].games[i].code+"' >";
                _html+="<a class='nav-btn cur-btn' game='true' gameId='"+rs[x].games[i].gameId+"' title='"+rs[x].games[i].code+"'>";
                _html+="<i></i>";
                _html+="<span class='lot-text' game='true' title='"+rs[x].games[i].code+"'>"+rs[x].games[i].remark+"</span></a>";
                _html+="</li>";
                _html+="</ul>";
                globalVar.games.push(rs[x].games[i]);

                }

            $("#shishicai_ul2").html(_html);
            }
            else if(rs[x].code == "11X5"){
                for(var i = 0; i < rs[x].games.length; i++){
                    if(rs[x].games[i].remark.slice(0, 2) == "2K"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(2, rs[x].games[i].remark.length);
                    }
                    else if(rs[x].games[i].remark.slice(0, 4) == "2000"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(4, rs[x].games[i].remark.length);
                    }
                _html1+="<ul>"
                _html1+="<li class='nav-li lot"+rs[x].games[i].gameId+" "+rs[x].games[i].code+"' >";
                _html1+="<a class='nav-btn cur-btn' game='true' gameId='"+rs[x].games[i].gameId+"' title='"+rs[x].games[i].code+"'>";
                _html1+="<i></i>";
                _html1+="<span class='lot-text' game='true' title='"+rs[x].games[i].code+"'>"+rs[x].games[i].remark+"</span></a>";
                _html1+="</li>";
                _html1+="</ul>";
                globalVar.games.push(rs[x].games[i]);
                }

            $("#shiyixuanwu_ul2").html(_html1);
            }
            else if(rs[x].code == "LF"){
                for(var i = 0; i < rs[x].games.length; i++){
                    if(rs[x].games[i].remark.slice(0, 2) == "2K"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(2, rs[x].games[i].remark.length);
                    }
                    else if(rs[x].games[i].remark.slice(0, 4) == "2000"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(4, rs[x].games[i].remark.length);
                    }
                _html2+="<li class='nav-li lot"+rs[x].games[i].gameId+" "+rs[x].games[i].code+"' >";
                _html2+="<a class='nav-btn cur-btn' game='true' gameId='"+rs[x].games[i].gameId+"' title='"+rs[x].games[i].code+"'>";
                _html2+="<i></i>";
                _html2+="<span class='lot-text' game='true' title='"+rs[x].games[i].code+"'>"+rs[x].games[i].remark+"</span></a>";
                _html2+="</li>";
                globalVar.games.push(rs[x].games[i].remark);
                }

            $("#low_lottery ul").html(_html2);
            }
            else if(rs[x].code == "PK10"){
                for(var i = 0; i < rs[x].games.length; i++){
                    if(rs[x].games[i].remark.slice(0, 2) == "2K"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(2, rs[x].games[i].remark.length);
                    }
                    else if(rs[x].games[i].remark.slice(0, 4) == "2000"){
                        rs[x].games[i].remark = "500万"+rs[x].games[i].remark.slice(4, rs[x].games[i].remark.length);
                    }
                _html3+="<ul>"
                _html3+="<li class='nav-li lot"+rs[x].games[i].gameId+" "+rs[x].games[i].code+"' >";
                _html3+="<a class='nav-btn cur-btn' game='true' gameId='"+rs[x].games[i].gameId+"' title='"+rs[x].games[i].code+"'>";
                _html3+="<i></i>";
                _html3+="<span class='lot-text' game='true' title='"+rs[x].games[i].code+"'>"+rs[x].games[i].remark+"</span></a>";
                _html3+="</li>";
                _html3+="</ul>";
                globalVar.games.push(rs[x].games[i]);
                }

            $("#kuaisan_ul2").html(_html3);
            }
            
        }
    },
    popularGamesBetting: function(rs){

        var _html="";
        var gameName;
        for(var x = 0; x < rs.length; x++){
            for(var i = 0; i < globalVar.games.length; i++){
                if(rs[x].gameCode == globalVar.games[i].code){
                    gameName = globalVar.games[i].remark;
                    gameTitle = globalVar.games[i].code;

                _html+="<ul>";
                _html+="<li class='nav-li lot"+rs[x].gameId+" "+rs[x].gameCode+"' >";
                _html+="<a class='nav-btn cur-btn'game='true' gameId='"+rs[x].gameId+"' title='"+gameTitle+"'>";
                _html+="<i></i>";
                _html+="<span class='lot-text' game='true' title='"+gameTitle+"'>"+gameName+"</span></a>";
                _html+="</li>";
                _html+="</ul>";
                }

            }
            
            $("#hot_lottery ul").html(_html);
        }

    },
    lottMenusByLobby:function(rs){
        var _menus='';
        var pvpgame='';
        /*pvpgame+='<dl class="sm-link" id="fungames">';
        pvpgame+='<dt class="pvp_game inline-block"></dt>';
        pvpgame+='<dd class="inline-block slider-g-t">娱乐游戏</dd>';
        pvpgame+='</dl>';*/


        for(var x = 0; x < rs.length; x++){
            for(var i = 0; i < globalVar.games.length; i++){
                if(rs[x].gameCode == globalVar.games[i].code){
                    gameName = globalVar.games[i].remark;
                    gameTitle = globalVar.games[i].code;

                    if(globalVar.games[i].remark.slice(0, 2) == "2K"){
                        gameName = "500万"+globalVar.games[i].remark.slice(2, globalVar.games[i].remark.length);
                    }
                    else if(globalVar.games[i].remark.slice(0, 4) == "2000"){
                        gameName = "500万"+globalVar.games[i].remark.slice(4, globalVar.games[i].remark.length);
                    }

                _menus+='<li class="mainGame" >';
                _menus+='<a data="'+rs[x].gameCode+'" onclick="" class="mainA">';
                _menus+='<i class="icon nav40-9"><img src="images/'+rs[x].gameCode+'.png"></i>';
                _menus+='<span class="color333">'+gameName+'</span>';
                _menus+='</a>';
                //_menus+='<span class="normal-desc">"'+gameName+'"</span>';
                _menus+='</li>'

                }

            }
            
        }
        for(var y = 0; y < globalVar.allGames.length; y++){
            if(globalVar.allGames[y].code == "SSC" || globalVar.allGames[y].code == "11X5" || globalVar.allGames[y].code == "PK10"){
                for(var t = 0; t < globalVar.allGames[y].games.length; t++){
                    globalVar.games2.push(globalVar.allGames[y].games[t]);
                }
            }
            else{
                for(var t = 0; t < globalVar.allGames[y].games.length; t++){
                    globalVar.games3.push(globalVar.allGames[y].games[t]);
                }
            }
        }
        pvpgame+='<li class="allGames clearfix" data-type="1">';
        pvpgame+='<h3><span>高频彩</span></h3>';
        pvpgame+=' <ul class="clearfix game-list">';
        for(var v = 0; v <6; v++){
            
                    if(globalVar.games2[v].remark.slice(0, 2) == "2K"){
                        globalVar.games2[v].remark = "500万"+globalVar.games2[v].remark.slice(2, globalVar.games2[v].remark.length);
                    }
                    else if(globalVar.games2[v].remark.slice(0, 4) == "2000"){
                        globalVar.games2[v].remark = "500万"+globalVar.games2[v].remark.slice(4, globalVar.games2[v].remark.length);
                    }
        pvpgame+='<li><a data="'+globalVar.games2[v].code+'" onclick="">'+globalVar.games2[v].remark+'</a></li>';
        }
        pvpgame+='</ul><i class="icon" id="open-btn-1" style="display: block;"></i>';
        pvpgame+='<div class="line-fff"></div>';
        pvpgame+='<div class="moreGames clearfix" style="display: none;" id="moreGames_1">';
        pvpgame+='<div class="moreGames-box fl">';
        pvpgame+='<div class="otherGames num-games">';
        pvpgame+='<h3>高频彩</h3>';
        pvpgame+='<ol>';
        for(var b = 6; b < globalVar.games2.length; b++){
                    if(globalVar.games2[b].remark.slice(0, 2) == "2K"){
                        globalVar.games2[b].remark = "500万"+globalVar.games2[b].remark.slice(2, globalVar.games2[b].remark.length);
                    }
                    else if(globalVar.games2[v].remark.slice(0, 4) == "2000"){
                        globalVar.games2[b].remark = "500万"+globalVar.games2[b].remark.slice(4, globalVar.games2[b].remark.length);
                    }
        pvpgame+='<li><a data="'+globalVar.games2[b].code+'" onclick="">'+globalVar.games2[b].remark+'</a></li>';
        }
        pvpgame+='</ol>';
        pvpgame+='</div></div></div></li>';
        pvpgame+='<li class="allGames clearfix" data-type="2">';
        pvpgame+='<h3><span>低频彩</span></h3>';
        pvpgame+='<ul class="clearfix game-list">';
        for(var c = 0; c < globalVar.games3.length; c++){
                    if(globalVar.games3[c].remark.slice(0, 2) == "2K"){
                        globalVar.games3[c].remark = "500万"+globalVar.games3[c].remark.slice(2, globalVar.games3[c].remark.length);
                    }
                    else if(globalVar.games3[c].remark.slice(0, 4) == "2000"){
                        globalVar.games3[c].remark = "500万"+globalVar.games3[c].remark.slice(4, globalVar.games3[c].remark.length);
                    }
        pvpgame+='<li><a data="'+globalVar.games3[c].code+'" onclick="">'+globalVar.games3[c].remark+'</a></li>';
        }
        pvpgame+='</ul></li>';
        pvpgame+='<li class="allGames clearfix" data-type="3">';
        pvpgame+='<h3><span>全部</span></h3>'
        pvpgame+='<ul class="clearfix game-list">'
        for(var z = 0; z <6; z++){
                    if(globalVar.games[z].remark.slice(0, 2) == "2K"){
                        globalVar.games[z].remark = "500万"+globalVar.games[z].remark.slice(2, globalVar.games[z].remark.length);
                    }
                    else if(globalVar.games[z].remark.slice(0, 4) == "2000"){
                        globalVar.games[z].remark = "500万"+globalVar.games[z].remark.slice(4, globalVar.games[z].remark.length);
                    }
        pvpgame+='<li><a data="'+globalVar.games[z].code+'" onclick="">'+globalVar.games[z].remark+'</a></li>';
        }
        pvpgame+='</ul><i class="icon" id="open-btn-1" style="display: block;"></i>';
        pvpgame+='<div class="line-fff"></div>';
        pvpgame+='<div class="moreGames clearfix" style="display: none;" id="moreGames_3">';
        pvpgame+='<div class="moreGames-box fl">';
        pvpgame+='<div class="otherGames num-games">';
        pvpgame+='<h3>全部</h3>';
        pvpgame+='<ol>';
        for(var n = 6; n < globalVar.games.length; n++){
                    if(globalVar.games[n].remark.slice(0, 2) == "2K"){
                        globalVar.games[n].remark = "500万"+globalVar.games[n].remark.slice(2, globalVar.games[n].remark.length);
                    }
                    else if(globalVar.games[n].remark.slice(0, 4) == "2000"){
                        globalVar.games[n].remark = "500万"+globalVar.games[n].remark.slice(4, globalVar.games[n].remark.length);
                    }
        pvpgame+='<li><a data="'+globalVar.games[n].code+'" onclick="">'+globalVar.games[n].remark+'</a></li>';
        }
        pvpgame+='</ol></div></div></div></li>';

            $("#lottery-list-box").html(_menus+pvpgame);
            //UI.lottMenusEvent(".sm-link ul li",true);
            //globalVar.series = rss;
            tcg.lib.hideLoading();


           /* var rss=globalVar.result.customerSeries;
            var ggc={};
            if(rss.length>0){
                for(var i=0;i<rs.length;i++){
                    for(var s=0;s<rss.length;s++){
                        if(rs[i]["code"]==rss[s].gameGroupCode){
                            ggc[rs[i]["code"]]=rs[i];
                            if(rs[i].games.length>0){
                                for(var j=0;j<rs[i].games.length;j++){
                                    var group_info=rss[s].gameGroupCode+"_"+rs[i].games[j].gameGroupId+"_"+rss[s].prizeModeId+"_"+rss[s].maxSeries+"_"+rss[s].minSeries+"_"+rss[s].maxBetSeries+"_"+rss[s].defaultSeries;
                                    if(rss[s].prizeModeId*1==1){
                                        window.sessionStorage.setItem(rs[i].games[j].code,group_info);
                                    }
                                    if(rss[s].prizeModeId*1==2){
                                        window.sessionStorage.setItem(rs[i].games[j].code+"_ZY",group_info);
                                    }
                                }
                            }
                        }
                    }
                }
                for(var o in ggc){
                    _menus+='<li class="mainGame" >';
                    _menus+='<i class="icon nav40-9"><img src="images/'+ggc[o].gameGroupId+'.png"></i>';
                    _menus+='<span class="color333">'+ggc[o].displayName+'</span>';
                    _menus+='<span class="normal-desc">"'+ggc[o].remark+'"</span>';
                    _menus+='</li>'
                    _menus+='<dl class="sm-link">';
                    _menus+='<dt class="'+(ggc[o].code=='11X5'?'fx11x5':ggc[o].code)+' inline-block"></dt>';
                    _menus+='<dd class="inline-block slider-g-t">'+ggc[o].displayName+'</dd>';
                    _menus+='<ul class="hide">';
                    if(ggc[o].games.length>0){
                        for(var j=0;j<ggc[o].games.length;j++){
                            _menus+='<li class="'+ggc[o].games[j].code+'" data-lotto="'+ggc[o].games[j].gameGroupId+'_'+ggc[o].games[j].gameId+'_'+ggc[o].games[j].code+'_'+ggc[o].code+'">'+ggc[o].games[j].remark+'</li>';
                        }
                    }
                    _menus+='</ul></dl>';
                }
            }
            $("#lottery-list-box").html(_menus+pvpgame);
            UI.lottMenusEvent(".sm-link ul li",true);
            globalVar.series = rss;
            tcg.lib.hideLoading();*/
       // }
    },
    lottMenusByLottery:function(rs){
        //newGame it's css name for hot game icon
        //mosTplayed it's css name for new game icon
        var _menus='<dl class="gameList hide">';
        var rss=globalVar.result.customerSeries;
        var ggc={};
        if(rss.length>0){
            for(var i=0;i<rs.length;i++){
                for(var s=0;s<rss.length;s++){
                    if(rs[i]["code"]==rss[s].gameGroupCode){
                        ggc[rs[i]["code"]]=rs[i];
                        if(rs[i].games.length>0){
                            for(var j=0;j<rs[i].games.length;j++){
                                var group_info=rss[s].gameGroupCode+"_"+rs[i].games[j].gameGroupId+"_"+rss[s].prizeModeId+"_"+rss[s].maxSeries+"_"+rss[s].minSeries+"_"+rss[s].maxBetSeries+"_"+rss[s].defaultSeries;
                                if(rss[s].prizeModeId*1==1){
                                    window.sessionStorage.setItem(rs[i].games[j].code,group_info);
                                }
                                if(rss[s].prizeModeId*1==2){
                                    window.sessionStorage.setItem(rs[i].games[j].code+"_ZY",group_info);
                                }
                            }
                        }
                    }
                }
            }
            for(var o in ggc){
                _menus+='<ul class="group_'+ggc[o].code+'">';
                if(ggc[o].games.length>0){
                    for(var j=0;j<ggc[o].games.length;j++){
                        _menus+='<li id="lgGame-'+ ggc[o].games[j].code +'" data-lotto="'+ggc[o].games[j].gameGroupId+'_'+ggc[o].games[j].gameId+'_'+ggc[o].games[j].code+'">'+ggc[o].games[j].remark+'</li>';
                    }
                }
                _menus+='</ul>';
            }
        }
        _menus+='<ol id="fungames" class="group_games">';
        _menus+= '<li id="fungames-lobby">娱乐大厅</li>';
        _menus+='</ol>';
        _menus+='</dl>';
        $("#topLottMenus").html(_menus);
        UI.lottMenusEvent("#topLottMenus ul li",true);
        globalVar.series = rss;
        TCG.hideLoading();
    },
    lottMenusEvent:function(selector,status){
        $(document).off("click",selector).on("click",selector,function(){
            if(window.sessionStorage.getItem("isLogin")=='false'){
                tcg.lib.alert("errors","您还未登录,请先登录!");
                return;
            }
            im.unSubscribeDrawResult(globalVar.currentLottery.game);
            var data=$(this).attr("data-lotto");
            var t=data.split("_");
            var groupinfo=window.sessionStorage.getItem(t[2]);

            if(groupinfo==null||groupinfo=='null'||groupinfo==''||groupinfo==undefined){
                groupinfo=window.sessionStorage.getItem(t[2]+'_ZY');
            }

            if(groupinfo==null||groupinfo=='null'||groupinfo==''||groupinfo==undefined){
                tcg.lib.alert('errors','暂时没有找到可用的奖金系列');
                return;
            }
            window.sessionStorage.setItem("currentLottery",data);

            // we added game menu in the game lobby to handle the redirection we added this fix
            if (window.location.pathname == "/game-lobby.html") {
                //window.location = window.location.origin + "/#lottery";
                window.location = "index.html#lottery";
            } else {
                window.location.hash="#lottery";
            }

            UI.loadLotteryPage();
        });
        if(status){
            $(document).off("click","#fungames").on("click","#fungames",function(){
                if(window.sessionStorage.getItem("isLogin")=='false'){
                    tcg.lib.alert("errors","您还未登录,请先登录!");
                    return;
                }else{
                    window.location="./game-lobby.html";
                    return;
                }
                im.unSubscribeDrawResult(globalVar.currentLottery.game);
            });
        }
    },
    draw:function(rs){
        var _html = '',
        _html2='';
        var newObj=[],
        newObjSub=[],
        newObj2Sub=[],
        newObj2=[];
        var length,
        length2;

        var q=0;
        for(var x = 0; x < rs.length; x++){

            for(var i = 0; i < globalVar.games.length; i++){
                if(rs[x].gameCode == 'FC3D' || rs[x].gameCode == 'TCP3P5'){

                    if(rs[x].gameCode == globalVar.games[i].code){
                        gameName = globalVar.games[i].remark;
                        gameTitle = globalVar.games[i].code;

                        if(globalVar.games[i].remark.slice(0, 2) == "2K"){
                            gameName = "500万"+globalVar.games[i].remark.slice(2, globalVar.games[i].remark.length);
                        }
                        else if(globalVar.games[i].remark.slice(0, 4) == "2000"){
                            gameName = "500万"+globalVar.games[i].remark.slice(4, globalVar.games[i].remark.length);
                        }

                        newObj.push(rs[x]);
                        newObjSub.push(gameName)
                    }

                }
                else{

                    if(rs[x].gameCode == globalVar.games[i].code){
                        gameName = globalVar.games[i].remark;
                        gameTitle = globalVar.games[i].code;

                        if(globalVar.games[i].remark.slice(0, 2) == "2K"){
                            gameName = "500万"+globalVar.games[i].remark.slice(2, globalVar.games[i].remark.length);
                        }
                        else if(globalVar.games[i].remark.slice(0, 4) == "2000"){
                            gameName = "500万"+globalVar.games[i].remark.slice(4, globalVar.games[i].remark.length);
                        }

                        newObj2.push(rs[x]);
                        newObj2Sub.push(gameName)

                    }

                }

            }

        }
        if(newObj.length > 5) length = 5;
        else length = newObj.length;
        for( var w = 0; w < length; w++){
            _html+='<li class="li-line icon"></li>';
            _html+='<li>';
            _html+='<div>';
            _html+='<span class="lot-name">';
            _html+='<a data="'+newObj[w].gameCode+'" onclick="">'+newObjSub[w]+'&nbsp;</a>'+newObj[w].numero+'期';
            _html+='</span>';
            _html+='<span class="term">'+ control_500vip.formatDateFull(Date(newObj[w].winningTime),"yyyy-MM-dd")+'</span>';
            _html+='<span class="clear"></span>';
            _html+='<div class="clear"></div>';

            for(var b = 0; b < newObj[w].winNo.length; b++){
                _html+='<div class="redball">'+newObj[w].winNo[b]+'</div>';
            }
            _html+='<br>';
            _html+='<div class="fr"><a onclick="">走势</a>　|　<a data="'+newObj[w].gameCode+'" onclick="">投注</a></div>';
            _html+='<div class="clear"></div></div>';
        }
                    $("#lastOpenQt").html(_html);
        if(newObj2.length > 5) length2 = 5;
        else length2 = newObj2.length;
        for( var q = 0; q < length2; q++){
            _html2+='<li class="li-line icon"></li>';
            _html2+='<li>';
            _html2+='<div>';
            _html2+='<span class="lot-name">';
            _html2+='<a data="'+newObj2[q].gameCode+'" onclick="">'+newObj2Sub[q]+'&nbsp;</a>'+newObj2[q].numero+'期';
            _html2+='</span>';
            _html2+='<span class="term">'+ control_500vip.formatDateFull(Date(newObj2[q].winningTime),"yyyy-MM-dd")+'</span>';
            _html2+='<span class="clear"></span>';
            _html2+='<div class="clear"></div>';

            for(var b = 0; b < newObj2[q].winNo.length; b++){
                _html2+='<div class="redball">'+newObj2[q].winNo[b]+'</div>';
            }
            _html2+='<br>';
            _html2+='<div class="fr"><a onclick="">走势</a>　|　<a data="'+newObj2[q].gameCode+'" onclick="">投注</a></div>';
            _html2+='<div class="clear"></  div></div>';

        }
                    $("#lastOpenSsc").html(_html2);
    },
    drawGameId:function(data, id){
        var _html='';
        var gameName;
        var CQSSC=[],FC3D=[],BJPK10=[],TCP3P5=[],SD11X5=[];

                control_500vip.clearLottDrawNumberTimer();
                var timer=window.setInterval(control_500vip.betTimer,1000);
                globalVar.lottDrawNumberTimer.push(timer);
      /*  for(var i = 0; i < data.length ; i++){
            if(data[i].gameCode == "CQSSC"){
                CQSSC.push(data[i]);
            }
            else if(data[i].gameCode == "FC3D"){
                FC3D.push(data[i])
            }
            else if(data[i].gameCode == "BJPK10"){
                BJPK10.push(data[i])
            }
            else if(data[i].gameCode == "TCP3P5"){
                TCP3P5.push(data[i])
            }
            else if(data[i].gameCode == "SD11X5"){
                SD11X5.push(data[i])
            }

        }

        var result = data,
        res;

        if(result == "1"){
            res = CQSSC;
        }
        else if(result == "14"){
            res = FC3D;
        }
        else if(result == "20"){
            res = BJPK10;
        }
        else if(result == "15"){
            res = TCP3P5;
        }
        else if(result == "5"){
            res = SD11X5;
        }*/

            for(var i = 0; i < globalVar.games.length; i++){
                if(data.content[0].gameCode == globalVar.games[i].code){
                    gameName = globalVar.games[i].remark;
                }
            }
        globalVar.currentLottery = data.content[0];
        globalVar.currentLottery.gameId = id;
        globalVar.currentLottery.game = gameName;
                    _html+='<li> 第<span name="issue"></span>期';
                    _html+='<span class="c-gray ch1231">截止：</span>';
                    _html+='<span class="sale_end_timer">';
                    _html+='<span>'
                    _html+='<span name="day" class="orange"></span>天'
                    _html+='<span name="h" class="orange"></span>小时'
                    _html+='<span name="m" class="orange"></span>分'
                    _html+='<span name="s" class="orange"></span>秒'
                    _html+='</span></span>'
                    _html+='</li><li class="bztz">'
                    _html+='<a name="btn_trend">走势图</a></li></ul>'
                    _html+='<div class="qb-selectnumber">'
                    _html+='<i class="sprite sprite-sscd" style="float: left;"></i>'
                    _html+='<ul id="lottWin" name="num_list" class="qb-selectnum clearfix qb_dlt_select">'
                   

                    $("#drawContent").html(_html);


                    if(data.content&&data.content.length>0){
                       
                       // UI_500vip.showDrawNumber(data.content[0].numero,data.content[0].winNo);
                        if(data.content.length>1){
                            for(var i=1;i<data.content.length;i++){

                                var _html='';
                                var winNo = data.content[0].winNo;
                                var winNoArr = winNo.split(",");
                                if(winNoArr.length > 1){
                                    for(var b = 0; b < winNoArr.length; b++){
                                     _html+='<li class="qb-red lot_sn_red">'
                                     _html+='<input value='+winNoArr[b]+' readonly="">'
                                     _html+='</li>'
                                    }
                                }
                                else{
                                    for(var b = 0; b < winNo.length; b++){
                                     _html+='<li class="qb-red lot_sn_red">'
                                     _html+='<input value='+winNo[b]+' readonly="">'
                                     _html+='</li>'
                                    }
                                }


                                _html+='</ul></div>'
                                _html+='<div style="display: block;" class="qb-tz-box clearfix">'
                                _html+='<span class="fl bei-box clearfix">'
                                _html+='<span class="dg-btn-box">'
                                _html+='<a data="'+data.content[0].gameCode+'" name="doBet" class="dg-tz-btn">立即投注</a>'
                                _html+='</span>'
                                _html+='</div></div>'
                                $("#lottWin").html(_html);
                                                           
                                //UI_500vip.lastDrawResult(data.content[i].numero,data.content[i].winNo,"for");
                            }
                             
                        }
                    }

                //UI_500vip.lottBetTimes(true);
    },
    promotioList: function(data){
        var _html = "";
        for(var i=0; i<data.length; i++){
            var start = data[i].startDate.split(" ")[0];
            var end = data[i].endDate.split(" ")[0];
            _html += "<div class='promo-wrp'>";
                _html += "<table cellpadding='0' cellspacing='0' border='0' class='ac_list_table'>";
                    _html += "<tbody>";
                        _html += "<tr>";
                            _html += "<td class='ac_img'><a href='javascript:void(0);' class='showDetails'><img src='" +data[i].mainPageUrl+ "'></a></td>";
                            _html += "<td>";
                                _html += "<div class='td_wrapper'>";
                                    _html += "<h2><a href='javascript:void(0);' class='showDetails'>" +data[i].title+ "</a></h2>";
                                    _html += "<ul class='info'>";
                                        _html += "<li class='rules'><a href='javascript:void(0);' class='showDetails'></a></li>";
                                        _html += "<li class='applicable'><em></em>活动开始时间: "+start+"<span class='grey'></span></li>";
                                        _html += "<li class='date'><em></em>活动结束时间: "+end+"<span class='grey'></span></li>";
                                    _html += "</ul>";
                                    _html += "<a class='join showDetails' href='javascript:void(0);'>查看详情</a>";
                                _html += "</div>";
                            _html += "</td>";
                        _html += "</tr>";
                    _html += "</tbody>";
                _html += "</table>";        
                _html += "<div class='xialawz promoDetails' style='display: none;'>" +data[i].content+ "</div>";
            _html += "</div>";
        }
        return _html;
    },
     lottBetTimes:function(status){
        var reqTime=new Date().getTime();
        tcg.lib.ajax({url:'lgw/numeros/near',headers:{Merchant: globalVar.merchantCode},data:{gameId:globalVar.currentLottery.gameId}},function(rs){
            if(rs.currentNumero){
                var respTime=new Date().getTime();
                $('span[name="issue"]').attr("numero",rs.currentNumero.numero);
                $('.sale_end_timer').attr("bet-times",Math.floor((rs.currentNumero.remainTime-(respTime-reqTime)/2)/1000));
                $('.sale_end_timer').attr("lock-times",Math.floor(rs.currentNumero.lockTime*1));
                globalVar.currentLottery.isSale=rs.currentNumero.isSale;
            }
            if(rs.previousNumero){
                //$('span[bet-timer="lastNumero"]').attr("numero",rs.previousNumero.numero);
                //$('span[bet-timer="lastNumero"]').text(rs.previousNumero.numero);
            }
            if(rs.nextNumero){
                $('span[name="issue"]').attr("next-numero",rs.nextNumero.numero);
            }
            if(status){
                control_500vip.drawGameId(globalVar.currentLottery.gameId);

            }else{
                control_500vip.betTimer();
            }
        });
    },
    showDrawNumber:function(numero,result){
        control_500vip.clearLottDrawNumberTimer();
        var lastNumero=$('span[bet-timer="lastNumero"]').attr("numero");
        if(numero==lastNumero){
            if(result.length==5&&result.indexOf(",")<0){
                var timer5=window.setTimeout(function(){
                    $("#drawResult li:eq(4)").removeClass("ball-rolling-4");
                    $("#drawResult li:eq(4)").text(result.charAt(4));
                },500);
                globalVar.lottDrawNumberTimer.push(timer5);
                var timer4=window.setTimeout(function(){
                    $("#drawResult li:eq(3)").removeClass("ball-rolling-3");
                    $("#drawResult li:eq(3)").text(result.charAt(3));
                },1000);
                globalVar.lottDrawNumberTimer.push(timer4);
                var timer3=window.setTimeout(function(){
                    $("#drawResult li:eq(2)").removeClass("ball-rolling-2");
                    $("#drawResult li:eq(2)").text(result.charAt(2));
                },1500);
                globalVar.lottDrawNumberTimer.push(timer3);
                var timer2=window.setTimeout(function(){
                    $("#drawResult li:eq(1)").removeClass("ball-rolling-1");
                    $("#drawResult li:eq(1)").text(result.charAt(1));
                },2000);
                globalVar.lottDrawNumberTimer.push(timer2);
                var timer1=window.setTimeout(function(){
                    $("#drawResult li:eq(0)").removeClass("ball-rolling-0");
                    $("#drawResult li:eq(0)").text(result.charAt(0));
                    if(globalVar.currentLottery.series[0].gameGroup == "SSC" && globalVar.currentLottMode == "ZY"){
                        $("#drawResult li:eq(0)").addClass("dr69");
                    }
                    control_500vip.clearLottDrawNumberTimer();
                },2500);
                globalVar.lottDrawNumberTimer.push(timer1);
            }
            if(result.length==3&&result.indexOf(",")<0){
                var timer3=window.setTimeout(function(){
                    $("#drawResult li:eq(2)").removeClass("ball-rolling-2");
                    $("#drawResult li:eq(2)").text(result.charAt(2));
                },500);
                globalVar.lottDrawNumberTimer.push(timer3);
                var timer2=window.setTimeout(function(){
                    $("#drawResult li:eq(1)").removeClass("ball-rolling-1");
                    $("#drawResult li:eq(1)").text(result.charAt(1));
                },1000);
                globalVar.lottDrawNumberTimer.push(timer2);
                var timer1=window.setTimeout(function(){
                    $("#drawResult li:eq(0)").removeClass("ball-rolling-0");
                    $("#drawResult li:eq(0)").text(result.charAt(0));
                    control_500vip.clearLottDrawNumberTimer();
                },1500);
                globalVar.lottDrawNumberTimer.push(timer1);
            }
            if(result.length>5&&result.length<20&&result.indexOf(",")>0){
                var t=result.split(",");
                var timer5=window.setTimeout(function(){
                    $("#drawResult li:eq(4)").removeClass("ball-rolling-4");
                    $("#drawResult li:eq(4)").text(t[4]);
                },500);
                globalVar.lottDrawNumberTimer.push(timer5);
                var timer4=window.setTimeout(function(){
                    $("#drawResult li:eq(3)").removeClass("ball-rolling-3");
                    $("#drawResult li:eq(3)").text(t[3]);
                },1000);
                globalVar.lottDrawNumberTimer.push(timer4);
                var timer3=window.setTimeout(function(){
                    $("#drawResult li:eq(2)").removeClass("ball-rolling-2");
                    $("#drawResult li:eq(2)").text(t[2]);
                },1500);
                globalVar.lottDrawNumberTimer.push(timer3);
                var timer2=window.setTimeout(function(){
                    $("#drawResult li:eq(1)").removeClass("ball-rolling-1");
                    $("#drawResult li:eq(1)").text(t[1]);
                },2000);
                globalVar.lottDrawNumberTimer.push(timer2);
                var timer1=window.setTimeout(function(){
                    $("#drawResult li:eq(0)").removeClass("ball-rolling-0");
                    $("#drawResult li:eq(0)").text(t[0]);
                    control_500vip.clearLottDrawNumberTimer();
                },2500);
                globalVar.lottDrawNumberTimer.push(timer1);
            }
            if(result.length>20&&result.indexOf(",")>0){
                var className='';
                if(globalVar.currentLottery.series[0].gameGroup =='PK10'){
                    className=globalVar.currentLottery.game=='XYPK10'?'boat':'car';
                }
                var t=result.split(",");
                for(var n=0;n<t.length;n++){
                    $("#drawResult li:eq("+n+")").removeClass();
                    $("#drawResult li:eq("+n+")").addClass(className+t[n]);
                    $("#drawResult li:eq("+n+")").text(t[n]);
                }
                
            }
        }
        //UI_500vip.lastDrawResult(numero,result);
        //control_500vip.getHotAndGap();//更新遗漏冷热数据
    },
    lastDrawResult:function(numero,result,isfor){
        if((!numero)||(!result)){return;}
        var lastThree=$("#lastThreeDrawResult>li").size();
        var lastSeven=$("#lastSevenDrawResult>li").size();
        var _ball='';
        switch (globalVar.currentLottery.series[0].gameGroup){
            case "SSC":_ball='<li '+(result.charAt(0)*1==6||result.charAt(0)*1==9?'class="sumNumber"':'')+'>'+result.charAt(0)+'</li><li>'+result.charAt(1)+'</li><li>'+result.charAt(2)+'</li><li>'+result.charAt(3)+'</li><li>'+result.charAt(4)+'</li>';break;
            case "11X5":var t=result.split(",");_ball='<li>'+t[0]+'</li><li>'+t[1]+'</li><li>'+t[2]+'</li><li>'+t[3]+'</li><li>'+t[4]+'</li>';break;
            case "PK10":var t=result.split(",");_ball='<li>'+t[0]+'</li><li>'+t[1]+'</li><li>'+t[2]+'</li><li>'+t[3]+'</li><li>'+t[4]+'</li><li>'+t[5]+'</li><li>'+t[6]+'</li><li>'+t[7]+'</li><li>'+t[8]+'</li><li>'+t[9]+'</li>';break;
            case "LF":
                for (var i=0; i<result.length; i++) {
                    _ball +='<li>'+result.charAt(i)+'</li>';
                }
            break;
            _ball='<li>'+result.charAt(0)+'</li><li>'+result.charAt(1)+'</li><li>'+result.charAt(2)+'</li>';break;
        }
        if(lastThree*1>=3&&(!isfor)){
            $("#lastThreeDrawResult>li:last-child").remove();
        }
        if(lastSeven*1>=20){
            $("#lastSevenDrawResult>li:last-child").remove();
            $("#lastSevenDrawResult>li:last-child").remove();
        }
        var lastThreeTxt='<li><div class="alignleft">'+numero+'</div>\
            <div class="alignright">\
            <ul>'+_ball+'</ul>\
            </div>\
            </li>';
        var lastSevenTxt='<li class="draw_date">'+numero+'</li>\
            <li class="draw_winning">\
            <ul>'+_ball+'</ul>\
            </li>';
        if(lastThree*1>0&&(!isfor)){
            $("#lastThreeDrawResult>li:first-child").before(lastThreeTxt);
        }else if(lastThree*1<3){
            $("#lastThreeDrawResult").append(lastThreeTxt);
        }
        if(lastSeven*1>0&&(!isfor)){
            $("#lastSevenDrawResult>li:first-child").before(lastSevenTxt);
        }else{
            $("#lastSevenDrawResult").append(lastSevenTxt);
        }
    },
    orbit: function(id){
        if(id == undefined){ id = "#featured" }
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                $('#featured').orbit({
                    animation: 'horizontal-push',                  // fade, horizontal-slide, vertical-slide, horizontal-push
                    animationSpeed: 1000,                // how fast animtions are
                    timer: true,             // true or false to have the timer
                    advanceSpeed: 2000,          // if timer is enabled, time between transitions 
                    pauseOnHover: true,          // if you hover pauses the slider
                    startClockOnMouseOut: true,      // if clock should start on MouseOut
                    startClockOnMouseOutAfter: 0,    // how long after MouseOut should the timer start again
                    directionalNav: false,        // manual advancing directional navs
                    captions: true,              // do you want captions?
                    captionAnimation: 'fade',        // fade, slideOpen, none
                    captionAnimationSpeed: 800,      // if so how quickly should they animate in
                    bullets: true,          // true or false to activate the bullet navigation
                    bulletThumbs: false,         // thumbnails for the bullets
                    bulletThumbLocation: '',         // location from this file where thumbs will be
                    afterSlideChange: function(){}   // empty function 
                });
            }
        }, 100);
    },

}

