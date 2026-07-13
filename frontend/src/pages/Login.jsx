import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import ThemeToggle from "../components/ThemeToggle";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.username.trim()) {
      toast.error("Username is required.");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "accounts/login/",
        formData
      );

      localStorage.setItem(
        "access",
        response.data.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.data.refresh
      );

      setFormData({
        username: "",
        password: "",
      });

      navigate("/dashboard" , {replace: true});

    } catch (error) {

      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <ThemeToggle className="absolute right-4 top-4" />

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900 dark:shadow-slate-950/50">

        <h1 className="mb-8 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-slate-700 dark:text-slate-300">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
