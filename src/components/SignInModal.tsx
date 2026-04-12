"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "../store/productStore";
import { User } from "./User/user.types";
import { useUserStore } from "../store/userStore";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";

export const SignInModal = ({ users }: { users: User[] }) => {
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user } = useUserStore();
  const router = useRouter();
  const onSignInClick = () => {
    setIsSignInModalVisible((v) => !v);
    setIsSignUpMode(false);
    setLoginError(null);
    setSignupError(null);
  };

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Fetch fresh users from API (includes Blob)
      const response = await fetch("/api/users");
      const allUsers = await response.json();
      
      const userMatch = allUsers.find(
        (u: User) => u.username === username && u.password === password
      );

      if (userMatch) {
        setUser(userMatch);
        
        // Check for guest cart to merge
        const guestCart = useCartStore.getState().cart.find(c => c.userId === 'guest');
        
        // Load user's saved cart from Blob
        try {
          const cartResponse = await fetch(`/api/carts/${userMatch.id}`);
          if (cartResponse.ok) {
            const savedCart = await cartResponse.json();
            
            // If there's a guest cart, merge it with the saved cart
            if (guestCart) {
              const mergedItems = [...savedCart.products, ...guestCart.products];
              savedCart.products = mergedItems;
              savedCart.userId = userMatch.id;
            }
            
            useCartStore.getState().setCart([savedCart]);
            
            // Save merged cart back to Blob
            await fetch(`/api/carts/${userMatch.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(savedCart),
            });
          } else {
            // No saved cart, use guest cart if available or start fresh
            if (guestCart) {
              guestCart.userId = userMatch.id;
              useCartStore.getState().setCart([guestCart]);
              
              // Save guest cart as user's cart to Blob
              await fetch(`/api/carts/${userMatch.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guestCart),
              });
            } else {
              useCartStore.getState().clearCart();
            }
          }
        } catch (error) {
          console.error("Error loading cart:", error);
          useCartStore.getState().clearCart();
        }
        
        setLoginError(null);
      } else {
        setLoginError("Invalid credentials");
        setUser({} as User);
        useCartStore.getState().clearCart();
        console.log("Login failed - no matching user found");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const firstname = formData.get("firstname") as string;
      const lastname = formData.get("lastname") as string;
      const username = formData.get("username") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const phone = formData.get("phone") as string;
      const street = formData.get("street") as string;
      const number = formData.get("number") as string;
      const city = formData.get("city") as string;
      const zipcode = formData.get("zipcode") as string;
      const lat = formData.get("lat") as string;
      const long = formData.get("long") as string;

      // Validation
      if (!firstname || !lastname || !username || !email || !password) {
        setSignupError("First name, last name, username, email, and password are required");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setSignupError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setSignupError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      // Call signup API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
          phone: phone || undefined,
          street: street || undefined,
          number: number || undefined,
          city: city || undefined,
          zipcode: zipcode || undefined,
          lat: lat || undefined,
          long: long || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignupError(data.error || "Failed to create account");
        setIsLoading(false);
        return;
      }

      // Auto-login with new account
      setUser(data);
      useCartStore.getState().clearCart();
      setSignupError(null);
      setIsLoading(false);
      setIsSignInModalVisible(false);
      setIsSignUpMode(false);
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    // Save current cart to Blob before logout
    const currentUser = user;
    const currentCart = useCartStore.getState().cart[0];
    
    if (currentUser && currentCart) {
      try {
        await fetch(`/api/carts/${currentUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentCart),
        });
      } catch (error) {
        console.error("Error saving cart before logout:", error);
      }
    }
    
    // Clear state
    setUser({} as User);
    useCartStore.getState().clearCart();
    setIsSignInModalVisible(false);
    router.push("/");
  };

  return (
    <div>
      <button
        onClick={onSignInClick}
        className="bg-yellow-500 text-purple-700 px-3 py-1 rounded-md font-medium hover:bg-yellow-400 transition"
        type="button"
      >
        {user?.username ? `Hi, ${user.username}` : "Sign In"}
      </button>
      {isSignInModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setIsSignInModalVisible(false)}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4"
          onClick={e => e.stopPropagation()}>
            <div className="p-4">
              {user?.username ? (
                <div>
                  <p className="text-sm mb-2">Signed in as {user.username}</p>
                  <Link
                    href={`/user/${user.id}`}
                    className="text-purple-700 underline block mb-4"
                    onClick={() => setIsSignInModalVisible(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-purple-700 text-yellow-500 px-4 py-2 rounded-md hover:bg-purple-600 transition"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  {!isSignUpMode ? (
                    <>
                      <h2 className="text-xl font-semibold mb-2">Sign In</h2>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const username = e.currentTarget.username.value;
                          const password = e.currentTarget.password.value;
                          handleLogin(username, password).then(() => {
                            setIsSignInModalVisible(false);
                          });
                        }}
                      >
                        <input
                          name="username"
                          type="text"
                          placeholder="Username"
                          className="border rounded p-2 w-full mb-2"
                          required
                          disabled={isLoading}
                        />
                        <input
                          name="password"
                          type="password"
                          placeholder="Password"
                          className="border rounded p-2 w-full mb-2"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-purple-700 text-yellow-500 px-4 py-2 rounded-md hover:bg-purple-600 transition w-full disabled:opacity-50"
                        >
                          {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                        {loginError && (
                          <p className="text-red-600 text-sm mt-2">{loginError}</p>
                        )}
                      </form>
                      <p className="text-sm text-center mt-4">
                        Don't have an account?{" "}
                        <button
                          onClick={() => setIsSignUpMode(true)}
                          className="text-purple-700 underline hover:text-purple-600"
                        >
                          Sign Up
                        </button>
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold mb-2">Create Account</h2>
                      <form onSubmit={handleSignUp} className="space-y-2 max-h-96 overflow-y-auto">
                        <div className="border-b pb-2">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Personal Information</p>
                          <input
                            name="firstname"
                            type="text"
                            placeholder="First Name"
                            className="border rounded p-2 w-full mb-2"
                            required
                          />
                          <input
                            name="lastname"
                            type="text"
                            placeholder="Last Name"
                            className="border rounded p-2 w-full mb-2"
                            required
                          />
                        </div>

                        <div className="border-b pb-2">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Login Credentials</p>
                          <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="border rounded p-2 w-full mb-2"
                            required
                          />
                          <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="border rounded p-2 w-full mb-2"
                            required
                          />
                          <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="border rounded p-2 w-full mb-2"
                            required
                          />
                          <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className="border rounded p-2 w-full mb-2"
                            required
                          />
                        </div>

                        <div className="border-b pb-2">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Contact Information</p>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            className="border rounded p-2 w-full mb-2"
                          />
                        </div>

                        <div className="border-b pb-2">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Address</p>
                          <input
                            name="street"
                            type="text"
                            placeholder="Street"
                            className="border rounded p-2 w-full mb-2"
                          />
                          <input
                            name="number"
                            type="number"
                            placeholder="Street Number"
                            className="border rounded p-2 w-full mb-2"
                          />
                          <input
                            name="city"
                            type="text"
                            placeholder="City"
                            className="border rounded p-2 w-full mb-2"
                          />
                          <input
                            name="zipcode"
                            type="text"
                            placeholder="Zipcode"
                            className="border rounded p-2 w-full mb-2"
                          />
                        </div>

                        <div className="pb-2">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Geolocation (Optional)</p>
                          <input
                            name="lat"
                            type="text"
                            placeholder="Latitude"
                            className="border rounded p-2 w-full mb-2"
                          />
                          <input
                            name="long"
                            type="text"
                            placeholder="Longitude"
                            className="border rounded p-2 w-full mb-2"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-purple-700 text-yellow-500 px-4 py-2 rounded-md hover:bg-purple-600 transition w-full disabled:opacity-50"
                        >
                          {isLoading ? "Creating..." : "Create Account"}
                        </button>
                        {signupError && (
                          <p className="text-red-600 text-sm mt-2">{signupError}</p>
                        )}
                      </form>
                      <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <button
                          onClick={() => setIsSignUpMode(false)}
                          className="text-purple-700 underline hover:text-purple-600"
                        >
                          Sign In
                        </button>
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};