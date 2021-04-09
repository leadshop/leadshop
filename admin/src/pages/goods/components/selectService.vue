<template>
    <div class="he-selectService">
        <el-input placeholder="输入服务名称搜索" class="he-selectService__input" v-model="select"
                  @keydown.enter.native="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <div class="he-selectService__checkbox">
            <div v-for="(item, index) in newList" :key="index">
                <el-checkbox :label="item.title" v-model="item.check" @change="change(index)"></el-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "selectService",
    props: {
        value: Object
    },
    data() {
        return {
            list: [],
            select: '',
            newList: []
        }
    },
    mounted() {
        this.value.list.forEach(item => {
            if (item.check) {
                this.list.push(item);
            }
        });
        this.newList = this.value.list;
    },
    methods: {
        change(index) {
            if (this.value.list[index].check) {
                this.list.push(this.value.list[index]);
            } else {
                this.list.splice(index, 1);
            }
        },
        affirm(e) {
            let {handleClose} = e;
            this.value.select = this.list;
            this.$emit('input', this.value);
            handleClose();
        },
        search: function () {
            let list = [];
            for (let i = 0; i < this.value.list.length; i++) {
                if (this.value.list[i].title.indexOf(this.select) > -1) {
                    list.push(this.value.list[i]);
                }
            }
            this.newList = list;
        }
    }
}
</script>

<style scoped>
.he-selectService {
    width: 312px;
    height: 260px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
}

.he-selectService__input {
    margin: 16px 15.5px 15px 15.5px;
}

.he-selectService__input /deep/ .el-input-group__append {
    padding: 0 13px;
}

.he-selectService__checkbox {
    height: 195px;
    overflow: auto;
}

.he-selectService__checkbox /deep/ .el-checkbox {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
}
</style>