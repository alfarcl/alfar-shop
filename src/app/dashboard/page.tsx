"use client";
import styles from "./styles.module.scss";
import clsx from "clsx";
import {
  CardLineChart,
  ModalAddData,
  SideBarComponent,
  TableComponent,
} from "../../../components";
import React from "react";
import { useHooks } from "./useHooks";
import {
  columns_product,
  columns_product_category,
  columns_product_variant,
} from "../../../utils/data";

const Dashboard = () => {
  const {
    tabId,
    setTabId,
    isOpenModal,
    setIsOpenModal,
    isUpdateData,
    handleAdd,
    handleUpdate,
    onSubmit,
    dataProductCategory,
    dataProductVariant,
    dataTransaction,
    dataProduct,
    choosedId,
    handleDelete,
  } = useHooks();

  const renderTabContent = () => {
    switch (tabId) {
      case 0:
        return <CardLineChart />;
      case 1:
        return (
          <div className="w-full min-h-screen my-20">
            <TableComponent
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              data={dataProductCategory}
              tabId={tabId}
              initialColumn={[
                "id",
                "name",
                "is_active",
                "created_user",
                "created_date",
                "updated_user",
                "updated_date",
                "actions",
              ]}
            />
          </div>
        );
      case 2:
        return (
          <div className="w-full min-h-screen my-20">
            <TableComponent
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              data={dataProduct}
              tabId={tabId}
              initialColumn={[
                "id",
                "plu",
                "name",
                "product_category_id",
                "is_active",
                "created_user",
                "updated_date",
                "updated_user",
                "updated_date",
                "actions",
              ]}
            />
          </div>
        );
      case 3:
        return (
          <div className="w-full min-h-screen my-20">
            <TableComponent
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              data={dataProductVariant}
              tabId={tabId}
              initialColumn={[
                "id",
                "product_id",
                "code",
                "name",
                "qty",
                "price",
                "is_active",
                "created_user",
                "updated_date",
                "updated_user",
                "updated_date",
                "actions",
              ]}
            />
          </div>
        );
      case 4:
        return (
          <div className="w-full min-h-screen my-20">
            <TableComponent
              data={dataTransaction}
              tabId={tabId}
              readOnly={true}
              initialColumn={[
                "id",
                "transaction_no",
                "total_amount",
                "active",
                "is_active",
                "created_user",
                "updated_date",
                "updated_user",
                "updated_date",
              ]}
            />
          </div>
        );
      default:
        break;
    }
  };
  return (
    <main className="flex flex-row min-h-screen w-full">
      <SideBarComponent activeButton={tabId} setActiveButton={setTabId} />
      <div className={clsx(styles["content"], "w-full px-20")}>
        {renderTabContent()}
        <ModalAddData
          isOpen={isOpenModal}
          isUpdateData={isUpdateData}
          typeId={tabId}
          onSubmit={onSubmit}
          choosedId={choosedId}
          onOpenChange={() => setIsOpenModal(!isOpenModal)}
        />
      </div>
    </main>
  );
};

export default Dashboard;
