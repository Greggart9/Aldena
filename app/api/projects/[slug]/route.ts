import { NextRequest, NextResponse } from "next/server";
import db from "@/data/db.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = db.projects.find((p) => p.slug === slug || p.id === slug);

  if (!project) {
    return NextResponse.json(
      { error: `Project '${slug}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}
