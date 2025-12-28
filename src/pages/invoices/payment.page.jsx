import { useParams, Link } from "react-router";
import { useGetInvoiceByIdQuery } from "@/lib/redux/query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import CheckoutForm from "./components/CheckoutForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Receipt, Calendar, Zap, Shield, Lock } from "lucide-react";

const PaymentPage = () => {
  const { id } = useParams();

  const {
    data: invoice,
    isLoading,
    isError,
    error,
  } = useGetInvoiceByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link to="/dashboard/invoices">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link to="/dashboard/invoices">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-12 text-center">
            <p className="text-red-600 font-medium mb-2">Error loading invoice</p>
            <p className="text-sm text-red-500">{error?.message}</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!invoice) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link to="/dashboard/invoices">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">Invoice not found.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (invoice.paymentStatus === "PAID") {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link to="/dashboard/invoices">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Invoice Already Paid
            </CardTitle>
            <CardDescription>
              This invoice has already been paid successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Paid on: {invoice.paidAt ? format(new Date(invoice.paidAt), "MMM d, yyyy 'at' h:mm a") : "N/A"}
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const estimatedAmount = (invoice.totalEnergyGenerated * 0.05).toFixed(2);

  return (
    <main className="mt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Link to="/dashboard/invoices">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Invoices
        </Button>
      </Link>

      <div className="space-y-6">
        {/* Invoice Summary Card */}
        <Card className="border-l-4 border-l-primary shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">
                Invoice #{invoice._id.slice(-8).toUpperCase()}
              </CardTitle>
            </div>
            <CardDescription className="flex items-center gap-2 text-sm sm:text-base">
              <Calendar className="h-4 w-4" />
              Billing Period: {format(new Date(invoice.billingPeriodStart), "MMM d, yyyy")} -{" "}
              {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Energy Generated</p>
                  <p className="text-lg font-bold text-gray-900">{invoice.totalEnergyGenerated.toFixed(2)} kWh</p>
                </div>
              </div>
              {invoice.solarUnitId && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <div className="h-5 w-5 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Solar Unit</p>
                    <p className="text-lg font-bold text-gray-900">{invoice.solarUnitId.serialNumber || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Estimated Amount</span>
                <span className="text-2xl font-bold text-primary">${estimatedAmount}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Based on $0.05 per kWh</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Secure Payment</CardTitle>
            </div>
            <CardDescription>
              Complete your payment using our secure Stripe checkout. Your payment information is encrypted and secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <CheckoutForm invoiceId={invoice._id} />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
              <Shield className="h-4 w-4" />
              <span>Secured by Stripe</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PaymentPage;

