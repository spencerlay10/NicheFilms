using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;
using Microsoft.AspNetCore.Authorization;
namespace NicheFilms.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly NicheFilmsDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public MovieController(NicheFilmsDbContext context, UserManager<IdentityUser> usermanager)
        {
            _context = context;
            _userManager = usermanager;
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

        [Authorize]
        [HttpGet("user")]
        public async Task<IActionResult> GetUserMovies()
        {
            var userIdString = _userManager.GetUserId(User);
            if (!int.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var userMovies = await _context.MoviesUsers
                                           .Where(mu => mu.UserId == userId)
                                           .ToListAsync();

            return Ok(userMovies);
        }

    }
}
