import DynamicBackground from '@/components/ui/DynamicBackground';
import { SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <DynamicBackground>
      <div className="relative flex h-screen w-screen flex-col items-center justify-between overflow-hidden p-10">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-[12rem] font-bold tracking-tighter text-background drop-shadow-2xl md:text-[16rem]"
          >
            ADVYON
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-3xl font-light tracking-widest text-muted-foreground"
          >
            Bridge the Gap Between Lawyers, Clients, and the Legal Community with Next-Gen Collaboration Tools.
          </motion.p>
        </div>

        {/* Auth Buttons - Positioned at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="z-50 mb-10"
        >
          <SignedIn>
            <SignOutButton>
              <Button
                variant="secondary"
                size="lg"
                className="text-lg font-semibold shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <Link to="/auth/signin">
              <Button
                size="lg"
                className="group bg-accent px-20 py-12 text-2xl font-bold text-accent-foreground shadow-lg transition-all hover:scale-105 hover:bg-accent/90 active:scale-95"
              >
                GET STARTED
                <ArrowRight className="ml-3 h-8 w-8 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </SignedOut>
        </motion.div>
      </div>
    </DynamicBackground>
  );
}
