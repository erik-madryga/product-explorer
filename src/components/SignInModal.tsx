"use client";
import { CButton, CModal, CModalBody, CModalContent } from "@coreui/react";
import Link from "next/link";
import { useState } from "react";

export const SignInModal = () => {

    const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
      const onSignInClick = () => {
        console.log("Sign In clicked");
        isSignInModalVisible ? setIsSignInModalVisible(false) : setIsSignInModalVisible(true);
      }
  return (
    <div>
    <CButton
            onClick={onSignInClick}
            className="bg-yellow-500 text-purple-700 px-3 py-1 rounded-md font-medium hover:bg-yellow-400"
          >
            Sign In
          </CButton>
      <CModal visible={isSignInModalVisible} alignment="center">
        <CModalContent>
          <CModalBody>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Sign In</h2>
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded p-2 w-full mb-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border rounded p-2 w-full mb-2"
                />
                <Link href="/user" className="text-sm text-purple-700 hover:underline">
                  <button
                  type="submit"
                  className="bg-purple-700 text-yellow-500 px-4 py-2 rounded-md hover:bg-purple-600"
                  onClick={onSignInClick}
                >
                  Sign In
                </button>
                </Link>
                
              </form>
            </div>
          </CModalBody>
        </CModalContent>
      </CModal>
    </div>
  );
}