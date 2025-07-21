using FootballAnalytics.Core.Entities;
using FootballAnalytics.Core.Interfaces;
using FootballAnalytics.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FootballAnalytics.Infrastructure.Repositories;

public class AnalysisRepository : IAnalysisRepository
{
    private readonly FootballAnalyticsContext _context;

    public AnalysisRepository(FootballAnalyticsContext context)
    {
        _context = context;
    }

    public async Task<OffenseAnalysis?> GetOffenseAnalysisByGameIdAsync(int gameId)
    {
        return await _context.OffenseAnalyses
            .Include(o => o.Game)
            .FirstOrDefaultAsync(o => o.GameId == gameId);
    }

    public async Task<OpponentAnalysis?> GetOpponentAnalysisByGameIdAsync(int gameId)
    {
        return await _context.OpponentAnalyses
            .Include(o => o.Game)
            .FirstOrDefaultAsync(o => o.GameId == gameId);
    }

    public async Task<OffenseAnalysis> CreateOffenseAnalysisAsync(OffenseAnalysis analysis)
    {
        _context.OffenseAnalyses.Add(analysis);
        await _context.SaveChangesAsync();
        return analysis;
    }

    public async Task<OpponentAnalysis> CreateOpponentAnalysisAsync(OpponentAnalysis analysis)
    {
        _context.OpponentAnalyses.Add(analysis);
        await _context.SaveChangesAsync();
        return analysis;
    }

    public async Task<OffenseAnalysis?> UpdateOffenseAnalysisAsync(OffenseAnalysis analysis)
    {
        var existingAnalysis = await _context.OffenseAnalyses.FindAsync(analysis.Id);
        if (existingAnalysis == null)
            return null;

        analysis.UpdatedAt = DateTime.UtcNow;
        _context.Entry(existingAnalysis).CurrentValues.SetValues(analysis);
        await _context.SaveChangesAsync();
        return existingAnalysis;
    }

    public async Task<OpponentAnalysis?> UpdateOpponentAnalysisAsync(OpponentAnalysis analysis)
    {
        var existingAnalysis = await _context.OpponentAnalyses.FindAsync(analysis.Id);
        if (existingAnalysis == null)
            return null;

        analysis.UpdatedAt = DateTime.UtcNow;
        _context.Entry(existingAnalysis).CurrentValues.SetValues(analysis);
        await _context.SaveChangesAsync();
        return existingAnalysis;
    }
}