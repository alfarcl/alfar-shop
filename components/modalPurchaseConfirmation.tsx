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

export default function ModalPurchaseConfirmation({
  isShow = true,
  toggleShow,
  handleSubmit,
}: {
  isShow: boolean;
  toggleShow: () => void;
  handleSubmit: () => void;
}) {
  return (
    <Modal
      isOpen={isShow}
      onOpenChange={toggleShow}
      placement="center"
      size="lg"
    >
      <ModalContent className="h-40">
        {(onClose) => (
          <ModalBody className="flex justify-center items-center text-xl">
            <p className="mb-10">Yakin melanjutkan pembayaran ?</p>
            <div className="w-full flex gap-4 justify-center items-center mt-8">
              <Button
                color="success"
                variant="shadow"
                onClick={handleSubmit}
                className="cursor-pointer transform transition duration-300 hover:scale-110"
              >
                <p className="text-white font-bold">Yakin</p>
              </Button>
              <Button
                color="danger"
                variant="shadow"
                onClick={() => onClose()}
                className="cursor-pointer transform transition duration-300 hover:scale-110"
              >
                <p className="text-white font-bold">Batal</p>
              </Button>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
