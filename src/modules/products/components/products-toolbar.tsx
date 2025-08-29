import { CardHeader, CardTitle } from '../../../components/card';
import { Badge } from '../../../components/badge';
import { RadioGroup, RadioGroupItem } from '../../../components/radio-group';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../../../components/select';
import { Skeleton } from '../../../components/skeleton';
import { formatNumber } from '../utils';

type Props = {
  status: 'all' | 'active' | 'inactive';
  onStatusChange: (next: 'all' | 'active' | 'inactive') => void;
  limit: number;
  onLimitChange: (n: number) => void;
  totalItems?: number;
  isLoading?: boolean;
  isError?: boolean;
};

export function ProductsToolbar({
  status,
  onStatusChange,
  limit,
  onLimitChange,
  totalItems = 0,
  isLoading,
  isError,
}: Props) {
  return (
    <CardHeader className="px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">Products</CardTitle>
          {isLoading ? (
            <Skeleton className="h-5 w-16 rounded-md" />
          ) : isError ? (
            <Badge variant="outline">—</Badge>
          ) : (
            <Badge variant="outline">{formatNumber(totalItems)} total</Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <RadioGroup
              className="flex flex-row gap-3"
              value={status}
              onValueChange={(v) => onStatusChange(v as any)}
            >
              <label className="flex items-center gap-1.5">
                <RadioGroupItem value="all" id="st-all" />
                <span className="text-sm">All</span>
              </label>
              <label className="flex items-center gap-1.5">
                <RadioGroupItem value="active" id="st-active" />
                <span className="text-sm">Active</span>
              </label>
              <label className="flex items-center gap-1.5">
                <RadioGroupItem value="inactive" id="st-inactive" />
                <span className="text-sm">Inactive</span>
              </label>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={String(limit)}
              onValueChange={(v) => onLimitChange(Number(v))}
            >
              <SelectTrigger className="min-w-[5.5rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
