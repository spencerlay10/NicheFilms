using System.ComponentModel.DataAnnotations;

namespace NicheFilms.API.Models;

// Represents a user's rating for a specific movie or show
public partial class MoviesRating
{
    [Key]
    public int UserId { get; set; }

    [Key]
    public string ShowId { get; set; } = string.Empty;

    public int? Rating { get; set; }
}