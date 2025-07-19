import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const ReportedComment = ({ rep, deleteMutation, dismissMutation }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(prev => !prev);

    const isLong = rep.text.length > 20;
    const displayText = isLong ? rep.text.slice(0, 20) + "..." : rep.text;
    return (
        <motion.tr
            key={rep._id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="hover:bg-gray-700"
        >
            <td className="px-4 py-3">{rep.authorEmail}</td>
            <td className="px-1 py-3">
                {displayText}
                {isLong && (
                    <button
                        onClick={toggleModal}
                        className="ml-2 text-blue-500 underline hover:text-blue-700"
                    >
                        Read More
                    </button>
                )}

                <AnimatePresence>
                    {showModal && (
                        // Overlay fade
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 p-4"
                        >
                            {/* Modal pop */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="bg-gray-900 text-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md p-6 shadow-2xl"
                            >
                                <p className="text-sm sm:text-base md:text-lg">
                                    {rep.text}
                                </p>

                                <button
                                    onClick={toggleModal}
                                    className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm md:text-base transition-transform transform hover:scale-105 active:scale-95"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </td>
            <td className="px-4 py-3 max-w-xs truncate">{rep.feedback}</td>
            <td className="px-4 py-3 text-center whitespace-nowrap">
                {new Date(rep.reportedAt).toLocaleString()}
            </td>
            <td className="px-4 py-3 text-center flex gap-2 space-x-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteMutation.mutate(rep._id)}
                    disabled={deleteMutation.isLoading}
                    className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-md text-sm font-medium disabled:opacity-50"
                >
                    Delete
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dismissMutation.mutate(rep._id)}
                    disabled={dismissMutation.isLoading}
                    className="px-3 py-1 bg-gradient-to-r from-green-600 to-teal-500 rounded-md text-sm font-medium disabled:opacity-50"
                >
                    Dismiss
                </motion.button>
            </td>
        </motion.tr>
    );
};

export default ReportedComment;