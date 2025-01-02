
"use client";
import "reflect-metadata"; // add polyfill in client side
import React from "react";

export default function ClientRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}