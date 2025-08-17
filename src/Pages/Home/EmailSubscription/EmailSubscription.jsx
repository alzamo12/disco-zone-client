import React, { useState } from "react";

const EmailSubscription = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Subscription error:", err);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-primary rounded-xl text-white py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
                    Stay Updated
                </h2>
                <p className="text-neutral-300 text-base md:text-lg">
                    Subscribe to Disco Zone newsletter and never miss the latest discussions, trending posts, and community updates.
                </p>

                {/* Subscription Form */}
                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition"
                    >
                        {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                {/* Status Messages */}
                {status === "success" && (
                    <p className="text-green-400 mt-2">Subscribed successfully!</p>
                )}
                {status === "error" && (
                    <p className="text-red-400 mt-2">
                        Something went wrong. Please try again.
                    </p>
                )}
            </div>
        </section>
    );
};

export default EmailSubscription;
