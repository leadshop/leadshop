import Layout from '@/components/layout/layout'
import Main from '@/components/layout/main'

import Aside from '@/components/layout/aside'

import Finish from '@/components/layout/finish'
import Package from '@/components/layout/package'

import Console from '@/components/layout/console'



/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * hidden: (false) 设为true后在左侧菜单不会显示该页面选项
 * alwaysShow 是否显示根级菜单
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  activeMenu:激活菜单
 * }
 */

export default [
    //下面是多级导航
    {
        path: '/',
        component: Main,
        redirect: '/panel/index',
        name: 'leadshop',
        children: [{
                path: '/panel/index',
                name: 'panel',
                meta: {
                    parentMenu: '/panel/index',
                    title: '首页',
                    index: '1'
                },
                component: () => import('@/pages/panel/index.vue')
            },
            {
                path: '/goods/goods',
                component: Aside, // Parent router-view
                name: 'goods',
                meta: { title: '商品', index: '2' },
                redirect: '/goods/index',
                children: [{
                        path: '/goods/index',
                        component: () => import('@/pages/goods/goods'),
                        name: 'goods_index',
                        meta: {
                            keepAlive: true,
                            parentMenu: '/goods/goods',
                            title: '商品管理',
                            icon: "le-icon-goods-tube",
                            index: '2-1'
                        }
                    },
                    {
                        path: '/goods/publish',
                        component: () => import('@/pages/goods/publish'),
                        name: 'goods_publish',
                        meta: {
                            keepAlive: true,
                            title: '发布商品',
                            parentMenu: '/goods/goods',
                            icon: "le-icon-share",
                            index: '2-2'
                        }
                    },
                    {
                        path: '/goods/group',
                        component: () => import('@/pages/goods/group'),
                        name: 'goods_group',
                        meta: {
                            keepAlive: true,
                            title: '商品分类',
                            parentMenu: '/goods/goods',
                            icon: "le-icon-container",
                            index: '2-3'
                        }
                    },
                    {
                        path: '/gallery/gallery',
                        component: () => import('@/pages/gallery/gallery'),
                        name: 'goods_gallery',
                        meta: {
                            keepAlive: true,
                            title: '素材管理',
                            parentMenu: '/goods/goods',
                            icon: "le-icon-folder",
                            index: '2-4'
                        }
                    },
                    {
                        path: '/goods/service',
                        component: () => import('@/pages/goods/service'),
                        name: 'goods_service',
                        meta: {
                            keepAlive: true,
                            title: '商品服务',
                            parentMenu: '/goods/goods',
                            icon: "le-icon-service",
                            index: '2-5'
                        }
                    },
                    {
                        path: '/goods/groupPublish',
                        component: () => import('@/pages/goods/groupPublish'),
                        name: 'goods_groupPublish',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '商品服务',
                            parentMenu: '/goods/goods',
                            icon: "le-icon-groupPublish",
                            activeMenu: '/goods/group',
                            index: '2-6'
                        }
                    },
                    {
                        path: '/goods/servicePublish',
                        component: () => import('@/pages/goods/servicePublish'),
                        name: 'goods_servicePublish',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '商品服务',
                            parentMenu: '/goods/goods',
                            icon: "le-icon-servicePublish",
                            activeMenu: '/goods/service',
                            index: '2-6-1'
                        }
                    },
                    {
                        path: '/goods/goodsExportHistory',
                        component: () => import('@/pages/goods/goodsExportHistory'),
                        name: 'goods_goodsExportHistory',
                        hidden: true,
                        meta: {
                            activeMenu: '/goods/index',
                            keepAlive: true,
                            title: '导出记录',
                            parentMenu: '/goods/goods',
                            icon: "le-icon-goodsExportHistory",

                        }
                    }
                ]
            },
            {
                path: '/order/order',
                component: Aside, // Parent router-view
                name: 'order',
                meta: { title: '订单', index: '4' },
                redirect: '/order/index',
                children: [{
                        path: '/order/index',
                        component: () => import('@/pages/order/order'),
                        name: 'order_index',
                        meta: {
                            keepAlive: true,
                            title: '订单管理',
                            parentMenu: '/order/order',
                            icon: "le-icon-orders",
                            index: '4-1'
                        }
                    },
                    {
                        path: '/order/orderExportHistory',
                        component: () => import('@/pages/order/orderExportHistory'),
                        name: 'order_orderExportHistory',
                        hidden: true,
                        meta: {
                            activeMenu: '/order/index',
                            keepAlive: true,
                            title: '导出记录',
                            parentMenu: '/order/order',
                            icon: "",

                        }
                    },
                    {
                        path: '/order/after',
                        component: () => import('@/pages/order/after'),
                        name: 'order_after',
                        meta: {
                            keepAlive: true,
                            title: '售后管理',
                            parentMenu: '/order/order',
                            icon: "le-icon-after-sales"
                        },
                    },
                    {
                        path: '/order/afterOrderExportHistory',
                        component: () => import('@/pages/order/afterOrderExportHistory'),
                        name: 'order_afterOrderExportHistory',
                        hidden: true,
                        meta: {
                            activeMenu: '/order/after',
                            keepAlive: true,
                            title: '导出记录',
                            parentMenu: '/order/order',
                            icon: "",

                        }
                    },
                    {
                        path: '/order/remark',
                        component: () => import('@/pages/order/remark'),
                        name: 'order_remark',
                        meta: {
                            keepAlive: true,
                            title: '评价管理',
                            parentMenu: '/order/order',
                            icon: "le-icon-star-gray"
                        }
                    },
                    {
                        path: '/order/freightTemplate',
                        component: Layout,
                        meta: {
                            keepAlive: true,
                            title: '配送管理',
                            parentMenu: '/order/order',
                            icon: "le-icon-distribution"
                        },
                        children: [{
                                path: '/order/freightTemplate',
                                component: () => import('@/pages/order/freightTemplate'),
                                name: 'order_freightTemplate',
                                hidden: false,
                                meta: {
                                    keepAlive: true,
                                    subset: true,
                                    title: '运费模板',
                                    parentMenu: '/order/order'
                                }
                            },
                            {
                                path: '/order/shippingRules',
                                component: () => import('@/pages/order/shippingRules'),
                                name: 'order_shippingRules',
                                hidden: false,
                                meta: {
                                    keepAlive: true,
                                    subset: true,
                                    title: '包邮规则',
                                    parentMenu: '/order/order'
                                }
                            }
                        ]
                    },
                    {
                        path: '/order/afterDetail',
                        component: () => import('@/pages/order/afterDetail'),
                        name: 'order_afterDetail',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '售后订单详情',
                            parentMenu: '/order/order',
                            activeMenu: '/order/after',
                            icon: "le-icon-after-sales"
                        }
                    },
                    {
                        path: '/order/orderDetail',
                        component: () => import('@/pages/order/orderDetail'),
                        name: 'order_orderDetail',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '订单详情',
                            parentMenu: '/order/order',
                            activeMenu: '/order/index',
                            icon: "le-icon-star-gray"
                        }
                    },
                    {
                        path: '/order/freightPublish',
                        component: () => import('@/pages/order/freightPublish'),
                        name: 'order_freightPublish',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '新建模板',
                            parentMenu: '/order/order',
                            activeMenu: '/order/freightTemplate',
                            icon: "le-icon-star-gray"
                        }
                    },
                    {
                        path: '/order/shippingPublish',
                        component: () => import('@/pages/order/shippingPublish'),
                        name: 'order_freightPublish',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '新建规则',
                            parentMenu: '/order/order',
                            activeMenu: '/order/shippingRules',
                            icon: "le-icon-star-gray"
                        }
                    }
                ]
            },
            {
                path: '/users/users',
                component: Aside, // Parent router-view
                name: 'users',
                meta: { title: '用户' },
                redirect: '/users/index',
                children: [{
                        path: '/users/index',
                        component: () => import('@/pages/users/users'),
                        name: 'users_index',
                        meta: {
                            keepAlive: true,
                            title: '用户管理',
                            parentMenu: '/users/users',
                            icon: "le-icon-user-manage"
                        }
                    },
                    {
                        path: '/users/usersExportHistory',
                        component: () => import('@/pages/users/usersExportHistory'),
                        name: 'users_usersExportHistory',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '导出记录',
                            parentMenu: '/users/users',
                            activeMenu: '/users/index',
                            icon: ""

                        }
                    },
                    {
                        path: '/users/userData',
                        component: () => import('@/pages/users/userData'),
                        name: 'users_userData',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '用户详情',
                            parentMenu: '/users/users',
                            activeMenu: '/users/index',
                            hidden: true,
                            icon: "le-icon-user-manage"
                        }
                    }
                ]
            },
            {
                path: '/store/store',
                component: Aside, // Parent router-view
                name: 'store',
                meta: { title: '店铺' },
                redirect: '/store/color',
                children: [{
                        path: '/store/color',
                        component: () => import('@/pages/store/themeColor'),
                        name: 'store_themeColor',
                        meta: {
                            keepAlive: true,
                            title: '主题色',
                            parentMenu: '/store/store',
                            icon: "le-icon-zhutise"
                        }
                    },
                    {
                        path: '/store/index',
                        component: () => import('@/pages/store/store'),
                        name: 'store_index',
                        meta: {
                            keepAlive: true,
                            title: '店铺首页',
                            parentMenu: '/store/store',
                            icon: "le-icon-home"
                        }
                    },
                    {
                        path: '/finish/tabbar',
                        component: () => import('@/pages/tabbar/index'),
                        name: 'finish_tabbar',
                        meta: {
                            keepAlive: true,
                            title: '底部导航',
                            parentMenu: '/store/store',
                            icon: "le-icon-bottom"
                        }
                    },
                    {
                        path: '/finish/index',
                        component: () => import('@/pages/pages/index'),
                        name: 'finish_index',
                        meta: {
                            keepAlive: true,
                            title: '微页面',
                            parentMenu: '/store/store',
                            icon: "le-icon-bottom"
                        }
                    }
                ]
            },
            {
                path: '/channel/channel',
                component: Aside, // Parent router-view
                name: 'channel',
                meta: { title: '渠道' },
                redirect: '/channel/weChat-info',
                children: [{
                        path: '/channel/weChat-info',
                        component: Layout,
                        meta: {
                            keepAlive: true,
                            title: '公众号',
                            parentMenu: '/channel/channel',
                            icon: "le-icon-weixin2"
                        },
                        children: [{
                                path: '/channel/weChat-info',
                                component: () => import('@/pages/channel/weChat-info'),
                                meta: {
                                    title: '信息配置',
                                    parentMenu: '/channel/channel'
                                },
                            },
                            {
                                path: '/channel/weChat-pay',
                                component: () => import('@/pages/channel/weChat-pay'),
                                meta: {
                                    keepAlive: true,
                                    title: '支付配置',
                                    parentMenu: '/channel/channel'
                                },
                            },
                            {
                                path: '/channel/weChat-deploy',
                                component: () => import('@/pages/channel/weChat-deploy'),
                                hidden: true,
                                meta: {

                                    keepAlive: true,
                                    title: '支付配置',
                                    parentMenu: '/channel/channel'
                                },
                            }
                        ]
                    },
                    {
                        path: '/channel/applets-info',
                        component: Layout,
                        meta: {
                            keepAlive: true,
                            title: '小程序',
                            parentMenu: '/channel/channel',
                            icon: "le-icon-xiaochengxu"
                        },
                        children: [{
                                path: '/channel/applets-info',
                                component: () => import('@/pages/channel/applets-info'),
                                meta: {
                                    title: '信息配置',
                                    parentMenu: '/channel/channel'
                                },
                            },
                            {
                                path: '/channel/applets-pay',
                                component: () => import('@/pages/channel/applets-pay'),
                                meta: {
                                    keepAlive: true,
                                    title: '支付配置',
                                    parentMenu: '/channel/channel'
                                },
                            }
                        ]
                    }
                ]
            }, {
                path: '/setup/setup',
                component: Aside, // Parent router-view
                name: 'setup',
                meta: { title: '设置' },
                redirect: '/setup/index',
                children: [{
                        path: '/setup/index',
                        component: () => import('@/pages/setup/setup'),
                        name: 'setup_index',
                        meta: {
                            keepAlive: true,
                            title: '基础设置',
                            parentMenu: '/setup/setup',
                            icon: "le-icon-setup"
                        }
                    },
                    {
                        path: '/setup/address',
                        component: () => import('@/pages/setup/address'),
                        name: 'setup_address',
                        meta: {
                            keepAlive: true,
                            title: '退货地址',
                            parentMenu: '/setup/setup',
                            icon: "le-icon-positioning"
                        }
                    },
                    {
                        path: '/setup/addressPublish',
                        component: () => import('@/pages/setup/addressPublish'),
                        name: 'setup_addressPublish',
                        hidden: true,
                        meta: {
                            keepAlive: true,
                            title: '新增地址',
                            parentMenu: '/setup/setup',
                            icon: "le-icon-addressPublish"
                        }
                    }
                ]
            },
        ]
    },
    {
        path: 'finish',
        component: Finish, // Parent router-view
        name: 'finish',
        meta: {
            title: '装修',

        },
        redirect: '/finish/index',
        children: [{
            path: '/finish/index',
            component: () => import('@/pages/pages/index'),
            name: 'finish_index',
            meta: {
                keepAlive: true,
                title: '微页面',
                parentMenu: 'finish',
                icon: ""
            }
        }]
    },
    {
        path: '/package',
        component: Package, // Parent router-view
        name: 'package',
        meta: {
            title: '装修'
        },
        redirect: '/package/index',
        children: [{
            path: '/package/index',
            component: () => import('@/pages/package/index'),
            name: 'package_index',
            meta: {
                title: '微页面',
                parentMenu: 'package',
                icon: ""
            }
        }]
    },
    {
        path: "/store/pagePreview",
        component: () => import('@/pages/store/pagePreview'),
        meta: {
            title: '装修'
        }
    },
    {
        path: '/login/index',
        name: 'login',
        meta: {
            title: 'Login - 登录',

        },
        component: () => import('@/pages/login/index.vue')
    },
    {
        path: '/401',
        name: 'error_401',
        component: () => import('@/pages/error/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        component: () => import('@/pages/error/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        component: () => import('@/pages/error/404.vue')
    }
]