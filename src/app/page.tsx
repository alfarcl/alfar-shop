"use client";

import { Button } from "@nextui-org/react";
import styles from "./styles.module.scss";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useAppDispatch } from "./store";
import { setAuthState } from "../../store/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Login = () => {
  const [accountName, setAccountName] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: accountName,
        password: accountPassword,
      }),
    });
    const result = await response.json();
    console.log(result)
    dispatch(setAuthState(result.payload));
    if (result.payload.data.role_id === 'R0001') {
      router.push('/dashboard')
    } else {
      router.push('/customer')
    }
  
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

          <a href="/register" className="mt-4 text-xs font-semibold">
            REGISTER
          </a>
        </div>
      </div>
    </main>
  );
};

export default Login;
