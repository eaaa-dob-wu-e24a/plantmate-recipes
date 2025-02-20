import type { Route } from "./+types/profile"; // or your custom types
import { useLoaderData } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { userPrefs } from "~/cookies.server";

export async function loader({ request }: Route.LoaderArgs) {
  // 1) Grab Cookie from the request
  const cookieHeader = request.headers.get("Cookie") || "";
  // 2) Parse using your userPrefs
  const cookie = await userPrefs.parse(cookieHeader);

  // 3) If no userId, user is not logged in
  if (!cookie.userId) {
    throw new Response("Not Logged In", { status: 401 });
  }

  // 4) Now fetch or query your DB for this user
  //    Maybe you have an endpoint or direct DB access
  const res = await fetch(`${process.env.API_URL}/users/${cookie.userId}`);
  if (!res.ok) {
    throw new Response("User not found", { status: 404 });
  }
  const data = await res.json(); // { username, email, imageUrl, ... }
  const user = data.user;
  console.log(user);

  return { user };
}

// React component
export default function ProfilePage() {
  const { user } = useLoaderData() as {
    user: { username: string; email: string; imageUrl?: string };
  };

  return (
    <div className="flex flex-col gap-0 px-2 bg-[var(--primary-white)]">
      <div className="text-center mt-0 font-bold text-xl text-[var(--primary-green)]">
        Profile
      </div>
      <Card className="w-full max-w-sm mt-10 shadow-md border border-gray-200 bg-white">
        <CardHeader className="flex flex-col items-center">
          {/* Profile Image */}
          {user.imageUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          {/* Username / Title */}
          <CardTitle className="mt-4 text-xl font-bold text-green-950">
            Welcome, {user.username}!
          </CardTitle>
          {/* Email */}
          <CardDescription className="text-[var(--primary-green)]">
            {user.email}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 text-sm text-gray-600">
          <p>
            This is your profile page. You are forever logged in. 
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
