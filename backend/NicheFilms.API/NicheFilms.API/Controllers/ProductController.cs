using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;

namespace NicheFilms.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly NicheFilmsDbContext _context;

        public ProductController(NicheFilmsDbContext context)
        {
            _context = context;
        }

        // GET: api/product/main/{showId}
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

        // GET: api/product/recommended/{showId}
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
                hybridRec.Rec5
            }.Where(id => !string.IsNullOrEmpty(id)).ToList();

            var recommendedMovies = _context.MoviesTitles
                .Where(m => recIds.Contains(m.ShowId))
                .ToList();

            return Ok(recommendedMovies);
        }

        [HttpPut("rating/{userId}/{showId}")]
        
        public IActionResult UpdateMovieRating(int userId, string showId, [FromBody] MoviesRating updatedRating)
        {
            var existingRating = _context.MoviesRatings.Find(userId, showId);
        
            if (existingRating == null)
            {
                return NotFound("Rating not found for this user and movie.");
            }
        
            existingRating.Rating = updatedRating.Rating;
        
            _context.MoviesRatings.Update(existingRating);
            _context.SaveChanges();
        
            return Ok(existingRating);
}

        
    }
}