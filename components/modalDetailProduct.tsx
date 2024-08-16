"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { formatRupiah } from "../utils/utils";

export interface IProductVariant {
  id: string;
  product_id: string;
  code: string;
  name: string;
  qty: string;
  price: string;
  active: boolean;
  created_user: string;
  created_date: Date;
  updated_user: string;
  updated_date: Date;
  qtyBuy?: number;
}

export default function ModalDetailProduct({
  isShow,
  toggleShow,
  data,
}: {
  isShow: boolean;
  toggleShow: () => void;
  data: IProductVariant;
}) {
  return (
    <Modal isOpen={isShow} onOpenChange={toggleShow} placement="top" size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="flex mt-10 mb-10 ">
              <div className="flex flex-col">
                <div className={styles["product-image-outer"]}>
                  <div className={clsx(styles["product-image-inner"])}>
                    <Image
                      alt="Card background"
                      className="object-cover rounded-lg"
                      src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className={clsx(styles.description, "mt-10 text-center")}>
                  <p className="font-extrabold">DATA DETAIL</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p className="font-bold">KODE</p>
                  <p>{data?.code}</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p className="font-bold">NAMA PRODUK</p>
                  <p>{data?.name}</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p className="font-bold">HARGA</p>
                  <p>{formatRupiah(parseInt(data?.price))}</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p className="font-bold">STOK</p>
                  <p>{data?.qty}</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p className="font-bold">ID PRODUK</p>
                  <p>{data?.product_id}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex flex-row gap-4 mb-10 justify-center items-center py-10">
                <Button
                  color="warning"
                  variant="shadow"
                  onClick={() => onClose()}
                  className="cursor-pointer transform transition duration-300 hover:scale-110"
                >
                  <p className="text-white font-bold">Tutup</p>
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
