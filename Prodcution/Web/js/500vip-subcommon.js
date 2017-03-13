var newMerchantCode;
if(window.localStorage.getItem("merchantCode") == undefined){
	newMerchantCode = "500cai";
}
else{
	newMerchantCode = window.localStorage.getItem("merchantCode");
}

var globalVar = {
	result:{},
	customerServiceLink: 'http://chat56op.live800.com/live800/chatClient/chatbox.jsp?companyID=793342&configID=109314&jid=1722177314',
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
	games2:[],
	games3:[],
	mouseOverTimer: "",
	clearTimer: true,
	userAccountInfo: "0",
	allGames: null,
	expiredAffCode: false	
};