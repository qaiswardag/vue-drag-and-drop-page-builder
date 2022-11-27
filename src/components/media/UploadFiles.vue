<template>
    <div>
        <OverviewAndAction>
            <template v-slot:breadcrumb>
            </template>
            <template v-slot:header>
                Media library
            </template>
            <template v-slot:para>
                Upload a new image.
            </template>

            <template v-slot:content>
                <button
                    @click="uploadImages"
                    class="myPrimaryButton">
                    Upload image
                </button>
            </template>
        </OverviewAndAction>

        <DynamicModal
            :type="typeModal"
            :id="idModal"
            :gridColumnAmount="gridColumnModal"
            :title="titleModal"
            :description="descriptionModal"
            :firstButtonText="firstButtonModal"
            :secondButtonText="secondButtonModal"
            :thirdButtonText="thirdButtonModal"
            :open="openModal"
            @firstModalButtonFunction="firstModalButtonFunction"
            @secondModalButtonFunction="secondModalButtonFunction"
            @thirdModalButtonFunction="thirdModalButtonFunction">

            <div>
                <header>
                </header>
                <main>
                    <div class="section-form-container">
                        <div class="section-form-box">
                            <div class="mb-8">
                                <form
                                    ref="submitFormRef"
                                    method="POST" action="/media/store" enctype="multipart/form-data">
                                    <input type="hidden" name="_token" :value="csrf">

                                    <div class="labelInputErrorDiv">
                                        <label
                                            for="name"
                                            class="primaryLabel">
                                            Image name
                                        </label>
                                        <input type="text"
                                               v-model="imageName"
                                               name="name"
                                               id="name"
                                               placeholder="Image name"
                                               autocomplete="off"
                                               class="primaryInput">
                                        <BackendErrors
                                            errorField="name">
                                        </BackendErrors>
                                    </div>

                                    <div class="labelInputErrorDiv">
                                        <label
                                            for="image"
                                            class="primaryLabel">
                                            File input
                                        </label>
                                        <input
                                            name="image"
                                            type="file"
                                            id="image"
                                            class="form-control block w-full px-3 py-1.5 text-base font-normal
                                                text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300
                                                rounded transition ease-in-out m-0 focus:text-gray-700
                                                focus:bg-white focus:border-emerald-500 focus:outline-none">
                                        <BackendErrors
                                            errorField="image">
                                        </BackendErrors>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </DynamicModal>
    </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import OverviewAndAction from "../overview-and-actions/OverviewAndAction"
import DynamicModal from "../modal/DynamicModal"
import BackendErrors from "../errors/BackendErrors"

// store
const store = useStore();
//
// image name
const imageName = ref(null);
// submit form
const submitFormRef = ref(null)
//


// csrf
const csrf = ref(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
//
// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});
//

// use dynamic model
const openModal = ref(false);
// modal content
const typeModal = ref('');
const idModal = ref(Number(null));
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);
//
//
// upload images method
const uploadImages = function () {
    // open modal to true
    openModal.value = true
    // set modal standards
    typeModal.value = 'success';
    gridColumnModal.value = 2;
    titleModal.value = `Upload images`;
    descriptionModal.value = 'Uploading image files to media library';
    firstButtonModal.value = 'Close';
    //secondButtonModal.value = '';
    thirdButtonModal.value = 'Upload';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // close modal
        openModal.value = false
    };
    //
    // handle delete
    thirdModalButtonFunction.value = function () {
        // close modal
        openModal.value = false

        // submit
        submitFormRef.value.submit()
    };
}

// on mounted
onMounted(() => {
    if (oldValues.value.name) {
        imageName.value = oldValues.value.name
    }
})
</script>
