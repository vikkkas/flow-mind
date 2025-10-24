import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  await requireAuth();
  const { executionId } = await params;
  return <p>executionId id : {executionId} </p>;
};

export default page;
