import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function ModalAddData({
  isOpen = false,
  onOpenChange,
  typeId = 1,
  isUpdateData = false,
  onSubmit,
  choosedId,
  dataInput,
  setDataInput,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  typeId: number;
  isUpdateData?: boolean;
  choosedId: string;
  onSubmit: (type: "add" | "update" | "delete", data: any) => void;
  dataInput?: any;
  setDataInput?: any;
}) {
  const productCategoryList = useSelector(
    (state: any) => state.product_category.product_category
  );
  const productList = useSelector((state: any) => state.product.product);

  const renderForm = (id: number) => {
    switch (id) {
      case 1: //kategori produk
        return (
          <Input
            label="Nama Kategori Produk"
            variant="faded"
            value={dataInput?.name ?? ""}
            onValueChange={(e) => {
              setDataInput(
                isUpdateData
                  ? {
                      ...dataInput,
                      name: e,
                      category_id: choosedId,
                    }
                  : {
                      ...dataInput,
                      name: e,
                    }
              );
            }}
          />
        );
      case 2: //produk
        return (
          <>
            <Input
              label="Kode PLU"
              variant="faded"
              value={dataInput?.plu ?? ""}
              onValueChange={(e) =>
                setDataInput({
                  ...dataInput,
                  plu: e,
                })
              }
            />
            <Input
              label="Nama Produk"
              variant="faded"
              value={dataInput?.name ?? ""}
              onValueChange={(e) =>
                setDataInput({
                  ...dataInput,
                  name: e,
                })
              }
            />
            <Select
              label="Kategori produk"
              defaultSelectedKeys={[dataInput.product_category_id]}
              className="max-w-xs"
              fullWidth
            >
              {productCategoryList?.map((val: any) => {
                return (
                  <SelectItem
                    key={val.id}
                    onClick={() => {
                      setDataInput({
                        ...dataInput,
                        product_category_id: val.id,
                      });
                    }}
                  >
                    {val.name}
                  </SelectItem>
                );
              })}
            </Select>
          </>
        );
      case 3: //produk varian
        return (
          <>
            <Select
              label="Produk"
              defaultSelectedKeys={[dataInput.product_id]}
              className="max-w-xs"
              fullWidth
            >
              {productList &&
                productList?.map((val: any) => {
                  return (
                    <SelectItem
                      key={val.id}
                      onClick={() => {
                        setDataInput({
                          ...dataInput,
                          product_id: val.id,
                        });
                      }}
                    >
                      {val.name}
                    </SelectItem>
                  );
                })}
            </Select>
            <Input
              label="Nama Varian"
              value={dataInput.name ?? ""}
              variant="faded"
              onValueChange={(e) =>
                setDataInput({
                  ...dataInput,
                  name: e,
                })
              }
            />
            <Input
              label="Kode"
              variant="faded"
              value={dataInput.code ?? ""}
              onValueChange={(e) =>
                setDataInput({
                  ...dataInput,
                  code: e,
                })
              }
            />
            <Input
              label="Stok"
              variant="faded"
              value={dataInput.qty ?? ""}
              onValueChange={(e) =>
                setDataInput({
                  ...dataInput,
                  qty: e,
                })
              }
            />
            <Input
              label="Harga"
              variant="faded"
              value={dataInput.price ?? ""}
              onValueChange={(e) =>
                setDataInput({
                  ...dataInput,
                  price: e,
                })
              }
            />
          </>
        );
      default:
        return <></>;
    }
  };

  const renderTitle = () => {
    switch (typeId) {
      case 1:
        return `${isUpdateData ? "Ubah" : "Tambah"} Data Kategori Produk`;
      case 2:
        return `${isUpdateData ? "Ubah" : "Tambah"} Data Produk`;
      case 3:
        return `${isUpdateData ? "Ubah" : "Tambah"} Data Varian Produk`;
      default:
        break;
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="lg"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {renderTitle()}
              </ModalHeader>
              <ModalBody>{renderForm(typeId)}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    onSubmit(isUpdateData ? "update" : "add", dataInput)
                  }
                >
                  {isUpdateData ? "Ubah" : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
