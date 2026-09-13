import { NextResponse } from "next/server";
import { createClient } from "../../lib/supabase/server";
import { prisma } from "../../lib/prisma";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { title, content } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Find the existing Prisma user or create one
    const dbUser = await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        email: user.email,
      },
    });

    const resume = await prisma.resume.create({
      data: {
        title,
        content,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("CREATE RESUME ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!dbUser) {
      return NextResponse.json([], { status: 200 });
    }

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    // Get one specific resume
    if (id) {
      const resume = await prisma.resume.findFirst({
        where: {
          id,
          userId: dbUser.id,
        },
      });

      if (!resume) {
        return NextResponse.json(
          { error: "Resume not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(resume, { status: 200 });
    }

    // Get all resumes belonging to the logged-in user
    const resumes = await prisma.resume.findMany({
      where: {
        userId: dbUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(resumes, { status: 200 });
  } catch (error) {
    console.error("GET RESUMES ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Resume id is required" },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    await prisma.resume.delete({
      where: {
        id: resume.id,
      },
    });

    return NextResponse.json(
      { message: "Resume deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE RESUME ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Resume id is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { title, content } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const existingResume = await prisma.resume.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!existingResume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    const updatedResume = await prisma.resume.update({
      where: {
        id: existingResume.id,
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedResume, { status: 200 });
  } catch (error) {
    console.error("UPDATE RESUME ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}