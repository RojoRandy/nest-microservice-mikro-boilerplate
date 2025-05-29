import { MetaDataResponse } from '../dto/response.dto';

export class PaginationOptions {
  page: number;
  limit: number;
}

export function findByPaginatedOptions(props: PaginationOptions) {
  if (props?.page && props?.limit) {
    return {
      offset: calculateOffset(props.page, props.limit),
      limit: props.limit,
    };
  }

  return undefined;
}

export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function transformPaginationResult(
  total: number,
  findOptions: PaginationOptions,
): MetaDataResponse {
  const { page, limit } = findOptions;

  return {
    page: page || 1,
    limit,
    total,
    totalPages: limit ? Math.ceil(total / Math.max(limit, 1)) : undefined,
  };
}

export class PaginationResponse<T> {
  data: T[];
  total: number;
  paginationOptions: PaginationOptions;
}
