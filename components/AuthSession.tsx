'use client'

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";

import React from 'react'

export interface AuthContextProps {
  children:React.JSX.Element,
  session:Session
}

export default function AuthSession({children }:AuthContextProps) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
