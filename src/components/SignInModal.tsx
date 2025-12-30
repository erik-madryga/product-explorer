"use client";
import { CButton, CModal, CModalBody, CModalContent } from "@coreui/react";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { User } from "./User/user.types";
import { useUserStore } from "../store/userStore";
import Link from "next/link";

export const SignInModal = ({ users }: { users: User[] }) => {
      const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
      const { setUser, user } = useUserStore();
      const onSignInClick = () => {
        console.log("Sign In clicked");
        isSignInModalVisible ? setIsSignInModalVisible(false) : setIsSignInModalVisible(true);
      }

      const handleLogin = (username: string, password: string) => {
        const userMatch = users.find((u) => u.username === username && u.password === password);
        setUser(userMatch || {} as User);
        if (user?.username) {
          console.log("User logged in:", user);
        } else {
          console.log("Invalid credentials");
        }
      }

      const handleLogout = () => {
        setUser({} as User);
        console.log("User logged out");
        setIsSignInModalVisible(false);
      }
  return (
    <div>
    <CButton
            onClick={onSignInClick}
            className="bg-yellow-500 text-purple-700 px-3 py-1 rounded-md font-medium hover:bg-yellow-400"
          >
            {user?.username ? `Hi, ${user.username}`: "Sign In"}
          </CButton>
      <CModal visible={isSignInModalVisible} alignment="center">
        <CModalContent>
          <CModalBody>
            <div className="p-4">
              {user?.username ? (
                <div>
                  <p className="text-sm mb-2">Signed in as {user.username}</p>
                  <Link href={`/user/${user.id}`} onClick={() => setIsSignInModalVisible(false)}>View Profile</Link>
                  <button
                    type="submit"
                    onClick={handleLogout}
                    className="bg-purple-700 text-yellow-500 px-4 py-2 rounded-md hover:bg-purple-600"
                  >
                    {"Sign Out"}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">Sign In</h2>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const username = e.currentTarget.username.value;
                    const password = e.currentTarget.password.value;
                    handleLogin(username, password);
                    setIsSignInModalVisible(false);
                  }}>
                    <input
                      name="username"
                      type="username"
                      placeholder="Username"
                      className="border rounded p-2 w-full mb-2"
                      required />
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="border rounded p-2 w-full mb-2"
                      required />
                    <button
                      type="submit"
                      className="bg-purple-700 text-yellow-500 px-4 py-2 rounded-md hover:bg-purple-600"
                    >
                      {"Sign In"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </CModalBody>
        </CModalContent>
      </CModal>
    </div>
  );
}