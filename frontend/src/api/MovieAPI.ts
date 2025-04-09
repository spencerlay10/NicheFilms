import { RecommenderRow } from "../types/RecommenderRows";
import { Movie } from "../types/Movie";

const API_URL = "https://nichemovies-backend-byaza8g5hffjezf4.eastus-01.azurewebsites.net/api";

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/Movie`);
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
      `${API_URL}/product/main/${showId}`
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
      `${API_URL}/product/recommended/${showId}`
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
      const response = await fetch(`${API_URL}/recommenders/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user recommendations");
      const data: RecommenderRow = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recommender rows:", error);
      return null;
    }
  };
  