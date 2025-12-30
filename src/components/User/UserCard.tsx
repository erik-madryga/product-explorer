import React from "react";
import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import { User } from "./user.types";

interface UserCardProps {
  user: User;
  onViewDetails?: (userId: number) => void;
}

export default function UserCard({ user, onViewDetails }: UserCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <CCard className="max-w-xl">
        <CCardBody>
          <CCardTitle>
            {user.name.firstname} {user.name.lastname}
          </CCardTitle>
          <CCardText className="text-sm">
            <strong>Username:</strong> {user.username}
          </CCardText>
          <CCardText className="text-sm">
            <strong>Email:</strong> {user.email}
          </CCardText>
          <CCardText className="text-sm">
            <strong>Phone:</strong> {user.phone}
          </CCardText>
          <CCardText className="text-sm">
            <strong>Address:</strong> {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}
          </CCardText>
          {onViewDetails && (
            <button onClick={() => onViewDetails(user.id)} className="underline text-blue-600 mt-2">
              View Details
            </button>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
}
