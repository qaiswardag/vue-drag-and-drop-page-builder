<template>
    <div>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button type="submit"
                        id="submit-element-button"
                        class="myPrimaryButton">
                    {{ buttonText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true
        },
    }
}
</script>
