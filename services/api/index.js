import axios from 'axios';
class API {
    constructor() {
        this.facade = {};
        this.token = null;
        const Api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL_HOST}` });
        this.request = (config) => Api.request(config);
        ['get', 'head'].forEach((method) => {
            this[method] = (url, config) => this.request({ ...config, method, url });
        });
        ['delete', 'post', 'put', 'patch'].forEach((method) => {
            this[method] = (url, data, config) => this.request({ ...config, method, url, data });
        });
        this.setToken = (token1) => {
            this.token = token1;
        };

        this.fetchGet = (url) => {
            return this.token !== undefined
                ? this.get(url, {
                      withCredentials: true,
                      headers: { Token: this.token }
                  })
                : this.get(url, { withCredentials: true });
        };

        this.fetchPost = (url, data) => {
            return this.token !== undefined
                ? this.post(url, data, {
                      withCredentials: true,
                      headers: { Token: this.token }
                  })
                : this.post(url, data, { withCredentials: true });
        };

        this.fetchDelete = (url, data) => {
            return this.delete(url, data, {
                withCredentials: true,
                headers: { Token: this.token }
            });
        };

        this.fetchPut = (url, data) => {
            return this.put(url, data, {
                withCredentials: true,
                headers: { Token: this.token }
            });
        };
    }
}

const api = new API();

export default api;
