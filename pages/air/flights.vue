<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cachaData" @pushData="handleFilterData"/>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <!-- <div>
          <FlightsItem v-for="(item,index) in currentFlightsData" :key="index" :data="item" />
        </div>-->

        <!-- 加载中 -->
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)"
          style="width: 100%; height: 200px"
          :data="flightsData.flights"
          v-show="!(!loading && this.flightsData.flights.length)"
        ></el-table>

        <div>
          <FlightsItem v-for="(item,index) in currentFlightsData" :key="index" :data="item" />
        </div>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          v-if="total"
        ></el-pagination>

        <!-- 无航班信息提示 -->
        <!-- <div
          v-if="flightsData.flights.length === 0 && !loading"
          style="padding: 50px; text-align:center"
        >该航班暂无数据
        </div>-->
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data;
      this.total = this.flightsData.flights.length;
      this.loading = false;
      this.cachaData = {...res.data};
    });
  },
  data() {
    return {
      flightsData: {
        flights: [{ arr_time: "", dep_time: "" }]
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      loading: true,
      cachaData: {
        flights: [],
        info: {},
        options: {}
      }
    };
  },
  computed: {
    currentFlightsData() {
      let res = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return res;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    handleFilterData(data) {

      this.flightsData.flights = data;
      this.total = data.length;
      this.pageIndex = 1;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>