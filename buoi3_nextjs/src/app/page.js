'use client'
import { getProduct } from "@/apis/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  let [data, setData] = useState([])

  useEffect(() => {
    getProduct("").then(res => {
      setData(res.content)
    })
  }, [])
  const router = useRouter()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {
        data.map(item => {
          return <div onClick={()=>{
            router.push(`/detail/${item.id}`)
          }}>
            <img src={item.image} />
            <br />
            {item.name}
            <br />
            {item.price}
          </div>
        })
      }
    </div>
  );
}
