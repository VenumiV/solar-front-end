import { useCallback, useMemo, useRef, useEffect } from "react";
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
  const containerRef = useRef(null);
  
  // Cleanup any existing Stripe checkout instances on unmount
  useEffect(() => {
    return () => {
      // Cleanup function - Stripe will handle cleanup when component unmounts
      // but we ensure the container is cleared
      if (containerRef.current) {
        const checkoutElements = containerRef.current.querySelectorAll('[data-stripe-embedded-checkout]');
        if (checkoutElements.length > 1) {
          // Remove extra instances if somehow multiple exist
          checkoutElements.forEach((el, index) => {
            if (index > 0) {
              el.remove();
            }
          });
        }
      }
    };
  }, [invoiceId]);
  
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

  // Memoize options to prevent unnecessary re-renders
  const checkoutOptions = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

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

  if (!invoiceId) {
    return null;
  }

  return (
    <div className="mt-4 sm:mt-6">
      <div className="rounded-lg overflow-hidden" ref={containerRef}>
        {/* 
          Key prop ensures fresh instance when invoiceId changes.
          This prevents multiple checkout instances from existing simultaneously.
          The key forces React to unmount and remount when invoiceId changes.
        */}
        <EmbeddedCheckoutProvider
          key={`checkout-${invoiceId}`}
          stripe={stripePromise}
          options={checkoutOptions}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

