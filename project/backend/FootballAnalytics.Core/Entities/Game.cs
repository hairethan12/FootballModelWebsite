using System.ComponentModel.DataAnnotations;

namespace FootballAnalytics.Core.Entities;

public class Game
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Opponent { get; set; } = string.Empty;
    
    public DateTime GameDate { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Venue { get; set; } = string.Empty;
    
    public GameType Type { get; set; }
    
    public GameStatus Status { get; set; }
    
    [Range(0, 100)]
    public double WinProbability { get; set; }
    
    public string? LastMeeting { get; set; }
    
    // Navigation properties
    public virtual ICollection<OffenseAnalysis> OffenseAnalyses { get; set; } = new List<OffenseAnalysis>();
    public virtual ICollection<OpponentAnalysis> OpponentAnalyses { get; set; } = new List<OpponentAnalysis>();
}

public enum GameType
{
    Home,
    Away
}

public enum GameStatus
{
    Upcoming,
    InProgress,
    Completed,
    Cancelled
}