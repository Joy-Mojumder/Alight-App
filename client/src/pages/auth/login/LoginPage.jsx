import { TfiEmail } from "react-icons/tfi";
import { MdOutlinePassword } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [textOrPass, setTextOrPass] = useState("password");
  const [showError, setShowError] = useState(false);

  const toggleTextOrPass = () => {
    if (textOrPass === "password") {
      setTextOrPass("text");
    } else {
      setTextOrPass("password");
    }
  };
  // saving data to database
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ emailOrPhone, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrPhone,
            password,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
      } catch (err) {
        throw new Error(err);
      }
    },
    onSuccess: () => {
      toast.success("Login successful");
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 4000);
  };

  return (
    <motion.section
      className="w-full h-screen flex flex-col md:flex-row gap-10 items-center justify-center px-5 py-10 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="w-1/4 sm:w-1/6 md:w-1/4 lg:w-1/3 h-auto flex flex-col items-center justify-center"
        initial={{ x: `-${window.innerWidth}px`, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{
          x: `-${window.innerWidth}px`,
          opacity: 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <img src="/Logo.png" alt="logo image alight" />
        <p className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-purple-500">
          Alight
        </p>
      </motion.section>
      <motion.section
        className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 h-auto text-sm md:text-base"
        initial={{ x: `${window.innerWidth}px`, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: `${window.innerWidth}px`, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <form
          className="form-control gap-3 px-5 sm:px-10 py-5 rounded-lg bg-purple-500 text-white"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">
            Login To Your Account
          </h1>

          <label className="input input-bordered flex items-center gap-2 bg-stone-900">
            <TfiEmail className="h-4 w-4 opacity-70" />
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              className="grow"
              placeholder="Email or Phone Number"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-stone-900">
            <MdOutlinePassword className="h-4 w-4 opacity-70" />
            <input
              type={`${textOrPass}`}
              className="grow"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {textOrPass === "password" ? (
              <FaRegEye
                className="h-5 w-5 opacity-70 cursor-pointer"
                onClick={toggleTextOrPass}
              />
            ) : (
              <FaRegEyeSlash
                className="h-5 w-5 opacity-70 cursor-pointer"
                onClick={toggleTextOrPass}
              />
            )}
          </label>
          {isError && showError ? (
            <motion.p
              className="text-red-500 font-semibold"
              initial={{ x: "100px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {error.message}
            </motion.p>
          ) : null}
          <button
            className="btn bg-purple-700 border-none text-white text-xl hover:bg-zinc-800 rounded-full"
            type="submit"
          >
            {isPending ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Login"
            )}
          </button>
          <h2 className="text-center sm:text-xl lg:text-left lg:text-base">
            Don&apos;t have an account?
          </h2>
          <Link to="/signup">
            <button className="btn btn-outline text-white text-xl hover:bg-stone-900 hover:border-none rounded-full button w-full">
              Sign Up
            </button>
          </Link>
        </form>
      </motion.section>
    </motion.section>
  );
};

export default LoginPage;
