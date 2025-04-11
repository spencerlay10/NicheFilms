using System;
using System.Collections.Generic;

namespace NicheFilms.API.Models;


// Represents a hybrid recommendation for movies, including multiple recommendations for a specific show ID
public partial class HybridRecommendation
{
    public string? ShowId { get; set; }

    public string? Rec1 { get; set; }
    public string? Rec2 { get; set; }
    public string? Rec3 { get; set; }
    public string? Rec4 { get; set; }
    public string? Rec5 { get; set; }
    public string? Rec6 { get; set; }
    public string? Rec7 { get; set; }
    public string? Rec8 { get; set; }
    public string? Rec9 { get; set; }
    public string? Rec10 { get; set; }
}
