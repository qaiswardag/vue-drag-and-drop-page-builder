<template>
    <TransitionRoot :show="open" as="template">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="cancelEditing()">
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                 enter-to="opacity-100" leave="ease-in duration-200"
                                 leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </TransitionChild>

                <span aria-hidden="true"
                      class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                                 enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                 enter-to="opacity-100 translate-y-0 sm:scale-100"
                                 leave="ease-in duration-200"
                                 leave-from="opacity-100 translate-y-0 sm:scale-100"
                                 leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                        <div class="bg-black p-5">
                            <xIcon class="text-white w-6 absolute right-0 top-0 m-3 cursor-pointer"
                                   @click="cancelEditing()"/>
                            <prism-editor v-model="code" :highlight="highlighter"
                                          class="my-editor"></prism-editor>
                            <div class="grid grid-cols-2 gap-4">
                                <button @click="editCode()" class="text-white px-4 py-2 bg-green-500 rounded-lg w-full">
                                    Confirm Changes
                                </button>
                                <button @click="cancelEditing()"
                                        class="text-white px-4 py-2 bg-red-500 rounded-lg w-full">Discard Changes
                                </button>
                            </div>
                        </div>

                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot
} from '@headlessui/vue';
import {XIcon} from '@heroicons/vue/outline';
import {PrismEditor} from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

export default {
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        XIcon,
        PrismEditor,
    },
    props: {
        open: {
            type: Boolean,
            required: true
        },
        codeElement: {
            type: Object,
            required: true
        },
        code: {
            type: String,
            required: true
        }
    },

    setup(props, {emit}) {

        const highlighter = function (code) {
            return highlight(code, languages.js);
        };

        const cancelEditing = function () {
            // Cancel if clicked on background or close button
            emit('close');
        }

        const editCode = function () {
            // Set DOM element to edited code
            props.codeElement.innerHTML = props.code;
            emit('close');
        };

        return {
            highlighter,
            cancelEditing,
            editCode
        };
    },
};
</script>

<style scoped>
.my-editor {
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

.prism-editor__textarea:focus {
    outline: none;
    border: none;
}
</style>
