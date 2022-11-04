import { GetServerSideProps } from 'next'

interface HomeProps {
  count: string
}

export default function Home({ count }: HomeProps) {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid gap-28 grid-cols-2 items-center">
      <main>
        <img src="/logo.svg" alt="" />
        <h1 className="mt-16 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <img src="/avatares.png" alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+12.592 </span>pessoas já estão
            usando
          </strong>
        </div>

        <form action="" className="mt-10 flex gap-2">
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            className="flex flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm"
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm hover:bg-yellow-700"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <img src="/check.svg" alt="check" />
            <div className="flex flex-col">
              <strong className="font-bold text-2xl">+2.034</strong>
              <span>Bolões criados </span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <img src="/check.svg" alt="check" />
            <div className="flex flex-col">
              <strong className="font-bold text-2xl">+192.847</strong>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <img src="/mobile.png" alt="2 celular com layout do aplicativo" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  return {
    props: {
      count: data.count,
    },
  }
}
