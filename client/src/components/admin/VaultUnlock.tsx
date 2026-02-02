import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield } from 'lucide-react';

interface VaultUnlockProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: () => void;
}

const CORRECT_PIN = '1234'; // Change this to your preferred PIN

export function VaultUnlock({ isOpen, onClose, onUnlock }: VaultUnlockProps) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handlePinInput = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);

            // Play sound
            new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEAKFF606+uoVRQKRp/g8r5sIQUrgc7y2Yk2CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBAC').play().catch(() => { });

            if (newPin.length === 4) {
                if (newPin === CORRECT_PIN) {
                    setTimeout(() => {
                        onUnlock();
                    }, 500);
                } else {
                    setError(true);
                    setTimeout(() => {
                        setPin('');
                        setError(false);
                    }, 1000);
                }
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
                    />
                    <motion.div
                        initial={{ y: -100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -100, opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md p-8"
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-primary/30 rounded-2xl p-8 shadow-2xl">
                            <div className="text-center mb-8">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-block mb-4"
                                >
                                    <Shield className="w-16 h-16 text-primary mx-auto" />
                                </motion.div>
                                <h2 className="font-serif text-3xl text-white mb-2">Vault Access</h2>
                                <p className="text-gray-400 text-sm">Enter 4-digit PIN</p>
                            </div>

                            {/* PIN Display */}
                            <div className="flex justify-center gap-4 mb-8">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${error ? 'border-red-500 bg-red-500/20' : 'border-primary/50 bg-primary/10'
                                            }`}
                                    >
                                        {pin[i] && (
                                            <Lock className="w-6 h-6 text-primary" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Number Pad */}
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => handlePinInput(num.toString())}
                                        className="h-16 bg-gray-800 hover:bg-primary/20 border border-gray-700 hover:border-primary rounded-xl text-white text-xl font-bold transition-all active:scale-95"
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button
                                    onClick={handleDelete}
                                    className="h-16 bg-gray-800 hover:bg-red-500/20 border border-gray-700 hover:border-red-500 rounded-xl text-white text-sm transition-all active:scale-95"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handlePinInput('0')}
                                    className="h-16 bg-gray-800 hover:bg-primary/20 border border-gray-700 hover:border-primary rounded-xl text-white text-xl font-bold transition-all active:scale-95"
                                >
                                    0
                                </button>
                                <button
                                    onClick={onClose}
                                    className="h-16 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-white text-sm transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
