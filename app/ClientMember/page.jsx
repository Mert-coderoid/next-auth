"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Member = () => {
  const { data: session } = useSession(
    { 
      required: true,
      onUnauthenticated() {
        redirect("/api/auth/signin?callbackUrl=/ClientMember")
     }
    }
  )
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>Protected content</p>
      {/* if session.user.image exists, show it */}
      {session && session.user.image && <img src={session.user.image} />}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default Member