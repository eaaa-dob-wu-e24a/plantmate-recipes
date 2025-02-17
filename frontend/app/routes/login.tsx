import { Form } from "react-router";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Form className="w-full max-w-sm">
        <Button variant="default">Login</Button>
      </Form>
    </div>
  );
}
