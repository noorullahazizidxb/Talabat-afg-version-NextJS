const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('talabat-user-storage');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? `Request failed: ${res.status}`);
  return json as T;
}

export const api = {
  get: <T>(path: string, params?: Record<string, string | number | boolean | undefined>) => {
    const url = params
      ? `${path}?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params)
              .filter(([, v]) => v !== undefined)
              .map(([k, v]) => [k, String(v)])
          )
        ).toString()}`
      : path;
    return request<T>(url);
  },
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

// ─── Type-aligned response shapes (matches NestJS backend) ───────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface ApiRestaurant {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  isOpen: boolean;
  minOrderAmount: number;
  deliveryFee: number;
  freeDeliveryThreshold?: number;
  estimatedDeliveryTime: number;
  preparationTime: number;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  address: string;
  acceptsCash: boolean;
  acceptsCard: boolean;
  area: { id: string; name: string; slug: string; city: string };
  cuisines: { id: string; name: string; slug: string; imageUrl?: string }[];
  distanceKm?: number;
}

export interface ApiCuisine {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  imageUrl?: string;
  iconUrl?: string;
  _count?: { restaurantCuisines: number };
}

export interface ApiMenuItem {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  imageUrl?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  calories?: number;
  allergens?: string;
  tags?: string;
  sortOrder: number;
  addons: { id: string; groupName: string; optionName: string; price: number; isRequired: boolean; maxSelect: number }[];
}

export interface ApiMenuCategory {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  items: ApiMenuItem[];
}

export interface ApiArea {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  city: string;
}
