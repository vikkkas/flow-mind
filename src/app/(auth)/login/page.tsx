import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";

const page = async () => {
  await requireUnAuth();
  return (
    <AuthLayout>
      <LoginForm />;
    </AuthLayout>
  );
};

export default page;
