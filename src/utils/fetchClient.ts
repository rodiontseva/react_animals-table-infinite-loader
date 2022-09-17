const BASE_URL = 'http://localhost:3004/';

type RequestMethod = 'GET' | 'POST';

async function request<T> (
  url: string,
  method: RequestMethod = 'GET',
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return await fetch(BASE_URL + url, options)
    .then(async response => {
      if (!response.ok) {
        throw new Error('Unable to display pets list');
      }

      return await response.json();
    });
}

export const client = {
  get: async <T>(url: string) => await request<T>(url),
  post: async <T>(url: string, data: any) => await request<T>(url, 'POST', data),
};
