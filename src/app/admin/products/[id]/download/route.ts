import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await db.product.findUnique({
    where: { id: params.id },
    select: { filePath: true, name: true },
  });
  if (!data) {
    return notFound();
  }
  const { size } = await fs.stat(data.filePath);
  const file = await fs.readFile(data.filePath);
  const extention = data.filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Type": `application/${extention}`,
      "Content-Length": size.toString(),
      "Content-Disposition": `attachment; filename="${data.name}.${extention}"`,
    },
  });
}
