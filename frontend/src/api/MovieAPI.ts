import { Movie } from "../types/Movie";

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch("https://localhost:5000/api/Movie");

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data: Movie[] = await response.json();
    console.log("API Response Data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
