"use client"
import { SignUp } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-base-100/90 to-base-200/90 backdrop-blur-xl shadow-2xl border border-base-content/5 hover:shadow-primary/10 transition-all duration-300"
      >
        <div className="card-body p-8">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full max-w-md",
                card: "bg-transparent shadow-none",
                headerTitle: "text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
                headerSubtitle: "opacity-70",
                formButtonPrimary: "btn btn-primary hover:bg-primary-focus transition-all duration-300",
                formFieldInput: "input input-bordered w-full bg-base-200/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                socialButtonsBlockButton: "btn btn-outline hover:bg-primary hover:text-primary-content transition-all duration-300",
                footerActionLink: "text-primary hover:text-primary-focus transition-colors duration-300",
                formFieldLabel: "text-base-content/70",
                dividerLine: "bg-base-content/10",
                dividerText: "text-base-content/50"
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}