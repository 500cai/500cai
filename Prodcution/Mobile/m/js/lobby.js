var lobby = {
    init: function () {
        $("#switch_container").html("");
        lobby.ui.header();
        lobby.ui.centralContainer();
        lobby.ui.bannerContainer();
        lobby.ui.announcementContainer();
        lobby.ui.shortCutLinks();
        lobby.ui.popularGamesAndWinning();
        lobby.ui.footer();
    },
    ui: {
        header: function () {
            var _html = '';
            _html += '<header class="header">';
            _html += '    <nav class="nav">';
            _html += '    <a href="#" class="login_link "><span class="left bet-left-back">登录</span></a>';
            _html += '    <a href="#" data-hash="#funds" class="personal hide session_link"><span class="icon-personal left bet-left-back"></span></a>';
            _html += '    <a href="register.html" class="register_link "><span class="right">注册</span></a>';
            _html += '    <a href="#" class="log-out hide"><span class="right">登出</span></a>';
            _html += '   </nav>';
            _html += '    </header>';
            $("#switch_container").append(_html);
        },
        centralContainer: function () {
            var _html = '<section id="central_body" class="central"><div class="central_body"></div></section>';
            $("#switch_container").append(_html);
        },
        bannerContainer: function () {
            var _html = '';
            _html += '<div class="index_img m-scooch m-fluid m-scooch-photos">';
            _html += '  <div id="bannerPage" class="img_content m-scooch-inner"></div>';
            _html += '</div>';
            $("#central_body").append(_html);
        },
        announcementContainer: function () {
            var _html = '';
            _html += '<div class="announcement">';
            _html += '    <span class="icon-announcement"></span>';
            _html += '    <div class="announcement-content">';
            _html += '      <marquee id="marquee"></marquee>';
            _html += '    </div>';
            _html += '   <span class="icon-arrow-right"></span>';
            _html += '</div>';
            $("#central_body").append(_html);
        },
        shortCutLinks: function () {
            var _html = '';
            _html += '<nav class="">';
            _html += '    <div class="index-center">';
            _html += '    <div class="deposit session_link" data-hash="#funds">';
            _html += '    <i class="icon-deposit all-icons" data-target_loc=""></i>存/取款';
            _html += '    </div>';
            _html += '    <div class="recond session_link" data-hash="#betting-history">';
            _html += '    <i class="icon-recond all-icons" data-target_loc=""></i>投注纪录';
            _html += '    </div>';
            _html += '    <div class="promotions nav_link" data-target_loc="promotion.html">';
            _html += '    <i class="icon-promotions all-icons"></i>优惠活动';
            _html += '    </div>';
            _html += '    <div class="online live_chat_link">';
            _html += '    <i class="icon-online all-icons"></i>在线客服';
            _html += '    </div>';
            _html += '    </div>';
            _html += '</nav>';
            $("#central_body").append(_html);
        },
        popularGamesAndWinning: function () {
            var _html = '';
            _html += '<div>';
            _html += '<div class="div-popular">';
            _html += '    <div>热门彩种</div>';
            _html += '    </div>';
            _html += '    <div id="gamesPopular" class="game-wapper">';
            _html += '    </div>';
            _html += '    <div class="div-winning">';
            _html += '    <div>最新中奖榜</div>';
            _html += '    </div>';
            _html += '    <div class="winning-wapper">';
            _html += '    </div>';
            _html += '</div>';
            $("#central_body").append(_html);
        },
        footer: function () {
            var _html = '';
            _html += '<footer class="footer">';
            _html += '    <nav id="footerNavContainer" class="nav flex_nav nav_flex">';
            _html += '    <div class="home-btn active"><span class="icon-home"></span><span>首页</span></div>';
            _html += '    <div class="game_list"><span class="icon-cart"></span><span>购彩</span></div>';
            _html += '    <div class="draw_history"><span class="icon-lottery"></span><span>开奖</span></div>';
            _html += '    <div class="trend_chart"><span class="icon-trend"></span><span>走势</span></div>';
            _html += '    <div class="session_link" data-hash="#security-questions"><span class="icon-personal"></span><span>我的</span></div>';
            _html += '   </nav>';
            _html += '</footer>';
            $("#switch_container").append(_html);
        }
    }

};
controller.lobby.init();