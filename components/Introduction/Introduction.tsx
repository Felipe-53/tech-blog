import React from "react"
import img from "../../public/myself.jpg"
import Image from "next/legacy/image";
import Link from "next/link"

const Introduction: React.FC = () => {
  return (
    <div
      className="
      mt-6 rounded-md bg-gray-700 p-10
      lg:p-5"
    >
      <div className="flex items-center">
        <div
          className="overflow-hidden rounded-full flex-shrink-0
          mr-5 w-36 h-36 bg-primary
          hidden lg:block"
        >
          <Image layout="intrinsic" alt="myself" src={img} />
        </div>

        <div className="flex flex-col">
          <p className="text-darkfont text-lg">
            Escrevendo sobre desenvolvimento Full Stack com{" "}
            <span className="text-javascript">JavaScript</span>,{" "}
            <span className="text-typescript">TypeScript</span> e todas as
            tecnologias fantásticas produzidas nesse ecossistema.
            <Link
              href="/sobre"
              className="text-lg text-primary font-semibold hover:text-secondary">
              
                &nbsp;Mais sobre →
              
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduction
