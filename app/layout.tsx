import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Link from 'next/link'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sweven Games - Cloud Gaming Platform',
  description: 'Experience the future of gaming with Sweven Games cloud platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#8b5cf6',
          colorText: 'white',
          colorTextSecondary: '#9ca3af',
          colorBackground: '#111827',
          colorInputBackground: '#1f2937',
          colorInputText: 'white'
        },
        elements: {
          rootBox: 'text-white',
          card: 'bg-gray-900 text-white shadow-2xl',
          headerTitle: 'text-white',
          headerSubtitle: 'text-gray-400',
          socialButtonsBlockButton: 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700',
          formFieldLabel: 'text-gray-300',
          formFieldInput: 'bg-gray-800 text-white border-gray-700',
          formButtonPrimary: 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:opacity-90',
          footerActionLink: 'text-cyan-400 hover:text-cyan-300',
          identityPreviewText: 'text-white',
          formFieldInputShowPasswordButton: 'text-gray-400',
          otpCodeFieldInput: 'bg-gray-800 text-white border-gray-700',
          formResendCodeLink: 'text-cyan-400',
          alternativeMethodsBlockButton: 'text-gray-300 border-gray-700'
        }
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-black border-t border-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Sweven Games</h3>
                  <p className="text-gray-400 text-sm">Cloud gaming platform powered by cutting-edge technology</p>
                  <p className="text-gray-500 text-xs mt-4">Operated by Lemonade Digital Media Technology Private Limited</p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
                  <div className="space-y-2">
                    <Link href="/terms" className="block text-gray-400 hover:text-gaming-cyan text-sm transition-colors">Terms & Conditions</Link>
                    <Link href="/privacy" className="block text-gray-400 hover:text-gaming-cyan text-sm transition-colors">Privacy Policy</Link>
                    <Link href="/refund" className="block text-gray-400 hover:text-gaming-cyan text-sm transition-colors">Refund Policy</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>Email: support@swevenventures.com</p>
                    <p>CIN: U72900DL2021PTC388171</p>
                    <p>GST: 07AAECL7835P1ZT</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; 2025 Lemonade Digital Media Technology Private Limited. All rights reserved.</p>
                <p className="mt-2"><span className="font-bold text-white">for Kinguin</span></p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}