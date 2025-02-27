<template>
<div class="iot-product app-container">
    <el-card class="card-search" shadow="never">
        <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-bottom:-20px;">
            <el-form-item label="" prop="productName">
                <el-input v-model="queryParams.productName" placeholder="请输入产品名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="categoryName">
                <el-input v-model="queryParams.categoryName" placeholder="请输入产品分类名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="status">
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
                    <el-option v-for="dict in dict.type.iot_product_status" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleEditProduct(0)" v-hasPermi="['iot:product:add']">新增</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-row :gutter="20" v-loading="loading">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-for="(item,index) in productList" :key="index" style="margin-bottom:20px;text-align:center;">
                <el-card :body-style="{ padding: '0'}" shadow="never" class="card-item">
                    <div class="item-title">
                        <div>
                            <el-image class="img" :preview-src-list="[baseUrl+item.imgUrl]" :src="baseUrl+item.imgUrl" fit="cover" v-if="item.imgUrl!=null && item.imgUrl!=''"></el-image>
                            <el-image class="img" :preview-src-list="[require('@/assets/images/gateway.png')]" :src="require('@/assets/images/gateway.png')" fit="cover" v-else-if="item.deviceType==2"></el-image>
                            <el-image class="img" :preview-src-list="[require('@/assets/images/video.png')]" :src="require('@/assets/images/video.png')" fit="cover" v-else-if="item.deviceType==3"></el-image>
                            <el-image class="img" :preview-src-list="[require('@/assets/images/product.png')]" :src="require('@/assets/images/product.png')" fit="cover" v-else></el-image>
                        </div>
                        <div class="title" @click="handleEditProduct(item)">
                            <div class="name">{{item.productName}}</div>
                            <div class="tag">
                                <el-tag type="info" size="mini" effect="light">admin</el-tag>
                            </div>
                        </div>
                        <div style="width: 45px;"></div>
                        <div class="status">
                            <el-tooltip effect="dark" content="取消发布" placement="top-start" v-if="item.status==2">
                                <el-button size="mini" plain class="btn-published" @click="changeProductStatus(item.productId,1,item.deviceType)">
                                    <svg-icon :icon-class="icons[0]" />
                                    已发布
                                </el-button>
                            </el-tooltip>

                            <el-tooltip effect="dark" content="现在发布" placement="top-start" v-if="item.status==1">
                                <el-button type="info" size="mini" class="btn-unpublished item" @click="changeProductStatus(item.productId,2,item.deviceType)">
                                    <svg-icon :icon-class="icons[1]" />
                                    未发布
                                </el-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <el-row :gutter="10">
                        <el-col :span="12" class="card-item-desc" style="padding-left: 24px; padding-right: 5px;">
                            <el-descriptions class="card-item-desc-item" :column="1" size="small">
                                <el-descriptions-item label="所属分类">
                                    <el-link class="product-category" type="primary" :underline="false">{{item.categoryName}}</el-link>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="12" class="card-item-desc" style="padding-left: 5px; padding-right: 24px;">
                            <el-descriptions class="card-item-desc-item" :column="1" size="small">
                                <el-descriptions-item label="联网方式">
                                    <dict-tag :options="dict.type.iot_network_method" :value="item.networkMethod" />
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12" class="card-item-desc" style="padding-left: 24px; padding-right: 5px;">
                            <el-descriptions class="card-item-desc-item" :column="1" size="small">
                                <el-descriptions-item label="产品类型">
                                    <dict-tag :options="dict.type.iot_device_type" :value="item.deviceType" />
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="12" class="card-item-desc" style="padding-left: 5px; padding-right: 24px;">
                            <el-descriptions class="card-item-desc-item" :column="1" size="small">
                                <el-descriptions-item label="设备授权">
                                    <el-tag type="success" size="mini" v-if="item.isAuthorize==1">已启用</el-tag>
                                    <el-tag style="color: rgb(192, 196, 204);border-radius: 2px;border: 1px solid rgb(192, 196, 204);background-color: rgb(255, 255, 255);" size="mini" v-else>未启用</el-tag>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                    </el-row>
                    <el-divider class="divider"></el-divider>
                    <div class="card-item-btns">
                        <el-button size="mini" type="text" @click="handleEditProduct(item)" v-hasPermi="['iot:product:query']">详情</el-button>
                        <span class="btn-item-line">|</span>
                        <el-button size="mini" type="text" @click="handleDelete(item)" v-hasPermi="['iot:product:remove']" v-if="item.status==1">删除</el-button>
                        <span class="btn-item-line" v-if="item.status==1">|</span>
                        <el-button size="mini" type="text" @click="handleDeviceAuthorize(item)" v-hasPermi="['iot:product:edit']" v-if="item.status==2" :disabled="item.isAuthorize!=1">设备授权</el-button>
                        <span class="btn-item-line" v-if="item.status==2">|</span>
                        <el-button size="mini" type="text" @click="handleViewDevice(item.productId)" v-hasPermi="['iot:device:query']">查看设备</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-empty description="暂无数据，请添加产品" v-if="total==0"></el-empty>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" :pageSizes="[12, 24, 36, 60]" @pagination="getList" />

        <!-- 下载SDK -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-link type="danger" style="padding-left:10px;" :underline="false">该功能暂未实现，参考教程和项目的SDK示例</el-link>
            <el-form label-width="80px">
                <el-form-item label="设备类型">
                    <el-radio-group v-model="form.datatype">
                        <el-radio v-for="dict in dict.type.iot_device_chip" :key="dict.value" :label="dict.value" style="margin-top:15px;width:160px;">{{dict.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="downloadSdk" disabled>下 载</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

    </el-card>
</div>
</template>

<script>
import {
    listProduct,
    delProduct,
    changeProductStatus,
    deviceCount,
} from "@/api/iot/product";

import {
    checkPermi
} from "@/utils/permission"

export default {
    name: "Product",
    dicts: ['iot_yes_no', 'iot_product_status', 'iot_device_type', 'iot_network_method', 'iot_vertificate_method', 'iot_device_chip'],
    data() {
        return {
            // 遮罩层
            loading: true,
            // 总条数
            total: 0,
            // 产品表格数据
            productList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 12,
                productName: null,
                categoryId: null,
                categoryName: null,
                tenantId: null,
                tenantName: null,
                isSys: null,
                status: null,
                deviceType: null,
                networkMethod: null,
            },
            // 表单参数
            form: {},
            baseUrl: process.env.VUE_APP_BASE_API,
            icons: ['check', 'exclamation']
        };
    },
    created() {
        this.getList();
    },
    activated() {
        const time = this.$route.query.t;
        if (time != null && time != this.uniqueId) {
            this.uniqueId = time;
            this.queryParams.pageNum = Number(this.$route.query.pageNum);
            this.getList();
        }
    },
    methods: {
        /** 查询产品列表 */
        getList() {
            this.loading = true;
            listProduct(this.queryParams).then(response => {
                this.productList = response.rows;
                this.total = response.total;
                this.loading = false;
            });
        },
        /**同步获取产品下的设备数量**/
        getDeviceCountByProductId(productId) {
            return new Promise((resolve, reject) => {
                deviceCount(productId).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        /** 更新产品状态 */
        async changeProductStatus(productId, status, deviceType) {
            let message = "确定取消发布？";
            if (status == 2) {
                // 发布
                let hasPermission = checkPermi(['iot:product:add']);
                if (!hasPermission) {
                    this.$modal.alertError("没有操作权限");
                    return;
                }
                message = "产品发布后，可以创建对应的设备";
            } else if (status == 1) {
                // 取消发布
                let hasPermission = checkPermi(['iot:product:edit']);
                if (!hasPermission) {
                    this.$modal.alertError("没有操作权限");
                    return;
                }
                let result = await this.getDeviceCountByProductId(productId);
                if (result.data > 0) {
                    message = "重要提示：产品下已有 " + result.data + " 个设备，取消发布可以修改产品信息和模型，重新发布后对应设备状态将会被重置！"
                }
            }
            this.$confirm(message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {};
                data.productId = productId;
                data.status = status;
                data.deviceType = deviceType;
                changeProductStatus(data).then(response => {
                    this.getList();
                    this.$modal.alertSuccess(response.msg);
                }).catch(() => {});
            }).catch(() => {});
        },
        /** 查看设备按钮操作 */
        handleViewDevice(productId) {
            this.$router.push({
                path: '/iot/device',
                query: {
                    t: Date.now(),
                    productId: productId,
                }
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },

        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /** 生成SDK */
        handleGeneratorSDK(row) {
            this.title = "生成SDK"
            this.open = true;
        },
        /** 下载SDK */
        downloadSdk() {
            this.$download.zip("/iot/tool/genSdk?deviceChip=" + 1, "fastbee-sdk");
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const productIds = row.productId || this.ids;
            let msg = "";
            this.$modal.confirm('是否确认删除产品编号为"' + productIds + '"的数据项？').then(function () {
                // // 删除SIP配置
                // delSipconfigByProductId(productIds).then(response => {});
                return delProduct(productIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess(msg);
            }).catch(() => {});
        },
        /** 修改按钮操作 */
        handleEditProduct(row) {
            let productId = 0;
            if (row != 0) {
                productId = row.productId || this.ids
            }
            this.$router.push({
                path: '/iot/product-edit',
                query: {
                    productId: productId,
                    pageNum: this.queryParams.pageNum
                }
            });
        },
        /** 设备授权操作 */
        handleDeviceAuthorize(row) {
            let productId = row.productId
            this.$router.push({
                path: '/iot/product-edit',
                query: {
                    productId: productId,
                    tabPanelName: 'productAuthorize',
                    pageNum: this.queryParams.pageNum
                }
            });
        },
    }
};
</script>

<style scoped>
.iot-product {
	padding: 20px
}
.iot-product .card-search {
	margin-bottom: 15px;
	width: 100%;
	border-radius: 8px
}
.iot-product .card-item {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdfe6;
}
.iot-product .card-item .item-title {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    padding: 18px
}
.iot-product .card-item .item-title .img {
    height: 58px;
    width: 58px;
    border-radius: 10px
}
.iot-product .card-item .item-title .title {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: left;
    margin-left: 16px
}
.iot-product .card-item .item-title .title .name {
    font-weight: 500;
    font-size: 16px;
    color: #303133;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer
}
.iot-product .card-item .item-title .title .tag {
    margin-top: 5px
}
.iot-product .card-item .item-title .title .tag span {
    font-weight: 200;
    border-radius: 2px;
    border: 1px solid #c0c4cc;
    background: #fff
}
.iot-product .card-item .item-title .status {
    position: absolute;
    right: -1px;
    top: 24px
}
.iot-product .card-item .item-title .status .btn-published {
    padding: 3px!important;
    background: rgba(103,194,58,.2);
    color: #67c23a;
    border-radius: 2px 0 0 2px
}
.iot-product .card-item .item-title .status .is-plain:hover {
    border-color: transparent!important
}
.iot-product .card-item .item-title .status .is-plain:active, .iot-product .card-item .item-title .status .is-plain:focus {
    color: #67c23a;
    border-color: rgba(103,194,58,.2);
}
.iot-product .card-item .item-title .status .btn-unpublished {
    padding: 3px!important;
    background: rgba(192,196,204,.2);
    color: #c0c4cc;
    border-radius: 2px 0 0 2px;
    border: 1px solid #c0c4cc
}
.iot-product .card-item .card-item-desc .card-item-desc-item {
    white-space: nowrap;
}
.iot-product .card-item .product-category {
    font-family: PingFangSC,PingFang SC;
    font-weight: 400;
    font-size: 13px;
    color: #486ff2;
    line-height: 18px;
    text-align: left;
    font-style: normal
}
.iot-product .card-item .divider {
    margin: 10px 0 0;
    height: 1px;
    background: #dcdfe6
}
.iot-product .card-item .card-item-btns {
    height: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 12px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: space-evenly;
    -ms-flex-pack: space-evenly;
    justify-content: space-evenly
}
.iot-product .card-item .card-item-btns .btn-item-line {
    width: 1px;
    font-size: 16px;
    color: #dcdfe6
}
</style>
