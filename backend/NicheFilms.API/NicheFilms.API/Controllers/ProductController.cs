using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;

// Controller for managing/importing movie data and ratings. Also for getting recommendations.
namespace NicheFilms.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly NicheFilmsDbContext _context;

        public ProductController(NicheFilmsDbContext context)
        {
            _context = context;
        }

        // GET: /product/main/{showId} --> Gets the main movie details
        [HttpGet("main/{showId}")]
        public IActionResult GetMainMovie(string showId)
        {
            var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (movie == null)
            {
                return NotFound("Movie not found.");
            }

            return Ok(movie);
        }

        // GET: /product/recommended/{showId} --> Gets recommended movies based on the showId
        [HttpGet("recommended/{showId}")]
        public IActionResult GetRecommendedMovies(string showId)
        {
            var hybridRec = _context.HybridRecommendations.FirstOrDefault(r => r.ShowId == showId);

            if (hybridRec == null)
            {
                return NotFound("No recommendations found.");
            }

            // Extract recommendation IDs and remove nulls
            var recIds = new List<string?>
            {
                hybridRec.Rec1,
                hybridRec.Rec2,
                hybridRec.Rec3,
                hybridRec.Rec4,
                hybridRec.Rec5,
                hybridRec.Rec6,
                hybridRec.Rec7,
                hybridRec.Rec8,
                hybridRec.Rec9,
                hybridRec.Rec10
            }.Where(id => !string.IsNullOrEmpty(id)).ToList();

            var recommendedMovies = _context.MoviesTitles
                .Where(m => recIds.Contains(m.ShowId))
                .ToList();

            return Ok(recommendedMovies);
        }

        // GET: /product/rating/{userId}/{showId} --> Gets the rating for a specific movie by a user
        [HttpGet("rating/{userId}/{showId}")]
        public IActionResult GetMovieRating(int userId, string showId)
        {
            var rating = _context.MoviesRatings.Find(userId, showId);
            if (rating == null)
            {
                return NotFound("Rating not found.");
            }

            // Only return the rating value
            return Ok(new { rating = rating.Rating });
        }

        // PUT: /product/rating/{userId}/{showId}  --> Updates the rating for a specific movie by a user
        [HttpPut("rating/{userId}/{showId}")]
        public async Task<IActionResult> UpdateMovieRating(int userId, string showId, [FromBody] MoviesRating updatedRating)
        {
            if (updatedRating == null || updatedRating.Rating < 0 || updatedRating.Rating > 5)
            {
                return BadRequest("Invalid rating value.");
            }

            var rating = await _context.MoviesRatings.FindAsync(userId, showId);

            if (rating == null)
            {
                // Optionally create a new rating if not found
                var newRating = new MoviesRating
                {
                    UserId = userId,
                    ShowId = showId,
                    Rating = updatedRating.Rating
                };

                _context.MoviesRatings.Add(newRating);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Rating created." });
            }

            // Update the existing rating
            rating.Rating = updatedRating.Rating;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Rating updated." });
        }
    }
}
