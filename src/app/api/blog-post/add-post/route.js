import prisma from "@/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const extractPostData = await request.json();
    const newlyCreatedPost = await prisma.post.create({
      data: extractPostData
    })
    if (newlyCreatedPost) {
      return NextResponse.json({
        success: true,
        message: 'New Blog Post added successfully'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong! Please try again'
      })  
    }
  } catch(e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again'
    })
  }
} 