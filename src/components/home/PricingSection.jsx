import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../services/apiClient";

const PricingSection = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [purchasingPlanId, setPurchasingPlanId] = useState(null);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError("");

        // Get all membership plans
        const res = await apiClient.get("api/v1/memberships/");
        setPlans(res.data);

        // Check if user has active subscription
        const token = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");

        if (token && userId) {
          const subsRes = await apiClient.get("api/v1/subscriptions/", {
            headers: { Authorization: `Bearer ${token}` }, // ✅ Bearer token
          });
          const uid = Number(userId);
          const hasActive = subsRes.data.some(
            (s) => s.user === uid && s.is_active,
          );
          setHasActiveSubscription(hasActive);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load membership plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleChoosePlan = async (plan) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/auth/login");
      return;
    }

    if (hasActiveSubscription) {
      setPurchaseMessage(
        "You already have an active plan. You can buy again after it expires.",
      );
      return;
    }

    try {
      setPurchaseMessage("");
      setPurchasingPlanId(plan.id);

      // Initiate payment
      const res = await apiClient.post(
        "api/v1/initiate/payment/",
        { memId: plan.id, amount: plan.price },
        { headers: { Authorization: `Bearer ${token}` } }, // ✅ Bearer token
      );

      const { GatewayPageURL } = res.data;

      // Redirect user to payment gateway
      window.location.href = GatewayPageURL;
    } catch (err) {
      console.error(err);
      setPurchaseMessage("Failed to initiate payment.");
    } finally {
      setPurchasingPlanId(null);
    }
  };

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Flexible membership plans</h2>
        </div>

        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}

        {purchaseMessage && (
          <div className="alert alert-info">{purchaseMessage}</div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card bg-base-200 shadow-sm border border-base-300"
            >
              <div className="card-body">
                <h3 className="card-title justify-between">
                  {plan.name}
                  <span className="badge badge-primary badge-outline capitalize">
                    {plan.duration}
                  </span>
                </h3>
                <p className="text-3xl font-bold mt-2">${plan.price}</p>
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleChoosePlan(plan)}
                    disabled={
                      purchasingPlanId === plan.id || hasActiveSubscription
                    }
                  >
                    {purchasingPlanId === plan.id
                      ? "Processing..."
                      : "Choose plan"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
