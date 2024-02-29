var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {

        return false;
    },
    MENU_OPEN: function (caller, act, data) {
        caller.tabView.open(data);
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {

    /**
     * 2022-08-10 태준 수정 => 운영 현황과 제어 한 화면으로 합치고 충방전 계약은 일단 안보이게 처리
     **/
    this.menuItems = "[\n" +
        "    {\n" +
        "        \"createdAt\": 1634901921,\n" +
        "        \"createdBy\": \"system\",\n" +
        "        \"updatedAt\": 1638239110,\n" +
        "        \"updatedBy\": \"system\",\n" +
        "        \"createdUser\": null,\n" +
        "        \"modifiedUser\": null,\n" +
        "        \"menuId\": 100,\n" +
        "        \"menuGrpCd\": \"SYSTEM_MANAGER\",\n" +
        "        \"menuNm\": \"운영 현황\",\n" +
        "        \"multiLanguageJson\": {\n" +
        "            \"ko\": \"운영 현황\",\n" +
        "            \"en\": \"운영 현황\"\n" +
        "        },\n" +
        "        \"parentId\": null,\n" +
        "        \"level\": 0,\n" +
        "        \"sort\": 0,\n" +
        "        \"progCd\": \"mobileCpcm\",\n" +
        "        \"children\": [],\n" +
        "        \"program\": {\n" +
        "            \"createdAt\": 1634901998,\n" +
        "            \"createdBy\": \"system\",\n" +
        "            \"updatedAt\": 1634901998,\n" +
        "            \"updatedBy\": \"system\",\n" +
        "            \"createdUser\": null,\n" +
        "            \"modifiedUser\": null,\n" +
        "            \"progCd\": \"mobileCpcm\",\n" +
        "            \"progNm\": \"운영 현황\",\n" +
        "            \"progPh\": \"/jsp/pmsWeb/mobile/mobileCpcm.jsp\",\n" +
        "            \"target\": \"_self\",\n" +
        "            \"authCheck\": \"Y\",\n" +
        "            \"schAh\": \"N\",\n" +
        "            \"savAh\": \"N\",\n" +
        "            \"exlAh\": \"N\",\n" +
        "            \"delAh\": \"N\",\n" +
        "            \"remark\": null,\n" +
        "            \"id\": \"mobileCpcm\",\n" +
        "            \"dataStatus\": \"ORIGIN\",\n" +
        "            \"__deleted__\": false,\n" +
        "            \"__created__\": false,\n" +
        "            \"__modified__\": false\n" +
        "        },\n" +
        "        \"dataStatus\": \"ORIGIN\",\n" +
        "        \"__deleted__\": false,\n" +
        "        \"__created__\": false,\n" +
        "        \"__modified__\": false,\n" +
        "        \"open\": false,\n" +
        "        \"id\": 100,\n" +
        "        \"name\": \"운영 현황\"\n" +
        "    }\n" +
        // "\t{\n" +
        // "        \"createdAt\": 1663572365,\n" +
        // "        \"createdBy\": \"system\",\n" +
        // "        \"updatedAt\": 1663572365,\n" +
        // "        \"updatedBy\": \"system\",\n" +
        // "        \"createdUser\": null,\n" +
        // "        \"modifiedUser\": null,\n" +
        // "        \"menuId\": 102,\n" +
        // "        \"menuGrpCd\": \"SYSTEM_MANAGER\",\n" +
        // "        \"menuNm\": \"환경 설정\",\n" +
        // "        \"multiLanguageJson\": {\n" +
        // "            \"ko\": \"환경 설정\",\n" +
        // "            \"en\": \"환경 설정\"\n" +
        // "        },\n" +
        // "        \"parentId\": null,\n" +
        // "        \"level\": 0,\n" +
        // "        \"sort\": 0,\n" +
        // "        \"progCd\": \"mobileConfig\",\n" +
        // "        \"children\": [],\n" +
        // "        \"program\": {\n" +
        // "            \"createdAt\": 1663572365,\n" +
        // "            \"createdBy\": \"system\",\n" +
        // "            \"updatedAt\": 1663572365,\n" +
        // "            \"updatedBy\": \"system\",\n" +
        // "            \"createdUser\": null,\n" +
        // "            \"modifiedUser\": null,\n" +
        // "            \"progCd\": \"mobileConfig\",\n" +
        // "            \"progNm\": \"환경 설정\",\n" +
        // "            \"progPh\": \"/jsp/pmsWeb/mobile/mobileConfig.jsp\",\n" +
        // "            \"target\": \"_self\",\n" +
        // "            \"authCheck\": \"Y\",\n" +
        // "            \"schAh\": \"N\",\n" +
        // "            \"savAh\": \"N\",\n" +
        // "            \"exlAh\": \"N\",\n" +
        // "            \"delAh\": \"N\",\n" +
        // "            \"remark\": null,\n" +
        // "            \"id\": \"mobileConfig\",\n" +
        // "            \"dataStatus\": \"ORIGIN\",\n" +
        // "            \"__deleted__\": false,\n" +
        // "            \"__created__\": false,\n" +
        // "            \"__modified__\": false\n" +
        // "        },\n" +
        // "        \"dataStatus\": \"ORIGIN\",\n" +
        // "        \"__deleted__\": false,\n" +
        // "        \"__created__\": false,\n" +
        // "        \"__modified__\": false,\n" +
        // "        \"open\": false,\n" +
        // "        \"id\": 102,\n" +
        // "        \"name\": \"환경 설정\"\n" +
        // "    }    \n" +
        "]";


    this.menuItems = JSON.parse(this.menuItems);

    this.menuItems[0].open = true;

    this.topMenuView.initView();
    this.frameView.initView();
    this.tabView.initView();

    if (this.menuItems[0].program) {
        var menuNm = this.menuItems[0].menuNm;
        if(this.multiLanguageJson && this.multiLanguageJson[SCRIPT_SESSION.details.language]){
            menuNm = this.multiLanguageJson[SCRIPT_SESSION.details.language];
        }
        ACTIONS.dispatch(ACTIONS.MENU_OPEN, $.extend({}, this.menuItems[0].program, {menuId: this.menuItems[0].menuId, menuNm: menuNm}));
    }

    this.activityTimerView.initView();
};

fnObj.frameView = axboot.viewExtend({
    initView: function () {
        this.target = $("#ax-frame-root");


        this.fullScreenHandle = $("#ax-fullscreen-handel");
        this.fullScreenHandle.on("click", function () {
            ACTIONS.dispatch(ACTIONS.TOGGLE_FULLSCREEN);
        });
    }
});

/**
 * tabView
 */
fnObj.tabView = axboot.viewExtend({
    target: null,
    frameTarget: null,
    limitCount: 10,
    list: axboot.def["MOBILE_DEFAULT_TAB_LIST"],
    initView: function () {
        this.target = $("#ax-frame-header-tab-container");
        this.frameTarget = $("#content-frame-container");
        this.print();

        this.target.on("contextmenu", '.tab-item', function (e) {
            menu.popup(e);
            ax5.util.stopEvent(e);
        });
    },
    _getItem: function (item) {
        var po = [];

        po.push('<div class="tab-item ' + item.status + '" data-tab-id="' + item.menuId + '">');
        po.push('<span data-toggle="tooltip" data-placement="bottom" title=\'' + item.menuNm + '\'>', item.menuNm, '</span>');
        if (!item.fixed) po.push('<i class="cqc-cancel3" data-tab-close="true" data-tab-id="' + item.menuId + '"></i>');
        po.push('</div>');
        return po.join('');
    },
    _getFrame: function (item) {
        var po = [];
        po.push('<iframe class="frame-item ' + item.status + '" data-tab-id="' + item.menuId + '" name="frame-item-' + item.menuId + '" src="' + item.url + '" frameborder="0" framespacing="0"></iframe>');
        return po.join('');
    },
    print: function () {
        var _this = this;

        var po = [], fo = [], active_item;

        po.push('<div class="tab-item-holder">');
        po.push('<div class="tab-item-menu" data-tab-id=""></div>');

        // 고정형 인 경우 두번째(이동형) 디폴트 메뉴 삭제 ( axboot.config.js의 DEFAULT_TAB_LIST )
        if(isPositionFixYn === 'true') {
            this.list.splice(1,1);

            // 이동형 인 경우 첫번째(고정형) 디폴트 메뉴 삭제 ( axboot.config.js의 DEFAULT_TAB_LIST )
        } else {
            this.list.splice(0,1);
        }

        this.list.forEach(function (_item, idx) {

            po.push(_this._getItem(_item));

            fo.push(_this._getFrame(_item));
            if (_item.status === "on") {
                active_item = _item;
            }
        });
        po.push('<div class="tab-item-addon" data-tab-id=""></div>');
        po.push('</div>');

        this.target.html(po.join(''));
        this.frameTarget.html(fo.join(''));
        this.targetHolder = this.target.find(".tab-item-holder");
        // event bind
        this.bindEvent();

    },
    open: function (item) {
        var _item;

        var findedIndex = ax5.util.search(this.list, function () {
            this.status = '';
            return this.menuId === item.menuId;
        });

        this.target.find('.tab-item').removeClass("on");
        this.frameTarget.find('.frame-item').removeClass("on");



        if (findedIndex < 0) {

            this.list.push({
                menuId: item.menuId,
                id: item.id,
                progNm: item.progNm,
                menuNm: item.menuNm,
                progPh: item.progPh,
                url: CONTEXT_PATH + item.progPh + "?menuId=" + item.menuId,
                status: "on"
            });
            _item = this.list[this.list.length - 1];
            this.targetHolder.find(".tab-item-addon").before(this._getItem(_item));
            this.frameTarget.append(this._getFrame(_item));

            // 기존 메뉴 종료하고 새로운 메뉴만 나오도록 수정. 치홍
            fnObj.tabView.list.forEach(function (_item, idx) {
                if (_item.menuId !== item.menuId) {
                    fnObj.tabView.close(_item.menuId);

                }
            });

        } else {
            _item = this.list[findedIndex];
            this.target.find('[data-tab-id="' + _item.menuId + '"]').addClass("on");
            this.frameTarget.find('[data-tab-id="' + _item.menuId + '"]').addClass("on");
        }

        this.bindEvent();
        this.resize();
    },
    click: function (id, e) {
        this.list.forEach(function (_item) {
            if (_item.menuId === id) {
                _item.status = 'on';
                if (event.shiftKey) {

                    window.open(_item.url);
                }
            } else {
                _item.status = '';
            }
        });
        this.target.find('.tab-item').removeClass("on");
        this.frameTarget.find('.frame-item').removeClass("on");

        this.target.find('[data-tab-id="' + id + '"]').addClass("on");
        this.frameTarget.find('[data-tab-id="' + id + '"]').addClass("on");
    },
    close: function (menuId) {
        var newList = [], removeItem;
        this.list.forEach(function (_item) {
            if (_item.menuId !== menuId) newList.push(_item);
            else removeItem = _item;
        });
        if (newList.length === 0) {
            alert("마지막 탭을 닫을 수 없습니다");
            return false;
        }
        this.list = newList;
        this.target.find('[data-tab-id="' + menuId + '"]').remove();

        // 프레임 제거
        (function () {
            var $iframe = this.frameTarget.find('[data-tab-id="' + menuId + '"]'), // iframe jQuery Object
                iframeObject = $iframe.get(0),
                idoc = (iframeObject.contentDocument) ? iframeObject.contentDocument : iframeObject.contentWindow.document;

            $(idoc.body).children().each(function () {
                $(this).remove();
            });
            idoc.innerHTML = "";
            $iframe
                .attr('src', 'about:blank')
                .remove();

            // force garbarge collection for IE only
            window.CollectGarbage && window.CollectGarbage();
        }).call(this);

        if (removeItem.status === 'on') {
            var lastIndex = this.list.length - 1;
            this.list[lastIndex].status = 'on';
            this.target.find('[data-tab-id="' + this.list[lastIndex].menuId + '"]').addClass("on");
            this.frameTarget.find('[data-tab-id="' + this.list[lastIndex].menuId + '"]').addClass("on");
        }

        // check status = "on"
        var hasStatusOn = false;
        this.list.forEach(function (_item) {
            if (_item.status === "on") hasStatusOn = true;
        });
        if (!hasStatusOn) {
            var lastIndex = this.list.length - 1;
            this.list[lastIndex].status = 'on';
            this.target.find('[data-tab-id="' + this.list[lastIndex].menuId + '"]').addClass("on");
            this.frameTarget.find('[data-tab-id="' + this.list[lastIndex].menuId + '"]').addClass("on");
        }
        this.target.find('.tooltip').remove();
        this.resize();
    },
    bindEvent: function () {
        var _this = this;
        this.target.find('.tab-item').unbind("click").bind("click", function (e) {
            if (e.target.tagName === "I") {
                _this.close(this.getAttribute("data-tab-id"));
            }
            else {
                _this.click(this.getAttribute("data-tab-id"), e);
            }
        });

        this.target.find('[data-toggle="tooltip"]').tooltip();
    },
    resize: function () {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout((function () {
            var ctWidth = this.target.width();
            var tabsWidth = this.targetHolder.outerWidth();

            if (ctWidth < tabsWidth) {
                this.targetHolder.css({width: "100%"});
                this.target.find('.tab-item').css({'min-width': 'auto', width: (ctWidth / this.list.length) - 4});
            }
            else {
                this.targetHolder.css({width: "auto"});
                this.target.find('.tab-item').css({'min-width': '120px', width: "auto"});
                tabsWidth = this.targetHolder.outerWidth();
                if (ctWidth < tabsWidth) {
                    this.targetHolder.css({width: "100%"});
                    this.target.find('.tab-item').css({'min-width': 'auto', width: (ctWidth / this.list.length) - 4});
                }
            }
        }).bind(this), 100);

    }
});

fnObj.pageResize = function () {
    this.tabView.resize();
};




/**
 * topMenuView
 */
fnObj.topMenuView = axboot.viewExtend({
    initView: function () {
        this.target = $("#ax-top-menu");

        var menuItems = fnObj.menuItems;
        menuItems.forEach(function (n) {
            if(n.hasChildren) {
                n.name += ' <i class="cqc-chevron-down"></i>';
            }
        });

        this.menu = new ax5.ui.menu({
            theme: 'axboot',
            direction: "top",
            offset: {left: 0, top: -1},
            position: "absolute",
            icons: {
                'arrow': '<i class="cqc-chevron-right"></i>'
            },
            columnKeys: {
                label: 'name',
                items: 'children'
            },
            items: menuItems
        });

        this.menu.attach(this.target);
        this.menu.onClick = function () {
            if (this.program) {
                var menuNm = this.menuNm;
                if(this.multiLanguageJson && this.multiLanguageJson[SCRIPT_SESSION.details.language]){
                    menuNm = this.multiLanguageJson[SCRIPT_SESSION.details.language];
                }
                ACTIONS.dispatch(ACTIONS.MENU_OPEN, $.extend({}, this.program, {menuId: this.menuId, menuNm: menuNm}));
            }
        };
        this.menu.onStateChanged = function () {
            if (this.state === 'close') {
                //console.log(this.self.getCheckValue());
            }
        };
    }
});


/**
 * activityTimerView
 */
fnObj.activityTimerView = axboot.viewExtend({
    initView: function () {
        this.$target = $("#account-activity-timer");
        /*
         $(document.body).on("click", function () {
         fnObj.activityTimerView.update();
         });
         */
        this.update();
        setInterval(function () {
            fnObj.activityTimerView.print();
        }, 1000);
    },
    update: function () {
        this.initTime = (new Date()).getTime();
    },
    print: function () {
        var now = (new Date()).getTime(),
            D_Milli = (1000 * 60) * 60,
            M_Milli = (1000 * 60),
            S_Milli = 1000;

        var diffNum = (now - this.initTime);
        var displayTime = [];
        var hh, mi, ss;

        if (diffNum > D_Milli) {
            hh = Math.floor(diffNum / D_Milli);
            displayTime.push(ax5.util.setDigit(hh, 2) + ":");
            diffNum -= hh * D_Milli;
        }
        if (diffNum > M_Milli) {
            mi = Math.floor(diffNum / M_Milli);
            displayTime.push(ax5.util.setDigit(mi, 2) + ":");
            diffNum -= mi * M_Milli;
        } else {
            displayTime.push("00:");
        }
        if (diffNum > S_Milli) {
            ss = Math.floor(diffNum / S_Milli);
            displayTime.push(ax5.util.setDigit(ss, 2));
        } else {
            displayTime.push("00");
        }

        this.$target.html(displayTime.join(""));
    }
});
