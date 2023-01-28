import { ref } from "vue";
import type { Ref } from "vue";

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null) as Ref<T | null>;
  const response = ref<Response | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<any>(null) as Ref<any>;

  async function execute() {
    try {
      isLoading.value = true;
      const res = await fetch(url);
      response.value = res;
      const result: T = await res.json();
      if (!res.ok) throw result;
      data.value = result;
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  execute();

  return { data, response, isLoading, error, execute };
}
