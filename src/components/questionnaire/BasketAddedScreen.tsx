import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, FlaskConicalIcon, ShoppingBasketIcon } from 'lucide-react';
type BasketAddedScreenProps = {
  /** Called once the animation has played through. */
  onComplete: () => void;
  /** Total time before onComplete fires (ms). Default 1900. */
  durationMs?: number;
};
export function BasketAddedScreen({
  onComplete,
  durationMs = 1900
}: BasketAddedScreenProps) {
  useEffect(() => {
    const t = setTimeout(onComplete, durationMs);
    return () => clearTimeout(t);
  }, [onComplete, durationMs]);
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      {/* Animation stage */}
      <div className="relative w-32 h-40 flex items-end justify-center">
        {/* Kit icon — drops into the basket */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          initial={{
            y: -10,
            scale: 0,
            opacity: 0
          }}
          animate={{
            y: [0, 0, 70, 70],
            scale: [0, 1, 1, 0.55],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.2,
            times: [0, 0.25, 0.7, 1],
            ease: ['easeOut', 'linear', 'easeIn', 'linear']
          }}>
          
          <div className="flex items-center justify-center w-16 h-16 rounded-md bg-blue-100 border-2 border-black">
            <FlaskConicalIcon className="w-8 h-8 text-beast-blue-dark" />
          </div>
        </motion.div>

        {/* Basket */}
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0
          }}
          animate={{
            scale: [0.9, 0.9, 0.9, 1.08, 1],
            opacity: [0, 1, 1, 1, 1]
          }}
          transition={{
            duration: 1.3,
            times: [0, 0.15, 0.62, 0.78, 1],
            ease: 'easeOut'
          }}
          className="relative flex items-center justify-center w-24 h-20">
          
          <ShoppingBasketIcon
            className="w-full h-full text-black"
            strokeWidth={1.5} />
          

          {/* Check mark that pops out of the basket after the kit lands */}
          <motion.div
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: [0, 0, 1.2, 1],
              opacity: [0, 0, 1, 1]
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.7, 0.85, 1],
              ease: 'easeOut'
            }}
            className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-beast-blue-dark text-white shadow-md">
            
            <CheckIcon className="w-4 h-4" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        initial={{
          opacity: 0,
          y: 8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.9,
          duration: 0.4,
          ease: 'easeOut'
        }}
        className="flex flex-col items-center gap-2 text-center">
        
        <h2 className="font-sans text-2xl leading-[35.6px] text-black font-normal">
          Added to your basket
        </h2>
        <p className="text-sm text-grey-500">
          Setting up your delivery details…
        </p>
      </motion.div>
    </div>);

}