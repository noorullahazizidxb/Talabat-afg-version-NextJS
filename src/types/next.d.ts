// Type definitions for Next.js navigation module
declare module 'next/navigation' {
  export interface NavigateOptions {
    scroll?: boolean;
  }

  export function useRouter(): {
    push: (href: string, options?: NavigateOptions) => void;
    replace: (href: string, options?: NavigateOptions) => void;
    refresh: () => void;
    back: () => void;
    forward: () => void;
    prefetch: (href: string) => void;
    pathname: string;
  };

  export function usePathname(): string;

  export function useSearchParams(): {
    get: (key: string) => string | null;
    getAll: (key: string) => string[];
    has: (key: string) => boolean;
    forEach: (callback: (value: string, key: string) => void) => void;
    entries: () => IterableIterator<[string, string]>;
    keys: () => IterableIterator<string>;
    values: () => IterableIterator<string>;
    toString: () => string;
  };

  export function useParams<T = Record<string, string | string[]>>(): T;

  export function redirect(href: string): never;
  export function notFound(): never;
}
