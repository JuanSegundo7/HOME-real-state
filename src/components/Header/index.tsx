import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignIn = async () => {
    await signIn("credentials", { callbackUrl: "/perfil" });
  };

  return (
    <header className="w-full h-20 flex flex-column items-center justify-center shadow-md ">
      <nav className="px-8 md:px-16 w-full flex justify-between items-center m-auto">
        <Link href="/">
          <Image src="/imgs/home.png" alt="logo" width="130" height="90" />
        </Link>
        <div className="w-[100%] justify-center hidden lg:flex">
          <ul className="flex w-full justify-end items-center lg:gap-6 2xl:gap-12">
            <div className="p-3 w-[122px] h-10 flex flex-row justify-center items-center gap-3 cursor-pointer">
              <li className="text-sm font-normal leading-5 text-center">
                Comprar
              </li>
              <Image src="/imgs/arrow.png" alt="arrow" width="10" height="6" />
            </div>
            <div className="p-3 2xl:w-[122px] h-10 flex flex-row justify-center items-center gap-3 cursor-pointer">
              <li className="text-sm font-normal leading-5 text-center">
                Alquilar
              </li>
              <Image src="/imgs/arrow.png" alt="arrow" width="10" height="6" />
            </div>
            <div className="p-3 w-[154px] h-10 flex flex-row justify-center items-center gap-3 cursor-pointer">
              <li className="text-sm font-normal leading-5 text-center">
                Valora tu casa
              </li>
              <Image src="/imgs/arrow.png" alt="arrow" width="10" height="6" />
            </div>
            <div className="p-3 w-[154px] h-10 flex flex-row justify-center items-center gap-3 cursor-pointer">
              <li className="text-sm font-normal leading-5 text-center">
                Únete a nosotros
              </li>
              <Image src="/imgs/arrow.png" alt="arrow" width="10" height="6" />
            </div>
            {!user ? (
              <button
                onClick={handleSignIn}
                className="bg-gradient-to-b from-home-dark-blue to-home-light-blue text-sm h-[56px] w-[147px] rounded-2xl text-white"
              >
                Iniciar sesión
              </button>
            ) : (
              <Link href="/perfil">
                <Image
                  src={user.image as string}
                  alt="user-picture"
                  width="60"
                  height="60"
                  className="rounded-full border-2 hover:border-home-dark-blue cursor-pointer"
                />
              </Link>
            )}
          </ul>
        </div>
        <div className="lg:hidden">
          <RxHamburgerMenu size={28} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
