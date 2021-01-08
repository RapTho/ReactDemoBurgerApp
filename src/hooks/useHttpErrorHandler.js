import { useEffect, useState } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  // = ComponentWillMount (before rendering)
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  // = Component did mount (after rendering)
  useEffect(() => {
    httpClient.interceptors.request.eject(reqInterceptor);
    httpClient.interceptors.response.eject(resInterceptor);
  }, [httpClient, reqInterceptor, resInterceptor]);

  const confirmErrorHandler = () => {
    setError(null);
  };

  return [error, confirmErrorHandler];
};
