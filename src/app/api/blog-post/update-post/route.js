const { NextResponse } = require("next/server");


export async function PUT(request) {
  try {
  } catch(e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again'
    })
  }
} 