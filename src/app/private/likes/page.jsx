import LikesPage from '@/components/pages/LikesPage'

const page = () => {
  return (
    <>
      <section>
        <h1 className="text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2">My liked songs</h1>
      </section>
      <section>
        <LikesPage />
      </section>
    </>
  )
}

export default page
