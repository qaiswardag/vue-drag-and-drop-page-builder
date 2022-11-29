<template>
  <div class="flex min-h-full flex-col bg-white pt-16 pb-12">
    <main class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div class="flex flex-shrink-0 justify-center">
        <a href="/" class="inline-flex">
          <span class="sr-only">meeshop.dk</span>
          <img class="h-12 w-auto" src="https://www.meeshop.dk/zeus-assets/images//Logo-gron.svg" alt="" />
        </a>
      </div>
      <div class="py-16">
        <div class="text-center">
          <p class="text-base font-semibold text-emerald-500 mt-12">Welcome</p>
          <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Designer
          </h1>
          <p class="mt-2 text-base text-gray-500">
            Visit our Vue 3 website drag and drop page builder designer.</p>
          <div class="mt-6">
            <router-link :to="{name: 'Designer'}" class="text-2xl font-medium text-emerald-500 hover:text-gray-900">
              Go to Designer
              <span aria-hidden="true"> &rarr;</span>
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
