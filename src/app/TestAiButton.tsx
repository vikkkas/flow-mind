"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function TestAiButton() {
  const trpc = useTRPC();
  const testAi = useMutation(trpc.testAi.mutationOptions(
    {
      onSuccess: () => {
         toast.success("AI execution triggered successfully!");
      }
    }
  ));

  return (
    <Button 
      disabled={testAi.isPending} 
      onClick={() => testAi.mutate()}
      variant={testAi.isSuccess ? "default" : "secondary"}
    >
      {testAi.isPending ? "Testing..." : testAi.isSuccess ? "Success!" : "Test AI"}
    </Button>
  );
}
