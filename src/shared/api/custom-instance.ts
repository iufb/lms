
import { default as axios, default as Axios, AxiosError, AxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { setCookie } from 'cookies-next/client';

const url = 'https://1178.foxminded.space/api/v1'
export const AXIOS_INSTANCE = Axios.create({ baseURL: url }); // use your own URL here or environment variable

//TODO

const publicRoutes = ['send-code', 'login', 'verify-code']
AXIOS_INSTANCE.interceptors.request.use((config) => {
    if (config.url) {
        publicRoutes.forEach(route => {
            if (config.url?.includes(route)) {
                return config
            }
        })

    }
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${getCookie('access')}`; // or call a function to get the token

    return config;
}, (error) => {
    return Promise.reject(error);

});

AXIOS_INSTANCE.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                const refreshToken = getCookie('refresh'); // Retrieve the stored refresh token.
                // Make a request to your auth server to refresh the token.
                const response = await axios.post(`${url}/token/refresh/`, {
                    refresh: refreshToken,
                });
                const { access } = response.data;
                // Store the new access and refresh tokens.
                setCookie('access', access);
                // Update the authorization header with the new access token.
                AXIOS_INSTANCE.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                return AXIOS_INSTANCE(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                console.error('Token refresh failed:', refreshError);
                deleteCookie('access');
                deleteCookie('refresh');
                // window.location.href = '/ru/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error); // For all other errors, return the error as is.
    })

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;


