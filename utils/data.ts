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

const columns_product_variant = [
  { name: "ID", uid: "id", sortable: true },
  { name: "ID PRODUK", uid: "product_id", sortable: true },
  { name: "KODE PRODUK", uid: "code", sortable: true },
  { name: "NAMA", uid: "name", sortable: true },
  { name: "STOK", uid: "qty", sortable: true },
  { name: "HARGA", uid: "price", sortable: true },
  { name: "IS ACTIVE", uid: "is_active", sortable: true },
  { name: "DIBUAT OLEH", uid: "created_user", sortable: true },
  { name: "DIBUAT PADA", uid: "created_date", sortable: true },
  { name: "DIUBAH OLEH", uid: "updated_user", sortable: true },
  { name: "DIUBAH PADA", uid: "updated_date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const columns_transaction = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NO TRANSAKSI", uid: "transaction_no", sortable: true },
  { name: "TOTAL", uid: "total_amount", sortable: true },
  { name: "IS ACTIVE", uid: "is_active", sortable: true },
  { name: "DIBUAT OLEH", uid: "created_user", sortable: true },
  { name: "DIBUAT PADA", uid: "created_date", sortable: true },
  { name: "DIUBAH OLEH", uid: "updated_user", sortable: true },
  { name: "DIUBAH PADA", uid: "updated_date", sortable: true },
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

export {
  columns_product_category,
  users,
  columns_product,
  columns_product_variant,
  columns_transaction,
};
