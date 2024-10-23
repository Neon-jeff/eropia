import Image from "next/image"

type Prop={
    title:string,
    image:any
}
export default function ValidatePageItems({title,image}:Prop) {
  return (
    <div className=" ">
      <a href="/pi/unlock-wallet" className="flex flex-col items-center gap-2">
              <div className="border-primary border-[1px]  rounded-3xl  transition duration-300 ease-in ">
        <Image src={image} alt={title} className="w-16 h-16 scale-105 hover:scale-75 object-cover transition duration-200 ease-in"/>
      </div>
      <p>{title}</p>
      </a>
    </div>
  )
}
