function desEncrypt(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};

function rndString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 16;
    var randomString = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rnum,rnum+1);
    }
    return randomString;
};

var WPS = {
	getCaptcha: function(callback){
		$.ajax({ url: "./wps/captcha", type: "GET", headers: { "Merchant": globalVar.merchantCode },
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});		
	},	
	getDefaultAgent: function(callback){
		$.ajax({ url: "./wps/agent/default", type: "GET", headers: { "Merchant": globalVar.merchantCode },
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});		
	},
	getAffiliate: function(data, callback){
		$.ajax({ url: "./wps/agent/affiliate", data: data, type: "GET", headers: { "Merchant": globalVar.merchantCode },
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});		
	},
	register: function(data, callback){
		var deskey = tcg.lib.rndString();
		var encryption = tcg.lib.RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = tcg.lib.DESEncrypt(JSON.stringify(data), deskey);
		$.ajax({ url: "/wps/member/register", data: dataRSA, headers:{"Merchant": globalVar.merchantCode , Encryption: encryption }, contentType: "application/json", type: "PUT", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	login: function(data, callback, data2){
		var deskey = tcg.lib.rndString();
		var encryption = tcg.lib.RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = tcg.lib.DESEncrypt(JSON.stringify(data), deskey);
		if(data2 == false || data2 == undefined){
			globalVar.merchantCode = "500cai"
			window.localStorage.setItem('merchantCode', "500cai");
		}
		else{
			globalVar.merchantCode = "500caitrial"
			window.localStorage.setItem('merchantCode', "500caitrial");
		}
		$.ajax({ url: "/wps/session/login", data: dataRSA, headers:{"Merchant": globalVar.merchantCode , Encryption: encryption }, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	logout: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/session/logout", headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json",type: "DELETE",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	getSystemAnnouncements: function(callback){
		$.ajax({ url: "/wps/system/announcements", headers:{"Merchant": globalVar.merchantCode}, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	checkUsername: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/check/username", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token} ,type: "GET", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			} 
		});
	},
	// Member Center	
	getMemberInfo: function(callback){
		var token;
		if(window.localStorage.getItem("token") != null){
			token = window.localStorage.getItem("token");
		}
		else{
			token = window.sessionStorage.getItem("token");
		}
		$.ajax({ url: "/wps/member/info", headers:{"Merchant": globalVar.merchantCode, "Authorization": token} ,type: "GET", 
			complete: function(res){
				var response = res.status == 401 ? { status: "failed", errorCode: "login.not.session" } : res.responseJSON;
				callback(response);
			} 
		});
	},
	getAllWalletBalance: function(callback){
		var token = window.sessionStorage.getItem("token")
		$.ajax({ url: "/wps/wallets/balance", headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	getUnreadMessagesCount: function(callback){
		var token = window.sessionStorage.getItem("token")
		$.ajax({ url: "/wps/message/unreadCount",headers:{"Merchant": globalVar.merchantCode, "Authorization":token}, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}
		});
	},
	getDepositPromotions: function(data, callback){
		var token = window.sessionStorage.getItem("token")
		$.ajax({ url: "/wps/promotions/deposit", data: data, headers: {"Merchant": globalVar.merchantCode, "Authorization": token } , type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}
		});
	},
	getAgentAnnouncements: function(data, callback){
		var token = window.sessionStorage.getItem("token")
		$.ajax({ url: "/wps/agent/announcements", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}
		});
	},
	getDepositBanks: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/system/depositBanks", headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}
		});
	},
	acceptPromotion: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/promotions", data: dataString, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json",type: "POST",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},	
	depositPG: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/transaction/deposit/pg", data: dataString, headers:{"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json", type: "POST",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}			
		});
	},
	depositMT: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/transaction/deposit/mt", data: dataString, headers:{"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}						
		});
	},
	depositMA: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/transaction/deposit/ma", data: dataString, headers:{"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	depositQR: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/transaction/deposit/qr", data: dataString, headers: {"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json",type: "POST",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	getDepositTransaction: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/depositTransaction", data: data, headers: {"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	checkLockTransStatus: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/wallets/lockTransStatus", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	checkLockStatusByType: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/wallets/lockStatusByType", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	checkLockStatus: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/wallets/lockStatus", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json",type: "GET", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	transferToMainWallet: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/wallets/transferToMainWallet", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/x-www-form-urlencoded",type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	transferFromMainWallet: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/wallets/transferFromMainWallet", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/x-www-form-urlencoded",type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}												
		});
	},
	transferSubToSubWallet: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/wallets/transferSubToSubWallet", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/x-www-form-urlencoded",type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
			}															
		});
	},
	getWithdrawCards: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/bankCard", headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, type: "GET", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}																	
		});
	},
	withdraw: function(data, callback){
		var deskey = rndString();
		var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/transaction/withdraw", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, "Authorization": token, Encryption: encryption }, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}																			
		});
	},
	getWithdrawTransaction: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/withdrawTransaction", data: data, headers: {"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	checkWithdrawPassword: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/hasWithdrawalPassword", headers: {"Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json",type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	getWithdrawBanks: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/system/withdrawBanks", headers: {"Merchant": globalVar.merchantCode, "Authorization": token }, type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	withdrawAddCard: function(data, callback){
		var deskey = rndString();
		var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/bankCard", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, Encryption: encryption, "Authorization": token}, contentType: "application/json", type: "PUT", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	checkNickname: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/system/withdrawBanks", data: data, headers: {"Merchant": globalVar.merchantCode, "Authorization": token }, type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	updateMemberInfo: function(data, callback){
		var token = window.sessionStorage.getItem("token");		
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/member/info", data: dataString, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType:"application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}												
		});
	},
	setWithdrawPassword: function(data, callback){
		var deskey = rndString();
		var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/paymentPassword", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, Encryption: encryption, "Authorization": token}, contentType: "application/json", type: "PUT", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	changeWithdrawPassword: function(data, callback){
		// var deskey = rndString();
		// var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		// var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		var dataRSA = JSON.stringify(data);
		$.ajax({ url: "/wps/member/paymentPassword", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	accountGameBetHistory: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/accountGameBetHistory", data: data, headers: {"Merchant": globalVar.merchantCode, "Authorization": token }, type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	getAllWalletList: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/wallets", headers:{ "Merchant": globalVar.merchantCode, "Authorization": token }, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}
		});
	},
	getTransactionDetails: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/transaction", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getDetailedLottoPNL: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/detailedLottoPNL", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getPersonalPVPFishingPNL: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/personalPVPFishingPNL", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	changePassword: function(data, callback){
		// var deskey = rndString();
		// var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		// var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		var dataRSA = JSON.stringify(data);
		$.ajax({ url: "/wps/member/password", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	forgotPassword: function(data, callback){
		// var deskey = rndString();
		// var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		// var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var dataRSA = JSON.stringify(data);
		$.ajax({ url: "/wps/member/password/email", data: dataRSA, headers:{"Merchant": globalVar.merchantCode}, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getSecurityQuestions: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/securityQuestions", headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getCustomerSecurityQuestions: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/customerSecurityQuestions",headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	setCustomerSecurityQuestions: function(data, callback){
		var deskey = rndString();
		var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/customerSecurityQuestions", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, Encryption: encryption, "Authorization": token}, contentType: "application/json", type: "PUT", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	resetCustomerSecurityQuestions: function(data, callback){
		var deskey = rndString();
		var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/customerSecurityQuestions", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, Encryption: encryption, "Authorization": token}, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	getRecipients: function(callback){	
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/message/recipients",headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	sendMessage: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/message/send", data: dataString, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json", type: "PUT", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	getInbox: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/message/inbox", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	deleteInbox: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var messageIds = data;
		$.ajax({ url: "/wps/message/inbox?messageIds="+messageIds, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "DELETE",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	readMessage: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		// var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/message/read", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getOutbox: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/message/outbox", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	deleteOutbox: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var messageIds = data;
		$.ajax({ url: "/wps/message/outbox?messageIds="+messageIds, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json",type: "DELETE",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	getPromotions: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/promotions", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getLottoCustomerSeries: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/member/lottoCustomersSeries", headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	// Agent Center
	getGlobalRebateSettings: function(callback){	
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/globalRebateSettings", headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getDownlineRebates: function(data, callback){		
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/downlineRebates", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	registerDownline: function(data, callback){	
		var deskey = rndString();
		var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/downline", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, Encryption: encryption, "Authorization": token}, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	getDownlines: function(data, callback){		
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/downlines", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	createAffiliateURL: function(data, callback){		
		var token = window.sessionStorage.getItem("token");
		var dataString = JSON.stringify(data);
		$.ajax({ url: "/wps/agent/affiliateUrl", data: dataString, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, contentType: "application/json", type: "POST", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getAffiliateURLs: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/affiliateUrls", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	deleteAffiliateUrl: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		var affiUrlId = data;
		$.ajax({ url: "/wps/agent/affiliateUrl?affiUrlId="+affiUrlId, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "DELETE",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);
			}
		});
	},
	getRegisteredAffiliates: function(data, callback){		
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/registeredAffiliates", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	checkTransferEnabled: function(callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/transferEnabled", headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	promoteDownlineToAgent: function(data, callback){
		var token = window.sessionStorage.getItem("token");		
		$.ajax({ url: "/wps/agent/promoteDownlineToAgent", data: data, headers:{"Merchant": globalVar.merchantCode, "Authorization": token}, type: "PUT", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	transferToDownline: function(data, callback){
		var deskey = rndString();
		var encryption = RSAEncrypt(deskey.split('').reverse().join(''));
		var dataRSA = desEncrypt(JSON.stringify(data), deskey);
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/agent/transferDownline", data: dataRSA, headers:{"Merchant": globalVar.merchantCode, Encryption: encryption, "Authorization": token}, type: "PUT", 
			complete: function(res){
				var response = res.responseJSON;
				callback(response);				
			}									
		});
	},
	getDownlineTransactions: function(data, callback){		
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/downlineTransaction", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getDownlineLottoPNL: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/downlineLottoPNL", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getTeamPVPFishingPNL: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/teamPVPFishingPNL", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getTeamPVPRNGBetting: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/teamPVPRNGBetting", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getIncomeReport: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/income", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getCommissionReport: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/report/commission", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});
	},
	getAnnouncementsAdvanced: function(data, callback){
		var token = window.sessionStorage.getItem("token");
		$.ajax({ url: "/wps/system/announcements/advanced", data: data, headers:{"Merchant": globalVar.merchantCode, 'Authorization': token}, contentType: "application/json", type: "GET",
			complete: function(res){
				var response = res.responseJSON;
				callback(response);								
			}
		});		
	}
}