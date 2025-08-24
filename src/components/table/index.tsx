import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownAZ,
  ArrowLeft,
  ArrowRight,
  ArrowUpAZ,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

type Person = {
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string };
  cell: string;
};

interface PersonTableProps {
  data: Person[];
  pageSize?: number;
}

export function CustomTable({ data, pageSize = 10 }: PersonTableProps) {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "avatar",
        header: "Avatar",
        cell: ({ row }) => (
          <Avatar>
            <AvatarImage src={row.original.picture.thumbnail} alt="Avatar" />
          </Avatar>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "name",
        accessorKey: "name",
        accessorFn: (row) => `${row.name.first} ${row.name.last}`,
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            {column.getIsSorted() === "asc" ? (
              <ArrowUpAZ className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownAZ className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            {row.original.name.first} {row.original.name.last}
          </div>
        ),
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            {column.getIsSorted() === "asc" ? (
              <ArrowUpAZ className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownAZ className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.original.email}</div>
        ),
      },
      {
        id: "phone",
        accessorKey: "phone",
        header: "Teléfono",
        cell: ({ row }) => <div className="lowercase">{row.original.cell}</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const person = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(person.email)}
                >
                  <div className="text-center">Copiar Email</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-row justify-between pb-2 pt-6 items-center gap-2">
        <Input
          placeholder="Buscar email"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm flex-1 flex-grow"
        />
        <div className="flex w-fit">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {columns.map((cell) => (
                  <TableCell key={`skeleton-${cell.id}`}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm pl-4">
          {`página ${pagination.pageIndex} de ${table.getPageCount()}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
