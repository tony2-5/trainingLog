"use client"
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {NextUIProvider} from "@nextui-org/react";
import { SessionProvider } from 'next-auth/react'

export const Providers = ({children} : {children: React.ReactNode}) => {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}