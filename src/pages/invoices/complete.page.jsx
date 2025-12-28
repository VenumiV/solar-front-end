import { useSearchParams, Link } from "react-router";
import { useGetSessionStatusQuery } from "@/lib/redux/query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, Receipt, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PaymentCompletePage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId,
  });

  if (isLoading) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="py-16 text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium text-gray-700">Verifying payment...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we confirm your payment</p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-red-200 bg-red-50 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">Payment Verification Failed</CardTitle>
              <CardDescription className="text-base">
                We couldn't verify your payment. Please contact support if you were charged.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <p className="text-sm text-gray-600 text-center">
                  If you were charged, please contact our support team with your session ID:
                </p>
                <p className="text-xs font-mono text-center mt-2 text-gray-500 break-all">
                  {sessionId}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/dashboard/invoices">
                  <Button className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Invoices
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const isSuccess = data?.paymentStatus === "paid";

  return (
    <main className="mt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className={`shadow-xl ${isSuccess ? 'border-green-200 bg-gradient-to-br from-green-50 to-white' : 'border-red-200 bg-red-50'}`}>
          <CardHeader className="text-center pb-4">
            <div className={`mx-auto mb-4 p-4 rounded-full w-fit ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
              {isSuccess ? (
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              ) : (
                <XCircle className="h-12 w-12 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center gap-2">
              {isSuccess ? "Payment Successful!" : "Payment Failed"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {isSuccess
                ? "Your payment has been processed successfully. A receipt has been sent to your email."
                : "Your payment could not be processed. Please try again or contact support."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isSuccess && data.amountTotal && (
              <div className="bg-white p-6 rounded-lg border-2 border-green-200 shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Receipt className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-medium text-gray-600">Amount Paid</p>
                </div>
                <p className="text-4xl font-bold text-green-600 text-center">
                  ${(data.amountTotal / 100).toFixed(2)}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/dashboard/invoices" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Invoices
                </Button>
              </Link>
              {!isSuccess && (
                <Link to="/dashboard/invoices" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Try Again
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PaymentCompletePage;

