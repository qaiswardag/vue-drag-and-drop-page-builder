import { ref } from 'vue';
import { usePromise } from './use-promise';

export const useAjax = function () {
  // is pending, error, fetched data
  const isPending = ref(null);
  const error = ref(null);
  const fetchedData = ref(null);
  // controller, additional time, abort time out
  const controller = new AbortController();
  const additionalTime = ref(null);
  const abortTimeout = ref(null);

  // load data
  const loadData = async function (
    url,
    fetchOptions = {},
    customFetchOptions = {
      pending,
      additionalCallTime,
      abortTimeoutTime,
    }
  ) {
    // set variables
    isPending.value = customFetchOptions.pending;
    abortTimeout.value = customFetchOptions.abortTimeoutTime;
    additionalTime.value = customFetchOptions.additionalCallTime;

    // set is pending to null if not set
    if (isPending.value === undefined) {
      isPending.value = null;
    }

    // set response timeout to 0 if not set
    if (additionalTime.value === undefined) {
      additionalTime.value = 0;
    }
    // set about timeout time to 8000 if not set
    if (abortTimeout.value === undefined) {
      abortTimeout.value = 8000;
    }

    //
    // timer
    const timer = setTimeout(() => {
      controller.abort();
    }, abortTimeout.value);

    try {
      // promise
      const promise = usePromise(additionalTime.value);
      // wait for additional response time. additional time is set when calling the method
      await promise;

      // if loading time gets exceeded
      if (controller.signal.aborted) {
        clearTimeout(timer);
        isPending.value = false;
        error.value = null;
        return Promise.reject(
          Error(
            `408. The loading time has been exceeded. Please refresh this page`
          )
        );
      }

      // response
      const response = await fetch(url, fetchOptions);
      // handle errors
      if (response.status !== 200 && response.status !== 201) {
        // throw new error with returned error messages
        throw new Error(`${response.status}. ${response.statusText}`);
      }

      // set variable for content type
      const contentType = response.headers.get('content-type');

      // check if request is application/json in the request header
      if (contentType.includes('application/json')) {
        fetchedData.value = await response.json();
      }

      clearTimeout(timer);
      isPending.value = false;
      error.value = null;

      // return "fetched data"
      return fetchedData.value;
    } catch (err) {
      clearTimeout(timer);
      isPending.value = false;

      // response
      const response = await fetch(url, fetchOptions);

      // set variable for content type
      const contentType = response.headers.get('content-type');

      // check if request is application/json in the request header
      if (contentType.includes('application/json')) {
        // json
        const collectingErrorsJson = await response.json();

        // check if fetched data is a string. If true insert all values into error.value
        if (typeof collectingErrorsJson === 'string') {
          // set error
          error.value = `${collectingErrorsJson}`;
        }

        // check if fetched data is an array. If true insert all values into error.value
        if (Array.isArray(collectingErrorsJson)) {
          error.value = `${collectingErrorsJson.join(' ')}`;
        }

        // check if fetched data is an object. If true insert all values into error.value
        if (
          typeof collectingErrorsJson === 'object' &&
          !Array.isArray(collectingErrorsJson) &&
          collectingErrorsJson !== null
        ) {
          const errorObjToString =
            Object.values(collectingErrorsJson).join(' ');
          error.value = `${errorObjToString}`;
        }

        // end if content type is application/json
      }

      // check if request is application/json in the request header
      if (!contentType.includes('application/json')) {
        error.value = `${err.message}`;
      }

      // throw
      throw err;
    }
  };

  return {
    isPending,
    error,
    loadData,
  };
};
