using FootballAnalytics.Core.Entities;
using FootballAnalytics.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FootballAnalytics.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly IGameRepository _gameRepository;

    public GamesController(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Game>>> GetGames()
    {
        var games = await _gameRepository.GetAllAsync();
        return Ok(games);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Game>> GetGame(int id)
    {
        var game = await _gameRepository.GetByIdAsync(id);
        
        if (game == null)
        {
            return NotFound();
        }

        return Ok(game);
    }

    [HttpGet("upcoming")]
    public async Task<ActionResult<Game>> GetUpcomingGame()
    {
        var upcomingGame = await _gameRepository.GetUpcomingGameAsync();
        
        if (upcomingGame == null)
        {
            return NotFound();
        }

        return Ok(upcomingGame);
    }

    [HttpPost]
    public async Task<ActionResult<Game>> CreateGame(Game game)
    {
        var createdGame = await _gameRepository.CreateAsync(game);
        return CreatedAtAction(nameof(GetGame), new { id = createdGame.Id }, createdGame);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGame(int id, Game game)
    {
        if (id != game.Id)
        {
            return BadRequest();
        }

        var updatedGame = await _gameRepository.UpdateAsync(game);
        
        if (updatedGame == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(int id)
    {
        var result = await _gameRepository.DeleteAsync(id);
        
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}