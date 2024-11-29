<template>
  <div class="min-h-screen bg-[#0b0c1e] text-white">
    <div class="container mx-auto flex flex-col justify-center items-center py-10 px-5 h-screen">
      
      <div class="flex justify-between w-full items-center mb-8">
        <form class="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto mt-10" @submit.prevent="fetchWeather">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search City</label>
          <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" v-model="city" id="default-search" class="block w-full p-4 pl-10 text-sm  rounded-lg  bg-gray-700  placeholder-gray-400 text-white" placeholder="Search City" />
              <button @click="fetchWeather" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ">
                  Search
              </button>
          </div>
        </form>
      </div>

      <div class="text-center p-8 rounded-xl w-full max-w-md mt-20" v-if="loading">
        <el-icon class="is-loading">
          <el-icon size="150"><Loading/></el-icon>
        </el-icon>
      </div>

      <div class="text-center p-8 rounded-xl w-full max-w-md" v-else>
         <div v-if="Object.keys(error).length === 0 && Object.keys(weatherData).length > 0">
           <h2 class="text-3xl font-bold mb-2">{{ weatherData.city }}</h2>
           <p class="text-xl font-medium mb-4 capitalize">{{ weatherData.weather_description }}</p>
           <div class="flex justify-center items-center mb-6">
             <img :src="getWeatherIcon(weatherData.weather_icon)" alt="weather-icon" class="w-16 h-16 mr-4"/>
             <h1 class="text-6xl font-bold">{{ formatTemperature(weatherData.temperature) }}<span class="text-3xl"> °C</span></h1>
           </div>
           
           <div class="grid grid-cols-3 gap-4">
             <div class="text-center">
               <p class="text-sm">Temperature</p>
               <p class="font-medium">{{ formatTemperature(weatherData.temperature) }}</p>
             </div>
             <div class="text-center">
               <p class="text-sm">Humidity</p>
               <p class="font-medium">{{ weatherData.humidity }}</p>
             </div>
             <div class="text-center">
               <p class="text-sm">Weather Condition</p>
               <p class="font-medium">{{ weatherData.weather_conditions }}</p>
             </div>
           </div>
         </div>
      </div>

      <div v-if="Object.keys(error).length !== 0" class="text-start w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mt-[-50px]">
        <el-alert title="Error" type="error" :description="error" show-icon effect="dark"/>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Loading } from '@element-plus/icons-vue';

useHead({
  title: "Weather App"
})

const city = ref("");
const error = ref({});
const loading = ref(false);
const weatherData = ref({});

const fetchWeather = async () => {
  
  loading.value = true;
  error.value = {};

  const { data, status, error: errorFetch } = await useFetch(`http://localhost:8000/api/weather`, {
    method: "GET",
    query: { city: city.value },
    headers: { Accept: 'application/json'}
  });

  switch (status.value) {
    case "success":
      weatherData.value = data.value;
      break;
    case "error":
      error.value = errorFetch.value.data.message;
      break;
    default:
      break;
  }
  
  loading.value = false;
};

const formatTemperature = (temp) => {
  return temp.toFixed(1);
};

const getWeatherIcon = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

</script>
