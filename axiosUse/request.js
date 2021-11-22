const instance = axios.create({
  baseURL: "https://www.some-domain.com/path/to/example",
  timeout: 3000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
// 自定义请求拦截器
instance.interceptors.request.use(
  (config) => {
    let cacheKey = config.url;

    const token = window.localStorage.getItem("token");
    token && (config.headers["Authorization"] = token);

    const method = config.method.toLowerCase();
    console.log("ssssss", method, config.params, typeof config.params);
    if (
      method === "get" &&
      config.params &&
      typeof config.params === "object"
    ) {
      cacheKey += qs.stringify(config.params, { addQueryPrefix: true });
    }
    if (
      ["post", "put", "patch"].includes(method) &&
      config.data &&
      typeof config.data === "object"
    ) {
      config.data = qs.stringify(config.data);
      cacheKey += `_${qs.stringify(config.data, { arrayFormat: "brackets" })}`;
    }

    // 每次发送请求之前将上一个未完成的相同请求进行中断
    CacheUtils.cache[cacheKey] && CacheUtils.clearCache(cacheKey);

    // 将当前请求所对应的取消函数存入缓存
    config.cancelToken = new axios.CancelToken(function executor(c) {
      CacheUtils.cache[cacheKey] = c;
    });

    // 临时保存 cacheKey，用于在响应拦截器中清除缓存
    config.cacheKey = cacheKey;

    return config;
  },
  (error) => Promise.reject(error)
);

// 自定义响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 响应接收之后清除缓存
    const cacheKey = response.config.cacheKey;
    delete CacheUtils.cache[cacheKey];

    if (response.status === 200) {
      return Promise.resolve(response.data);
    }

    return Promise.reject(response);
  },
  (error) => {
    // 响应异常清除缓存
    if (error.config) {
      const cacheKey = error.config.cacheKey;
      delete CacheUtils.cache[cacheKey];
    }

    return Promise.reject(error);
  }
);

const axiosRequest = instance;
