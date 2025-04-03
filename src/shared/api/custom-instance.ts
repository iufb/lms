
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

export const AXIOS_INSTANCE = Axios.create({ baseURL: 'http://192.168.8.4:8000/api/v1' }); // use your own URL here or environment variable

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
}); AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            window.location.href = "/ru/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
)

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


