import { InputHTMLAttributes } from "react";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 bg-background px-3 py-2 text-sm text-foreground placeholder-gray-400 focus:border-primary focus:outline-none ${props.className ?? ""}`}
    />
  );
}
