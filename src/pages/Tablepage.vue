<script setup>
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import PlusIcon from '@/assets/icons/plusIcon.vue'
import MinusIcon from '@/assets/icons/MinusIcon.vue'
</script>

<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input
                id="hs-table-checkbox-all"
                type="checkbox"
                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
              />
              <label for="hs-table-checkbox-all" class="sr-only"
                >Checkbox</label
              >
            </div>
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            Age
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            Address
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input
                id="hs-table-checkbox-1"
                type="checkbox"
                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
              />
              <label for="hs-table-checkbox-1" class="sr-only">Checkbox</label>
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
          >
            John Brown
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">45</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            New York No. 1 Lake Park
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
            <button
              type="button"
              class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input
                id="hs-table-checkbox-2"
                type="checkbox"
                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
              />
              <label for="hs-table-checkbox-2" class="sr-only">Checkbox</label>
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
          >
            Jim Green
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">27</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            London No. 1 Lake Park
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
            <button
              type="button"
              class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input
                id="hs-table-checkbox-3"
                type="checkbox"
                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
              />
              <label for="hs-table-checkbox-3" class="sr-only">Checkbox</label>
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
          >
            Joe Black
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">31</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            Sidney No. 1 Lake Park
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
            <button
              type="button"
              class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input
                id="hs-table-checkbox-4"
                type="checkbox"
                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
              />
              <label for="hs-table-checkbox-4" class="sr-only">Checkbox</label>
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
          >
            Edward King
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">16</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            LA No. 1 Lake Park
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
            <button
              type="button"
              class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input
                id="hs-table-checkbox-5"
                type="checkbox"
                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
              />
              <label for="hs-table-checkbox-5" class="sr-only">Checkbox</label>
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
          >
            Jim Red
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">45</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            Melbourne No. 1 Lake Park
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
            <button
              type="button"
              class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>
