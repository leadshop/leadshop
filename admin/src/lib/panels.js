/*
 * @Author: qinuoyun
 * @Date:   2021-02-10 21:40:32
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-16 13:31:43
 */
const panels = {
    "basics": {
        title: "图文类",
        children: [{
                name: "search",
                icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/search-icon.png",
                title: "搜索框",
                content: {
                    style: 1,
                    text: ""
                },
                //外观
                facade: {
                    border_style: 1, //1 方框 2圆角
                    text_align: "left",
                    background_color: "#f7f7f7",
                    border_color: "#FFFFFF", //输入框颜色
                    icon_color: "#999999",
                    text_color: "#999999",
                    high_style: 20,
                }
            },
            {
                name: "title",
                icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/title-icon.png",
                title: "标题栏",
                content: {
                    style: 1,
                    title: "主标题",
                    subtitle: "子标题",
                    is_more: true,
                    moretitle: "查看更多",
                    morelink: {},
                },
                //外观
                facade: {
                    title_color: "#333333",
                    title_font_size: 14,
                    subtitle_color: "#999999",
                    subtitle_font_size: 12,
                    more_color: "#999999",
                    margin: 20
                }
            },
            {
                name: "banner",
                icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/banner-icon.png",
                title: "轮播图",
                content: [],
                //外观
                facade: {
                    chamfer_style: 1, //倒角样式
                    indicator_style: 1, //指示器样式
                    indicator_align: "left", //指示器位置
                    indicator_color: "#f5212d", //指示器颜色
                }
            },
            {
                name: "navigation",
                icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/navigation-icon.png",
                title: "图文导航",
                content: {
                    style: 1, //风格
                    data: [{
                        url: "",
                        title: "导航",
                        link: {}
                    }]
                },
                //外观
                facade: {
                    nav_style: 1, //展示样式 1 单行 2多行
                    nav_line: 2,
                    nav_line_mun: 4,
                    active_color: "#f5212d",
                    indicator_style: 1, //指示器样式
                    background_color: "#FFFFFF",
                    text_color: "#333333"
                }
            },
            {
                name: "rubik",
                icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/rubik-icon.png",
                title: "图片魔方",
                content: {
                    style: 1, //风格 1  2  3  4  5  6
                    density: 4, //魔方密度
                    data: [{
                        url: "",
                        link: ""
                    }]
                },
                //外观
                facade: {}
            },
            {
                name: "video",
                icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/video-icon.png",
                title: "视频",
                content: {
                    video: {},
                    cover: "",
                    autoplay: false,
                    loop: true,
                },
                //外观
                facade: {}
            },
            {
                name: "tabs",
                icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/tabs-icon.png",
                title: "选项卡",
                content: {
                    data: [{
                        title: "名称",
                        type: 1,
                        goods: [],
                        group: {}
                    }],
                    is_title: true,
                    is_price: true,
                    is_button: true
                },
                //外观
                facade: {
                    list_style: 2, //列表样式
                    card_style: 1, //卡片样式
                    chamfer_style: 0, //倒角样式
                    margin: 10, //商品间距
                    padding: 10, //左右边距
                }
            }
        ]
    },
    "advanced": {
        title: "商品类",
        children: [{
            name: "goods",
            icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/goods-icon.png",
            title: "商品",
            content: {
                type: 1, //商品类型
                goods: [],
                group: {
                    id: 0,
                    name: "",
                    limit: 20
                },
                is_title: true,
                is_price: true,
                is_button: true
            },
            facade: {
                list_style: 3, //列表样式
                card_style: 1, //卡片样式
                chamfer_style: 0, //倒角样式
                margin: 30, //商品间距
                padding: 20, //左右边距
            }
        }]
    },
    "sales": {
        title: "辅助类",
        children: [{
            name: "blank",
            icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/blank-icon.png",
            title: "辅助空白",
            content: {},
            //外观
            facade: {
                height: 10,
                background_color: "#FFFFFF",
            }
        }, {
            name: "separate",
            icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/separate-icon.png",
            title: "辅助线",
            content: {
                style: 'solid'
            },
            //外观
            facade: {
                margin: 10,
                fill_color: "#bebebe"
            }
        }]
    },
    "other": {
        title: "其他",
        children: [{
            name: "wechat",
            icon: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/wechat-icon.png",
            title: "微信公众号",
            content: {},
            //外观
            facade: {
                line_style: "",
                line_color: "",
                high_style: 20,
            }
        }]
    },
}

export default panels;