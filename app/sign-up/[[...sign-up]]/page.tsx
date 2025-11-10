import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-dark via-gray-900 to-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent">
            Sweven Games
          </h1>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-900 border border-gray-700 shadow-2xl",
              headerTitle: "text-white text-2xl font-bold",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
              formFieldInput: "bg-gray-800 border-gray-700 text-white",
              formButtonPrimary: "bg-gradient-to-r from-gaming-purple to-gaming-cyan hover:opacity-90",
              footerActionLink: "text-gaming-cyan hover:text-gaming-cyan/80"
            }
          }}
        />
      </div>
    </div>
  )
}