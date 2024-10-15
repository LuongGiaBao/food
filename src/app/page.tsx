import FoodComponent from "@/components/FoodComponents";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <FoodComponent />
    </div>
  );
}
