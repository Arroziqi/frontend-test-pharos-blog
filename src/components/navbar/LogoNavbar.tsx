import { Logo } from "@/components/Logo";
import Link from "next/link";

interface LogoNavbarProps {
  className?: string;
}

export function LogoNavbar({ className }: LogoNavbarProps) {
  return (
    <Link href={"/"} className={`flex items-center ${className}`}>
      <Logo />
    </Link>
  );
}
