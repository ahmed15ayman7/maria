"use client";
import AdSwiper from "@/components/shared/AdSwiper";
import AdForm from "../../../../components/forms/AdForm";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import axios from "axios";
import ReloadButton from "@/components/shared/reload";
const fetchAds = async () => {
  const response = await axios.get("/api/ads");
  return response.data.ads;
};

const ADPage = () => {
  const {
    data: ads,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: () => fetchAds(),
  });

  if (isLoading) return <Loader/>;
  if (error) return <ReloadButton/>;
console.log(ads)
  return (
    <div>
      <AdForm refetch={refetch} />
      <AdSwiper ads={ads} />
    </div>
  );
};

export default ADPage;
