export function safeNext(next: string | null | undefined) {
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/dashboard";
}
