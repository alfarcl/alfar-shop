import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useHooks = () => {
  const [tabId, setTabId] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [dataProductCategory, setDataProductCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductVariant, setDataProductVarian] = useState(false);
  const [dataTransaction, setDataTransaction] = useState(false);
  const [choosedId, setChoosedId] = useState("");
  const { auth }: any = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAdd = () => {
    setIsUpdateData(false);
    setIsOpenModal(!isOpenModal);
  };

  const handleDelete = (id: string) => {
    setChoosedId(id);
    switch (tabId) {
      case 1:
        onSubmit("delete", {
          product_variant_id: id,
        });
        break;
      default:
        break;
    }
  };

  const handleUpdate = (id: string, data?: {}) => {
    if (data) {
      onSubmit("update", data);
    }
    setChoosedId(id);
    setIsUpdateData(true);
    setIsOpenModal(!isOpenModal);
  };

  const onSubmit = (type: "add" | "update" | "delete", data: any) => {
    switch (tabId) {
      case 1:
        handleProcessProductVariant(type, data);
        break;
      default:
        break;
    }
  };

  const handleProcessProductVariant = async (
    type: "add" | "update" | "delete",
    data: any
  ) => {
    if (auth.token) {
      const response = await fetch(
        `http://localhost:5000/api/product-variant/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(
            type === "add"
              ? {
                  product_id: data.product_id,
                  code: data.code,
                  name: data.name,
                  qty: data.qty,
                  price: data.price,
                  is_active: false,
                  created_user: auth.data.name,
                }
              : type === "update"
              ? {
                  product_variant_id: data.product_variant_id,
                  product_id: data.product_id,
                  code: data.code,
                  name: data.name,
                  qty: data.qty,
                  price: data.price,
                  is_active: false,
                  updated_user: auth.data.name,
                }
              : {
                  product_variant_id: data.product_variant_id ?? "",
                }
          ),
        }
      );
      const result = await response.json();
      if (result.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductVarian();
        setChoosedId("");
        setIsOpenModal(false);
      }
    } else {
      router.push("/");
    }
  };

  const handleGetProductVarian = async () => {
    if (auth.token) {
      const response = await fetch(
        "http://localhost:5000/api/product-variant",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const result = await response.json();
      if (result.message === "Unauthorized") {
        router.push("/");
      } else {
        setDataProductVarian(result.payload.data);
      }
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    switch (tabId) {
      case 1:
        handleGetProductVarian();
        break;
      default:
        break;
    }
  }, [tabId]);

  return {
    tabId,
    setTabId,
    isOpenModal,
    setIsOpenModal,
    isUpdateData,
    setIsUpdateData,
    auth,
    dispatch,
    router,
    handleAdd,
    handleUpdate,
    handleGetProductVarian,
    onSubmit,
    dataProductCategory,
    dataProduct,
    dataProductVariant,
    dataTransaction,
    choosedId,
    handleDelete,
  };
};
