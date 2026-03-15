"use client";

import { LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflow";

export const EditorLoading = () => {
    return <LoadingView message="Loading workflow..." />
}

export const EditorErrow = () => {
    return <LoadingView message="Error Loading workflow..." />
}

const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  return <div>{JSON.stringify(workflow, null, 2)}</div>;
};

export default Editor;
