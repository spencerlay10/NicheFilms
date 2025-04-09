import { RecommenderRow } from "../types/RecommenderRows";
import { Movie } from "../types/Movie";
import { API_BASE_URL } from "./config";
import { RatingResponse } from "../types/Rating";

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Movie`);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// 🎬 Fetch main movie by showId
export const fetchMainMovie = async (showId: string): Promise<Movie | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product/main/${showId}`
    );
    if (!response.ok) throw new Error("Failed to fetch main movie");
    const data: Movie = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching main movie:", error);
    return null;
  }
};

// 🎥 Fetch recommended movies
export const fetchRecommendedMovies = async (
  showId: string
): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/recommended/${showId}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch recommendations");
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
};

// 🤖 Fetch recommender rows for a user
export const fetchRecommenderRows = async (
  userId: number
): Promise<RecommenderRow | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommenders/${userId}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user recommendations");
    const data: RecommenderRow = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommender rows:", error);
    return null;
  }
};

// ⭐ Fetch a user's rating for a movie
export const fetchMovieRating = async (
  userId: number,
  showId: string
): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/rating/${userId}/${showId}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch rating");
    const data: RatingResponse = await response.json();
    return data.rating ?? 0;
  } catch (error) {
    console.error("Error fetching rating:", error);
    return 0;
  }
};

// 🔁 Update a user's movie rating
export const updateMovieRating = async (
  userId: number,
  showId: string,
  rating: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product/rating/${userId}/${showId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 Must include this for auth
        body: JSON.stringify({ rating }),
      }
    );
    if (!response.ok) throw new Error("Failed to update rating");
  } catch (error) {
    console.error("Error updating rating:", error);
  }
};
