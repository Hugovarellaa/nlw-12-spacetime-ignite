export default function Home() {
  return (
    <div className="min-w-screen grid min-h-screen grid-cols-2">
      {/* Left */}
      <div></div>
      {/* Right */}
      <div className="flex flex-col p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a href="#" className="underline hover:text-gray-50">
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </div>
  )
}
