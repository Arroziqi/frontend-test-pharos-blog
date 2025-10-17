import { Search } from "lucide-react";
import { TextInput } from "./TextInput";

export function SearchInput() {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <TextInput type="text" placeholder="Search..." className="pl-9" />
    </div>
  );
}
