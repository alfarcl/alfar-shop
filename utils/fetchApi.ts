import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useFetch = async (url: string) => {
  const { auth } = useSelector((state: any) => state.auth);
  const hitApi: any = useCallback(
    async (reqPayload: any) => {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(reqPayload),
      });
    },
    [auth.token, url]
  );

  const data = await hitApi.json();

  return {
    function: hitApi,
    data,
  };
};
