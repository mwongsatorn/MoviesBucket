import { ref, shallowRef } from "vue";
import type { Ref, ShallowRef } from "vue";

interface useFetchReturn<ReturnData> {
  data: ShallowRef<ReturnData | null>;
  response: ShallowRef<Response | null>;
  isLoading: Ref<boolean>;
  error: Ref<any>;
}

interface useFetchReturnWithExecute<ReturnData>
  extends useFetchReturn<ReturnData> {
  execute: () => Promise<useFetchReturn<ReturnData>>;
}

const TMDB_ACCESS_TOKEN: string = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const defaultOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
} satisfies RequestInit;

export function useFetch<ReturnData>(
  url: string | URL,
  options: RequestInit = defaultOptions,
  immediate: boolean = false
): useFetchReturnWithExecute<ReturnData> &
  PromiseLike<useFetchReturn<ReturnData>> {
  const data = shallowRef<ReturnData | null>(null);
  const response = shallowRef<Response | null>(null);
  const isLoading = ref<boolean>(false);
  const error = shallowRef<any>(null);

  async function execute(): Promise<useFetchReturn<ReturnData>> {
    try {
      isLoading.value = true;
      const res = await fetch(url, options);
      response.value = res;
      const result: ReturnData = await res.json();
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
