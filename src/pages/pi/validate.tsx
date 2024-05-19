import Image from "next/image";
import logo from "@/assets/logo.png";
import chat from "@/assets/chat.jpg";
import wallet from "@/assets/wallet.jpg";
import brain from "@/assets/brainstorm.jpg";
import mine from "@/assets/mine.jpg";
import blockchain from "@/assets/blockchain.jpg";
import develop from "@/assets/develop.jpg";
import kyc from "@/assets/kyc.jpg";
import fireside from "@/assets/fireside.jpg";
import ValidatePageItems from "../../components/validatePageItems";
import eco from "@/assets/we.png";

export default function Wallet() {
  let data = [
    {
      title: "Chat",
      image: chat,
    },
    {
      title: "Wallet",
      image: wallet,
    },
    {
      title: "Brainstorm",
      image: brain,
    },
    {
      title: "Mine",
      image: mine,
    },
    {
      title: "Blockchain",
      image: blockchain,
    },
    {
      title: "Develop",
      image: develop,
    },
    {
      title: "KYC",
      image: kyc,
    },
    {
      title: "Fireside",
      image: fireside,
    },
  ];
  return (
    <div className="flex flex-col gap-10 items-center text-sm justify-center pt-20">
      {/* top */}
      <div className="bg-primary absolute  top-0 right-0 left-0 flex justify-center items-center text-white gap-2">
        Home
        <Image src={logo} alt="logo" className="h-10 object-contain w-10" />
      </div>
      <div className="flex flex-col gap-2 items-center text-secondary">
        <Image src={logo} alt="logo" className="h-36 object-cover w-36" />
        <p>
          Welcome to the <span className="font-medium ">Pi</span> browser
        </p>
      </div>
      <div className="flex items-center justify-center max-md:grid max-md:grid-cols-3 lg:gap-10 max-md:gap-6">
        {data.map((item) => (
          <ValidatePageItems
            image={item.image}
            title={item.title}
            key={item.title}
          />
        ))}
      </div>
      <button className="px-4 py-2 bg-primary text-white flex items-center justify-center gap-1 rounded-xl">
        <Image src={eco} alt="logo" className="h-9 object-contain w-9" />
        Explore the Testnet Ecosystem
      </button>
    </div>
  );
}
