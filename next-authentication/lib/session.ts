import { cookies } from "next/headers";
import prisma from "./prisma";

export async function createSession(id: string) {
  const sessionId = crypto.randomUUID();

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("sessionId", sessionId, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "strict",
  });
}

export async function getUserFromSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) return null;

  const response = await prisma.session.findUnique({
    where: { id: sessionId },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return response?.user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } });
  }

  cookieStore.delete("sessionId");
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
