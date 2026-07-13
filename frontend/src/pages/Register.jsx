import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import toast from "react-hot-toast";
import ThemeToggle from "../components/ThemeToggle";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.username.trim()) {
      toast.error("Username is required.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.")
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "accounts/register/",
        formData
      );

      toast.success(response.data.message);

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      navigate("/login");

    } catch (error) {
      console.log(error);

      if (error.response) {

        if (error.response.data.errors) {

          const firstError = Object.values(
            error.response.data.errors
          )[0][0];

          toast.error(firstError);

        } else {

          toast.error(error.response.data.message);

        }

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
          Register
        </h1>

        <form
          onSubmit={handleRegister}
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
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
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
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="mt-6 text-center text-slate-700 dark:text-slate-300">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
