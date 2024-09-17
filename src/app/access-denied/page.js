import Link from "next/link";

const AccessDeniedPage = () => {
  return (
    <div class="access-denied">
      Access Denied
      <br />
      <Link href="/dashboard">Home</Link>
    </div>
  );
};

export default AccessDeniedPage;
