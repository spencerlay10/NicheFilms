using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;

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

                    // GET: api/movie
                // GET: api/movie
            // Returns all movies (no pagination)
        [HttpGet]
        public IActionResult GetAllMovies()
        {
            var movies = _context.MoviesTitles
                .OrderBy(m => m.Title)
                .ToList();

            return Ok(movies);
}


        [HttpGet("admin")]
        public IActionResult GetPagedMovies([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
    var movies = _context.MoviesTitles
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(m => new
        {
            m.ShowId,
            m.Title,
            m.Director,
            m.ReleaseYear,
            m.Type,
            m.Genres,
            AverageRating = _context.MoviesRatings
                .Where(r => r.ShowId == m.ShowId)
                .Average(r => r.Rating),
            RatingCount = _context.MoviesRatings.Count(r => r.ShowId == m.ShowId)
        })
        .ToList();

    return Ok(movies);
}


        // GET: api/movie/{id}
        [HttpGet("{id}")]
        public IActionResult GetMovieById(string id)
        {
            var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == id);
            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

        // POST: api/movie
        [HttpPost]
        public IActionResult AddMovie([FromBody] MoviesTitle movie)
        {
            if (string.IsNullOrEmpty(movie.ShowId))
            {
                movie.ShowId = Guid.NewGuid().ToString();
            }

            _context.MoviesTitles.Add(movie);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetMovieById), new { id = movie.ShowId }, movie);
        }

        // PUT: api/movie/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateMovie(string id, [FromBody] MoviesTitle updatedMovie)
        {
            var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == id);
            if (movie == null)
                return NotFound();

            updatedMovie.ShowId = id; // Make sure ShowId matches route
            _context.Entry(movie).CurrentValues.SetValues(updatedMovie);
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/movie/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(string id)
        {
            var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == id);
            if (movie == null)
                return NotFound();

            _context.MoviesTitles.Remove(movie);
            _context.SaveChanges();

            return NoContent();

        }

    }
}