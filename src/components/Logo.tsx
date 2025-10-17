import Image from "next/image";

export interface LogoProps
  extends Omit<React.ComponentPropsWithoutRef<"img">, "src"> {
  className?: string;
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function Logo({
  className,
  width = 48,
  height = 48,
  alt = "Logo",
  ...props
}: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Light mode */}
      <Image
        src="/logo.svg"
        alt={alt}
        width={width}
        height={height}
        className="block dark:hidden"
        {...props}
      />
      {/* Dark mode */}
      <Image
        src="/logo_default.svg"
        alt={alt}
        width={width}
        height={height}
        className="hidden dark:block"
        {...props}
      />
    </div>
  );
}
