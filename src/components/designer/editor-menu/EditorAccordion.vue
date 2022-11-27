<template>
    <div class="flex flex-col">
        <div
            class="border-t border-gray-200 flex flex-row justify-between items-center px-4 py-2 cursor-pointer duration-200 hover:bg-emerald-200"
            :class="{'bg-white' : expanded}"
            @click="expanded = !expanded">
            <p class="text-xs my-0 py-0 font-semibold">
                <slot name="title"/>
            </p>
            <ChevronDownIcon
                class="-rotate-90 h-5 w-5 transform duration-200"
                :class="{'rotate-0' : expanded}">
            </ChevronDownIcon>
        </div>
        <div
            :class="[expanded ? 'block' : 'hidden']"
            class="px-4 ease-linear duration-200 bg-white">
            <slot name="content"/>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import {ChevronDownIcon} from '@heroicons/vue/outline';

export default {
    components: {
        ChevronDownIcon,
    },

    setup() {
        const expanded = ref(false);

        return {
            ChevronDownIcon,
            expanded
        };
    },
};
</script>
