export function Cover({
  url,
  className = "",
}: {
  url: string | null | undefined;
  className?: string;
}) {
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt="" className={`object-cover ${className}`} />;
  }
  return <div className={`bg-navy ${className}`} />;
}
