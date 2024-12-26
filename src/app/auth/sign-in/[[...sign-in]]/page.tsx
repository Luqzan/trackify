import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}
