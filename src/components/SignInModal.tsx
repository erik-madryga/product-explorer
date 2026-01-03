"use client";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { User } from "./User/user.types";
import { useUserStore } from "../store/userStore";
import Link from "next/link";

export const SignInModal = ({ users }: { users: User[] }) => {
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const { setUser, user } = useUserStore();
  const onSignInClick = () => {
    setIsSignInModalVisible((v) => !v);
  };

  const handleLogin = (username: string, password: string) => {
    const userMatch = users.find((u) => u.username === username && u.password === password);
    setUser(userMatch || ({} as User));
    if (userMatch?.username) {
      console.log("User logged in:", userMatch);
    } else {
      console.log("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setUser({} as User);
    console.log("User logged out");
    setIsSignInModalVisible(false);
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
                  <h2 className="text-xl font-semibold mb-2">Sign In</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const username = e.currentTarget.username.value;
                      const password = e.currentTarget.password.value;
                      handleLogin(username, password);
                      setIsSignInModalVisible(false);
                    }}
                  >
                    <input
                      name="username"
                      type="text"
                      placeholder="Username"
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
                    <button
                      type="submit"
                      className="bg-purple-700 text-yellow-500 px-4 py-2 rounded-md hover:bg-purple-600 transition w-full"
                    >
                      Sign In
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};