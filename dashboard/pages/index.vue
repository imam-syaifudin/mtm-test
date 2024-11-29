<template>
  <div class="w-[100%]">
    <h1 class="text-center font-bold capitalize">
      Data prakiraan cuaca untuk beberapa hari ke depan
    </h1>
    <form class="w-full sm:w-[80%] md:w-[30%] lg:w-[20%] mt-10 ms-auto mb-10" @submit.prevent="fetchWeather" >
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only" >Search City</label >
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" >
          <svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" v-model="city" id="default-search" class="block w-full p-5 pl-10 text-sm rounded-lg placeholder-gray-400 text-black" placeholder="Search City" />
        <button @click="fetchWeather" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2" v-loading="loading">
          Search
        </button>
      </div>
    </form>
    <div class="flex justify-end">
        <el-button @click="addChart" type="primary">Add Chart</el-button>
        <el-button @click="removeChart" type="danger">Remove Chart</el-button>
    </div>
    <GridLayout v-model:layout="layout" :row-height="30" :col-num="12">
      <template #item="{ item }">
        <Line
          v-if="item.type === 'line'"
          :data="item.data"
          :options="chartOptions"
        />
        <Bar v-else :data="item.data" :options="chartOptions" />
      </template>
    </GridLayout>
  </div>
</template>
<script setup>
import { Line, Bar } from "vue-chartjs";
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { GridLayout, GridItem } from "grid-layout-plus";

const city = ref("");
const error = ref({});
const loading = ref(false);
const weatherData = ref({});
const lineChart = ref("");

const chartDataLine = ref({
  labels: [],
  datasets: [
    {
      label: "Temperatures",
      backgroundColor: "#f87979",
      data: [],
    },
  ],
});

const chartDataBar = ref({
  labels: [],
  datasets: [
    {
      label: "Humidities",
      backgroundColor: "green",
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const fetchWeather = async () => {
  loading.value = true;
  error.value = {};

  const {
    data,
    status,
    error: errorFetch,
  } = await useFetch(`http://localhost:8000/api/forecast`, {
    method: "GET",
    query: { city: city.value },
    headers: { Accept: "application/json" },
  });

  switch (status.value) {
    case "success":
      weatherData.value = data.value;

      chartDataLine.value = {
        labels: weatherData.value.labels,
        datasets: [
          {
            label: "Temperatures",
            backgroundColor: "#f87979",
            data: weatherData.value.temperatures,
          },
        ],
      };

      chartDataBar.value = {
        labels: weatherData.value.labels,
        datasets: [
          {
            label: "Humidities",
            backgroundColor: "green",
            data: weatherData.value.humidities,
          },
        ],
      };

      break;
    case "error":
    //   error.value = errorFetch.value.data.message;
      ElMessage.error(errorFetch.value.data.message);
      break;
    default:
      break;
  }

  loading.value = false;
};

const layout = reactive([
  {
    x: 0,
    y: 0,
    w: 6,
    h: 6,
    i: "Line Chart",
    static: false,
    type: "line",
    data: chartDataLine,
  },
  {
    x: 6,
    y: 4,
    w: 6,
    h: 6,
    i: "Bar Chart",
    static: false,
    type: "bar",
    data: chartDataBar,
  },
]);

const addChart = () => {
  const newChart = {
    i: `chart${layout.length + 1}`,
    x: 0,
    y: 0,
    w: 6,
    h: 6,
    type: "line",
    data: chartDataLine,
  };
  layout.push(newChart);
};

const removeChart = (index) => {
  layout.splice(index, 1);
};

</script>
<style scoped>
:deep(.vgl-item:not(.vgl-item--placeholder)) {
  background-color: #ffffff;
  border: 1px solid black;
}

:deep(.vgl-item--resizing) {
  opacity: 90%;
}

:deep(.vgl-item--static) {
  background-color: #cce;
}

.text {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  font-size: 24px;
  text-align: center;
}
</style>
