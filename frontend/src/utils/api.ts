type Result<T> = success<T> | error;

type success<T> = {
  status: 200;
  body: T;
};

type error = {
  status: number;
  error: string;
};

export function isSuccess<T>(result: Result<T>): result is success<T> {
  return result.status === 200;
}

export function isError<T>(result: Result<T>): result is error {
  return result.status !== 200;
}

export const get = async <T>(
  path: string,
  queryParameters?: Record<string, string | number>
): Promise<Result<T>> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL + path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParameters),
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return {
        status: res.status,
        error: errorData.error || res.statusText,
      };
    }
    const body = (await res.json()) as T;
    return {
      status: 200,
      body: body,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { status: 500, error: errorMessage };
  }
};

export const post = async <T>(
  path: string,
  requestBody: Record<string, string | number>
): Promise<Result<T>> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL + path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return {
        status: res.status,
        error: errorData.error || res.statusText,
      };
    }
    const body = (await res.json()) as T;
    return {
      status: 200,
      body: body,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { status: 500, error: errorMessage };
  }
};
