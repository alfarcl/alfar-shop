"use client";

import { Button } from "@nextui-org/react";
import styles from "./styles.module.scss";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { setAuthState } from "../../store/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useFetch } from "../../utils/fetchApi";
import { PATH_LOGIN } from "../../utils/const";

const Login = () => {
  const [accountName, setAccountName] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { fetchDataAuth } = useFetch();

  const handleLogin = async () => {
    fetchDataAuth({
      path: PATH_LOGIN,
      reqBody: {
        name: accountName,
        password: accountPassword,
      },
    })
      .then((response: any) => {
        dispatch(setAuthState(response?.payload));
        Cookies.set("token", response?.payload?.token ?? "", { expires: 1 });
        Cookies.set("account_name", response?.payload?.data?.name ?? "", {
          expires: 1,
        });
         Cookies.set("account_id", response?.payload?.data?.id ?? "", {
          expires: 1,
        });
        document.cookie = `token=${response?.payload?.token}; accountName=${response?.payload?.data?.name};`;
        if (response.payload.data.role_id === "R0001") {
          router.push("/dashboard");
        } else {
          router.push("/customer");
        }
      })
      .catch((err) => console.log({ error: err }));
  };

  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-24 bg-[#f26d6d]">
      <div className={styles["outer-div"]}>
        <div className={styles["main-container"]}>
          <div className="mt-20">
            <p className="text-6xl text-gray-700">LOGIN</p>
          </div>

          <div className="mt-14 w-full px-12 flex justify-center flex-col items-center">
            <Input
              type="nama"
              label="Nama"
              variant="bordered"
              className="mb-5"
              size="lg"
              onValueChange={setAccountName}
              autoComplete="false"
            />
            <Input
              type="password"
              onValueChange={setAccountPassword}
              label="Password"
              variant="bordered"
              size="lg"
            />
            <Button
              size="lg"
              onClick={() => handleLogin()}
              color="primary"
              fullWidth
              className="mt-10"
            >
              Login
            </Button>
          </div>

          <a
            href="/register"
            className="mt-4 text-sm font-bold text-[#f26d6d] hover:text-gray-600"
          >
            REGISTER
          </a>
        </div>
      </div>
    </main>
  );
};

export default Login;
