<template>
    <div class="section-form-main border-0">
        <div class="section-form-container">
            <div class="section-form-box">
                <div class="mb-8">
                    <div class="flex items-center gap-2">
                        <div class="flex">
                            <h1 class="tertiaryHeader">
                                Drop files or select files to upload
                            </h1>
                        </div>

                        <Popper
                            :hover="true"
                            placement="top"
                            :arrow="true">
                            <template #content>
                                <div class="popperToolkitContent">
                                    <p>
                                        Add multiple files.
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
                    <p class="primaryParagraph">Add multiple files.</p>


                </div>

                <!--filepond - start-->
                <div class="mt-4">
                    <div class="mt-1 px-6 pt-5 pb-6 rounded-md">
                        <div class="space-y-1 text-center grid grid-cols-1 gap-4">
                            <file-pond
                                id="image"
                                name="image"
                                :allowDrop="true"
                                :dropOnPage="false"
                                :dropOnElement="true"
                                :allowReorder="false"
                                ref="pond"
                                class-name="my-pond"
                                label-idle="<span>Upload or <span id='drag-drop'>Drag and drop</span> files here...</span>"
                                allow-multiple="false"
                                accepted-file-types="image/jpg, image/jpeg, image/png"
                                allowFileEncode="true"
                                styleItemPanelAspectRatio="1"
                                maxFileSize="3MB"
                                @init="filepondInitialized"
                                @processfile="handleProcessedFile"
                            />
                        </div>
                        <div v-if="error">
                            <p class="primaryParagraph text-center text-red-500">{{ error }}</p>
                        </div>
                    </div>
                </div>
                <!--filepond - end-->

            </div>
        </div>
    </div>
</template>


<script>
import vueFilePond, {setOptions} from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import Popper from "vue3-popper";
import SubmitElement from "../../components/form/SubmitElement"


import {useStore} from "vuex";
import {onMounted, ref, computed} from "vue";
import Button from "../../../../../vendor/laravel/breeze/stubs/inertia-vue/resources/js/Components/Button";


// csrf
const csrf = ref(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))

// handle custom backend error
const serverMessage = ref({});


// set file pond options
setOptions({
    server: {
        process: {
            url: 'media/store',
            onerror: (response) => {
                console.log('Error uploading image(s): ', response);
                if (response) {
                    serverMessage = JSON.parse(response);
                }
            },
            headers: {
                'X-CSRF-TOKEN': csrf.value
            }
        }
    },
    labelFileProcessingError: () => {
        console.log('and here: ', serverMessage.value)
        return 'Error: ' + serverMessage.value.error
    }
});

// use the imported "vueFilePond" function
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode
);

export default {
    components: {
        Button,
        FilePond, // breaks down to: file-pond,
        Popper,
        SubmitElement,
    },

    setup() {
        // store
        const store = useStore();


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

        const isPending = ref(true);
        const error = ref(false);

        // filepond
        const pond = ref(null);
        // images
        const images = ref([]);

        // file pond init
        const filepondInitialized = () => {
            // grap filepond object
            //console.log('Filepond object:', pond.value)
        }

        // handle process file
        const handleProcessedFile = (error, file) => {
            if (error) {
                console.log('error when uploading image is:', error)
                return;
            }

            console.log('a file have been uploaded!')

            // // add justly added image to images array
            console.log('filepond method ran. file:', file)
            const dataImages = JSON.parse(file.serverId);
            images.value.push(dataImages);

        }


        // return
        return {
            filepondInitialized,
            handleProcessedFile,
            pond,
            isPending,
            error,
            csrf,
        }
    }
}

</script>

<style>
.filepond--credits {
    display: none;
}

@media (min-width: 30em) {
    .filepond--item {
        width: calc(25% - 0.5em);
    }
}

@media (min-width: 50em) {
    .filepond--item {
        width: calc(33.33% - 0.5em);
    }
}

.filepond--root {
    cursor: pointer;
    font-family: 'Raleway', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.filepond--root #drag-drop {
    font-weight: bold;
    color: #12b981;
}

/* the background color of the filepond drop area */
.filepond--panel-root {
    background-color: transparent;
}

.filepond--drop-label.filepond--drop-label label {
    cursor: pointer;
}


.filepond--drop-label {
    border-radius: 4px;
    border: 2px dashed #ddd;
}

.filepond--drop-label:hover {
    border: 2px dashed #12b981 !important;
}

/* the background color of the black action buttons */
.filepond--file-action-button {
    border: 0;
    background-color: #fff;
}

.filepond--file-action-button.filepond--file-action-button svg {
    color: #000;
}

.filepond--image-canvas-wrapper {
    transform-origin: unset !important;
    transform: unset !important;
}

.filepond--image-clip {
    object-fit: cover;
    -o-object-position: 50% 30% !important;
    object-position: 50% 30% !important;
    width: 100% !important;
    height: 100% !important;
    border-radius: 0 !important;
}
</style>
