import { getMovieDetail } from "@/lib/api/omdb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const movie = await getMovieDetail(id);

    if (!movie) {
        return NextResponse.json(
            { error: "Movie not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(movie);
}
