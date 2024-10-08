import clsx from "clsx";
import styles from "./styles.module.scss";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const SideBarComponent = ({
  activeButton = 1,
  setActiveButton,
  isCustomer,
}: any) => {
  const router = useRouter();
  return (
    <div className={clsx(styles["sidebar-container"], "w-1/3 mr-10 px-10")}>
      <p className="text-white text-xl italic mb-28 font-semibold">
        {isCustomer ? "ALFAR SHOP" : "ALFAR SHOP ADMIN"}
      </p>
      {isCustomer ? (
        <>
          <Button
            color={activeButton === 1 ? "warning" : "primary"}
            onClick={() => {
              setActiveButton(1);
            }}
            variant="shadow"
            size="lg"
            className={clsx(
              styles["sidebar-card-button"],
              "my-5 cursor-pointer w-full mt-10"
            )}
          >
            <p>DASHBOARD</p>
          </Button>
        </>
      ) : (
        <>
          {/* <Button
            color={activeButton === 0 ? "warning" : "primary"}
            onClick={() => {
              setActiveButton(0);
            }}
            variant="shadow"
            size="lg"
            className={clsx(
              styles["sidebar-card-button"],
              "my-5 cursor-pointer w-full mt-10 hidden"
            )}
          >
            <p>DASHBOARD</p>
          </Button> */}
          <Button
            color={activeButton === 1 ? "warning" : "primary"}
            onClick={() => {
              setActiveButton(1);
            }}
            size="lg"
            variant="shadow"
            className={clsx(
              styles["sidebar-card-button"],
              "my-5 cursor-pointer w-full"
            )}
          >
            PRODUCT CATEGORY
          </Button>
          <Button
            color={activeButton === 2 ? "warning" : "primary"}
            onClick={() => {
              setActiveButton(2);
            }}
            size="lg"
            variant="shadow"
            className={clsx(
              styles["sidebar-card-button"],
              "py-10 my-5 cursor-pointer w-full"
            )}
          >
            PRODUCT
          </Button>
          <Button
            color={activeButton === 3 ? "warning" : "primary"}
            onClick={() => {
              setActiveButton(3);
            }}
            size="lg"
            variant="shadow"
            className={clsx(
              styles["sidebar-card-button"],
              "py-10 my-5 cursor-pointer w-full"
            )}
          >
            PRODUCT VARIANT
          </Button>
          <Button
            color={activeButton === 4 ? "warning" : "primary"}
            onClick={() => {
              setActiveButton(4);
            }}
            size="lg"
            variant="shadow"
            className={clsx(
              styles["sidebar-card-button"],
              "py-10 my-5 cursor-pointer w-full"
            )}
          >
            TRANSACTION
          </Button>
          <Button
            color={activeButton === 5 ? "warning" : "primary"}
            onClick={() => {
                document.cookie = `token=${''};`
                router.push('/');
            }}
            size="lg"
            variant="shadow"
            className={clsx(
              styles["sidebar-card-button"],
              "py-10 my-5 cursor-pointer w-full"
            )}
          >
            LOG OUT
          </Button>
        </>
      )}
    </div>
  );
};

export default SideBarComponent;
