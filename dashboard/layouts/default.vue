<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="300px" class="bg-[#2c2c2c]">
      <div class="header flex w-full justify-center mt-3 items-center gap-3">
        <Icon name="arcticons:weather" size="4em" class="text-white" />
        <p class="text-white text-xl text-center font-bold mt-3">WeatherApp</p>
      </div>
      <div class="flex flex-col gap-3 mt-14 p-4">
        <div class="flex gap-3 justify-start items-center text-[#ecfa2d] bg-[#434343] p-3 rounded-md" @click="navigateTo('/')">
          <Icon name="material-symbols:menu" class="mr-1" size="1.5em" />
          <p class="text-md font-semibold">Dashboard</p>
        </div>
        <!-- <div class="flex gap-3 justify-start items-center text-white p-3 rounded-md" @click="navigateTo('/test')">
          <Icon name="material-symbols:menu" class="mr-1" size="1.5em" />
          <p class="text-md font-semibold">TEST</p>
        </div> -->
      </div>
    </el-aside>

    <el-container>
      <el-header
        style="text-align: right; font-size: 12px"
        class="bg-[#f7f7f7] text-white"
      >
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px; color: white">
              <!-- <setting /> -->
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span class="text-white">Lionel Messi</span>
        </div>
      </el-header>

      <el-main class="bg-[#ecebe8]">
        <div class="p-10">
          <slot />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>

useHead({
  title: "Weather App"
})

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
