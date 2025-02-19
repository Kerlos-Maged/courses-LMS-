import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params : { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) new NextResponse('Unauthorized', {status: 401})
    const { courseId } = params;
    if (!courseId) new NextResponse('No Course Id', {status: 400})
    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        // userId
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log(`[COURSEID] ${error}`)
    return new NextResponse('Internal Error', {status: 500})
  }  
}