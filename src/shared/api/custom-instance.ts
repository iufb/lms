
import { default as axios, default as Axios, AxiosError, AxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { setCookie } from 'cookies-next/client';

export const url = 'https://1178.foxminded.space/api/v1'
export const AXIOS_INSTANCE = Axios.create({ baseURL: url }); // use your own URL here or environment variable

//TODO

const publicRoutes = ['send-code', 'login', 'verify-code']
AXIOS_INSTANCE.interceptors.request.use((config) => {
    if (config.url) {
        const isSkipRoute = publicRoutes.some(route =>
            config.url?.includes(route))
        if (isSkipRoute) return config
    }
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${getCookie('access')}`; // or call a function to get the token

    return config;
}, (error) => {
    return Promise.reject(error);

});


AXIOS_INSTANCE.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        const isSkipRoute = publicRoutes.some(route =>
            originalRequest.url.includes(route)
        );

        if (isSkipRoute) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getCookie('refresh');
                const response = await axios.post(`${url}/token/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                setCookie('access', access);
                AXIOS_INSTANCE.defaults.headers.common['Authorization'] = `Bearer ${access}`;

                return AXIOS_INSTANCE(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                deleteCookie('access');
                deleteCookie('refresh');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

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


