"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import Image from "next/image";
import {
  ModalDetailProduct,
  ModalPurchaseConfirmation,
  TableComponentCustomer,
} from "../../../components";
import { useState } from "react";
import useHook from "./useHooks";
import { formatRupiah } from "../../../utils/utils";

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

const Customer = () => {
  const {
    isShow,
    setIsShow,
    isLookingCart,
    handleClickDetail,
    handleAddProduct,
    productList,
    choosedData,
    handleChangeQty,
    handleDeleteCart,
    handleClickCart,
    cartList,
    totalCart,
    showSubmitModal,
    toggleShowSubmitModal,
    handleSubmitPurchasing,
    handleLogOut,
  } = useHook();

  const renderContent = () => {
    return productList?.map((item: IProductVariant) => (
      <Card
        key={item?.id}
        className="py-4 cursor-pointer transform transition duration-300 hover:scale-110"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{`${item?.code} ( Stok: ${item.qty} )`}</p>
          <small className="text-default-500">
            {formatRupiah(parseInt(item?.price))}
          </small>
          <h4 className="font-bold text-large">{item?.name}</h4>
        </CardHeader>
        <CardBody className="h-80 text-center">
          <Image
            alt="Card background"
            className=""
            src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"
            layout="fill"
            objectFit="cover"
          />
        </CardBody>
        <CardFooter>
          <Button
            className="mr-2"
            onClick={() => handleClickDetail(item)}
            color="danger"
            variant="ghost"
          >
            Lihat
          </Button>
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={item.qty}
            onValueChange={(e: any) => {
              handleChangeQty(item.id, parseInt(e === "" ? "0" : e));
            }}
            className="max-w-3:"
            labelPlacement="outside"
          />
          <Button
            className={`ml-2 px-10 ${
              item?.qtyBuy > 0 && item?.qtyBuy <= parseInt(item?.qty)
                ? "animate-pulse text-white"
                : "cursor-not-allowed text-gray-500"
            }`}
            onClick={() => handleAddProduct(item)}
            disabled={item?.qtyBuy < 1 || item?.qtyBuy > parseInt(item?.qty)}
            color={item.qtyBuy ? "success" : "default"}
            variant={item.qtyBuy ? "shadow" : "flat"}
          >
            Tambahkan
          </Button>
        </CardFooter>
      </Card>
    ));
  };

  const renderCart = () => {
    return (
      <div className="flex w-full">
        <TableComponentCustomer
          data={cartList}
          initialColumn={["id", "action"]}
          handleDelete={handleDeleteCart}
          handleAdd={toggleShowSubmitModal}
        />
        <div className={styles["cart-footer"]}>
          <div>Total Belanja</div>
          <div>{formatRupiah(totalCart)}</div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-row min-h-screen w-full">
      <div className={styles.header}>
        <div>
          <p>ALFAR SHOP</p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <Button
            color={!isLookingCart ? "warning" : "primary"}
            onClick={() => handleClickCart()}
            className={`text-white text-lg ml-2 py-2  ${
              isLookingCart && "animate-pulse"
            }`}
          >
            <p>{!isLookingCart ? "Keranjang" : "Toko"}</p>
          </Button>
            <Button
            color="danger"
            onClick={() => handleLogOut()}
            className={`text-white text-lg ml-2 py-2`}
          >
            <p>LOG OUT</p>
          </Button>
        </div>
      </div>
      <div className={clsx(styles["content"], "w-full px-20  ")}>
        {isLookingCart ? (
          <>
            {renderCart()}
            <ModalPurchaseConfirmation
              isShow={showSubmitModal}
              toggleShow={toggleShowSubmitModal}
              handleSubmit={() => handleSubmitPurchasing()}
            />
          </>
        ) : (
          <div className="gap-24 grid grid-cols-2 sm:grid-cols-4 p-10">
            {renderContent()}
            <ModalDetailProduct
              isShow={isShow}
              toggleShow={() => setIsShow(!isShow)}
              data={choosedData}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Customer;
