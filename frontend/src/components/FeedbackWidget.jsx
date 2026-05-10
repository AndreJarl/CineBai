import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userAuthStore } from '../store/authUser';
import { Star, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const FeedbackWidget = () => {
  // START BOTH AS FALSE: This prevents the modal from showing until the check is done
  const [isOpen, setIsOpen] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [feedback, setFeedback] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = userAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEligibility = async () => {
      // If guest: allow them to see the modal
      if (!user) {
        setCanShow(true);
        setIsOpen(true);
        setIsLoading(false);
        return;
      }

      try {
        // If logged in: check the 1-week cooldown in the backend
        const res = await axios.get(`/api/v1/feedback/check-eligibility?t=${Date.now()}`);
        
        // Use a strict boolean check
        if (res.data.canSubmit === true) {
          setCanShow(true);
          setIsOpen(true);
        } else {
          setCanShow(false);
          setIsOpen(false);
        }
      } catch (err) {
        console.error("Eligibility check failed", err);
        // Default to hidden on error for security, or set to true to be lenient
        setCanShow(false); 
      } finally {
        setIsLoading(false);
      }
    };

    verifyEligibility();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Redirect guests to login[cite: 1]
    if (!user) {
      toast.error('Please log in to submit feedback.', {
        style: { background: '#18181b', color: '#f4f4f5', border: '1px solid #7f1d1d' },
      });
      navigate('/login');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a star rating.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/v1/feedback', {
        rating,
        summary: feedback, 
        details: description,
      });

      if (response.data.success) {
        toast.success('Thanks for your feedback!', {
          style: { background: '#18181b', color: '#f4f4f5', border: '1px solid #14532d' },
        });
        
        // RESET AND HIDE: Force the modal to close and stay closed[cite: 1]
        setCanShow(false);
        setIsOpen(false);
        setFeedback(''); 
        setDescription(''); 
        setRating(0); 
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to send feedback.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // FINAL GUARD: Absolutely no rendering if loading, ineligible, or closed
  if (isLoading || !canShow || !isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[600]">
      {/* YOUR UNCHANGED MODAL UI STARTS HERE */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.5 }}
        className="w-[480px] bg-zinc-950/80 backdrop-blur-md border border-red-900/30 shadow-2xl overflow-hidden rounded-2xl"
      >
        <div className="p-7">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="text-red-500 font-semibold text-base tracking-widest uppercase">
                Cine<span className="text-yellow-400">Bai</span>
              </span>
              <span className="text-zinc-600 text-sm ml-1">/ Feedback</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-600 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <p className="text-zinc-500 text-sm mb-5 leading-relaxed">
            Help us improve your streaming experience. Every rating counts.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider mb-2 block">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => !isSubmitting && setHoveredStar(star)}
                    onMouseLeave={() => !isSubmitting && setHoveredStar(0)}
                    onClick={() => !isSubmitting && setRating(star)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      size={28}
                      fill={star <= (hoveredStar || rating) ? '#dc2626' : 'transparent'}
                      stroke={star <= (hoveredStar || rating) ? '#dc2626' : '#52525b'}
                      strokeWidth={1.5}
                      className="transition-colors duration-100"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider mb-1 block">Summary</label>
              <input
                type="text"
                disabled={isSubmitting}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="e.g. Love the recommendations"
                className="w-full bg-zinc-900/60 border border-red-900/20 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-zinc-600"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider mb-1 block">Details</label>
              <textarea
                disabled={isSubmitting}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="w-full bg-zinc-900/60 border border-red-900/20 rounded-lg p-4 text-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-zinc-600 resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-all active:scale-95 text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={18} /> Sending...</>
              ) : (
                user ? 'Send Feedback' : 'Login to Feedback'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackWidget;