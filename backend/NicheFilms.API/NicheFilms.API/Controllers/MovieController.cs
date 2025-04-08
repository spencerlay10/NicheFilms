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
        [HttpGet]
        public IActionResult GetAllMovies()
        {
            var movies = _context.MoviesTitles.ToList();
            if (movies == null || movies.Count == 0)
            {
                return NotFound("No movie titles found.");
            }
            return Ok(movies);
        }
    }
}
