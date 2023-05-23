import { HTTPResponseError } from 'src/types/errors';

export const fetcher = <T extends unknown>(
  input: RequestInfo | URL | undefined,
  init?: RequestInit
): Promise<T> =>
    fetch(input!, init)
      .then((res) => res.json() as T)
      .catch((err) => {
        console.error('| FETCH ERROR |', input, err);
        throw new HTTPResponseError(err.message, err.status);
      });

export const FetchBackEnd = <T>(
  url: string,
  method: string,
  params: Record<string, string | number>
) => {
  const BackUrl = new URL(
    `https://writedownonlineapi.up.railway.app/api${url}`
  );

  const options: RequestInit = {
    method,
    headers: {
      accept: '*/*'
    }
  };

  if (method === 'GET')
    Object.entries(params).map(([key, val]) =>
      BackUrl.searchParams.append(key, val.toString())
    );
  else options.body = JSON.stringify(params);

  console.log('url', BackUrl, 'options', options);
  return fetcher<T>(BackUrl, options);
};
