"use client"

import Image from "next/image"
const HeroContent = () => {
    return (
        <div className="w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4 md:px-12 py-8 bg-[#fffaf0] rounded-xl shadow-md">
            <Image
                className="rounded-lg w-full h-64 md:h-[400px] object-cover"
                src="/Images/but-first-coffee-sign-coffee-shop-aesthetic-jpg-z66v95kks3r1vtm3.jpg"
                height={400}
                width={600}
                alt="coffee-sign"
                quality={100}
            />

            <div className="flex flex-col gap-4 text-center md:text-left">
                <h1 className="text-cafe-bronze font-cookie-regular text-3xl md:text-6xl text-brown-800 leading-tight">
                    Brewed with love — You’ve got to try it!
                </h1>

                <p className="text-md md:text-lg text-gray-700">
                    Every cup at Beanzy is handcrafted to warm your soul. Whether you're
                    craving a strong espresso or a silky latte, we've got something special
                    brewing for you.
                </p>

                <div>
                    <button className="px-6 py-3 text-white bg-brown-700 hover:bg-brown-800 transition rounded-full text-sm md:text-base font-semibold">
                        Explore Our Menu
                    </button>
                </div>
            </div>
        </div>

    )
}
export default HeroContent