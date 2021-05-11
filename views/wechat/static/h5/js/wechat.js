import Vue from "vue";

function isWechat() {
    let mic = window.navigator.userAgent.toLowerCase().match(/micromessenger/i);
    return mic && mic[0] === 'micromessenger' ? 1 : 0;
}

function call() {
    let whiteList = [
        "/pages/order/submit"
    ]
    let pathname = window.location.pathname;
    pathname = pathname.split("?")[0];
    if (whiteList.indexOf(pathname) > -1) {
        init();
    }
}

function init(callback) {
    if (isWechat()) {
        let url = window.location.href.split('#')[0];
        Vue.prototype.$heshop.jssdk('get', {
            url: url
        }).then((e) => {
            let apiList = [
                "chooseWXPay",
                "hideAllNonBaseMenuItem",
                "showMenuItems",
                "onMenuShareAppMessage",
                "updateTimelineShareData",
                "onMenuShareTimeline"
            ];
            let config = {
                debug: false,
                appId: e.appid,
                timestamp: e.timestamp,
                nonceStr: e.noncestr,
                signature: e.signature,
                jsApiList: apiList,
                openTagList: ['wx-open-subscribe']
            };
            jWeixin.config(config);
            jWeixin.error(err => {
                console.error('config fail:', err);
            });
            jWeixin.ready(() => {
                if (callback) callback(jWeixin);
            });
        });
    }
}

function chooseWXPay({ timestamp, nonceStr, packAge, signType, paySign, success, fail, cancel }) {
    jWeixin.chooseWXPay({
        timestamp: timestamp,
        nonceStr: nonceStr,
        package: packAge,
        signType: signType,
        paySign: paySign,
        success: function (res) {
            success && success(res);
        },
        fail: function (err) {
            fail && fail(err);
            console.error(err);
        },
        cancel: function (res) {
            cancel && cancel(res);
        },
        complete: function () {
        }
    });
}

function hideAllNonBaseMenuItem() {
    init(function (jssdk) {
        jssdk.hideAllNonBaseMenuItem();
    });
}

function showMenuItems() {
    init(function (jssdk) {
        jssdk.showMenuItems({
            menuList: [
                "menuItem:share:appMessage"
            ]
        });
    });
}

function onMenuShareAppMessage({ title = '', desc = ' ', link = '', imgUrl = '' }) {
    init(function (jssdk) {
        jssdk.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            type: 'link'// 如果type是music或video，则要提供数据链接，默认为空
        });
    });
}

function updateTimelineShareData({ title = '', link = '', imgUrl = '' }) {
    init(function (jssdk) {
        jssdk.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
        });
        jssdk.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
        });
    });
}

export default {
    isWechat,
    onMenuShareAppMessage,
    showMenuItems,
    hideAllNonBaseMenuItem,
    chooseWXPay,
    updateTimelineShareData,
    init,
    call
}
