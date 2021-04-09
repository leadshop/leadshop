function MPageNavigate(item) {
    if (item.extend) {
        if (item.index == 2) {
            uni.navigateTo({
                url: item.path + '?id=' + item.param.id
            });
        }
        if (item.index == 7) {
            uni.navigateTo({
                url: item.path + '?id=' + item.param.id
            });
        }
        if (item.index == 3) {
            uni.navigateTo({
                url: item.path + '?group=' + item.param.id + '&goods_show=' + item.param.goods_show + '&name=' + item.param.name
            });
        }
    } else {
        if ([3, 4, 5, 1].indexOf(item.index) == -1) {
            uni.navigateTo({
                url: item.path,
                fail: function(res) {
                    uni.switchTab({
                        url: item.path
                    });
                }
            });
        } else {
            uni.switchTab({
                url: item.path,
                fail: function(res) {
                    uni.navigateTo({
                        url: item.path
                    });
                }
            });
        }
    }
}

export default MPageNavigate;