import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your Alpha Net BD account</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
