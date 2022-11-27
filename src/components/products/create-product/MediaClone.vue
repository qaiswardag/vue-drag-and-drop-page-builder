<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box">
                <!--filepond-->
                <div class="mt-4">
                    <div class="mt-1 px-6 pt-5 pb-6 rounded-md">
                        <div class="space-y-1 text-center grid grid-cols-2 gap-4">
                            <file-pond
                                id="image"
                                name="image"
                                :allowDrop="true"
                                :dropOnPage="false"
                                :dropOnElement="true"
                                :allowReorder="true"
                                ref="pond"
                                class-name="my-pond"
                                label-idle="Upload or Drag and drop images here..."
                                allow-multiple="true"
                                accepted-file-types="image/jpg, image/jpeg, image/png"
                                allowFileEncode="true"

                                maxFileSize="3MB"
                                @init="filepondInitialized"
                                @processfile="handleProcessedFile"
                            />
                            <div class="space-y-6">
                                <p class="font-bold">Lorem ipsum dolor sit amet, consectetur.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut maxime minima quia,
                                    quidem
                                    sunt</p>
                                <p>Voluptatem voluptatum? Dolore ipsam magnam maxime numquam, officia tempore
                                    voluptatum!</p>
                            </div>
                        </div>

                        <div v-if="error">
                            <p class="primaryParagraph text-center text-red-500">{{ error }}</p>
                        </div>
                    </div>
                </div>
                <div class="mt-12 px-4 py-4">
                    <div v-if="isPending">
                        <div class="text-center">
                            <svg role="status"
                                 class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                        </div>
                    </div>
                    <div v-else>
                        <div>
                            <h3 class="text-xl text-center mb-8">Prodcut images</h3>
                            <div class="grid grid-cols-5 gap-4">
                                <div v-for="(image, index) in images" :key="index">
                                    <img
                                        :src="'../storage/images/tmp/' + image.name"
                                        class="block object-cover object-center w-full h-36 rounded-lg">
                                </div>
                            </div>
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


// handle custom backend error
let serverMessage = ref({});
setOptions({
    server: {
        process: {
            url: './create/upload-product-images',
            onerror: (response) => {
                console.log('it isssss: ', response);
                serverMessage.value = JSON.parse(response);
            },
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
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
        FilePond, // breaks down to: file-pond
    },

    setup() {
        // store
        const store = useStore();
        const isPending = ref(true);
        const error = ref(false);


        // getters images
        const images = computed(() => {
            return store.getters['productImages/getImages']
        });

        // load product iamges
        onMounted(async () => {
            try {
                // is pending
                isPending.value = true
                await store.dispatch('productImages/loadProductImages')
                // is pending
                isPending.value = false
            } catch (err) {
                // is pending
                isPending.value = false
                // error
                error.value = err
            }
        })


        // pond
        const pond = ref(null);

        const filepondInitialized = () => {
            // grap filepond object
            // console.log('Filepond object:', pond.value)
        }

        const handleProcessedFile = (error, file) => {
            if (error) {
                console.log('error when uploading image is:', error)
                return;
            }

            // add justly added image to images array
            console.log('filepond method ran. file:', file)
            const dataImages = JSON.parse(file.serverId);
            images.value.push(dataImages);

        }


        // return
        return {
            filepondInitialized,
            handleProcessedFile,
            pond,
            images,
            isPending,
            error
        }
    }

}
</script>


<style>
.filepond--wrapper {
    border: none;
}

.filepond--credits {
    display: none;
}


</style>
