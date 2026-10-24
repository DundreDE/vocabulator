import Emailform from "./email-form";

const errormessages: Record<string, string> = {
  missing_code:
    "The reset code is missing. Please check your email for the correct link.",
  invalid_or_expired:
    "The reset code is invalid or has expired. Please request a new password reset.",
  no_session: "No active session found. Please request a password reset again.",
};

export default async function PasswordResetPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error
    ? errormessages[error] || "An unknown error occurred."
    : null;

  return (
    <>
      <main>
        <div className="mt-4 min-h-screen flex flex-col items-center justify-center gap-4">
          {errorMessage && (
            <p className="text-red-500 text-lg text-center">{errorMessage}</p>
          )}
          <Emailform></Emailform>
        </div>
      </main>
    </>
  );
}
