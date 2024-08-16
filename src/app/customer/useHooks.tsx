import { useEffect, useMemo, useState } from "react";
import {
  PATH_ADD_CART,
  PATH_ADD_TRANSACTION,
  PATH_DELETE_CART,
  PATH_GET_CART,
  PATH_GET_VARIANT_PRODUCT,
  PATH_UPDATE_CART,
} from "../../../utils/const";
import { useFetch } from "../../../utils/fetchApi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

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

export interface IAuthSelector {
  token: string;
  data: IAuthDataSelector;
}

export interface IAuthDataSelector {
  id: string;
  name: string;
  role_id: string;
}

const useHook = () => {
  const { fetchData } = useFetch();
  const [productList, setProductList]: any = useState([]);
  const [cartList, setCartList]: any = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isChoosingCategory, setIsChoosingCategory] = useState(false);
  const [choosedCategory, setChoosedCategory]: any = useState(null);
  const [isChoosingProduct, setIsChoosingProduct] = useState(false);
  const [isLookingCart, setIsLookingCart] = useState(false);
  const [choosedProduct, setChoosedProduct]: any = useState(null);
  const [showSubmitModal, setShowSubmitModal]: any = useState(false);
  const [choosedData, setChoosedData]: any = useState(null);
  const router = useRouter();
  const accountName = Cookies.get('account_name');
  const accountId = Cookies.get('account_id');
  let totalCart: any = useMemo(() => {
    let _val: number = 0;
    cartList?.map((e: any) => (_val += e?.price * e?.qty));
    return _val;
  }, [cartList]);

  const toggleShowSubmitModal = () => {
    setShowSubmitModal(!showSubmitModal);
  };

  const handleGetProduct = async () => {
    try {
      const response: any = await fetchData({
        path: PATH_GET_VARIANT_PRODUCT,
        method: "GET",
      });

      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        setProductList(response?.payload?.data);
      }
    } catch (error) {}
  };

  const handleGetCart = async () => {
    try {
      const response: any = await fetchData({
        path: PATH_GET_CART,
        method: "GET",
      });

      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        const _data = response?.payload?.data;
        setCartList(
          _data?.map((e: any) => {
            if (e?.active) return e;
          })
        );
      }
    } catch (error) {}
  };

  const handleDeleteCart = async (_id: string) => {
    try {
      const response: any = await fetchData({
        path: PATH_DELETE_CART,
        reqBody: {
          cart_id: _id,
        },
      });

      if (response.message === "Unauthorized") {
        router.push("/");
      } else {
        handleGetCart();
      }
    } catch (error) {}
  };

  const handleChangeQty = async (id_product: string, _qty: number) => {
    const filteredData: any = productList?.filter(
      (e: any) => e.id == id_product
    );
    const dataWithoutId: any = productList?.filter(
      (e: any) => e.id != id_product
    );
    if (_qty < parseInt(filteredData[0].qty)) {
      setProductList(
       await productList?.map((e: IProductVariant) => {
          if (e.id === id_product) {
            return {
              ...e,
              qtyBuy: _qty,
            };
          } else {
            return e;
          }
        })
      );
    }
  };

  const handleClickCart = () => {
    if (isLookingCart) {
      handleGetProduct();
    } else {
      handleGetCart();
    }
    setIsLookingCart(!isLookingCart);
    setIsChoosingCategory(false);
    setIsChoosingProduct(false);
  };

  const handleClickDetail = (data: IProductVariant) => {
    setChoosedData(data);
    setIsShow(!isShow);
  };

  const handleAddProduct = async (_data: IProductVariant) => {
    const existingCart: any = cartList.filter(
      (e: any) => e?.product_variant_id === _data?.id
    );
    if (existingCart?.length === 0) {
      try {
        const response: any = await fetchData({
          path: PATH_ADD_CART,
          reqBody: {
            account_id: accountId,
            product_variant_id: _data?.id,
            price: _data?.price,
            qty: _data?.qtyBuy,
            is_active: _data?.active,
            product_name: _data?.name,
          },
        });
        if (response.message === "Unauthorized") {
          router.push("/");
        } else {
          handleGetCart();
        }
      } catch (error) {}
    } else {
      try {
        const response: any = await fetchData({
          path: PATH_UPDATE_CART,
          reqBody: {
            cart_id: existingCart?.[0]?.id,
            is_active: _data?.active,
            qty: _data?.qtyBuy,
          },
        });
        if (response.message === "Unauthorized") {
          router.push("/");
        } else {
          handleGetCart();
        }
      } catch (error) {}
    }
  };

  const handleSubmitPurchasing = async () => {
    try {
      const response: any = await fetchData({
        path: PATH_ADD_TRANSACTION,
        reqBody: {
          total_amount: totalCart,
          is_active: false,
          created_user: accountId,
        },
      });
      if (response.message === "Unauthorized") {
        toggleShowSubmitModal();
        router.push("/");
      } else {
        await cartList?.map(async (e: any) => {
          handleDeleteCart(e?.id);
        });
        toggleShowSubmitModal();
      }
    } catch (error) {
      toggleShowSubmitModal();
    }
  };

  const handleLogOut = async () => {
    document.cookie = `token=${""};`;
    router.push("/");
  };

  useEffect(() => {
    handleGetProduct();
    handleGetCart();
  }, []);

  return {
    productList,
    setProductList,
    isShow,
    setIsShow,
    isChoosingCategory,
    setIsChoosingCategory,
    choosedCategory,
    setChoosedCategory,
    isChoosingProduct,
    setIsChoosingProduct,
    isLookingCart,
    setIsLookingCart,
    choosedProduct,
    setChoosedProduct,
    router,
    handleClickDetail,
    handleAddProduct,
    handleChangeQty,
    choosedData,
    setChoosedData,
    handleClickCart,
    handleDeleteCart,
    cartList,
    totalCart,
    showSubmitModal,
    toggleShowSubmitModal,
    handleSubmitPurchasing,
    handleLogOut,
  };
};

export default useHook;
