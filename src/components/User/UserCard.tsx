'use client';

import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import { User } from "./user.types";
import { useUserStore } from "../../store/userStore";

interface UserCardProps {
  user: User;
  onViewDetails?: (userId: number) => void;
}

export default function UserCard({ user: initialUser, onViewDetails }: UserCardProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState({
    firstname: initialUser.name.firstname,
    lastname: initialUser.name.lastname,
    email: initialUser.email,
    phone: initialUser.phone,
    street: initialUser.address.street,
    number: String(initialUser.address.number),
    city: initialUser.address.city,
    zipcode: initialUser.address.zipcode,
    lat: initialUser.address.geolocation.lat,
    long: initialUser.address.geolocation.long,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate password change if provided
      if (showPasswordChange) {
        if (!formData.currentPassword) {
          setError('Current password is required to change password');
          setIsSaving(false);
          return;
        }
        if (formData.currentPassword !== initialUser.password) {
          setError('Current password is incorrect');
          setIsSaving(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          setIsSaving(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setError('Password must be at least 6 characters');
          setIsSaving(false);
          return;
        }
      }

      const response = await fetch(`/api/users/${initialUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: initialUser.id,
          username: initialUser.username,
          email: formData.email,
          phone: formData.phone,
          password: showPasswordChange && formData.newPassword ? formData.newPassword : initialUser.password,
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          address: {
            street: formData.street,
            number: parseInt(formData.number) || 0,
            city: formData.city,
            zipcode: formData.zipcode,
            geolocation: {
              lat: formData.lat,
              long: formData.long,
            },
          },
          __v: initialUser.__v,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to update profile');
        setIsSaving(false);
        return;
      }

      // Update local user store
      setUser(data.user);
      setSuccess('Profile updated successfully!');
      setIsEditMode(false);
      setShowPasswordChange(false);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditMode) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <CCard className="app-panel">
          <CCardBody className="p-6">
            <CCardTitle className="mb-6 text-2xl font-bold">Edit Profile</CCardTitle>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="app-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="app-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="app-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="app-input"
                />
              </div>

              <div className="border-t border-line pt-4">
                <h3 className="font-semibold mb-3">Address</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="app-input mb-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Number</label>
                    <input
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="app-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="app-input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Zipcode</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      className="app-input"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="app-link mb-4"
                >
                  {showPasswordChange ? '✕ Cancel Password Change' : '🔐 Change Password'}
                </button>

                {showPasswordChange && (
                  <div className="space-y-3 rounded-xl border border-line bg-slate-50 p-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter current password"
                        className="app-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        className="app-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                        className="app-input"
                      />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="app-button-primary flex-1"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setShowPasswordChange(false);
                    setFormData({
                      firstname: initialUser.name.firstname,
                      lastname: initialUser.name.lastname,
                      email: initialUser.email,
                      phone: initialUser.phone,
                      street: initialUser.address.street,
                      number: String(initialUser.address.number),
                      city: initialUser.address.city,
                      zipcode: initialUser.address.zipcode,
                      lat: initialUser.address.geolocation.lat,
                      long: initialUser.address.geolocation.long,
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    });
                  }}
                  className="app-button-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <CCard className="app-panel max-w-xl">
        <CCardBody className="p-6">
          <div className="flex justify-between items-start mb-4">
            <CCardTitle className="text-2xl font-bold">
              {initialUser.name.firstname} {initialUser.name.lastname}
            </CCardTitle>
            <button
              onClick={() => setIsEditMode(true)}
              className="app-button-primary"
            >
              ✎ Edit
            </button>
          </div>
          
          <CCardText className="text-sm text-muted">
            <strong>Username:</strong> {initialUser.username}
          </CCardText>
          <CCardText className="text-sm text-muted">
            <strong>Email:</strong> {initialUser.email}
          </CCardText>
          <CCardText className="text-sm text-muted">
            <strong>Phone:</strong> {initialUser.phone}
          </CCardText>
          <CCardText className="text-sm text-muted">
            <strong>Address:</strong> {initialUser.address.number} {initialUser.address.street}, {initialUser.address.city}, {initialUser.address.zipcode}
          </CCardText>
          
          {success && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              {success}
            </div>
          )}

          {onViewDetails && (
            <button onClick={() => onViewDetails(initialUser.id)} className="app-link mt-2">
              View Details
            </button>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
}
