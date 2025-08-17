import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Comment = ({ handleFeedbackChange, handleReport, comment, feedbacks, feedbackOptions }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(prev => !prev);

    const isLong = comment.text.length > 20;
    const displayText = isLong ? comment.text.slice(0, 20) + "..." : comment.text;
    return (
        <motion.tr
            key={comment._id}
            className="border-b border-slate-600 hover:bg-slate-700"
        // whileHover={{ scale: 1.01 }}
        >
            <td className="px-4 py-2 align-top break-words max-w-xs">{comment.authorEmail}</td>
            {/* <td className="px-4 py-2 align-top break-words max-w-lg">{comment.text}</td> */}
            <td className="px-4 py-2 align-top break-words max-w-lg">
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
                                    {comment.text}
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

            <td className="px-4 py-2 align-top">
                <select
                    className="bg-slate-700 text-white rounded px-2 py-1 w-full"
                    value={feedbacks[comment._id] || ''}
                    onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                >
                    <option value="">Select feedback</option>
                    {feedbackOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </td>
            <td className="px-4 py-2 align-top">
                <button
                    className={`px-3 py-1 rounded font-medium transition-all ${comment?.reported
                        ? 'bg-slate-500 cursor-not-allowed'
                        : 'bg-accent hover:bg-sky-600'
                        } text-white`}
                    disabled={!feedbacks[comment._id] || comment?.reported}
                    onClick={() => handleReport(comment._id)}
                >
                    {comment?.reported ? 'Reported' : 'Report'}
                </button>
            </td>
        </motion.tr>
    );
};

export default Comment;