import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link href={href} className="inline-flex items-center text-slate-400 transition-colors hover:text-white">
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
}
