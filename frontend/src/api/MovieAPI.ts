import { RecommenderRow } from "../types/RecommenderRows";
import { Movie } from "../types/Movie";

const API_URL = "https://nichemovies-backend-byaza8g5hffjezf4.eastus-01.azurewebsites.net/api";

// ✅ Fetches only movies for the logged-in user
export const fetchUserMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/movie/user`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error("Failed to fetch user movies");
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user movies:", error);
    throw error;
  }
};

// ✅ Fetches logged-in user's recommender rows
export const fetchRecommenderRowsForCurrentUser = async (): Promise<RecommenderRow | null> => {
  try {
    const response = await fetch(`${API_URL}/recommenders`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error("Failed to fetch user recommendations");
    const data: RecommenderRow = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommender rows:", error);
    return null;
  }
};

// ✅ This one is still good as-is
export const fetchMainMovie = async (showId: string): Promise<Movie | null> => {
  try {
    const response = await fetch(`${API_URL}/product/main/${showId}`);
    if (!response.ok) throw new Error("Failed to fetch main movie");
    const data: Movie = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching main movie:", error);
    return null;
  }
};

// ✅ Still valid for additional recommendations
export const fetchRecommendedMovies = async (showId: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/product/recommended/${showId}`);
    if (!response.ok) throw new Error("Failed to fetch recommendations");
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
};
