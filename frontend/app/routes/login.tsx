import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/login";
import { userPrefs } from "~/cookies.server";

// action funtion to handle form submission and call the login mutation
export async function action({ request }: Route.ActionArgs) {
  let formData = Object.fromEntries(await request.formData());
  try {
    const response = await fetch(process.env.API_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("try: " + response.statusText);
    }

    const data = await response.json();
    const userId = data.userId;

    // Set the cookie and redirect
    return redirect("/", {
      headers: {
        "Set-Cookie": await userPrefs.serialize({ userId: userId }),
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    // Handle the error appropriately, maybe return an error message to the user
    return { error: "Login failed. Please try again." };
  }
}

export default function Login() {
  return (
    <div className="flex justify-center flex-col items-center w-full h-screen p-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary-green)] mt-5">
          Log in
        </h1>
      </div>
      <Form
        method="post"
        action="/login"
        className="w-full h-full max-w-sm flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <div>
            <Label
              className="text-[var(--primary-green)] text-md font-bold"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              className="mt-2 py-5"
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
            />
          </div>
          <div>
            <Label
              className="text-[var(--primary-green)] text-md font-bold"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              className="mt-2 py-5"
              id="password"
              type="password"
              placeholder="* * * * *"
              name="password"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Checkbox id="remember"></Checkbox>
              <Label className="text-[var(--primary-green)]" htmlFor="remember">
                Remember me
              </Label>
            </div>
            <span className="text-[var(--primary-green)] text-sm underline">
              New user? Sign up
            </span>
          </div>
        </div>
        <Button type="submit" className=" py-6" variant="default">
          Login
        </Button>
      </Form>
    </div>
  );
}
