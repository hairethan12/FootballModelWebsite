using FootballAnalytics.Core.Entities;

namespace FootballAnalytics.Core.Interfaces;

public interface IAnalysisRepository
{
    Task<OffenseAnalysis?> GetOffenseAnalysisByGameIdAsync(int gameId);
    Task<OpponentAnalysis?> GetOpponentAnalysisByGameIdAsync(int gameId);
    Task<OffenseAnalysis> CreateOffenseAnalysisAsync(OffenseAnalysis analysis);
    Task<OpponentAnalysis> CreateOpponentAnalysisAsync(OpponentAnalysis analysis);
    Task<OffenseAnalysis?> UpdateOffenseAnalysisAsync(OffenseAnalysis analysis);
    Task<OpponentAnalysis?> UpdateOpponentAnalysisAsync(OpponentAnalysis analysis);
}