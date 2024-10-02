import prisma from "@/database";

const { NextResponse } = require("next/server");

export async function GET(request) {
  try {
    const getAllBlogPosts = await prisma.post.findMany();
    if (getAllBlogPosts && getAllBlogPosts.length) {
      return NextResponse.json({
        success: true,
        data: getAllBlogPosts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch blog posts. Please try again",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
