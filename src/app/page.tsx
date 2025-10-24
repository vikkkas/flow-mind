// import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./Logout";
import { TestAiButton } from "./TestAiButton";

const page = async () => {
  // await requireAuth();
  const data = await caller.getUsers();
  
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Protected Page - Welcome</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      <TestAiButton />
      <LogoutButton />
    </div>
  );
};

export default page;