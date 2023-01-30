import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 text-lg text-darkfont bg-primary flex flex-col items-center">
      <p className="mb-4">
        Receba atualizações de conteúdo direto na sua caixa de entrada!
      </p>

      <button className="bg-lime-600 font-bold shadow-2xl py-1 px-4 rounded-md">
        Inscrever-me
      </button>
    </footer>
  )
}

export default Footer
