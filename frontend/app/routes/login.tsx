import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

export default function Login() {
  return (
    <div className="flex justify-center flex-col items-center w-full h-screen">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary-green)] mt-10">
          Log in
        </h1>
      </div>
      <Form className="w-full h-full max-w-sm flex flex-col gap-4 justify-around">
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
        <Button className="py-6" variant="default">
          Login
        </Button>
      </Form>
    </div>
  );
}
