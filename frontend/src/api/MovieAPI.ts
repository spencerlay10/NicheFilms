import { RecommenderRow } from "../types/RecommenderRows";
import { Movie } from "../types/Movie";

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch("http://localhost:5000/api/Movie");
    if (!response.ok) throw new Error("Failed to fetch movies");
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMainMovie = async (showId: string): Promise<Movie | null> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/product/main/${showId}`
    );
    if (!response.ok) throw new Error("Failed to fetch main movie");
    const data: Movie = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching main movie:", error);
    return null;
  }
};

export const fetchRecommendedMovies = async (
  showId: string
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/product/recommended/${showId}`
    );
    if (!response.ok) throw new Error("Failed to fetch recommendations");
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
};

export const fetchRecommenderRows = async (
    userId: number
  ): Promise<RecommenderRow | null> => {
    try {
      const response = await fetch(`http://localhost:5000/api/recommenders/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user recommendations");
      const data: RecommenderRow = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recommender rows:", error);
      return null;
    }
  };
  