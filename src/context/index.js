'use client';

import { createContext, useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "@/components/spinner";
import { initialBlogFormData } from "@/utils";


const initialState = {
  loading: false,
  setLoading : () => {}
}

export const GlobalContext = createContext(initialState);

export default function GlobalState({children}) {
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();
  const [formData, setFormData] = useState(initialBlogFormData)
  
  if (session === undefined) return <Spinner />

  return <GlobalContext.Provider value={{loading, setLoading, formData, setFormData}}>{children}</GlobalContext.Provider>
}