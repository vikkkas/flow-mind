"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const trpc = useTRPC();
  const {data  } = useQuery(trpc.getUsers.queryOptions());
  console.log("data", data);
  return <div>
    <Button>Hello</Button>
  </div>;
}

export default page;