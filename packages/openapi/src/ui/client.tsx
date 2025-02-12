'use client';
import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Check, Copy } from 'lucide-react';
import { cn, useCopyButton, buttonVariants } from 'fumadocs-ui/components/api';
import dynamic from 'next/dynamic';
import { ApiProvider, useApiContext } from '@/ui/contexts/api';
import { type RootProps } from '@/render/renderer';
import { RenderContext } from '@/types';

export const APIPlayground = dynamic(() =>
  import('./playground').then((mod) => mod.APIPlayground),
);

export function Root({
  children,
  baseUrl,
  className,
  shikiOptions,
  ...props
}: RootProps & {
  shikiOptions: RenderContext['shikiOptions'];
} & HTMLAttributes<HTMLDivElement>): ReactNode {
  return (
    <div
      className={cn(
        'flex flex-col gap-24 text-sm text-fd-muted-foreground',
        className,
      )}
      {...props}
    >
      <ApiProvider shikiOptions={shikiOptions} defaultBaseUrl={baseUrl}>
        {children}
      </ApiProvider>
    </div>
  );
}

export function CopyRouteButton({
  className,
  route,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  route: string;
}): ReactNode {
  const { baseUrl } = useApiContext();

  const [checked, onCopy] = useCopyButton(() => {
    void navigator.clipboard.writeText(`${baseUrl ?? ''}${route}`);
  });

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          color: 'ghost',
          className,
        }),
      )}
      onClick={onCopy}
      aria-label="Copy route path"
      {...props}
    >
      {checked ? (
        <Check className="size-full" />
      ) : (
        <Copy className="size-full" />
      )}
    </button>
  );
}

export { useSchemaContext } from './contexts/schema';
