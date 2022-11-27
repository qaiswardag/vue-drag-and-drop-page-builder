<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box-sidebar">
                <div class="mb-8">
                    <div class="flex items-center gap-2">
                        <h3 class="tertiaryHeaderWithout-pm">Stock management</h3>
                        <Popper
                            :hover="true"
                            placement="top"
                            :arrow="true">
                            <template #content>
                                <div class="popperToolkitContent">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                            help
                                            center.
                                        </a>
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur
                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae totam veniam?
                                    </p>
                                </div>
                            </template>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="popperIconBig"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor"
                                     stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </Popper>
                    </div>
                    <p class="primaryParagraph">Enable or disable automatic stock.</p>
                </div>
                <div class="flex justify-self-center items-center gap-4">
                    <SwitchGroup as="div" class="flex items-center">
                        <Switch
                            v-model="autoStock"
                            :name="autoStock ? 'auto_stock' : 'auto_stock'"
                            :class="[autoStock ? 'bg-emerald-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-68 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500']">
                            <span class="sr-only">Use setting</span>
                            <span
                                :class="[autoStock ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
      <span
          :class="[autoStock ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <span
          :class="[autoStock ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 12 12">
          <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
        </svg>
      </span>
    </span>
                        </Switch>
                        <SwitchLabel as="span" class="ml-3">
                            <span class="text-sm font-medium text-gray-900">Auto stock? </span>
                        </SwitchLabel>
                    </SwitchGroup>
                </div>
                <BackendErrors errorField="auto_stock"></BackendErrors>
            </div>
        </div>
    </div>
</template>


<script setup>
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue'
import {ref, computed} from "vue";
import {useStore} from 'vuex'
import {onMounted} from "vue";
import BackendErrors from "../../errors/BackendErrors";
import Popper from "vue3-popper";

// store
const store = useStore()
// auto stock status
const autoStock = ref(false);


// set auto stock
store.commit('createProduct/setAutoStock', autoStock);

// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});
// set auto stock to true if on
onMounted(() => {
    // set auto stock based on old value
    if (oldValues.value.length < 1) {
        autoStock.value = true
    }
    // set auto stock based on old value
    if (oldValues.value.auto_stock === 'on') {
        autoStock.value = true
    }
})
</script>
