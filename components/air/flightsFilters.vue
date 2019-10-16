<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from<10?'0'+item.from:item.from}:00 - ${item.to<10?'0'+item.to:item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.size"
            :value="item.code"
            v-for="(item,index) in airSizes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {},
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizes: [
        { size: "大", code: "L" },
        { size: "中", code: "M" },
        { size: "小", code: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
      let res = this.data.flights.filter(v => {
        if (v.org_airport_name === value) return true;
      });
      this.$emit("pushData", res);
    },

    // 选择出发时间时触发
    handleFlightTimes(value) {
      this.airport = "";
      this.company = "";
      this.airSize = "";
      let start = value.split(",")[0] - 0;
      let end = value.split(",")[1] - 0;

      let res = this.data.flights.filter(v => {
        let startTime = v.dep_time.split(":")[0] - 0;

        if (v.dep_time.split(":")[1] > 0) {
          startTime += 1;
        }

        if (startTime >= start && startTime <= end) return true;
      });
      this.$emit("pushData", res);
    },

    // 选择航空公司时触发
    handleCompany(value) {
      this.airport = "";
      this.flightTimes = "";
      this.airSize = "";
      let res = this.data.flights.filter(v => {
        if (v.airline_name === value) return true;
      });
      this.$emit("pushData", res);
    },

    // 选择机型时触发
    handleAirSize(value) {
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      let res = this.data.flights.filter(v => {
        if (v.plane_size === value) return true;
      });
      this.$emit("pushData", res);
    },

    // 撤销条件时触发
    handleFiltersCancel() {
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
      this.$emit("pushData", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>