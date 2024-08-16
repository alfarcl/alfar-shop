/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { SearchIcon } from "../public/icon/SearchIcon";
import { useSelector } from "react-redux";
import { columns_customer } from "../utils/data";
import { formatRupiah } from "../utils/utils";

export default function TableComponent({
  handleAdd = () => {},
  handleUpdate = () => {},
  handleDelete = () => {},
  data,
  readOnly = false,
}: {
  handleAdd?: () => void;
  handleUpdate?: (id: string, data?: {}) => void;
  handleDelete?: (id: string, data?: {}) => void;
  data: any;
  initialColumn: string[];
  readOnly?: boolean;
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const columns = columns_customer;

  const [page, setPage] = React.useState(1);

  const { auth }: any = useSelector((state: any) => state.auth);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;

  const filteredItems = React.useMemo(() => {
    let filteredData = data ? [...data] : [];
    if (hasSearchFilter) {
      filteredData = data.filter((val: any) => {
        val.name.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    return filteredData;
  }, [data, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((data: any, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof any];
    switch (columnKey) {
      case "active":
        return (
          <Chip
            className="capitalize cursor-pointer"
            color={data.active ? "success" : "danger"}
            size="sm"
            variant="flat"
            onClick={() => {
              handleUpdate(data?.id, {
                category_id: data?.id,
                name: data.name,
                is_active: !data.active,
                updated_user: auth.data.name,
              });
            }}
          >
            {data.active ? "AKTIF" : "NON AKTIF"}
          </Chip>
        );
      case "price":
        return (
         formatRupiah(cellValue * data?.qty)
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Button
              isIconOnly
              size="md"
              color="danger"
              variant="shadow"
              className="px-10 text-white"
              onClick={() => handleDelete(data?.id)}
            >
              <p>Batalkan</p>
            </Button>
          </div>
        );
      default:
        return cellValue ?? "-";
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Cari ..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 mt-10">
            {!readOnly && (
              <Button
                color={data?.length === 0 ? "default" : "success"}
                disabled={data?.length === 0}
                className={`${data?.length === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-white'} font-bold`}
                onClick={() => handleAdd()}
              >
                BAYAR
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data.length ?? 0} produk
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    data.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400"></span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Data tidak ditemukan"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
