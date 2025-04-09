using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;
namespace NicheFilms.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly NicheFilmsDbContext _context;
        public HomeController(NicheFilmsDbContext context)
        {
            _context = context;
        }
        // GET: api/Home
        [HttpGet("top-rated")]
        public IActionResult GetTopRatedMovies()
        {
            var ratingGroups = _context.MoviesRatings
                .Where(r => r.Rating != null)
                .GroupBy(r => r.ShowId)
                .Select(g => new
                {
                    ShowId = g.Key,
                    AverageRating = g.Average(r => r.Rating.Value),
                    RatingCount = g.Count()
                })
                .ToList();

            if (ratingGroups.Count == 0)
            {
                return NotFound("No rating data found.");
            }

            // Calculate the average rating count
            var averageRatingCount = ratingGroups.Average(r => r.RatingCount);

            // Filter and order movies above average rating count
            var topRatedMovies = ratingGroups
                .Where(r => r.RatingCount > averageRatingCount)
                .OrderByDescending(r => r.AverageRating)
                .Take(20)
                .Join(
                    _context.MoviesTitles,
                    rating => rating.ShowId,
                    movie => movie.ShowId,
                    (rating, movie) => new
                    {
                        movie.ShowId,
                        movie.Title,
                        movie.PosterUrl,
                        rating.AverageRating,
                        rating.RatingCount
                    }
                )
                .ToList();

            if (topRatedMovies.Count == 0)
            {
                return NotFound("No top-rated movies found.");
            }

            return Ok(topRatedMovies);
        }
    }
}
