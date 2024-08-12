import React from "react";

const columns_product_category = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAMA", uid: "name", sortable: true },
  { name: "IS ACTIVE", uid: "is_active", sortable: true },
  { name: "DIBUAT OLEH", uid: "created_user", sortable: true },
  { name: "DIBUAT PADA", uid: "created_date", sortable: true },
  { name: "DIUBAH OLEH", uid: "updated_user", sortable: true },
  { name: "DIUBAH PADA", uid: "updated_date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const columns_product = [
  { name: "ID", uid: "id", sortable: true },
  { name: "PLU", uid: "plu", sortable: true },
  { name: "NAMA", uid: "name", sortable: true },
  { name: "KODE KATEGORI PRODUK", uid: "product_category_id", sortable: true },
  { name: "IS ACTIVE", uid: "is_active", sortable: true },
  { name: "DIBUAT OLEH", uid: "created_user", sortable: true },
  { name: "DIBUAT PADA", uid: "created_date", sortable: true },
  { name: "DIUBAH OLEH", uid: "updated_user", sortable: true },
  { name: "DIUBAH PADA", uid: "updated_date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Makanan",
    is_active: false,

    created_date: "",
    updated_name: "",
    updated_date: "",
  },
  {
    id: 2,
    name: "Minuman",
    is_active: false,

    created_date: "",
    updated_name: "",
    updated_date: "",
  },
];

export { columns_product_category, users, columns_product };
