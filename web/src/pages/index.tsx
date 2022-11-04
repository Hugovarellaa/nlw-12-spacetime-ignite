import { GetServerSideProps } from 'next'

interface HomeProps {
  count: string
}

export default function Home({ count }: HomeProps) {
  return (
    <div>
      <h1>Primeiro log</h1>
      <h1>{count}</h1>
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
