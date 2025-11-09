import { requireAuth } from "@/lib/auth-utils";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import {
  WorkflowList,
  WorkflowsContainer,
} from "@/features/workflows/components/workflows";

export const page = async () => {
  await requireAuth();
  prefetchWorkflows();

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Error loading workflows.</div>}>
          <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default page;
