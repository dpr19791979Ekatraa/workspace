import axios from 'axios';

export const apiClient =
  axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_URL,
  });

async function getClerkTokenWithRetry() {
  const maxAttempts = 30;
  const delayMs = 100;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const token =
      await (window as Window & {
        Clerk?: {
          session?: {
            getToken: () => Promise<string | null>;
          };
        };
      }).Clerk?.session?.getToken();

    if (token) {
      return token;
    }

    await new Promise(resolve =>
      setTimeout(resolve, delayMs),
    );
  }

  return null;
}

apiClient.interceptors.request.use(
  async config => {
    const token =
      await getClerkTokenWithRetry();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
);