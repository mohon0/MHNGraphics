"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";
import DeletePaymentSummary from "./DeletePaymentSummary";
import PaymentForm from "./PaymentForm";
import { PaymentSummaryTable } from "./PaymentSummaryTable";
import StudentInfo from "./StudentInfo";

function PaymentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if the session is loaded and if the user is an admin
    if (status === "loading") return; // Wait for session to load
    if (!session || session.user?.role !== "ADMIN") {
      // Redirect to home or any other page
      router.push("/"); // Customize this as needed
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="text-center">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-2 flex w-full flex-col items-center justify-center gap-8 md:grid md:grid-cols-12">
      <div className="col-span-5 space-y-8">
        <StudentInfo id={id} />
        <PaymentForm id={id || ""} />
      </div>
      <div className="col-span-7 space-y-8">
        <PaymentSummaryTable id={id || ""} />
        <DeletePaymentSummary id={id || ""} />
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Skeleton className="h-10 w-full" />
        </div>
      }
    >
      <PaymentPage />
    </Suspense>
  );
}
