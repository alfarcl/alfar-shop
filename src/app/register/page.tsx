"use client";
import { Button, Select, SelectItem } from "@nextui-org/react";
import styles from "./styles.module.scss";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useAppDispatch } from "../store";

const datas = [{ name: "hasbi" }, { name: "tiwi" }, { name: "reza" }];

const Register = () => {
  const [data, setData] = useState({
    nama: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.nama,
        password: data.password,
        role_id: 'R0002'
      }),
    });
  };
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-24 bg-[#f26d6d]">
      <div className={styles["outer-div"]}>
        <div className={styles["main-container"]}>
          <div className="mt-20">
            <p className="text-6xl text-gray-700">REGISTER</p>
          </div>
          <div className="mt-10 w-full px-12">
            <Input
              type="nama"
              label="Nama"
              variant="bordered"
              className="my-5"
              size="lg"
              onValueChange={(e) => {
                setData({
                  ...data,
                  nama: e,
                });
              }}
              autoComplete="false"
            />
            <Input
              type="password"
              label="Password"
              className="my-5"
              variant="bordered"
              onValueChange={(e) => {
                setData({
                  ...data,
                  password: e,
                });
              }}
              size="lg"
            />
            <Button
              size="lg"
              onClick={() => handleRegister()}
              color="primary"
              fullWidth
              className="mt-10"
            >
              Login
            </Button>
          </div>
          <a href="/" className="mt-4">
            LOGIN
          </a>
        </div>
      </div>
    </main>
  );
};

export default Register;
