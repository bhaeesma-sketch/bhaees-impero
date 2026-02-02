import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface VaultUnlockProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: () => void;
}

const CORRECT_PIN = '1234';

export function VaultUnlock({ isOpen, onClose, onUnlock }: VaultUnlockProps) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    const playSound = (frequency: number, duration: number) => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.log('Audio not supported');
        }
    };

    const handlePinInput = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            playSound(800 + (newPin.length * 100), 0.1);

            if (newPin.length === 4) {
                if (newPin === CORRECT_PIN) {
                    setSuccess(true);
                    playSound(1200, 0.3);
                    setTimeout(() => {
                        setShowWelcome(true);
                        setTimeout(() => {
                            onUnlock();
                        }, 2500);
                    }, 500);
                } else {
                    setError(true);
                    playSound(200, 0.3);
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
        playSound(400, 0.05);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!success ? onClose : undefined}
                        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100]"
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                                initial={{
                                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                                    y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                                    scale: 0
                                }}
                                animate={{
                                    y: typeof window !== 'undefined' ? [null, Math.random() * window.innerHeight] : 0,
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </motion.div>

                    <AnimatePresence>
                        {showWelcome && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[102] flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.2, 1] }}
                                        transition={{ duration: 0.6 }}
                                        className="mb-8"
                                    >
                                        <CheckCircle className="w-32 h-32 text-primary mx-auto" strokeWidth={1.5} />
                                    </motion.div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="font-serif text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-200 to-primary mb-4"
                                        style={{
                                            textShadow: '0 0 40px rgba(197, 160, 89, 0.5)',
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        Welcome
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-4xl text-primary font-bold tracking-widest"
                                    >
                                        FAIZAL
                                    </motion.p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!showWelcome && (
                        <motion.div
                            initial={{ y: -100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -100, opacity: 0, scale: 0.9 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
                        >
                            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-primary/30 rounded-3xl p-10 shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 rounded-3xl">
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-yellow-200 to-primary opacity-20 blur-xl animate-pulse" />
                                </div>

                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                                    animate={{ y: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                />

                                <div className="relative z-10">
                                    <div className="text-center mb-10">
                                        <motion.div
                                            animate={success ? {
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 360]
                                            } : error ? {
                                                x: [-10, 10, -10, 10, 0]
                                            } : {}}
                                            transition={{ duration: 0.5 }}
                                            className="inline-block mb-6"
                                        >
                                            {success ? (
                                                <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                                            ) : (
                                                <Shield className="w-20 h-20 text-primary mx-auto drop-shadow-[0_0_20px_rgba(197,160,89,0.5)]" />
                                            )}
                                        </motion.div>
                                        <h2 className="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white mb-3">
                                            Vault Access
                                        </h2>
                                        <p className="text-gray-400 text-sm tracking-wider">BIOMETRIC AUTHENTICATION</p>
                                    </div>

                                    <div className="flex justify-center gap-5 mb-10">
                                        {[0, 1, 2, 3].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={error ? {
                                                    x: [-10, 10, -10, 10, 0],
                                                    borderColor: ['#ef4444', '#ef4444', '#ef4444']
                                                } : success ? {
                                                    borderColor: ['#22c55e', '#22c55e'],
                                                    scale: [1, 1.1, 1]
                                                } : {}}
                                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                                className={`relative w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all ${error ? 'border-red-500 bg-red-500/20' :
                                                        success ? 'border-green-500 bg-green-500/20' :
                                                            pin[i] ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(197,160,89,0.3)]' :
                                                                'border-gray-700 bg-gray-800/50'
                                                    }`}
                                            >
                                                {pin[i] && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="relative"
                                                    >
                                                        <Lock className={`w-7 h-7 ${success ? 'text-green-500' : 'text-primary'}`} />
                                                        <motion.div
                                                            className="absolute inset-0 bg-primary rounded-full blur-md"
                                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                                            transition={{ duration: 1, repeat: Infinity }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="h-6 mb-6 text-center">
                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-red-500 text-sm font-semibold flex items-center justify-center gap-2"
                                            >
                                                <AlertCircle className="w-4 h-4" />
                                                ACCESS DENIED
                                            </motion.p>
                                        )}
                                        {success && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-green-500 text-sm font-semibold flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                ACCESS GRANTED
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                            <motion.button
                                                key={num}
                                                onClick={() => handlePinInput(num.toString())}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="relative h-16 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-primary/20 hover:to-primary/10 border border-gray-700 hover:border-primary/50 rounded-xl text-white text-xl font-bold transition-all overflow-hidden group"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                                <span className="relative z-10">{num}</span>
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <motion.button
                                            onClick={handleDelete}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="h-16 bg-gradient-to-br from-red-900/30 to-red-950/30 hover:from-red-800/40 hover:to-red-900/40 border border-red-900/50 hover:border-red-700 rounded-xl text-white text-sm font-semibold transition-all"
                                        >
                                            DELETE
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handlePinInput('0')}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative h-16 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-primary/20 hover:to-primary/10 border border-gray-700 hover:border-primary/50 rounded-xl text-white text-xl font-bold transition-all overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                            <span className="relative z-10">0</span>
                                        </motion.button>
                                        <motion.button
                                            onClick={onClose}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="h-16 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl text-white text-sm font-semibold transition-all"
                                        >
                                            CANCEL
                                        </motion.button>
                                    </div>

                                    <div className="mt-6 text-center">
                                        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                                            <Lock className="w-3 h-3" />
                                            256-BIT ENCRYPTED • IMPERO SECURITY
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}
