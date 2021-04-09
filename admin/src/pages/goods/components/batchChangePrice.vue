<template>
    <div class="le-matter">
        <el-form label-width="170px">
            <el-form-item label="在当前面商品价格基础上">
               <div style="margin-bottom: 8px;">
                   <el-radio :label="0" v-model="type">
                       增加
                       <el-input :disabled="type === 1">
                           <template slot="append">元</template>
                       </el-input>
                   </el-radio>
               </div>
                <div>
                    <el-radio :label="1" v-model="type">
                        减少
                        <el-input :disabled="type === 0">
                            <template slot="append">元</template>
                        </el-input>
                    </el-radio>
                </div>
            </el-form-item>
        </el-form>
        <el-table
            style="width: 100%"
            :data="list"
            max-height="240px"
        >
            <el-table-column
                prop="name"
                show-overflow-tooltip
                label="商品名称"
               >
            </el-table-column>
            <el-table-column
                prop="price"
                label="商品价格"
                width="180">
                <template slot-scope="scope">
                    ￥{{scope.row.price}}
                </template>
            </el-table-column>
            <el-table-column
                label="修改后价格"
                width="180">
                <template slot-scope="scope">
                    {{scope.after_price ? '' : '-'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "batchChangePrice",
    props: {
        value: {
            type: Array
        }
    },
    data() {
        return {
            type: 0,
            list: this.value
        }
    },
};
</script>

<style scoped>
    .le-matter {
        padding: 0 40px;
    }
    /deep/.el-radio .el-radio__label {
        height: 32px;
        line-height: 32px;
        display: inline-block;
    }
    /deep/ .el-input {
        margin-left: 16px;
        width: 200px;
    }
</style>