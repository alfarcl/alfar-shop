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
import { ModalDetailProduct, TableComponentCart } from "../../../components";
import { useState } from "react";
const list = [
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    title: "Kamera",
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
];

const Customer = () => {
  const [isShow, setIsShow] = useState(false);
  const [isChoosingCategory, setIsChoosingCategory] = useState(false);
  const [choosedCategory, setChoosedCategory]: any = useState(null);
  const [isChoosingProduct, setIsChoosingProduct] = useState(false);
  const [isLookingCart, setIsLookingCart] = useState(false);
  const [choosedProduct, setChoosedProduct]: any = useState(null);

  const handleClickDetail = () => {
    setIsShow(!isShow);
  };

  const handleChooseCategory = (val: string) => {
    setChoosedCategory(val);
    setIsChoosingCategory(!isChoosingCategory);
  };

  const handleChooseProduct = (val: string) => {
    setChoosedProduct(val);
    setIsChoosingProduct(!isChoosingProduct);
  };

  const renderTitle = () => {
    if (isChoosingCategory) return "PILIH KATEGORI PRODUK";
    if (isChoosingProduct) return "PILIH PRODUK";
    return "";
  };

  const renderContent = () => {
    return list.map((item, index) => (
      <Card
        key={index}
        className="py-4 cursor-pointer transform transition duration-300 hover:scale-110"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className=" w-96 h-80">
          <Image
            alt="Card background"
            className="object-cover"
            src={item.url}
            layout="fill"
            objectFit="cover"
          />
        </CardBody>
        <CardFooter>
          <Button
            className="mr-2"
            onClick={() => handleClickDetail()}
            color="danger"
            variant="ghost"
          >
            Lihat
          </Button>
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="max-w-3:"
            labelPlacement="outside"
          />
          <Button
            className="ml-2 px-10"
            onClick={() => handleClickDetail()}
            color="warning"
            variant="ghost"
          >
            Tambahkan
          </Button>
        </CardFooter>
      </Card>
    ));
  };

  const renderContentCategory = () => {
    return list.map((item, index) => (
      <Card
        key={index}
        className="py-4 cursor-pointer transform transition duration-300 hover:scale-110"
      >
        <CardBody className=" w-96 h-80 flex flex-row justify-center items-center text-white italic bg-red-500 text-5xl font-extrabold">
          <p>{item.title.toUpperCase()}</p>
        </CardBody>
        <CardFooter className="flex flex-row justify-center items-center">
          <Button
            className="mr-2"
            onClick={() => handleChooseCategory(item.title)}
            color="danger"
            variant="ghost"
            size="lg"
          >
            Pilih
          </Button>
        </CardFooter>
      </Card>
    ));
  };

  const renderContentProduct = () => {
    return list.map((item, index) => (
      <Card
        key={index}
        className="py-4 cursor-pointer transform transition duration-300 hover:scale-110"
      >
        <CardBody className=" w-96 h-80 flex flex-row justify-center items-center text-white italic bg-red-500 text-5xl font-extrabold">
          <p>{item.title.toUpperCase()}</p>
          <Image
            alt="Card background"
            className="object-cover"
            src={item.url}
            layout="fill"
            objectFit="cover"
          />
        </CardBody>
        <CardFooter className="flex flex-col justify-center items-center">
          <p className="mb-5 text-lg font-semibold">{item.title}</p>
          <Button
            className="mr-2 w-full"
            onClick={() => handleChooseProduct(item.title)}
            color="danger"
            variant="ghost"
            size="lg"
          >
            Pilih
          </Button>
        </CardFooter>
      </Card>
    ));
  };

  const renderCart = () => {
    return (
      <div className="flex w-full">
        <TableComponentCart />
        <div className={styles["cart-footer"]}>Total Belanja</div>
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
            color={
              isChoosingCategory
                ? "warning"
                : choosedCategory
                ? "success"
                : "danger"
            }
            onClick={() => {
              setIsChoosingCategory(!isChoosingCategory);
              setChoosedCategory(null);
              setIsChoosingProduct(false);
              setIsLookingCart(false);
            }}
            className={`text-white text-lg py-2  ${
              isChoosingCategory && "animate-pulse"
            }`}
          >
            <p>
              {choosedCategory
                ? `Kategori: ${choosedCategory}`
                : "Pilih Kategori Produk"}
            </p>
          </Button>
          <Button
            color={
              isChoosingProduct
                ? "warning"
                : choosedProduct
                ? "success"
                : "danger"
            }
            onClick={() => {
              setIsChoosingProduct(!isChoosingProduct);
              setChoosedProduct(null);
              setIsChoosingCategory(false);
              setIsLookingCart(false);
            }}
            className={`text-white text-lg ml-2 py-2  ${
              isChoosingProduct && "animate-pulse"
            }`}
          >
            <p>
              {choosedProduct ? `Produk: ${choosedProduct}` : "Pilih Produk"}
            </p>
          </Button>
          <Button
            color={
              isLookingCart ? "warning" : choosedProduct ? "success" : "danger"
            }
            onClick={() => {
              setIsLookingCart(!isLookingCart);
              setIsChoosingCategory(false);
              setIsChoosingProduct(false);
            }}
            className={`text-white text-lg ml-2 py-2  ${
              isLookingCart && "animate-pulse"
            }`}
          >
            <p>Keranjang</p>
          </Button>
        </div>
      </div>
      <div className={clsx(styles["content"], "w-full px-20  ")}>
        <p className="text-5xl text-white my-5">{renderTitle()}</p>
        {isLookingCart ? (
          renderCart()
        ) : (
          <>
            <div className="gap-24 grid grid-cols-2 sm:grid-cols-4 p-10">
              {isChoosingCategory
                ? renderContentCategory()
                : isChoosingProduct
                ? renderContentProduct()
                : renderContent()}
              <ModalDetailProduct
                isShow={isShow}
                toggleShow={() => setIsShow(!isShow)}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Customer;
