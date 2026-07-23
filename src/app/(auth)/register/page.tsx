import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Your style"
      highlightedTitle="Starts here"
      description="Create your StyleHub account and discover independent labels, curated collections and fashion made around your identity."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
