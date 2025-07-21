using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballAnalytics.Core.Entities;

public class OpponentAnalysis
{
    public int Id { get; set; }
    
    public int GameId { get; set; }
    
    [Range(1, 150)]
    public int? DefenseRanking { get; set; }
    
    [Range(0, 10)]
    public double? SacksPerGame { get; set; }
    
    [Range(0, 100)]
    public double? InterceptionRate { get; set; }
    
    [Range(0, 100)]
    public double? RedZoneDefense { get; set; }
    
    [Range(0, 100)]
    public double? AveragePointsAllowed { get; set; }
    
    [Range(0, 100)]
    public double? ThirdDownDefense { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation property
    [ForeignKey("GameId")]
    public virtual Game Game { get; set; } = null!;
}