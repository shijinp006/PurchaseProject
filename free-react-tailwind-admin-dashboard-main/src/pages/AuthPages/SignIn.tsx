import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Fawri | Sign In"
        description="Sign in to your Fawri account"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
