import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';


export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const data = await req.json()
  data.age = Number(data.age)

  const user = await prisma.user.update({
    where:{
        email : currentUserEmail
    },
    data
  })

  return NextResponse.json(user)
}

// export async function DELETE(req: NextRequest) {
  
//   const session = await getServerSession();
//   const currentUserEmail = session?.user?.email!;
//   const targetUserId = req.nextUrl.searchParams.get('targetUserId');

//   const currentUserId = await prisma.user
//     .findUnique({ where: { email: currentUserEmail } })
//     .then((user) => user?.id!);

//   const record = await prisma.follows.delete({
//     where: {
//       followerId_followingId: {
//         followerId: currentUserId,
//         followingId: targetUserId!,
//       },
//     },
//   });

//   return NextResponse.json(record);
// }