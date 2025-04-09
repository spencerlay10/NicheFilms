using System;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Models;

namespace NicheFilms.API.Data;

public partial class NicheFilmsDbContext : DbContext
{
    public NicheFilmsDbContext() { }

    public NicheFilmsDbContext(DbContextOptions<NicheFilmsDbContext> options)
        : base(options) { }

    public virtual DbSet<HybridRecommendation> HybridRecommendations { get; set; }
    public virtual DbSet<MoviesRating> MoviesRatings { get; set; }
    public virtual DbSet<MoviesTitle> MoviesTitles { get; set; }
    public virtual DbSet<MoviesUser> MoviesUsers { get; set; }
    public virtual DbSet<UserRecommendation> UserRecommendations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HybridRecommendation>(entity =>
        {
            entity.HasNoKey().ToTable("hybrid_recommendations");

            entity.Property(e => e.ShowId)
                .HasMaxLength(20)
                .HasColumnName("show_id");

            for (int i = 1; i <= 10; i++)
            {
                entity.Property<string>($"Rec{i}")
                      .HasColumnType("text")
                      .HasColumnName($"rec_{i}");
            }
        });

        modelBuilder.Entity<MoviesRating>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ShowId });

            entity.ToTable("movies_ratings");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ShowId)
                .HasMaxLength(20)
                .HasColumnName("show_id");
            entity.Property(e => e.Rating).HasColumnName("rating");
        });

        modelBuilder.Entity<MoviesTitle>(entity =>
        {
            entity.HasNoKey().ToTable("movies_titles");

            entity.Property(e => e.ShowId)
                .HasMaxLength(20)
                .HasColumnName("show_id");

            entity.Property(e => e.PosterUrl).HasColumnType("text").HasColumnName("posterURL");
            entity.Property(e => e.Rating).HasColumnType("text").HasColumnName("rating");
            entity.Property(e => e.Title).HasColumnType("text").HasColumnName("title");
            entity.Property(e => e.Type).HasColumnType("text").HasColumnName("type");
            entity.Property(e => e.Country).HasColumnType("text").HasColumnName("country");
            entity.Property(e => e.Cast).HasColumnType("text").HasColumnName("cast");
            entity.Property(e => e.Description).HasColumnType("text").HasColumnName("description");
            entity.Property(e => e.Director).HasColumnType("text").HasColumnName("director");
            entity.Property(e => e.Duration).HasColumnType("text").HasColumnName("duration");
            entity.Property(e => e.Genres).HasColumnType("text").HasColumnName("genres");

            // Boolean genre columns (example)
            entity.Property(e => e.AnimeSeriesInternationalTvShows).HasColumnName("Anime Series International TV Shows");
            entity.Property(e => e.BritishTvShowsDocuseriesInternationalTvShows).HasColumnName("British TV Shows Docuseries International TV Shows");
            entity.Property(e => e.ComediesDramasInternationalMovies).HasColumnName("Comedies Dramas International Movies");
            entity.Property(e => e.ComediesInternationalMovies).HasColumnName("Comedies International Movies");
            entity.Property(e => e.ComediesRomanticMovies).HasColumnName("Comedies Romantic Movies");
            entity.Property(e => e.CrimeTvShowsDocuseries).HasColumnName("Crime TV Shows Docuseries");
            entity.Property(e => e.DocumentariesInternationalMovies).HasColumnName("Documentaries International Movies");
            entity.Property(e => e.DramasInternationalMovies).HasColumnName("Dramas International Movies");
            entity.Property(e => e.DramasRomanticMovies).HasColumnName("Dramas Romantic Movies");
            entity.Property(e => e.FamilyMovies).HasColumnName("Family Movies");
            entity.Property(e => e.HorrorMovies).HasColumnName("Horror Movies");
            entity.Property(e => e.InternationalMoviesThrillers).HasColumnName("International Movies Thrillers");
            entity.Property(e => e.InternationalTvShowsRomanticTvShowsTvDramas).HasColumnName("International TV Shows Romantic TV Shows TV Dramas");
            entity.Property(e => e.KidsTv).HasColumnName("Kids' TV");
            entity.Property(e => e.LanguageTvShows).HasColumnName("Language TV Shows");
            entity.Property(e => e.NatureTv).HasColumnName("Nature TV");
            entity.Property(e => e.RealityTv).HasColumnName("Reality TV");
            entity.Property(e => e.ReleaseYear).HasColumnName("release_year");
            entity.Property(e => e.TalkShowsTvComedies).HasColumnName("Talk Shows TV Comedies");
            entity.Property(e => e.TvAction).HasColumnName("TV Action");
            entity.Property(e => e.TvComedies).HasColumnName("TV Comedies");
            entity.Property(e => e.TvDramas).HasColumnName("TV Dramas");
        });

        modelBuilder.Entity<MoviesUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__movies_u__B9BE370FEEC98B61");

            entity.ToTable("movies_users");

            entity.Property(e => e.UserId).ValueGeneratedNever().HasColumnName("user_id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.AmazonPrime).HasColumnName("Amazon Prime");
            entity.Property(e => e.AppleTv).HasColumnName("Apple TV+");
            entity.Property(e => e.BinnedAge).HasMaxLength(10).HasColumnName("binned_age");
            entity.Property(e => e.City).HasMaxLength(100).HasColumnName("city");
            entity.Property(e => e.Disney).HasColumnName("Disney+");
            entity.Property(e => e.Email).HasMaxLength(100).HasColumnName("email");
            entity.Property(e => e.Gender).HasMaxLength(10).HasColumnName("gender");
            entity.Property(e => e.Name).HasMaxLength(100).HasColumnName("name");
            entity.Property(e => e.Paramount).HasColumnName("Paramount+");
            entity.Property(e => e.Phone).HasMaxLength(50).HasColumnName("phone");
            entity.Property(e => e.State).HasMaxLength(2).IsUnicode(false).IsFixedLength().HasColumnName("state");
            entity.Property(e => e.Zip).HasMaxLength(10).IsUnicode(false).IsFixedLength().HasColumnName("zip");
        });

        modelBuilder.Entity<UserRecommendation>(entity =>
        {
            entity.HasNoKey().ToTable("user_recommendations");

            entity.Property(e => e.UserId).HasColumnName("user_id");

            foreach (var prefix in new[] { "rec", "tv_rec", "movie_rec", "niche_rec" })
            {
                for (int i = 1; i <= 20; i++)
                {
                    entity.Property<string>($"{Capitalize(prefix)}{i}")
                          .HasColumnType("text")
                          .HasColumnName($"{prefix}_{i}");
                }
            }

            static string Capitalize(string input) =>
                char.ToUpper(input[0]) + input.Substring(1);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
