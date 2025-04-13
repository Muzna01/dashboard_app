"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      router.push('/login');
    };
    verifySession();
  }, [router]);

  return (
    <div className="">

    </div>
  );
}
