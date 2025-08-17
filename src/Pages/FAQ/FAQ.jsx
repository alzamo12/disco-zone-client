import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is Disco Zone?",
        answer:
            "Disco Zone is a modern, community-driven forum platform where users can share knowledge, spark discussions, and connect with like-minded people.",
    },
    {
        question: "Is Disco Zone free to use?",
        answer:
            "Yes! Disco Zone is completely free to join and participate in. Our mission is to build an open and collaborative space for everyone.",
    },
    {
        question: "Can I create my own community?",
        answer:
            "Absolutely. Disco Zone allows users to create their own discussion spaces, manage topics, and engage with members easily.",
    },
    {
        question: "Is it mobile-friendly?",
        answer:
            "Yes, Disco Zone is fully responsive and works seamlessly across all devices — desktop, tablet, and mobile.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-primary text-white py-16 px-6 md:px-12 lg:px-20 rounded-xl">
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-accent mb-10">
                    Frequently Asked Questions
                </h2>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-neutral-900 rounded-2xl shadow-md border border-neutral-700"
                        >
                            {/* Question */}
                            <button
                                className="w-full flex justify-between items-center text-left px-6 py-4 focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-lg md:text-xl font-medium">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-6 h-6 text-sky-500" />
                                </motion.div>
                            </button>

                            {/* Answer with animation */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <p className="px-6 pb-4 text-neutral-300">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ
