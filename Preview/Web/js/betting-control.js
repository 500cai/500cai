var control_betting = {
	init: function(){
			var path;

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

		window.sessionStorage.setItem("token",queryStringToJSON(path).token);
		
		if(queryStringToJSON(path).default != undefined){

			control_betting.launchGame("lobby");
			//$('#iframe1')[0].src = 'http://www.dev-b2blotto.com/500vip/lobby'
			//$('#iframe1')[0].src = 'http://www.dev-b2blotto.com/500vip/games/1?token='+window.sessionStorage.getItem("token")+'&merchant=500cai&lang=zh_CN'
		}
		else{
			control_betting.launchGame(queryStringToJSON(path).gameCode);
		}
		
		control_betting.getGames();
		control_betting.getPopularGames();
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
	getGames: function(){
		tcg.lib.ajax({url:'lgw/games',
							headers:{Merchant: globalVar.merchantCode}},function(g){
        					rs = control_500vip.lottSort(g);

        					if(rs.length>0){
						        	UI_500vip.lottMenusByLobbyBetting(rs);
						        /*
						            switch (hash){
						                case "#lobby":UI.lottMenusByLobby(rs);break;
						                case "#lottery":UI.lottMenusByLottery(rs);break;
						            }*/
						        }

						
		},  function(x){
				control_betting.requestHandler(x);
			})
	},
	getPopularGames: function(){
		var data = {count: 6};
		tcg.lib.ajax({url:'/lgw/games/popular', data:data,
							headers:{Merchant: globalVar.merchantCode}},function(g){
        					rs = g;

        					if(rs.length>0){
						        	UI_500vip.popularGamesBetting(rs);
						        }}, 
			function(x){
				control_betting.requestHandler(x);
			})
	},
	launchGame: function(src){
		var data = { lottoGameCode: src, lottoMode: 'Traditional'};
		tcg.lib.ajax({url:'/wps/game/launchGame', data:data, headers:{Merchant: globalVar.merchantCode, Authorization: window.sessionStorage.getItem("token")}, contentType: "application/json"}, 
			function(g){
		        $('#wl_lott')[0].style.display = "block";
				$('#wl_lott')[0].src = g.value.gameUrl;
		}, function(x){
				control_betting.requestHandler(x);
			}
		);
	},
	getMemberInfo: function(callback){
		var token = window.sessionStorage.getItem("token");
		tcg.lib.ajax({ url: "/wps/member/info", headers:{"Merchant": globalVar.merchantCode, "Authorization": token} ,type: "GET"
		}, 
			function(g){
				var response = g.success? g : { status: "failed", errorCode: "login.not.session" };
				window.sessionStorage.setItem('token', g.value.token);
				window.localStorage.setItem('token', g.value.token);
				callback(response);
		},  function(x){
				control_betting.requestHandler(x);
			}
		);
	},
	getAllWalletBalance: function(callback){
		var token = window.sessionStorage.getItem("token")
		tcg.lib.ajax({ url: "/wps/wallets/balance", headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json", type: "GET"
		}, 
			function(g){
				var response = g;
				for(var i = 0; i < g.value.balances.length; i++){
					if(g.value.balances[i].accountName == "LOTT"){
						$('#balance')[0].innerHTML = "￥"+g.value.balances[i].availBalance;
					}
				}
		},  function(x){
				control_betting.requestHandler(x);
			})
	},
	login: function(data, callback, data2){
		var deskey = tcg.lib.rndString();
		var encryption = tcg.lib.RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = tcg.lib.DESEncrypt(JSON.stringify(data), deskey);
		if(data2 == false || data2 == undefined){
			globalVar.merchantCode = "500cai"
		}
		else{
			globalVar.merchantCode = "500caitrial"
		}
		tcg.lib.ajax({ url: "/wps/session/login", data: dataRSA, headers:{"Merchant": globalVar.merchantCode , Encryption: encryption }, contentType: "application/json", type: "POST"
		}, 
			function(g){
				callback(g);
				
			control_betting.launchGame("lobby");
		},  function(x){
				control_betting.requestHandler(x);
			})
	},
	getSystemAnnouncements: function(callback){
		tcg.lib.ajax({ url: "/wps/system/announcements", headers:{"Merchant": globalVar.merchantCode}, contentType: "application/json",type: "GET"
		}, 
			function(g){
				callback(g);
		},  function(x){
				control_betting.requestHandler(x);
			})
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
	
}
