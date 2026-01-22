import { useState } from "react";
import { useGetInvoicesQuery } from "@/lib/redux/query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Link } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Receipt, Calendar, Zap, CreditCard, CheckCircle2, Clock, XCircle, FileText } from "lucide-react";

const InvoicesPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: invoices, isLoading, isError, error } = useGetInvoicesQuery({
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  if (isLoading) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Invoices</h1>
        </div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-8 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 font-medium">Error loading invoices</p>
            <p className="text-sm text-red-500 mt-2">{error?.message}</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Pending",
      },
      PAID: {
        icon: CheckCircle2,
        className: "bg-green-100 text-green-800 border-green-200",
        label: "Paid",
      },
      FAILED: {
        icon: XCircle,
        className: "bg-red-100 text-red-800 border-red-200",
        label: "Failed",
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge className={`${config.className} border flex items-center gap-1.5 px-3 py-1`}>
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </Badge>
    );
  };

  const pendingCount = invoices?.filter((inv) => inv.paymentStatus === "PENDING").length || 0;
  const totalAmount = invoices?.reduce((sum, inv) => {
    // Assuming $0.05 per kWh (this should match your Stripe price)
    return sum + (inv.totalEnergyGenerated * 0.05);
  }, 0) || 0;

  return (
    <main className="mt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Invoices</h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base ml-11">
              View and manage your energy billing invoices
            </p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Invoices</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        {invoices && invoices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Invoices</p>
                    <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices && invoices.length > 0 ? (
          invoices.map((invoice) => (
            <Card 
              key={invoice._id} 
              className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg sm:text-xl">
                        Invoice #{invoice._id.slice(-8).toUpperCase()}
                      </CardTitle>
                      {getStatusBadge(invoice.paymentStatus)}
                    </div>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(invoice.billingPeriodStart), "MMM d, yyyy")} -{" "}
                      {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-600">
                        Energy Generated: <span className="font-semibold text-gray-900">{invoice.totalEnergyGenerated.toFixed(2)} kWh</span>
                      </span>
                    </div>
                    {invoice.solarUnitId && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-4 w-4 rounded bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-gray-600">
                          Solar Unit: <span className="font-semibold text-gray-900">{invoice.solarUnitId.serialNumber || "N/A"}</span>
                        </span>
                      </div>
                    )}
                    {invoice.paidAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">
                          Paid on: <span className="font-semibold text-gray-900">{format(new Date(invoice.paidAt), "MMM d, yyyy 'at' h:mm a")}</span>
                        </span>
                      </div>
                    )}
                  </div>
                  {invoice.paymentStatus === "PENDING" && (
                    <Link to={`/dashboard/invoices/${invoice._id}/pay`} className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto" size="lg">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Now
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-dashed border-2">
            <CardContent className="py-16 sm:py-20 text-center">
              <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Receipt className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Invoices Found</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {statusFilter !== "all" 
                  ? `No invoices with status "${statusFilter}" found. Try selecting a different status filter.` 
                  : "You don't have any invoices yet. Invoices will be generated automatically each month based on your solar energy production."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default InvoicesPage;

