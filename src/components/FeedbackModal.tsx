import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, X, MessageSquare, Heart, Send } from "lucide-react";
import toast from "react-hot-toast";

export const FeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("cerulean_user");
    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);
      if (user.role !== "Patient") return;

      const hasGivenFeedback = localStorage.getItem("cerulean_feedback_given");
      if (hasGivenFeedback) return;

      // Randomly decide to show feedback modal (e.g., 50% chance for demo purposes)
      // and delay it so it doesn't overlap with other modals immediately
      if (Math.random() > 0.5) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 10000); // Show after 10 seconds

        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      localStorage.setItem("cerulean_feedback_given", "true");

      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Set item so it doesn't keep nagging them immediately
    localStorage.setItem("cerulean_feedback_given", "skipped");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          {isSubmitted ? (
            <div className="p-10 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4"
              >
                <Heart size={32} className="fill-current" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Thank you!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your feedback helps us improve our care.
              </p>
            </div>
          ) : (
            <>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    <MessageSquare size={20} className="mr-2 text-[#0284c7]" />
                    How was your recent visit?
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    We'd love to hear about your experience with Dr. Karthick Raja.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-2 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={`${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-600"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What did you like? What could we improve?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className="w-full flex items-center justify-center px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-medium rounded-xl shadow-sm transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    ) : (
                      <Send size={18} className="mr-2" />
                    )}
                    Submit Feedback
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
