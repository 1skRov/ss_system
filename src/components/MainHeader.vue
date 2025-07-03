<template>
  <div class="bg-base-200 flex justify-between items-center p-2">
    <ul class="menu lg:menu-horizontal rounded-box p-0">
      <li>
        <router-link to="/table-page" class="flex items-center" active-class="bg-secondary text-white font-medium">
          <ListIcon/>
          <span class="text-lg ml-1">Таблица</span>
        </router-link>
      </li>
      <li>
        <router-link to="/catalog" class="flex items-center" active-class="bg-secondary text-white font-medium">
          <CatalogIcon/>
          <span class="text-lg ml-1">Каталог</span>
        </router-link>
      </li>
    </ul>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="avatar">
        <div class="w-11 rounded-full">
          <img src="../assets/images/user.jpg" class="w-full h-full" alt=""/>
        </div>
      </div>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-52 mt-2 text-lg">
        <li>
          <router-link to="/login" class="flex items-center">
            <logout-icon></logout-icon>
            <span>Выйти</span>
          </router-link>
        </li>
        <li>
          <router-link to="/colors" class="flex items-center">
            <circle-icon></circle-icon>
            <span>Цвета</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import CatalogIcon from "@/assets/icons/Catalog.vue";
import ListIcon from "@/assets/icons/List.vue";
import LogoutIcon from "@/assets/icons/LogoutIcon.vue";
import CircleIcon from "@/assets/icons/CircleIcon.vue";
</script>