"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { JsonPlaceholderEntity } from "@/lib/features/json-placeholder/domain/entity/jsonPlaceholder.entity";
import { JsonPlaceholderAxiosPersistence } from "@/lib/features/json-placeholder/adapter/persistence/jsonPlaceholder.axios.persistence";
import { GetAllJsonPlaceholderUsecase } from "@/lib/features/json-placeholder/application/usecase/getAllJsonPlaceholder.usecase";
import { getErrorMessage } from "@/lib/common/error/error";

export function useJsonPlaceholders(limit?: number) {
  const [jsonPlaceholders, setJsonPlaceholders] = useState<
    JsonPlaceholderEntity[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repo = useMemo(() => new JsonPlaceholderAxiosPersistence(), []);
  const usecase = useMemo(() => new GetAllJsonPlaceholderUsecase(repo), [repo]);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const data = await usecase.execute(limit, signal);
        setJsonPlaceholders(data);
      } catch (e) {
        if (signal?.aborted) return;
        setError(getErrorMessage(e));
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [limit, usecase],
  );

  const getById = useCallback(
    async (id: number | string) => {
      try {
        if (jsonPlaceholders.length > 0) {
          return jsonPlaceholders.find((item) => item.id === id) ?? null;
        }

        const data = await usecase.execute(undefined);
        setJsonPlaceholders(data);
        return data.find((item) => item.id === id) ?? null;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    [jsonPlaceholders, usecase],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return {
    jsonPlaceholders,
    loading,
    error,
    refetch: fetchData,
    getById,
  };
}
