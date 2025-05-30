import { SpinnerIcon } from '@/components/icons';

export function LoginFallback() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <SpinnerIcon
        width={32}
        height={32}
        fill="var(--color-blue)"
        className="animate-spin"
      />
    </section>
  );
}
