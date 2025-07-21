using FootballAnalytics.Core.Entities;
using FootballAnalytics.Core.Interfaces;
using FootballAnalytics.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FootballAnalytics.Infrastructure.Repositories;

public class GameRepository : IGameRepository
{
    private readonly FootballAnalyticsContext _context;

    public GameRepository(FootballAnalyticsContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Game>> GetAllAsync()
    {
        return await _context.Games
            .OrderBy(g => g.GameDate)
            .ToListAsync();
    }

    public async Task<Game?> GetByIdAsync(int id)
    {
        return await _context.Games
            .Include(g => g.OffenseAnalyses)
            .Include(g => g.OpponentAnalyses)
            .FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<Game?> GetUpcomingGameAsync()
    {
        return await _context.Games
            .Where(g => g.Status == GameStatus.Upcoming)
            .OrderBy(g => g.GameDate)
            .FirstOrDefaultAsync();
    }

    public async Task<Game> CreateAsync(Game game)
    {
        _context.Games.Add(game);
        await _context.SaveChangesAsync();
        return game;
    }

    public async Task<Game?> UpdateAsync(Game game)
    {
        var existingGame = await _context.Games.FindAsync(game.Id);
        if (existingGame == null)
            return null;

        _context.Entry(existingGame).CurrentValues.SetValues(game);
        await _context.SaveChangesAsync();
        return existingGame;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var game = await _context.Games.FindAsync(id);
        if (game == null)
            return false;

        _context.Games.Remove(game);
        await _context.SaveChangesAsync();
        return true;
    }
}