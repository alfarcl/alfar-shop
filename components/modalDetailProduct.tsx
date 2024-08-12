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

export default function ModalDetailProduct({
  isShow,
  toggleShow,
}: {
  isShow: boolean;
  toggleShow: () => void;
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
                  <p>KAMERA DIGITAL SECOND</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p>PLU :</p>
                  <p>-</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p>Kategori :</p>
                  <p>-</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p>Produk :</p>
                  <p>-</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p>Stok :</p>
                  <p>-</p>
                </div>
                <div
                  className={clsx(
                    styles["description-product"],
                    "mt-1 text-center w-full"
                  )}
                >
                  <p>Harga :</p>
                  <p>Rp 20.000,-</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex flex-row gap-2 mb-10 justify-center items-center">
                <Button
                  color="warning"
                  variant="shadow"
                  className="cursor-pointer transform transition duration-300 hover:scale-110"
                >
                  <p className="text-white font-bold">Tambahkan Ke Keranjang</p>
                </Button>
                <Button
                  color="success"
                  variant="shadow"
                  className="cursor-pointer transform transition duration-300 hover:scale-110"
                >
                  <p className="text-white font-bold">Pesan Sekarang</p>
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
