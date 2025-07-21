using FootballAnalytics.Core.Entities;

namespace FootballAnalytics.Core.Interfaces;

public interface IGameRepository
{
    Task<IEnumerable<Game>> GetAllAsync();
    Task<Game?> GetByIdAsync(int id);
    Task<Game?> GetUpcomingGameAsync();
    Task<Game> CreateAsync(Game game);
    Task<Game?> UpdateAsync(Game game);
    Task<bool> DeleteAsync(int id);
}