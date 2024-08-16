"use client";
import styles from "./styles.module.scss";
import clsx from "clsx";
import {
  ModalAddData,
  SideBarComponent,
  TableComponentCustomer,
} from "../../../components";
import React from "react";
import { useHooks } from "./useHooks";

const Customer = () => {
  const {
    tabId,
    setTabId,
    isOpenModal,
    setIsOpenModal,
    isUpdateData,
    onSubmit,
    dataProductVariant,
    choosedId,
  } = useHooks();

  const renderTabContent = () => {
    switch (tabId) {
      case 1:
        return (
          <TableComponentCustomer
            data={dataProductVariant}
            initialColumn={[]}
          />
        );
      default:
        break;
    }
  };
  return (
    <main className="flex flex-row min-h-screen w-full">
      <SideBarComponent
        isCustomer={true}
        activeButton={tabId}
        setActiveButton={setTabId}
      />
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

export default Customer;
