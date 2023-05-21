import { Session } from "next-auth";

export async function getActiveSession(cookie: string) {
  const res = await fetch(`${process.env.LOCAL_AUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session: Session = await res.json();

  return Object.keys(session).length > 0 ? session : null;
}
