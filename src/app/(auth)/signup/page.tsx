import { AuthLayout } from "@/features/auth/components/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";

const page = async () => {
  await requireUnAuth();
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default page;
