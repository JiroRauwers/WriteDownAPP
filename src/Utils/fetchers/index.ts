import { BackResponse } from 'src/types/backResponse';
import { HTTPResponseError } from 'src/types/errors';

type HttpRes = {
  messages: string[];
  resultType: number;
  exception: unknown;
  isSuccessTypeResult: boolean;
};

class APIERROR extends Error {
  constructor(message: string, err: HttpRes) {
    super(message);
    this.name = 'APIERROR';
    this.stack = JSON.stringify(err.exception);
    this.cause = err.messages[0];
  }
}

export const fetcher = <T extends HttpRes>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> =>
    fetch(input, init)
      .then((res) => res.json() as unknown as T)
      .then((res) => {
        if (!res.isSuccessTypeResult) {
          console.error('Res error', res);
          throw new APIERROR('err', res);
        }
        return res;
      })
      .catch((err) => {
        console.error('| FETCH ERROR |', input, '\nerr:', err);
        console.log('init', init);
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

  const options: RequestInit & { headers: Record<string, string> } = {
    method,
    headers: {
      accept: '*/*'
    }
  };

  if (method === 'GET')
    Object.entries(params).map(([key, val]) =>
      BackUrl.searchParams.append(key, val.toString())
    );
  else {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(params);
  }

  return fetcher<BackResponse<T>>(BackUrl, options);
};
