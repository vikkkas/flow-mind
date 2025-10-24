import { requireAuth } from "@/lib/auth-utils";

const page = async () => {
  await requireAuth();
  return <p>Workflows Page</p>;
};

export default page;
