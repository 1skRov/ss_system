<template>
  <div class="p-8 bg-base-100">
    <h1 class="text-2xl font-bold mb-6 text-base-content">
      Палитра темы "bluetheme"
    </h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-primary flex justify-center items-center">
          <span class="text-primary-content text-sm text-center">Текст</span>
        </div>
        <div class="text-center text-base-content">
          <p class="font-bold">Primary</p>
          <p class="text-xs">bg-primary</p>
          <p class="text-xs text-primary-content bg-slate-500 px-1 rounded">text-primary-content</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-secondary"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Secondary</p>
          <p class="text-xs">bg-secondary</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-accent"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Accent</p>
          <p class="text-xs">bg-accent</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-neutral"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Neutral</p>
          <p class="text-xs">bg-neutral</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-base-100 border border-base-300 flex justify-center items-center">
            <span class="text-base-content">Текст</span>
        </div>
        <div class="text-center text-base-content">
          <p class="font-bold">Base 100</p>
          <p class="text-xs">bg-base-100</p>
          <p class="text-xs">text-base-content</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-base-200"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Base 200</p>
          <p class="text-xs">bg-base-200</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-base-300"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Base 300</p>
          <p class="text-xs">bg-base-300</p>
        </div>
      </div>

      <div class="col-span-full h-px bg-base-300 my-4"></div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-info"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Info</p>
          <p class="text-xs">bg-info</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-success"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Success</p>
          <p class="text-xs">bg-success</p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-warning"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Warning</p>
          <p class="text-xs">bg-warning</p>
        </div>
      </div>
      
      <div class="flex flex-col items-center space-y-2">
        <div class="w-24 h-24 rounded-2xl bg-error"></div>
        <div class="text-center text-base-content">
          <p class="font-bold">Error</p>
          <p class="text-xs">bg-error</p>
        </div>
      </div>

    </div>
  </div>
</template>