import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductCategory } from "../../../store/productCategorySlice";
import { setProduct } from "../../../store/productSlice";

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
          category_id: id,
        });
        break;
      case 2:
        onSubmit("delete", {
          product_id: id,
        });
        break;
      case 3:
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
        handleProcessProductCategory(type, data);
        break;
      case 2:
        handleProcessProduct(type, data);
        break;
      case 3:
        handleProcessProductVariant(type, data);
        break;
      default:
        break;
    }
  };

  const handleGetProductCategory = async () => {
    if (auth.token) {
      const response = await fetch(
        "http://localhost:5000/api/product-category",
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
        setDataProductCategory(result.payload.data);
        dispatch(setProductCategory(result.payload));
      }
    } else {
      router.push("/");
    }
  };

  const handleProcessProductCategory = async (
    type: "add" | "update" | "delete",
    data: any
  ) => {
    if (auth.token) {
      const response = await fetch(
        `http://localhost:5000/api/product-category/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(
            type === "add"
              ? {
                  name: data?.name ?? "",
                  is_active: false,
                  created_user: auth.data.name,
                }
              : type === "update"
              ? {
                  category_id: data?.category_id ?? "",
                  name: data?.name ?? "",
                  is_active: data?.is_active ?? false,
                  updated_user: auth.data.name,
                }
              : {
                  category_id: data?.category_id ?? "",
                }
          ),
        }
      );
      const result = await response.json();
      if (result.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductCategory();
        setChoosedId("");
        setIsOpenModal(false);
      }
    } else {
      router.push("/");
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

  const handleProcessProduct = async (
    type: "add" | "update" | "delete",
    data: any
  ) => {
    if (auth.token) {
      const response = await fetch(
        `http://localhost:5000/api/product/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(
            type === "add"
              ? {
                  plu: data?.plu,
                  name: data?.name,
                  product_category_id: data?.product_category_id,
                  is_active: false,
                  created_user: auth.data.name,
                }
              : type === "update"
              ? {
                  product_id: choosedId,
                  plu: data?.plu,
                  name: data?.name,
                  product_category_id: data?.product_category_id,
                  is_active: false,
                  updated_user: auth.data.name,
                }
              : {
                  product_id: data?.product_id ?? "",
                }
          ),
        }
      );
      const result = await response.json();
      if (result.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductData();
        setChoosedId("");
        setIsOpenModal(false);
      }
    } else {
      router.push("/");
    }
  };

  const handleGetTransactionData = async () => {
    if (auth.token) {
      const response = await fetch("http://localhost:5000/api/transaction", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const result = await response.json();
      if (result.message === "Unauthorized") {
        router.push("/");
      } else {
        setDataTransaction(result.payload.data);
      }
    } else {
      router.push("/");
    }
  };

  const handleGetProductData = async () => {
    if (auth.token) {
      const response = await fetch("http://localhost:5000/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const result = await response.json();
      if (result.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductCategory();
        dispatch(setProduct(result.payload.data));
        setDataProduct(result.payload.data);
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
        handleGetProductData();
        setDataProductVarian(result.payload.data);
      }
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    switch (tabId) {
      case 1:
        handleGetProductCategory();
        break;
      case 2:
        handleGetProductData();
        break;
      case 3:
        handleGetProductVarian();
        break;
      case 4:
        handleGetTransactionData();
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
    handleGetProductCategory,
    handleGetTransactionData,
    handleGetProductData,
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
