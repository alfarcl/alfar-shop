"use client";
import { Button } from "@nextui-org/react";
import styles from "./styles.module.scss";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATH_REGISTER } from "../../../utils/const";
import { useFetch } from "../../../utils/fetchApi";

const Register = () => {
  const router = useRouter();
  const [data, setData] = useState({
    nama: "",
    password: "",
  });
  const { fetchDataAuth } = useFetch();

  const handleRegister = async () => {
    await fetchDataAuth({
      path: PATH_REGISTER,
      reqBody: {
        name: data.nama,
        password: data.password,
        role_id: "R0002",
      },
    })
      .then((res: any) => {
        router.push("/");
      })
      .catch((err) => console.log(err));
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
              Register
            </Button>
          </div>
          <a
            href="/"
            className="mt-4 text-sm font-bold text-[#f26d6d] hover:text-gray-600"
          >
            LOGIN
          </a>
        </div>
      </div>
    </main>
  );
};

export default Register;
