import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const EmailSubscription = () => {
    // const [email, setEmail] = useState("");
    const { user } = useAuth();
    const email = user?.email
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (email) => {
            const res = await axiosSecure.post("/subscribe", { email });
            return res.data
        },
        onSuccess: data => {
            toast.success("You have Successfully subscribe us")
        }
    })

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus(null);

        mutateAsync(email)
    };

    return (
        <section id="subscribe" className="bg-primary rounded-xl text-white py-16 px-6 md:px-12 lg:px-20">
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
                        readOnly
                        className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition"
                    >
                        {isPending ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                {/* Status Messages */}
               
            </div>
        </section>
    );
};

export default EmailSubscription;
