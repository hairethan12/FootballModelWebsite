using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballAnalytics.Core.Entities;

public class OffenseAnalysis
{
    public int Id { get; set; }
    
    public int GameId { get; set; }
    
    [Range(0, 100)]
    public double? RedZoneEfficiency { get; set; }
    
    [Range(0, 100)]
    public double? ThirdDownConversion { get; set; }
    
    [Range(0, 1000)]
    public int? TotalYards { get; set; }
    
    [MaxLength(10)]
    public string? TimeOfPossession { get; set; }
    
    [Range(-10, 10)]
    public int? TurnoverMargin { get; set; }
    
    [Range(0, 20)]
    public int? ScoringDrives { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation property
    [ForeignKey("GameId")]
    public virtual Game Game { get; set; } = null!;
}