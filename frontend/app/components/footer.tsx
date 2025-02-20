import { Home, Bookmark, User } from "lucide-react";
import { useLocation } from "react-router";
import { Link } from "react-router";

export default function Footer() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  // A helper function to see if this link is "active"
  const isActive = (...paths: string[]) => paths.includes(location.pathname);
  const isRecipesPage =
    location.pathname === "/recipes" ||
    location.pathname.startsWith("/recipes/");

  return (
    <div className="flex justify-around items-center py-3 border-t border-[#E6E2D] bg-[var(--primary-white)]">
      <Link to="/">
        <Home
          className={
            isActive("/")
              ? "w-6 h-6 text-[var(--primary-green)]"
              : "w-6 h-6 text-[var(--primary-green-30)]"
          }
        />
      </Link>

      <Link to="/recipes">
        <Bookmark
          className={
            isRecipesPage
              ? "w-6 h-6 text-[var(--primary-green)]"
              : "w-6 h-6 text-[var(--primary-green-30)]"
          }
        />
      </Link>

      <Link to="/profile">
      <User
        className={
          isActive("/profile")
            ? "w-6 h-6 text-[var(--primary-green)]"
            : "w-6 h-6 text-[var(--primary-green-30)]"
        }
      />
      </Link>
    </div>
  );
}
