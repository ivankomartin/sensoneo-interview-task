import * as React from 'react';
import { Milk } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { PageHeader } from '../../components/page-header';
import { Card, CardContent } from '../../components/card';
import { useProducts } from './queries';
import { ProductsToolbar } from './components/products-toolbar';
import { ProductsTable } from './components/products-table';
import { PaginationBar } from './components/pagination-bar';

export function ProductsPage() {
  const [sp, setSp] = useSearchParams();

  const spStatus = sp.get('status');
  const initialStatus: 'all' | 'active' | 'inactive' =
    spStatus === 'active' || spStatus === 'inactive' ? spStatus : 'all';

  const initialPage = Math.max(1, Number(sp.get('page')) || 1);
  const initialLimitRaw = Number(sp.get('limit')) || 25;
  const initialLimit = [10, 25, 50, 100].includes(initialLimitRaw)
    ? initialLimitRaw
    : 25;

  const spSort = sp.get('sort') === 'name' ? 'name' : 'registeredAt';
  const spOrder = sp.get('order') === 'asc' ? 'asc' : 'desc';

  const [page, setPage] = React.useState(initialPage);
  const [limit, setLimit] = React.useState(initialLimit);
  const [status, setStatus] = React.useState<'all' | 'active' | 'inactive'>(
    initialStatus
  );
  const [sort, setSort] = React.useState<'registeredAt' | 'name'>(spSort);
  const [order, setOrder] = React.useState<'asc' | 'desc'>(spOrder);

  React.useEffect(() => {
    const next = new URLSearchParams(sp);
    next.set('status', status);
    next.set('page', String(page));
    next.set('limit', String(limit));
    next.set('sort', sort);
    next.set('order', order);
    setSp(next, { replace: true });
  }, [status, page, limit, sort, order]);

  React.useEffect(() => {
    setPage(1);
  }, [status, limit]);

  const activeParam = status === 'all' ? undefined : status === 'active';
  const { data, isLoading, isError } = useProducts({
    page,
    limit,
    active: activeParam,
    sort,
    order,
  });

  const totalPages = data?.pagination.totalPages ?? 1;
  const totalItems = data?.pagination.totalItems ?? 0;
  const rows = data?.data ?? [];

  function toggleSort(field: 'name' | 'registeredAt') {
    if (sort === field) setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    else {
      setSort(field);
      setOrder(field === 'name' ? 'asc' : 'desc');
    }
    setPage(1);
  }

  return (
    <div className="pb-8">
      <PageHeader
        title="Registered products"
        description="View and manage your registered products."
        icon={<Milk size={28} />}
      />

      <Card>
        <ProductsToolbar
          status={status}
          onStatusChange={setStatus}
          limit={limit}
          onLimitChange={setLimit}
          totalItems={totalItems}
          isLoading={isLoading}
          isError={isError}
        />

        <CardContent className="px-0">
          <ProductsTable
            rows={rows}
            isLoading={isLoading}
            isError={isError}
            pageSize={limit}
            sort={sort}
            onToggleSort={toggleSort}
          />

          <PaginationBar
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
