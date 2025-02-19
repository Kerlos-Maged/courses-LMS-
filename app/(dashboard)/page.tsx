import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton
        afterSignOutUrl="/"
      />
      <p>this is a protected page</p>
    </div>
  );
}
