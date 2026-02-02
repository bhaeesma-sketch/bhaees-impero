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

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!success ? onClose : undefined}
                        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[99999] flex items-center justify-center"
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', width: '100vw' }}
                    >
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-gradient-to-tr from-primary via-yellow-200 to-primary rounded-full shadow-[0_0_10px_rgba(197,160,89,0.8)]"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: Math.random() * window.innerHeight,
                                    scale: 0,
                                    opacity: 0
                                }}
                                animate={{
                                    y: [null, Math.random() * -100],
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}

                        {/* Background light glow center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                    </motion.div>

                    <AnimatePresence>
                        {showWelcome && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                className="fixed inset-0 z-[100001] flex items-center justify-center pointer-events-none"
                            >
                                <div className="text-center relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: [0, 1.5, 1], rotate: 0 }}
                                        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                                        className="mb-8 relative z-10"
                                    >
                                        <CheckCircle className="w-40 h-40 text-green-400 mx-auto drop-shadow-[0_0_50px_rgba(74,222,128,0.6)]" strokeWidth={1} />
                                    </motion.div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="font-serif text-8xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-yellow-100 via-primary to-yellow-600 mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                                    >
                                        Welcome
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, letterSpacing: '1em' }}
                                        animate={{ opacity: 1, letterSpacing: '0.5em' }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="text-5xl md:text-6xl text-white font-bold uppercase drop-shadow-[0_0_20px_rgba(197,160,89,0.8)]"
                                    >
                                        FAIZAL
                                    </motion.p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!showWelcome && (
                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100000] w-full max-w-md p-4"
                        >
                            <div className="relative bg-black/80 border border-white/10 rounded-[2rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden group">
                                {/* Border Glow Animation */}
                                <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-b from-white/20 via-transparent to-white/10 opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="text-center mb-12">
                                        <motion.div
                                            animate={success ? {
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 360]
                                            } : error ? {
                                                x: [-5, 5, -5, 5, 0]
                                            } : {}}
                                            transition={{ duration: 0.5 }}
                                            className="inline-block mb-6 relative"
                                        >
                                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                            {success ? (
                                                <CheckCircle className="w-24 h-24 text-green-400 mx-auto relative z-10 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]" strokeWidth={1} />
                                            ) : (
                                                <div className="relative">
                                                    <Shield className="w-24 h-24 text-primary mx-auto drop-shadow-[0_0_30px_rgba(197,160,89,0.4)]" strokeWidth={1} />
                                                    <Lock className="w-8 h-8 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={2.5} />
                                                </div>
                                            )}
                                        </motion.div>
                                        <h2 className="font-serif text-4xl text-white mb-2 tracking-wide">
                                            IMPERO <span className="text-primary">VAULT</span>
                                        </h2>
                                        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">Biometric Security Clearance</p>
                                    </div>

                                    <div className="flex justify-center gap-6 mb-12">
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
                                                transition={{ duration: 0.4 }}
                                                className={`relative w-14 h-16 rounded-xl border flex items-center justify-center transition-all duration-300 ${error ? 'border-red-500/50 bg-red-900/10' :
                                                        success ? 'border-green-500/50 bg-green-900/10' :
                                                            pin[i] ? 'border-primary shadow-[0_0_15px_rgba(197,160,89,0.3)] bg-primary/5' :
                                                                'border-white/10 bg-white/5'
                                                    }`}
                                            >
                                                <AnimatePresence>
                                                    {pin[i] && (
                                                        <motion.div
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            exit={{ scale: 0, opacity: 0 }}
                                                        >
                                                            <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                            <motion.button
                                                key={num}
                                                onClick={() => handlePinInput(num.toString())}
                                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                                whileTap={{ scale: 0.95 }}
                                                className="h-16 rounded-xl bg-white/5 border border-white/5 text-2xl font-light text-white transition-colors hover:border-primary/30"
                                            >
                                                {num}
                                            </motion.button>
                                        ))}
                                        <div />
                                        <motion.button
                                            onClick={() => handlePinInput('0')}
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="h-16 rounded-xl bg-white/5 border border-white/5 text-2xl font-light text-white transition-colors hover:border-primary/30"
                                        >
                                            0
                                        </motion.button>
                                        <motion.button
                                            onClick={handleDelete}
                                            whileHover={{ scale: 1.05, color: "#ef4444", backgroundColor: "rgba(239,68,68,0.1)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="h-16 rounded-xl flex items-center justify-center text-gray-400 transition-colors"
                                        >
                                            <span className="text-sm font-medium tracking-wide">DEL</span>
                                        </motion.button>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={onClose}
                                            className="text-gray-500 text-xs hover:text-white transition-colors tracking-widest uppercase hover:underline underline-offset-4"
                                        >
                                            Cancel Access
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>,
        document.body
    );
    );
}
