<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box">
                <div class="mb-8">
                    <div class="flex items-center gap-2">
                        <h3 class="tertiaryHeaderWithout-pm">Media</h3>
                        <Popper
                            :hover="true"
                            placement="top"
                            :arrow="true">
                            <template #content>
                                <div class="popperToolkitContent">
                                    <p>
                                        Add multiple images to your product.
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
                    <p class="primaryParagraph">Add multiple images to your product. .</p>
                </div>
                <!--filepond-->
                <div class="mt-4">
                    <div class="mt-1 px-6 pt-5 pb-6 rounded-md">
                        <div class="space-y-1 text-center grid grid-cols-1 gap-4">
                            <file-pond
                                id="image"
                                name="image"
                                :allowDrop="true"
                                :dropOnPage="false"
                                :dropOnElement="true"
                                :allowReorder="true"
                                ref="pond"
                                class-name="my-pond"
                                label-idle="<span>Upload or <span id='drag-drop'>Drag and drop</span> images here...</span>"
                                allow-multiple="true"
                                accepted-file-types="image/jpg, image/jpeg, image/png"
                                allowFileEncode="true"
                                styleItemPanelAspectRatio="1"

                                maxFileSize="3MB"
                                @init="filepondInitialized"
                                @processfile="handleProcessedFile"
                            />
                        </div>
                        <BackendErrors errorField="image"></BackendErrors>

                        <div v-if="error">
                            <p class="primaryParagraph text-center text-red-500">{{ error }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// vueFilePond: import vueFilePond function
import vueFilePond, {setOptions} from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


import {useStore} from "vuex";
import {onMounted, ref, computed} from "vue";
import BackendErrors from "../../errors/BackendErrors";
import Popper from "vue3-popper";

// use the imported "vueFilePond" function
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode
);

export default {
    components: {
        BackendErrors,
        FilePond, // breaks down to: file-pond
        Popper
    },

    setup() {
        // store
        const store = useStore();
        const isPending = ref(true);
        const error = ref(false);

        // pond
        const pond = ref(null);

        const filepondInitialized = () => {
            // grap filepond object
            // console.log('Filepond object:', pond.value)
        }

        const handleProcessedFile = (error, file) => {
            // if (error) {
            // console.log('error when uploading image is:', error)
            // return;
            // }

            // add justly added image to images array
            // console.log('filepond method ran. file:', file)
            // const dataImages = JSON.parse(file.serverId);
            // images.value.push(dataImages);

        }


        // return
        return {
            filepondInitialized,
            handleProcessedFile,
            pond,
            isPending,
            error,
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
