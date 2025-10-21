import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./Logout";

const page = async () => {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected Page - Welcome 
      {
        JSON.stringify(data)
      }
      <LogoutButton />
    </div>
  );
};

export default page;