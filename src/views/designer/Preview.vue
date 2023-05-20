<template>
  <div v-html="htmlPage"></div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'WebsitePreview',

  setup() {
    // router
    // const router = useRouter();
    // preview content
    const htmlPage = ref('');

    // convert vue router links to a href
    // watch
    // start
    // watch(htmlPage, () => {
    //     // Delay replacement by 1ms
    //     setTimeout(() => {
    //         // All anchor tags
    //         const anchors = document.querySelectorAll('a');
    //
    //         // Get url root
    //         const baseUrl = window.location.origin;
    //
    //         // Iterate through all anchors
    //         anchors.forEach(anchor => {
    //             // Get anchor path
    //             const href = anchor.getAttribute('href');
    //             const path = href.replace(baseUrl, '');
    //             // Cancel for external links
    //             if (!href.startsWith(baseUrl)) return;
    //
    //             // Create span identical to anchor
    //             const newRouter = document.createElement('a');
    //             newRouter.setAttribute('href', href);
    //             newRouter.classList = anchor.classList;
    //             newRouter.innerHTML = anchor.innerHTML;
    //
    //             // Push to route on click
    //             newRouter.addEventListener('click', (e) => {
    //                 // Prevent anchor's internal function
    //                 e.preventDefault();
    //                 // Use router to push to path instead
    //                 router.push(path);
    //             });
    //
    //             // Replace anchor with span
    //             anchor.replaceWith(newRouter);
    //         });
    //     }, 100);
    // });
    // end

    //

    // get preview item from local storage
    htmlPage.value = localStorage.getItem('preview');
    // parse
    htmlPage.value = JSON.parse(htmlPage.value);
    // join
    htmlPage.value = htmlPage.value.join('');

    // return
    return { htmlPage };
  },
};
</script>
