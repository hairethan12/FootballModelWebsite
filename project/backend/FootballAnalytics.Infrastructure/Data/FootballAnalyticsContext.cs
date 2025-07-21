using FootballAnalytics.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace FootballAnalytics.Infrastructure.Data;

public class FootballAnalyticsContext : DbContext
{
    public FootballAnalyticsContext(DbContextOptions<FootballAnalyticsContext> options) : base(options)
    {
    }

    public DbSet<Game> Games { get; set; }
    public DbSet<OffenseAnalysis> OffenseAnalyses { get; set; }
    public DbSet<OpponentAnalysis> OpponentAnalyses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Game entity configuration
        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Opponent).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Venue).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Type).HasConversion<string>();
            entity.Property(e => e.Status).HasConversion<string>();
        });

        // OffenseAnalysis entity configuration
        modelBuilder.Entity<OffenseAnalysis>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Game)
                  .WithMany(g => g.OffenseAnalyses)
                  .HasForeignKey(e => e.GameId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // OpponentAnalysis entity configuration
        modelBuilder.Entity<OpponentAnalysis>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Game)
                  .WithMany(g => g.OpponentAnalyses)
                  .HasForeignKey(e => e.GameId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Seed data
        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Game>().HasData(
            new Game
            {
                Id = 1,
                Opponent = "State University",
                GameDate = new DateTime(2024, 11, 16, 15, 0, 0),
                Venue = "Home Stadium",
                Type = GameType.Home,
                Status = GameStatus.Upcoming,
                WinProbability = 72.0,
                LastMeeting = "W 28-14 (2023)"
            },
            new Game
            {
                Id = 2,
                Opponent = "Tech College",
                GameDate = new DateTime(2024, 11, 23, 13, 0, 0),
                Venue = "Tech Stadium",
                Type = GameType.Away,
                Status = GameStatus.Upcoming,
                WinProbability = 58.0
            },
            new Game
            {
                Id = 3,
                Opponent = "Metro University",
                GameDate = new DateTime(2024, 11, 29, 19, 0, 0),
                Venue = "Home Stadium",
                Type = GameType.Home,
                Status = GameStatus.Upcoming,
                WinProbability = 81.0
            }
        );
    }
}