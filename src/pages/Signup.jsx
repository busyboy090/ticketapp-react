import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "@/services/authService";
import { toast } from "react-toastify";
import { EyeOff, Eye } from "lucide-react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState({
    email: {
      status: false,
      message: ""
    },
    password: {
      status: false,
      message: ""
    },
    confirm: {
      status: false,
      message: ""
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newError = {
      email: { status: false, message: "" },
      password: { status: false, message: "" },
      confirm: { status: false, message: "" }
    };

    if(!email) {
      valid = false
      newError.email = { status: true, message: "Email is required" };
    }else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newError.email = { status: true, message: "Please enter a valid email address" };
    }

    if(!password) {
      valid = false;
      newError.password = { status: true, message: "Password is required" };
    } else if (password.length < 6) {
      valid = false;
      newError.password = { status: true, message: "Password must be at least 6 characters long" };
    }


    if(!confirm) {
      valid = false;
      newError.confirm = { status: true, message: "Confirmation Password is required" };
    }
    else if(password !== confirm) {
      valid = false;
      newError.confirm = { status: true, message: "Passwords do not match" };
    }

    return { valid, errors: newError };
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = validateForm();
    if (!valid) {
      setError(errors);
      return;
    }

    try {
      signupUser(email, password);
      toast.success("Signup successful");
      setTimeout(() => navigate("/auth/login"), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 max-sm:p-5">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email">Email *</label>
            <input
              type="text"
              id="email"
              className="border rounded-lg w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-error"
            />
            {
              error.email.status && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {error.email.message}
                </p>
              )
            }
          </div>

          <div>
            <label htmlFor="password">Password *</label>
            <div className="relative w-full">
              <input
                type={ showPassword ? "text" : "password"}
                id="password"
                className="border rounded-lg w-full p-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-error"
              />

              <button
                type="button"
                id="togglePassword"
                class="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {
                  showPassword ? <EyeOff 
                    class="h-5 w-5 cursor-pointer" />
                    : <Eye 
                    class="h-5 w-5 cursor-pointer" />
                }
              </button>
            </div>
            {
              error.password.status && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {error.password.message}
                </p>
              )
            }
          </div>

          <div>
            <label htmlFor="confirm">Confirm Password *</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm"
                className="border rounded-lg w-full p-2 pr-10"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-describedby="confirm-error"
              />

              <button
                type="button"
                id="togglePassword"
                className="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {
                  showConfirmPassword ? <EyeOff 
                    className="h-5 w-5 cursor-pointer" />
                    : <Eye 
                    className="h-5 w-5 cursor-pointer" />
                }
              </button>
            </div>
            {
              error.confirm.status && (
                <p id="confirm-error" className="text-red-500 text-sm mt-1">
                  {error.confirm.message}
                </p>
              )
            }
          </div>

          <button
            type="submit"
            className="bg-[#4f46e5] text-white w-full py-2 rounded-lg hover:bg-[#4e46e5e1]"
          >
            Create Account
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;