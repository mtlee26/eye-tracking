import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Protected() {
    const [account, setAccount] = useState(null);
    const [counter, setCounter] = useState(5);
    const router = useRouter();

    useEffect(() => {
        console.log(localStorage.getItem("faceAuth"));
        if (!localStorage.getItem("faceAuth")) {
            router.push("/");
        }

        const { account } = JSON.parse(localStorage.getItem("faceAuth"));
        setAccount(account);
    }, []);

    useEffect(() => {
        if (counter === 0) {
            router.push("/dashboard");
            return;
        }

        const timer = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter, router]);

    if (!account) {
        return null;
    }

    return (
        <div className="pt-20 md:pt-16 max-h-screen overflow-y-auto">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#adc6ff] sm:text-4xl mb-2">
                    You have successfully logged in!
                </h2>
                <div className="text-center text-xl font-extrabold tracking-tight text-[#adc6ff] sm:text-2xl mb-12">
                    <span className="block text-[#adc6ff]">
                        Auto Redirect to Dashboard in {counter} seconds...
                    </span>
                </div>
                <div className="text-center mb-24">
                    <img
                        className="mx-auto mb-8 object-cover h-48 w-48 rounded-full"
                        src={
                            account?.type === "CUSTOM"
                                ? account.picture
                                : // : import.meta.env.DEV
                                  // ? `/temp-accounts/${account.picture}`
                                  // : `/react-face-auth/temp-accounts/${account.picture}`
                                  `/temp-accounts/${account.picture}`
                        }
                        alt={account.fullName}
                    />
                    <h1
                        className="block text-4xl tracking-tight font-extrabold bg-[#ffffff] sm:text-5xl md:text-6xl bg-clip-text text-transparent"
                        style={{
                            lineHeight: "1.5",
                        }}
                    >
                        {account?.fullName}
                    </h1>
                    <div
                        onClick={() => {
                            localStorage.removeItem("faceAuth");
                            router.push("/");
                        }}
                        className="flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-[#debcdf]"
                    >
                        <span className="text-[#402843]">Log Out</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#402843"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Protected;
