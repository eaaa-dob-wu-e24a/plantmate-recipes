import { Home, Bookmark, User } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex justify-around items-center py-3 border-t border-[#E6E2D8] bg-[var(--primary-white)]">
      <Home className="w-6 h-6 text-[var(--primary-green)]" />
      <Bookmark className="w-6 h-6 text-[var(--primary-green)]" />
      <User className="w-6 h-6 text-[var(--primary-green)]" />
    </div>
  );
}
