<script type="text/javascript">
export default {
    props: {
        value: {
            type: [String, Number, Array],
            default: ""
        },
        layoutWidth: {
            type: [String, Number],
            default: 336
        },
        cubeSize: {
            type: [String, Number],
            default: 6
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        cubeArray: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        cubeSize(value) {
            this.cubeRows = []
            this.columnRows = []
            this.coordinates = null
            this.firstEvent = null
            this.reset();
        },
        cubeArray: {
            handler(value) {
                //获取ID
                if (this.onTarget) {
                    let index = this.getIndexID(value, this.onTarget.id);
                    let item = value[index];
                    this.setImage(this.onTarget, item.url);
                }
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            cubeRows: [],
            columnRows: [],
            cubeKeys: [],
            coordinates: null,
            firstEvent: null,
            onTarget: null
        };
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        let that = this;
        that.initialize();
    },
    methods: {
        /**
         * 重置操作
         * @param  {[type]} argument [description]
         * @return {[type]}          [description]
         */
        reset(argument) {
            let childNodes = this.$refs['cube-box'].querySelectorAll(".selected-rubik-cube");
            for (var i = 0; i < childNodes.length; i++) {
                let target = childNodes[i];
                this.$refs['cube-box'].removeChild(target);
            }
            this.cubeKeys.map((item, index) => {
                let target = this.$refs[item];
                this.$refs[item].setAttribute('data-finish', 0)
                this.$refs[item].removeAttribute('data-start')
                this.$refs[item].classList.remove("selected");
                this.$refs[item].innerHTML = "+";
            })
            this.$emit('input', []);
        },
        /**
         * 执行初始化
         * @return {[type]} [description]
         */
        initialize() {
            let event = null;
            this.cubeArray.map((item, index) => {
                if (item.link) {
                    let columnRows = [parseInt(item.rowStart), parseInt(item.columnStart), parseInt(item.rowEnd), parseInt(item.columnEnd)];
                    let target = this.handleEventAdd(columnRows, item.uuid);
                    if (item.url) {
                        this.setImage(target, item.url);
                    }
                    if (!event) {
                        event = {};
                        event.target = target;
                    }
                }
            })
            //如果存在
            if (event) {
                //激活第一个元素
                this.handleItemActive(event);
            }

        },
        /**
         * 设置图片展示
         * @param {[type]} target [description]
         */
        setImage(target, url = "") {
            let coverImg = null;
            coverImg = target.getElementsByClassName('selected-rubik-img')[0] || null;
            if (url) {
                if (coverImg) {
                    coverImg.setAttribute('src', url);
                } else {
                    coverImg = document.createElement('img');
                    coverImg.setAttribute('class', 'selected-rubik-img');
                    coverImg.setAttribute('src', url);
                    coverImg.style.width = '100%';
                    coverImg.style.height = '100%';
                    coverImg.style.position = "absolute";
                    coverImg.style.top = 0;
                    coverImg.style.left = 0;
                    coverImg.onclick = (ev) => {
                        if (ev.target != this) return;
                    }
                    target.appendChild(coverImg);
                }
            }
        },
        /**
         * [getIndex description]
         * @return {[type]} [description]
         */
        getIndex(id) {
            let _index = -1;
            Array.from(this.$refs['cube-box'].querySelectorAll('.selected-rubik-cube')).forEach((item, index) => {
                if (item.id == id) {
                    _index = index;
                }
            });
            return _index;
        },
        /**
         * [getIndex description]
         * @return {[type]} [description]
         */
        getIndexID(data, id) {
            let _index = -1;
            for (let i in data) {
                let item = data[i];
                if (item.uuid == id) {
                    _index = i;
                }
            }
            return _index;
        },
        /**
         * 获取唯一值
         * @return {[type]} [description]
         */
        getUUID() {
            let d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now(); //use high-precision timer if available
            }
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        /**
         * 处理激活选项
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        handleItemActive(event) {
            this.coordinates = null;
            this.handleEventRefresh();
            this.handleCubeRowRefresh();
            let target = event.target || event;
            target.style.background = "#F7F5FE";
            target.style.border = "1px solid #623CEB"
            target.style.zIndex = 8;
            //当前激活项
            this.onTarget = target;
            //循环查询激活项目
            let index = this.getIndex(target.id);
            this.$emit('active', index);
        },
        /**
         * 处理删除选项
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        handleItemDelete(event) {
            let target = event.target;
            let rowStarts = Number(event.target.parentNode.getAttribute('data-rowStart'));
            let rowEnds = Number(event.target.parentNode.getAttribute('data-rowEnd'));
            let columnStarts = Number(event.target.parentNode.getAttribute('data-columnStart'));
            let columnEnds = Number(event.target.parentNode.getAttribute('data-columnEnd'));
            let columnIndex = Number(event.target.parentNode.getAttribute('data-index'));
            let id = event.target.parentNode.id;
            rowStarts > rowEnds ? [rowStarts, rowEnds] = [rowEnds, rowStarts] : [rowStarts, rowEnds] = [rowStarts, rowEnds];
            columnStarts > columnEnds ? [columnStarts, columnEnds] = [columnEnds, columnStarts] : [columnStarts, columnEnds] = [columnStarts, columnEnds];

            this.$refs['cube-box'].removeChild(event.target.parentNode);

            let _index = this.getIndexID(this.cubeArray, id);

            //删除结构
            this.cubeRows.splice(_index, 1);
            //删除对应数据
            this.cubeArray.splice(_index, 1);
            //遍历行
            for (let for2RowStarts = rowStarts; for2RowStarts <= rowEnds; for2RowStarts++) {
                //遍历列
                for (let i = columnStarts; i <= columnEnds; i++) {
                    let cubeKey = "cube-" + for2RowStarts + "_" + i;
                    this.$refs[cubeKey].classList.remove("selected");
                    this.$refs[cubeKey].innerHTML = "+";
                    this.$refs[cubeKey].setAttribute('data-finish', 0);
                }
            }
            //执行激活项目
            this.$emit('active', -1);
        },
        /**
         * 处理节点添加
         * @return {[type]} [description]
         */
        handleEventAdd(columnRows, uuid = "") {
            let w = 750 / this.cubeSize;
            let self = this;
            //再次点击确定
            let width = this.layoutWidth / this.cubeSize;
            let height = this.layoutWidth / this.cubeSize;
            let position = {
                left: parseInt(columnRows[1] - 1) * width,
                top: parseInt(columnRows[0] - 1) * height,
            }
            //行列数量
            let rowCount = Number(columnRows[2]) - Number(columnRows[0]) + 1;
            let columnCount = Number(columnRows[3]) - Number(columnRows[1]) + 1;

            let divWidth = width * columnCount + 1; //宽度计算方式：单个方块的宽度*列数减去一边框
            let divHeight = height * rowCount + 1; //高度计算方式：单个方块的高度*行数减去一边框
            //处理DIV样式
            let coverDiv = document.createElement('label');
            let coverIcon = document.createElement('i');
            //处理选项
            coverDiv.setAttribute('class', 'selected-rubik-cube');
            coverDiv.style.position = "absolute";
            coverDiv.style.top = position.top + 'px';
            coverDiv.style.left = position.left - 1 + 'px';
            coverDiv.style.width = divWidth + 'px';
            coverDiv.style.height = divHeight + 'px';
            coverDiv.style.background = "#F7F5FE";
            coverDiv.style.border = "1px solid #623CEB"
            //设置属性唯一值
            coverDiv.id = uuid;
            //处理属性设置
            coverDiv.setAttribute('data-rowStart', columnRows[0]);
            coverDiv.setAttribute('data-columnStart', columnRows[1]);
            coverDiv.setAttribute('data-rowEnd', columnRows[2]);
            coverDiv.setAttribute('data-columnEnd', columnRows[3]);
            coverDiv.setAttribute('data-url', "");
            coverDiv.setAttribute('data-link', "");
            coverDiv.setAttribute('data-index', this.cubeRows.length);
            //添加可实话数据
            coverDiv.innerHTML = Math.round(columnCount * w) + 'x' + Math.round(rowCount * w) + '像素或同比例';
            //添加元素
            coverIcon.setAttribute('class', 'le-icon');
            coverIcon.classList.add('le-icon-cha2')
            coverDiv.appendChild(coverIcon);
            //添加事件
            coverDiv.onclick = function(event) {
                if (event.target != this) {
                    self.handleItemActive(event.target.parentNode)
                } else {
                    self.handleItemActive(event)
                }

            };
            this.onTarget = coverDiv;
            coverIcon.onclick = this.handleItemDelete;
            //写入元素
            this.$refs['cube-box'].appendChild(coverDiv);
            //图层元素
            this.cubeRows.push(coverDiv);
            //重置第一个元素
            this.firstEvent = null;
            this.eventCount = [];
            this.columnRows = [];
            return coverDiv;
        },
        /**
         * 选中刷新
         * @return {[type]} [description]
         */
        handleEventRefresh() {
            this.cubeKeys.map((item, index) => {
                let target = this.$refs[item];
                if ((!parseInt(target.dataset.finish)) && (target.dataset.coordinates !== this.coordinates)) {
                    this.$refs[item].classList.remove("selected");
                    this.$refs[item].innerHTML = "+";
                }
            })
        },
        /**
         * 异常移除
         * @return {[type]} [description]
         */
        handleAbnormalRefresh() {
            let isExit = false;
            this.cubeKeys.map((item, index) => {
                let target = this.$refs[item];
                if ((parseInt(target.dataset.start)) && (target.className.search('selected') > 0)) {
                    isExit = target;
                }
            })
            return isExit;
        },
        /**
         * 改写出初始化样式
         * @param  {[type]} (item, index         [description]
         * @return {[type]}        [description]
         */
        handleCubeRowRefresh() {
            this.cubeRows.map((item, index) => {
                item.style.border = "1px solid #DCDFE6"
                item.style.background = "#FFFFFF"
                item.style.zIndex = "inherit"
            })
        },
        /**
         * 处理点击事件
         * @return {[type]} [description]
         */
        handleCubeItem(event) {
            let target = event.target;
            //重置样式
            this.handleCubeRowRefresh();
            //判断是否有选中
            if (target.className.search('selected') > 0) {
                let { columnRows } = this;
                //再次点击后执行清空选项
                this.coordinates = null;
                //获取开始结点
                let startEvent = this.$refs[this.firstEvent];
                //处理选中
                this.cubeKeys.map((item, index) => {
                    let target = this.$refs[item];
                    target.removeAttribute('data-start')
                    if (target.className.search('selected') > 0) {
                        this.$refs[item].setAttribute('data-finish', 1)
                    }
                })
                //处理数据
                let uuid = this.getUUID();
                //数据需要再此处进行添加
                this.cubeArray.push({
                    'rowStart': columnRows[0],
                    'columnStart': columnRows[1],
                    'rowEnd': columnRows[2],
                    'columnEnd': columnRows[3],
                    'uuid': uuid,
                    'url': "",
                    'link': {}
                });
                //执行元素添加
                this.handleEventAdd(columnRows, uuid)
                //执行激活项目
                this.$emit('active', this.cubeRows.length - 1);
            } else {
                //此处用于处理异常选项
                let abnormal = this.handleAbnormalRefresh()
                if (abnormal) {
                    abnormal.classList.remove("selected");
                    abnormal.innerHTML = "+";
                    abnormal.removeAttribute('data-start')
                }
                target.classList.add('selected')
                target.setAttribute('data-start', 1)
                target.innerHTML = "";
                //存储初始位置
                this.coordinates = target.dataset.coordinates;
                //获取位置
                let cubeItem = target.dataset.coordinates.split(":");
                //村粗初始值位置
                this.firstEvent = "cube-" + parseInt(cubeItem[0]) + "_" + parseInt(cubeItem[1])
                //记录开始结束
                this.columnRows = [parseInt(cubeItem[0]), parseInt(cubeItem[1]), parseInt(cubeItem[0]), parseInt(cubeItem[1])];
            }

        },
        /**
         * 鼠标移入
         * @return {[type]} [description]
         */
        handleMouseover(event) {
            let { coordinates } = this;
            //元素重置
            this.handleEventRefresh();
            if (coordinates != undefined) {
                let rowStart, columnStart, rowEnd, columnEnd;
                let target = event.target;
                //开始行列
                rowStart = parseInt(coordinates.split(":")[0]);
                columnStart = parseInt(coordinates.split(":")[1]);
                //结束行列
                rowEnd = parseInt(target.dataset.coordinates.split(":")[0]);
                columnEnd = parseInt(target.dataset.coordinates.split(":")[1]);
                //如果开始行大于结束行，则开始行用结束行，结束行用开始行
                rowStart > rowEnd ? [rowStart, rowEnd] = [rowEnd, rowStart] : [rowStart, rowEnd] = [rowStart, rowEnd];
                //如果开始列大于结束列，则开始列用结束列，结束列用开始列
                columnStart > columnEnd ? [columnStart, columnEnd] = [columnEnd, columnStart] : [columnStart, columnEnd] = [columnStart, columnEnd];
                let rowCount = 0; //总行数
                let columnCount = []; //总列数
                let isAdd = true;
                //重置新的开始结点
                this.firstEvent = "cube-" + rowStart + "_" + columnStart;
                //记录位置
                this.columnRows = [rowStart, columnStart, rowEnd, columnEnd];

                //遍历行
                for (let forRowStart = rowStart; forRowStart <= rowEnd; forRowStart++) {
                    rowCount++;
                    //遍历列
                    for (let i = columnStart; i <= columnEnd; i++) {
                        //当前行列坐标
                        let currentCoordinates = forRowStart + ":" + i;
                        //获取需要处理的对象
                        let key = "cube-" + forRowStart + "_" + i;
                        //检测当前的模块是否被占用，如果被占用，那么整个都不能选择
                        if (parseInt(this.$refs[key].dataset.finish)) {
                            isAdd = false;
                            break;
                        }
                        //统计计算
                        if (!columnCount.includes(i)) {
                            columnCount.push(i);
                        }
                        //修改样式
                        this.$refs[key].classList.add('selected')
                        // this.$refs[key].setAttribute('data-start', 1)
                        this.$refs[key].innerHTML = "";
                    }
                }

                if (!isAdd) {
                    this.cubeKeys.map((item, index) => {
                        let target = this.$refs[item];
                        if ((!parseInt(target.dataset.finish)) && (target.className.search('selected') > 0)) {
                            this.$refs[item].classList.remove("selected");
                            this.$refs[item].innerHTML = "+";
                        }
                    })
                    let startKey = "cube-" + this.coordinates.split(":")[0] + "_" + this.coordinates.split(":")[1];
                    let startTarget = this.$refs[startKey];
                    startTarget.classList.add('selected')
                    startTarget.setAttribute('data-start', 1)
                    startTarget.innerHTML = "";
                }

            }
        }
    },
    render(h) {
        let { layoutWidth, cubeSize } = this;
        /**
         * 计算魔方
         * @type {Array}
         */
        let cubes = [];
        let cubeKeys = []
        for (let x = 0; x < cubeSize; x++) {
            for (let y = 0; y < cubeSize; y++) {
                //记录存储
                let cubeKey = "cube-" + (x + 1) + '_' + (y + 1);
                cubes.push({
                    class: "matrix_cube",
                    attrs: {
                        'data-coordinates': (x + 1) + ':' + (y + 1),
                        'data-finish': 0
                    },
                    ref: cubeKey,
                    style: {
                        width: (layoutWidth / cubeSize) + 'px',
                        height: (layoutWidth / cubeSize) + 'px',
                        lineHeight: (layoutWidth / cubeSize) + 'px',
                        borderLeft: y === 0 ? '1px solid #e5e5e5' : '0',
                        borderBottom: (x + 1) === cubeSize ? '1px solid #e5e5e5' : '0',
                        boxSizing: "border-box"
                    },
                    on: {
                        click: this.handleCubeItem,
                        mouseover: this.handleMouseover,
                    }
                })
                cubeKeys.push(cubeKey);
            }
        }

        /**
         * 存储DOM结构
         * @type {[type]}
         */
        this.cubeKeys = cubeKeys;

        /**
         * 循环渲染数据
         * @param  {[type]} (node, index         [description]
         * @return {[type]}        [description]
         */
        const columnNodes = cubes.map((node, index) => {
            return <div { ...node }>+</div>;
        });

        let width = cubeSize == 5 ? 365 : 366;

        /**
         * 设置默认属性
         * @type {Object}
         */
        const defaultData = {
            class: "matrix",
            style: {
                width: width + 'px',
                height: width + 'px',
            },
            on: {

            },
            ref: 'cube-box'
        };

        /**
         * 处理信息
         * @type {String}
         */
        return <div {...defaultData}>
            {columnNodes}
        </div>
    }
};
</script>
<style lang="less">
@import './matrix.less';
</style>