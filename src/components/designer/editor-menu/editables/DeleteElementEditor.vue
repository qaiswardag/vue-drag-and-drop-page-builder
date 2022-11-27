<template>
    <EditorAccordion>
        <template #title>Delete element</template>
        <template #content>
            <div class="my-2">
                <button
                    @click="deleteElement"
                    type="button"
                    class="myPrimaryDeleteButton bg-red-500 text-xs w-full">
                    Delete element
                </button>
            </div>
        </template>
    </EditorAccordion>
</template>

<script setup>
import EditorAccordion from "../EditorAccordion";
import {useStore} from 'vuex';
import {computed, ref} from 'vue';

// store
const store = useStore();
// getters: current element from store
const getCurrentElement = computed(() => {
    return store.getters['Designer/getCurrentElement'];
});

// remove current clicked element
const deleteElement = function () {
    // remove element
    getCurrentElement.value.remove()
}
</script>





