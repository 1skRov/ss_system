<template>
  <div class="border-b border-0 border-base-300 flex items-center px-2 py-1">
    <div class="flex">
      <label class="input input-sm" style="border-radius: 0.25rem 0 0 0.25rem">
        <MagnifyingGLassIcon/>
        <input type="search" required placeholder="Поиск"/>
      </label>
      <button class="btn btn-neutral btn-sm" style="border-radius: 0 0.25rem 0.25rem 0"
              onclick="my_modal_4.showModal()">Поиск
      </button>
    </div>
    <ul class="menu menu-horizontal rounded-box p-0 mx-auto">
      <li>
        <router-link to="/table-page" class="flex items-center" active-class="bg-base-300 text-black font-medium">
          <ListIcon/>
          <span class="text-lg ml-1">Таблица</span>
        </router-link>
      </li>
      <li>
        <router-link to="/catalog" class="flex items-center" active-class="bg-base-300 text-black font-medium">
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
  <dialog id="my_modal_4" class="modal w-full h-full" ref="modal">
    <div class="modal-box search-modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <SearchDrawer @close="closeModal"/>
    </div>
  </dialog>
</template>
<script setup>
import CatalogIcon from "@/assets/icons/Catalog.vue";
import ListIcon from "@/assets/icons/List.vue";
import LogoutIcon from "@/assets/icons/LogoutIcon.vue";
import CircleIcon from "@/assets/icons/CircleIcon.vue";
import MagnifyingGLassIcon from "@/assets/icons/MagnifyingGLassIcon.vue";
import SearchDrawer from "@/widjets/SearchDrawer.vue";
import {ref} from "vue";

const modal = ref(null);

function closeModal() {
  if (modal.value) {
    modal.value.close();
  }
}
</script>
<style scoped lang="scss">
.search-modal-box {
  width: 98vw !important;
  height: 98vh !important;
  max-width: 98vw !important;
  max-height: 98vh !important;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
}
</style>