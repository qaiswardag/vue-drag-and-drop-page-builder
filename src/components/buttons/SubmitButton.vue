<script setup>
import SmallUniversalSpinner from '../../components/loaders/SmallUniversalSpinner.vue';

defineProps({
  type: {
    type: String,
    default: 'submit',
  },
  buttonText: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  ButtonStyleDelete: {
    type: Boolean,
  },
  TableStyle: {
    type: Boolean,
  },
});

const emit = defineEmits(['firstButtonClick']);
// search anything modal button
const firstButtonClick = function () {
  emit('firstButtonClick');
};
</script>

<template>
  <div
    :class="{
      'flex flex-col items-end justify-end gap-2': !TableStyle,
      'items-center': TableStyle,
    }"
  >
    <div
      :class="{
        'flex items-center gap-3': !TableStyle,
        '': TableStyle,
      }"
    >
      <button
        @click="firstButtonClick"
        :type="type"
        :disabled="disabled"
        class="myPrimaryButton"
        :class="{
          'opacity-60 cursor-default': disabled,
          'md:min-w-[9rem] min-w-[7rem]': !TableStyle,
          'min-w-auto': TableStyle,
          myPrimaryDeleteButton: ButtonStyleDelete,
          'py-1 px-1 bg-transparent  shadow-none border-0 hover:bg-transparent focus:outline-none focus:ring-0  focus:ring-offset-0':
            TableStyle,
          'text-myPrimaryErrorColor': TableStyle && ButtonStyleDelete,
          'text-myPrimaryBrandColor': TableStyle && !ButtonStyleDelete,
        }"
      >
        <span v-show="!disabled">
          <slot />
        </span>
        <span class="flex gap-2 items-center justify-center">
          {{ disabled ? 'Loading' : buttonText }}
          <template v-if="disabled && !TableStyle">
            <SmallUniversalSpinner></SmallUniversalSpinner>
          </template>
        </span>
      </button>
    </div>
  </div>
</template>

<style scope>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
