import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductCategory } from "../../../store/productCategorySlice";
import { setProduct } from "../../../store/productSlice";
import { useFetch } from "../../../utils/fetchApi";
import {
  PATH_ADD_CATEGORY_PRODUCT,
  PATH_ADD_PRODUCT,
  PATH_ADD_VARIANT_PRODUCT,
  PATH_DELETE_CATEGORY_PRODUCT,
  PATH_DELETE_PRODUCT,
  PATH_DELETE_VARIANT_PRODUCT,
  PATH_GET_CATEGORY_PRODUCT,
  PATH_GET_PRODUCT,
  PATH_GET_TRANSACTION,
  PATH_GET_VARIANT_PRODUCT,
  PATH_UPDATE_CATEGORY_PRODUCT,
  PATH_UPDATE_PRODUCT,
  PATH_UPDATE_VARIANT_PRODUCT,
} from "../../../utils/const";

export interface IAuthSelector {
  token: string;
  data: IAuthDataSelector;
}

export interface IAuthDataSelector {
  id: string;
  name: string;
  role_id: string;
}

export const useHooks = () => {
  const [tabId, setTabId] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [dataProductCategory, setDataProductCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductVariant, setDataProductVarian] = useState(false);
  const [dataTransaction, setDataTransaction] = useState(false);
  const [choosedId, setChoosedId] = useState("");
  const [dataInput, setDataInput] = useState({});
  const auth: IAuthSelector = useSelector((state: any) => state.auth.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { fetchData } = useFetch();

  const productCategoryList = useSelector(
    (state: any) => state.product_category.product_category.data
  );
  const productList = useSelector((state: any) => state.product.product.data);

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

  const handleAdd = () => {
    setDataInput({});
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
    setDataInput({
      ...data,
    });
    setChoosedId(id);
    setIsUpdateData(true);
    setIsOpenModal(!isOpenModal);
  };

  const handleUpdateIsActive = (data: {}) => {
    onSubmit("update", data);
  };

  const handleProcessProductCategory = async (
    type: "add" | "update" | "delete",
    data: any
  ) => {
    await fetchData({
      path:
        type === "add"
          ? PATH_ADD_CATEGORY_PRODUCT
          : type === "update"
          ? PATH_UPDATE_CATEGORY_PRODUCT
          : PATH_DELETE_CATEGORY_PRODUCT,
      reqBody:
        type === "add"
          ? {
              name: data?.name ?? "",
              is_active: false,
              created_user: auth.data.name,
            }
          : type === "update"
          ? {
              category_id: data?.id || "",
              name: data?.name ?? "",
              is_active: data.active ?? false,
              updated_user: auth.data.name,
            }
          : {
              category_id: data?.category_id ?? "",
            },
    })
      .then((response: any) => {
        if (response.message === "Unauthorized") {
          router.push("/");
        } else {
          handleGetProductCategory();
          setChoosedId("");
          setIsOpenModal(false);
        }
      })
      .catch((err) => {
        console.log({ err: err });
      });
  };

  const handleProcessProduct = async (
    type: "add" | "update" | "delete",
    data: any
  ) => {
    await fetchData({
      path:
        type === "add"
          ? PATH_ADD_PRODUCT
          : type === "update"
          ? PATH_UPDATE_PRODUCT
          : PATH_DELETE_PRODUCT,
      reqBody:
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
              product_id: data?.id,
              plu: data?.plu,
              name: data?.name,
              product_category_id: data?.product_category_id,
              is_active: data?.active,
              updated_user: auth.data.name,
            }
          : {
              product_id: data?.product_id ?? "",
            },
    }).then((response: any) => {
      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductData();
        setChoosedId("");
        setIsOpenModal(false);
      }
    });
  };

  const handleProcessProductVariant = async (
    type: "add" | "update" | "delete",
    data: any
  ) => {
    await fetchData({
      path:
        type === "add"
          ? PATH_ADD_VARIANT_PRODUCT
          : type === "update"
          ? PATH_UPDATE_VARIANT_PRODUCT
          : PATH_DELETE_VARIANT_PRODUCT,
      reqBody:
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
          : type == "update"
          ? {
              product_variant_id: data.id,
              product_id: data.product_id,
              code: data.code,
              name: data.name,
              qty: data.qty,
              price: data.price,
              is_active: data?.active,
              updated_user: auth.data.name,
            }
          : {
              product_variant_id: data.product_variant_id ?? "",
            },
    }).then((response: any) => {
      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductVarian();
        setChoosedId("");
        setIsOpenModal(false);
      }
    });
  };

  const handleGetProductCategory = async () => {
    await fetchData({
      path: PATH_GET_CATEGORY_PRODUCT,
      method: "GET",
    }).then((response: any) => {
      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        setDataProductCategory(response.payload.data);
        dispatch(setProductCategory(response.payload.data));
      }
    });
  };

  const handleGetProductData = async () => {
    await fetchData({
      path: PATH_GET_PRODUCT,
      method: "GET",
    }).then((response: any) => {
      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductCategory();
        dispatch(setProduct(response.payload.data));
        setDataProduct(response.payload.data);
      }
    });
  };

  const handleGetProductVarian = async () => {
    await fetchData({
      path: PATH_GET_VARIANT_PRODUCT,
      method: "GET",
    }).then((response: any) => {
      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetProductData();
        setDataProductVarian(response.payload.data);
      }
    });
  };

  const handleGetTransactionData = async () => {
    await fetchData({
      path: PATH_GET_TRANSACTION,
      method: "GET",
    }).then((response: any) => {
      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        setDataTransaction(response.payload.data);
      }
    });
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
    dataInput,
    setDataInput,
    handleUpdateIsActive,
  };
};
