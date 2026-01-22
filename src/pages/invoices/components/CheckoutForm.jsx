import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCreatePaymentSessionMutation } from "@/lib/redux/query";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm({ invoiceId }) {
  const [createPaymentSession] = useCreatePaymentSessionMutation();
  const [clientSecret, setClientSecret] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        if (!invoiceId) return;
        setLoading(true);
        setLocalError(null);
        setClientSecret(null);

        const result = await createPaymentSession({ invoiceId }).unwrap();
        if (!result?.clientSecret) throw new Error("No client secret received from server");

        if (!cancelled) setClientSecret(result.clientSecret);
      } catch (e) {
        if (!cancelled) setLocalError(e?.data?.message || e?.message || "Failed to load checkout");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [invoiceId, createPaymentSession]);

  const checkoutOptions = useMemo(() => {
    if (!clientSecret) return null;
    return { clientSecret };
  }, [clientSecret]);

  if (!invoiceId) return null;

  if (loading) {
    return (
      <div className="mt-4 sm:mt-6 p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-sm text-gray-600">Loading checkout...</p>
      </div>
    );
  }

  if (localError) {
    return (
      <div className="mt-4 sm:mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium mb-2">Error loading checkout</p>
        <p className="text-sm text-red-500">{localError}</p>
      </div>
    );
  }

  if (!checkoutOptions) return null;

  return (
    <div className="mt-4 sm:mt-6">
      <EmbeddedCheckoutProvider
        // key helps if invoice changes
        key={`embedded-${invoiceId}`}
        stripe={stripePromise}
        options={checkoutOptions}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
