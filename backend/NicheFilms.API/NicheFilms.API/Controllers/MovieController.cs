using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;
using System.Text.Json;

namespace NicheFilms.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly NicheFilmsDbContext _context;

        public MovieController(NicheFilmsDbContext context)
        {
            _context = context;
        }

        // Utility: Generate short alphanumeric ID
        private string GenerateShortId()
        {
            return Guid.NewGuid().ToString("N")[..12]; // 12-char lowercase hex
        }

        // GET: api/movie
        [HttpGet]
        public IActionResult GetAllMovies()
        {
            try
            {
                var movies = _context.MoviesTitles.ToList();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetAllMovies] Error: {ex.Message}");
                return StatusCode(500, new { error = "Failed to fetch all movies", details = ex.Message });
            }
        }

        // GET: api/movie/admin
        [HttpGet("admin")]
        public IActionResult GetPagedMovies(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? search = null,
            [FromQuery] string? category = null)
        {
            try
            {
                var baseQuery = _context.MoviesTitles.AsQueryable();

                if (!string.IsNullOrEmpty(search))
                {
                    baseQuery = baseQuery.Where(m => m.Title.Contains(search));
                }

                if (!string.IsNullOrEmpty(category))
                {
                    baseQuery = baseQuery.Where(m => m.Genres.Contains(category));
                }

                var total = baseQuery.Count();

                var results = baseQuery
                    .OrderBy(m => m.Title)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .AsNoTracking()
                    .ToList();

                var moviesWithRatings = results.Select(m => new
                {
                    m.ShowId,
                    m.Title,
                    m.Director,
                    m.ReleaseYear,
                    m.Type,
                    m.Genres,
                    m.Rating,
                    AverageRating = _context.MoviesRatings
                        .Where(r => r.ShowId == m.ShowId)
                        .Average(r => (double?)r.Rating) ?? 0,
                    RatingCount = _context.MoviesRatings.Count(r => r.ShowId == m.ShowId)
                }).ToList();

                return Ok(new { movies = moviesWithRatings, total });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetPagedMovies] Error: {ex.Message}");
                return StatusCode(500, new { error = "Failed to load movies", details = ex.Message });
            }
        }

        // GET: api/movie/{id}
        [HttpGet("{id}")]
        public IActionResult GetMovieById(string id)
        {
            try
            {
                var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == id);
                if (movie == null)
                    return NotFound();

                return Ok(movie);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetMovieById] Error: {ex.Message}");
                return StatusCode(500, new { error = "Failed to fetch movie", details = ex.Message });
            }
        }

        // POST: api/movie
        [HttpPost]
        public IActionResult AddMovie([FromBody] MoviesTitle movie)
        {
            try
            {
                if (movie == null)
                    return BadRequest(new { error = "Invalid movie object" });

                Console.WriteLine("[AddMovie] Movie received");
                Console.WriteLine($"[AddMovie] Payload: {JsonSerializer.Serialize(movie)}");

                if (string.IsNullOrEmpty(movie.ShowId))
                {
                    movie.ShowId = GenerateShortId();
                    Console.WriteLine($"[AddMovie] Generated ShowId: {movie.ShowId}");
                }

                _context.MoviesTitles.Add(movie);
                var result = _context.SaveChanges();
                Console.WriteLine($"[AddMovie] Movie saved successfully. Rows affected: {result}");

                return CreatedAtAction(nameof(GetMovieById), new { id = movie.ShowId }, movie);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[AddMovie] Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"[AddMovie] Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { error = "Failed to add movie", details = ex.Message });
            }
        }

        // PUT: api/movie/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateMovie(string id, [FromBody] MoviesTitle updatedMovie)
        {
            try
            {
                var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == id);
                if (movie == null)
                    return NotFound();

                updatedMovie.ShowId = id;
                _context.Entry(movie).CurrentValues.SetValues(updatedMovie);
                _context.SaveChanges();

                Console.WriteLine($"[UpdateMovie] Movie {id} updated successfully.");
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[UpdateMovie] Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"[UpdateMovie] Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { error = "Failed to update movie", details = ex.Message });
            }
        }

        // DELETE: api/movie/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(string id)
        {
            try
            {
                var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == id);
                if (movie == null)
                    return NotFound();

                _context.MoviesTitles.Remove(movie);
                _context.SaveChanges();

                Console.WriteLine($"[DeleteMovie] Movie {id} deleted successfully.");
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[DeleteMovie] Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"[DeleteMovie] Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { error = "Failed to delete movie", details = ex.Message });
            }
        }
    }
}
