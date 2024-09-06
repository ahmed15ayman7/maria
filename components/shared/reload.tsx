"use client"
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { useState } from "react";


export default function ReloadButton() {
  const router = useRouter();
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const handleReload = () => {
    setIsLoadingCreate(true)
    router.refresh();
    setIsLoadingCreate(false)
  };
  return (
    <div className=" flex justify-center items-center min-h-screen">
      {isLoadingCreate&&<Loader />}
    <Button className=" bg-gold-500 hover:bg-gold-500/80 p-4 rounded-3xl " onClick={handleReload}>
      Reload 
    </Button>
    </div>
  );
}
