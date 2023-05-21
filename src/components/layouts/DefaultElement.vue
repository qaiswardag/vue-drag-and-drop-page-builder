<script setup>
defineProps({
  descriptionArea: {
    Type: Boolean,
    required: true,
    default: true,
  },
});
</script>

<template>
  <!-- chimp start -->
  <div class="myPrimaryModule">
    <div class="myHeaderParagraphSection">
      <h2 class="myTertiaryHeader">
        <slot name="title" />
      </h2>
      <p
        v-if="descriptionArea === true"
        class="myPrimaryParagraph italic text-red-600"
      >
        <slot name="description" />
      </p>
    </div>
    <div class="myPrimaryContentSection">
      <slot name="content" />
    </div>
  </div>
</template>
