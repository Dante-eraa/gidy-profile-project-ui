import { useState } from "react";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(form).unwrap();

      if (response.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            accessToken: response.data.accessToken,
          }),
        );

        toast.success(response.message || "Login successful 🎉");
        navigate(`/profile/${response.data.user.profile.slug}`);
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:bg-[#f5f6f8] px-4">
      <div className="w-full max-w-md bg-white md:rounded-2xl md:shadow-md px-10 py-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://gidy-content-p.s3.us-west-2.amazonaws.com/Png/Gidy_logo_small_white_bg.png"
            alt="Gidy logo"
            className="w-12 mb-4"
          />

          <h2 className="text-2xl font-semibold text-gray-900">Welcome</h2>

          <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
            Log in to GIDY!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full h-14 px-4  border border-gray-300 rounded-md text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#0059d6] focus:border-[#0059d6]"
            />
            <label
              className={`absolute left-4 bg-white px-1 transition-all duration-200
        ${
          form.email
            ? "-top-2 text-xs text-[#0059d6]"
            : "top-4 text-sm text-gray-400"
        }
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#0059d6]`}
            >
              Email address *
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full h-14 px-4  pr-12 border border-gray-300 rounded-md text-sm
               focus:outline-none focus:ring-2 focus:ring-[#0059d6] focus:border-[#0059d6]"
            />

            <label
              className={`absolute left-4 bg-white px-1 transition-all duration-200
      ${
        form.password
          ? "-top-2 text-xs text-[#0059d6]"
          : "top-4 text-sm text-gray-400"
      }
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#0059d6]`}
            >
              Password *
            </label>

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {/* Continue Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-md text-white font-medium
               bg-[#0059d6] hover:bg-[#0047b3]
               active:scale-[0.99]
               transition-all duration-200"
          >
            {isLoading ? "Creating..." : "Continue"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
