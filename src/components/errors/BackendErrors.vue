<template>
    <div>
        <div v-if="errors">
            <div v-for="(error, index) in errors[props.errorField]" :key="index">
                <p class="primaryInputError">
                    {{ error }}
                </p>
            </div>
        </div>
    </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, ref, onMounted} from "vue";

// props declaration
const props = defineProps({
    errorField: {
        type: String,
        required: true
    },
})

// store
const store = useStore();

// get backend validation errors
const errors = computed(() => {
    return store.getters['user/getBackendValidationErrors']
});
</script>
