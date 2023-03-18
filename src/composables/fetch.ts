import { ref, shallowRef } from "vue";
import type { Ref, ShallowRef } from "vue";

interface useFetchReturn<T> {
  data: ShallowRef<T | null>;
  response: ShallowRef<Response | null>;
  isLoading: Ref<boolean>;
  error: Ref<any>;
}

interface useFetchReturnWithExecute<T> extends useFetchReturn<T> {
  execute: () => Promise<useFetchReturn<T>>;
}

export function useFetch<T>(
  url: string | URL,
  immediate = false
): useFetchReturnWithExecute<T> & PromiseLike<useFetchReturn<T>> {
  const data = shallowRef<T | null>(null);
  const response = shallowRef<Response | null>(null);
  const isLoading = ref<boolean>(false);
  const error = shallowRef<any>(null);

  async function execute(): Promise<useFetchReturn<T>> {
    try {
      isLoading.value = true;
      const res = await fetch(url);
      response.value = res;
      const result: T = await res.json();
      if (!res.ok) throw result;
      data.value = result;
    } catch (e) {
      error.value = e;
      throw error;
    } finally {
      isLoading.value = false;
    }
    return { data, response, isLoading, error };
  }

  immediate && execute();

  return {
    data,
    response,
    isLoading,
    error,
    execute,
    then(onFulfilled, onRejected) {
      return execute().then(onFulfilled, onRejected);
    },
  };
}
