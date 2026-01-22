import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCreatePaymentSessionMutation } from "@/lib/redux/query";

// Initialize Stripe ONCE, outside component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm({ invoiceId }) {
  const [createPaymentSession, { isLoading, error }] = useCreatePaymentSessionMutation();
  
  // Stripe calls this to get the client secret
  const fetchClientSecret = useCallback(async () => {
    try {
      if (!invoiceId) {
        throw new Error("Invoice ID is required");
      }
      
      const result = await createPaymentSession({ invoiceId }).unwrap();
      
      if (!result?.clientSecret) {
        throw new Error("No client secret received from server");
      }
      
      return result.clientSecret;
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "Failed to create checkout session";
      console.error("Stripe checkout error:", error);
      throw new Error(errorMessage);
    }
  }, [invoiceId, createPaymentSession]);

  if (isLoading) {
    return (
      <div className="mt-4 sm:mt-6 p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-sm text-gray-600">Loading checkout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 sm:mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium mb-2">Error loading checkout</p>
        <p className="text-sm text-red-500">{error?.data?.message || error?.message || "Please try again later"}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-6">
      <div className="rounded-lg overflow-hidden">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

