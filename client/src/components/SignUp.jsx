import { signUp } from '@/services/authService'
import { SignIn } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const SignUp = () => {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [age , setAge] = useState()
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            await signUp(name, email, age, password)
            setName('')
            setEmail('')
            setAge(0)
            setPassword('')
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "signup failed")
        } finally {
            setLoading(false)
        }

    }

  return (
  <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-blue-100 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
           <HugeiconsIcon icon={SignIn} /> Sign up
          </CardTitle>
          
          <CardDescription>
            Sign up to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="age">
                Age
              </Label>
              <Input
                id="age"
                type="age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? <Loader2Icon/> : "sign up"}
            </Button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp