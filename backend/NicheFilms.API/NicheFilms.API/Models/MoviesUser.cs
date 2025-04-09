using System;
using System.Collections.Generic;

namespace NicheFilms.API.Models;

public partial class MoviesUser
{
    public int UserId { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public int? Age { get; set; }

    public string? Gender { get; set; }

    public bool? Netflix { get; set; }

    public bool? AmazonPrime { get; set; }

    public bool? Disney { get; set; }

    public bool? Paramount { get; set; }

    public bool? Max { get; set; }

    public bool? Hulu { get; set; }

    public bool? AppleTv { get; set; }

    public bool? Peacock { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Zip { get; set; }

    public string? BinnedAge { get; set; }
}
