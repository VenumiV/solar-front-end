import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Initialize Stripe ONCE, outside component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm({ invoiceId }) {
  // Stripe calls this to get the client secret
  const fetchClientSecret = useCallback(async () => {
    const clerk = window.Clerk;
    if (!clerk) {
      throw new Error("Clerk not initialized");
    }

    const token = await clerk.session.getToken();

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ invoiceId }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create checkout session");
    }

    const data = await response.json();
    return data.clientSecret;
  }, [invoiceId]);

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

