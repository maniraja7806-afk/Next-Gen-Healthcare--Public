import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface CheckInQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: {
    id: number;
    doctor: string;
    date: string;
    time: string;
  } | null;
}

export const CheckInQRModal = ({ isOpen, onClose, appointmentData }: CheckInQRModalProps) => {
  if (!isOpen || !appointmentData) return null;

  // Information to encode in the QR code
  const qrData = JSON.stringify({
    appointmentId: appointmentData.id,
    type: 'check-in'
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative"
        >
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <QrCode size={20} className="mr-2 text-[#0284c7]" />
                Check-in Pass
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Show this QR code at the reception desk to check in automatically.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8 flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
              <QRCodeSVG 
                value={qrData} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {appointmentData.doctor}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {appointmentData.date} at {appointmentData.time}
              </p>
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
             <button
                onClick={onClose}
                className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
