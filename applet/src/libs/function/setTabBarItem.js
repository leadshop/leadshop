function setTabBarItem() {
    uni.hideTabBar();
    let { color, selectedColor, backgroundColor, borderStyle, list }  = window.siteinfo.tabBar;
    uni.setTabBarStyle({
        color: color,
        selectedColor: selectedColor,
        backgroundColor: backgroundColor,
        borderStyle: borderStyle
    });
    let push = []
    list.forEach(function(item, index) {
        push.push(function() {
            return new Promise(function (resolve, reject) {
                uni.setTabBarItem({
                    index: index,
                    text: item.text,
                    iconPath:item.iconPath,
                    selectedIconPath: item.selectedIconPath,
                    pagePath:item.pagePath,
                    success: function(e) {
                        resolve();
                    },
                    fail: function(e) {
                        reject();
                    }
                });
            });
        }());
    });
    Promise.all(push).then(function() {
        let DOM = document.querySelectorAll(".uni-tabbar__item");
        for (let i = 0; i < DOM.length; i++) {
            DOM[i].style = 'display: none';
        }
        for (let j = 0; j < list.length; j++) {
            for (let i = 0; i < DOM.length;i++) {
                let text = DOM[i].innerText.trim();
                let str = list[j].text.trim();
                if (text === str) {
                    document.querySelectorAll(".uni-tabbar__item")[i].style = 'display: block';
                    break;
                }
            }
        }
        uni.showTabBar();
    });
}

export default setTabBarItem;

