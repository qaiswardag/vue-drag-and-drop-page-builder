import {ref} from "vue";
import {usePromise} from "./use-promise";

export const useAjax = function () {
    const isPending = ref(null);
    const error = ref(null);
    const data = ref(null);

    const controller = new AbortController();
    const signal = controller.signal;
    const abortTimeout = ref(null);
    const additionalTime = ref(null);
    //

    const loadData = async function (
        url,
        data = {},
        options = {pending: true, abortTimeoutTime: 8000, additionalCallTime: 0}
    ) {
        // is pending
        isPending.value = options.pending;
        abortTimeout.value = options.abortTimeoutTime;
        additionalTime.value = options.additionalCallTime;

        // set is pending to null if not set
        if (isPending.value === undefined) {
            isPending.value = null;
        }
        // set abourt timeout time to 8000 if not set
        if (abortTimeout.value === undefined) {
            abortTimeout.value = 8000;
        }

        // set response timeout to 0 if not set
        if (additionalTime.value === undefined) {
            additionalTime.value = 0;
        }

        //
        // timer
        const timer = setTimeout(() => {
            controller.abort();
        }, abortTimeout.value);

        const promise = usePromise(additionalTime.value);
        try {
            // wait for additional response time
            await promise;

            // response
            const response = await fetch(url, data);

            // if loading time gets exceeded
            if (signal.aborted) {
                throw new Error(
                    `The loading time has been exceeded`
                );
            }

            // handle errors
            if (response.status !== 200 && response.status !== 201) {
                // throw new error with returned error messages
                throw new Error(
                    `Unable to fetch. ${response.statusText}`
                );
            }
            // data
            data.value = await response.json();

            // clear timeout
            clearTimeout(timer);
            isPending.value = false;

            // return data
            return data.value;
        } catch (err) {
            clearTimeout(timer);
            isPending.value = false;
            error.value = err.message;
            console.log('Error message:', err)
            throw err;
        }
    };

    return {
        isPending,
        error,
        data,
        loadData,
    };
};
