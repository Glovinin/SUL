"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { 
  EnvelopeSimple,
  Lock,
  Eye,
  EyeSlash,
  ArrowRight,
  User
} from '@phosphor-icons/react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Login logic here
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <GridPattern
        width={40}
        height={40}
        className="fill-black/[0.02] stroke-black/[0.02]"
      />

      {/* Back to Home Link */}
      <Link 
        href="/"
        className="fixed top-8 left-8 text-[22px] md:text-[24px] font-semibold tracking-tight text-black hover:text-black/70 transition-colors z-50"
      >
        SUL
      </Link>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-[440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 flex items-center justify-center"
            >
              <User className="w-8 h-8 text-black/70" weight="duotone" />
            </motion.div>
            
            <h1 className="text-[36px] md:text-[42px] font-semibold text-black mb-3 tracking-[-0.03em] leading-[1.1]">
              Welcome Back
            </h1>
            <p className="text-[16px] text-black/60 leading-[1.6]">
              Sign in to access your account
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Email Field */}
            <div>
              <label className="block text-[14px] font-medium text-black/70 mb-2">
                Email
              </label>
              <div className="relative">
                <EnvelopeSimple 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                  weight="duotone" 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[14px] font-medium text-black/70 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                  weight="duotone" 
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-12 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlash className="w-5 h-5" weight="duotone" />
                  ) : (
                    <Eye className="w-5 h-5" weight="duotone" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-black/20 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-black/60 group-hover:text-black transition-colors">
                  Remember me
                </span>
              </label>
              <a 
                href="#" 
                className="text-[14px] text-black/60 hover:text-black transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit"
                className="w-full bg-black text-white hover:bg-black/90 border-0 px-6 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-[13px]">
              <span className="bg-white px-4 text-black/40">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <motion.div 
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-black/10 hover:border-black/20 hover:bg-black/[0.02] rounded-full text-[14px] font-medium text-black/70 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-black/10 hover:border-black/20 hover:bg-black/[0.02] rounded-full text-[14px] font-medium text-black/70 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Facebook
            </motion.button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.p 
            className="text-center mt-8 text-[14px] text-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Don't have an account?{' '}
            <a href="#" className="text-black font-medium hover:text-black/70 transition-colors">
              Sign up
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

