using System.ComponentModel.DataAnnotations;

namespace NicheFilms.API.Models;

public partial class MoviesRating
{
    [Key]
    public int UserId { get; set; }

    [Key]
    public string ShowId { get; set; } = string.Empty;

    public int? Rating { get; set; }
}