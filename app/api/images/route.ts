import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const images = await prisma.image.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(images)
    } catch (error) {
        return NextResponse.json({ error: "Error fetching images" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}