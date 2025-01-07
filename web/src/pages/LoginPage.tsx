import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoginFormData, loginSchema } from "../schemas/auth.schema";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/auth.service";
import Navbar from "../components/Navbar ";
import { Mail, Loader2, LockIcon } from "lucide-react";
import Footer from "../components/Footer ";

const REDIRECT_DELAY = 1500;

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [authState, setAuthState] = useState({
        error: '',
        isSuccess: false,
        isGoogleLoading: false
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await authService.login(data);

            if (response.data) {
                login({ email: data.email });
                setAuthState({ error: '', isSuccess: true, isGoogleLoading: false });

                setTimeout(() => {
                    navigate('/admin');
                }, REDIRECT_DELAY);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message ||
                (err.request ? 'No response from server' : 'An error occurred');

            setAuthState(prev => ({
                ...prev,
                error: errorMessage,
                isSuccess: false
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="flex min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4rem)] relative">
                <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="relative">
                            {authState.isSuccess && (
                                <div className="absolute top-0 left-0 right-0 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                                    <p className="text-green-700 text-center font-medium">
                                        Login successful! Redirecting...
                                    </p>
                                </div>
                            )}

                            <div className="text-center">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                    Welcome Back
                                </h2>
                                <p className="mt-2 text-sm text-gray-600">
                                    Sign in to access your admin dashboard
                                </p>
                            </div>

                            {/* Error Message */}
                            {authState.error && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">
                                        {authState.error}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm 
                                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                                         placeholder:text-gray-400 text-sm"
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <LockIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                {...register("password")}
                                                type="password"
                                                autoComplete="current-password"
                                                className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm 
                                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                                         placeholder:text-gray-400 text-sm"
                                                placeholder="••••••••"
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="relative w-full flex justify-center items-center px-4 py-3 
                                                 rounded-lg text-white bg-blue-600 hover:bg-blue-700 
                                                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                                 focus:ring-blue-500 font-medium text-sm transition-colors
                                                 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting && (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        )}
                                        {isSubmitting ? "Signing in..." : "Sign in"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-blue-500 to-indigo-600">
                    <div className="absolute inset-0 bg-[url('/api/placeholder/800/600')] mix-blend-overlay opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-white max-w-lg text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                Welcome to BlogApp Admin
                            </h2>
                            <p className="text-lg text-blue-100">
                                Manage your content, monitor engagement, and grow your audience
                                from one central dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default LoginPage;