import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome"
      highlightedTitle="Back"
      description="Return to your StyleHub world and continue exploring fashion shaped by independent labels and modern creators."
    >
      <LoginForm />
    </AuthLayout>
  );
}
