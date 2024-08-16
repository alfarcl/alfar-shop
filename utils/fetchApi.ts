import Cookies from "js-cookie";

const useFetch = () => {
  const token = Cookies.get("token");

  const fetchDataAuth = async ({
    path = "",
    reqBody,
    method = "POST",
    reqHeaders = {
      "Content-Type": "application/json",
    },
  }: {
    path: string;
    reqBody?: {};
    method?: "GET" | "POST";
    reqHeaders?: {};
  }) => {
    return new Promise(async (resolve, reject) => {
      await fetch(path, {
        method: method,
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const fetchData = async ({
    path = "",
    reqBody,
    method = "POST",
    reqHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }: {
    path: string;
    reqBody?: {};
    method?: "GET" | "POST";
    reqHeaders?: {};
  }) => {
    return new Promise(async (resolve, reject) => {
      await fetch(path, {
        method: method,
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return {
    fetchData,
    fetchDataAuth,
  };
};

export { useFetch };
