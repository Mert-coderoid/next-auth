import { redirect } from "next/navigation"
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"


const Member = async () => {
  const session = await getServerSession(options)
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member")
  }
  return (
    <div>
      <h1>Member Server Session</h1>
      <img src={session.user.image} />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default Member