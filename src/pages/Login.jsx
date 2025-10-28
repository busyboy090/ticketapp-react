import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "@/services/authService";
import { toast } from "react-toastify";
import { EyeOff, Eye, Loader2 } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(loading) return

    if (!email || !password) {
      setError(true);
      toast.error("All fields are required");
      return;
    }

    setLoading(true)

    try {
      loginUser(email, password);
      toast.success("Login successful");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.message || "Login failed")
    }finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 max-sm:p-5">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded-lg w-full p-2 pr-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-error"
            />
            {error && !email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                Email is required
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password *</label>
            <div className="relative w-full">
              <input
                type={ showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="border rounded-lg w-full p-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-error"
              />

              <button
                type="button"
                id="togglePassword"
                className="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {
                  showPassword ? <EyeOff 
                    className="h-5 w-5 cursor-pointer" />
                    : <Eye 
                    className="h-5 w-5 cursor-pointer" />
                }
              </button>
            </div>
            {
              error && !password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )
            }
          </div>

          <button
            type="submit"
            className="bg-[#4f46e5] text-white w-full py-2 rounded-lg hover:bg-[#4e46e5e1]"
          >
            {
              loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> :
              <span>Login</span>
            }
          </button>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-[#4f46e5]">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;