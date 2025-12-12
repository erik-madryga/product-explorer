"use client";
import { CIcon } from '@coreui/icons-react';
import { cilCart } from '@coreui/icons';

export function CartIcon({ className = "" }: { className?: string }) {
  return <CIcon icon={cilCart} className={`w-6 h-6 ${className}`} />;
}