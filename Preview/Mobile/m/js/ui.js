var ui = {
    alert: {
        show: function (msg, type, icon, callback) {
            $('#bwAlert .title.main').text(msg);
            if (icon == '') {
                $('#bwAlert .title.icon').hide();
            } else {
                $('#bwAlert .title.icon').show();
                if (icon == 'success') {
                    icon = 'bet-rectitude'
                } else if (icon == 'error') {
                    icon = 'bet-fork'
                } else if (icon == 'question') {
                    icon = 'bet-ask'
                } else if (icon == 'warning') {
                    icon = 'bet-plaint'
                } else if (icon == 'heart') {
                    icon = 'bet-heart'
                }
                $('#bwAlert .title.icon span').removeClass().addClass(icon);
            }

            $('#bwAlert .actions span').hide();
            if (type == 'OK') {
                $('#bwAlert .actions span.determine').show();
            } else if (type == 'CANCEL') {
                $('#bwAlert .actions span.cancel').show();
            } else if (type == 'OK_CANCEL') {
                $('#bwAlert .actions span.determine, #bwAlert .actions span.cancel').show();
            }
            $('#bwAlert').addClass('show');

            $('#bwAlert .actions span.determine').on("click", function () {
                if (callback) {
                    callback(true);
                }

                ui.alert.hide();
            });

            $('#bwAlert .actions span.cancel').on("click", function () {
                if (callback) {
                    //callback(false);
                }

                ui.alert.hide();
            });
        },
        hide: function () {
            $('#bwAlert').removeClass('show');
            $('#bwAlert .actions span.determine').unbind("click");
            $('#bwAlert .actions span.cancel').unbind("click");
        }
    },
    loader: {
        show: function () {
            $('#loadingScreen').addClass('show');
        },
        hide: function () {
            $('#loadingScreen').removeClass('show');
        }
    },
    lobby: {
        defaultHeader: function () {
            $(".login_link,.register_link").removeClass("hide");
        },
        sessionHeader: function () {
            $(".login_link,.register_link").addClass("hide");
            $(".personal").removeClass("hide");
            $(".log-out").removeClass("hide");
        },
        loadGamesPopular: function (data) {
            $("#gamesPopular").html("");
            var item_counter = 1;
            var items_in_page = "";
            var page_items = [];
            var page_counter = 1;
            var page_size_list = 3;
            for (var i = 0; i < data.length; i++) {
                var e = data[i];
                var border_class = (((i * 1) + 1) % 3 == 0 || ((i * 1) + 1) % 2 == 0 || i % 2 == 0 ? "border" : "");

                items_in_page += '<div class="game_link ' + border_class + '" data-gameCode="' + e.gameCode + '"><div><div class="all-games game-1 ' + e.gameCode + '"></div><p>' + TCG.Prop("gameName_" + e.gameCode) + '</p></div></div>';
                if (i == 10) {
                    items_in_page += '<div class="game_list border"><div><div class="all-games game-load-more"></div><p>更多彩种</p></div></div>';
                }
                page_items[page_counter] = items_in_page;
                if (item_counter < page_size_list) {
                    item_counter++;
                } else {
                    item_counter = 1;
                    page_counter++;
                    items_in_page = "";
                }
            }
            $(page_items).map(function (i, e) {
                $("#gamesPopular").append('<div class="game-content border-mid">' + e + '</div>');
            });
        },
        loadSystemAnnouncement: function (rs) {
            var data = rs.value.contentLobby;
            for (var i = 0; i < data.length; i++) {
                $("#marquee").append(data[i].content + " ");
            }
        },
        loadJackpot: function (rs) {
            $(".winning-wapper").html("");
            var _html = "";
            for (var i = 0; i < rs.value.game_jackpot.length; i++) {
                var e = rs.value.game_jackpot[i];
                //   _html += '<div><span class="icon-Winning"></span><span>' + e.game_name + '</span><span>喜中' + e.amount + '元</span><span>购买重庆时时彩</span></div>';
            }
            $(".winning-wapper").html(_html);

        }
    }
};