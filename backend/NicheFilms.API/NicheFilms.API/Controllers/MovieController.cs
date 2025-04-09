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
        public IActionResult GetAllMovies([FromQuery] int skip = 0, [FromQuery] int take = 100)
            {
            var movies = _context.MoviesTitles
                .Skip(skip)
                .Take(take)
                .ToList();

            return Ok(movies);
        }

    }
