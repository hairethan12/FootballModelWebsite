using FootballAnalytics.API.Models;
using FootballAnalytics.Core.Entities;
using FootballAnalytics.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FootballAnalytics.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalysisController : ControllerBase
{
    private readonly IAnalysisRepository _analysisRepository;

    public AnalysisController(IAnalysisRepository analysisRepository)
    {
        _analysisRepository = analysisRepository;
    }

    [HttpGet("offense/{gameId}")]
    public async Task<ActionResult<OffenseAnalysis>> GetOffenseAnalysis(int gameId)
    {
        var analysis = await _analysisRepository.GetOffenseAnalysisByGameIdAsync(gameId);
        
        if (analysis == null)
        {
            return NotFound();
        }

        return Ok(analysis);
    }

    [HttpGet("opponent/{gameId}")]
    public async Task<ActionResult<OpponentAnalysis>> GetOpponentAnalysis(int gameId)
    {
        var analysis = await _analysisRepository.GetOpponentAnalysisByGameIdAsync(gameId);
        
        if (analysis == null)
        {
            return NotFound();
        }

        return Ok(analysis);
    }

    [HttpPost("offense")]
    public async Task<ActionResult<OffenseAnalysis>> CreateOffenseAnalysis(OffenseAnalysis analysis)
    {
        var createdAnalysis = await _analysisRepository.CreateOffenseAnalysisAsync(analysis);
        return CreatedAtAction(nameof(GetOffenseAnalysis), new { gameId = createdAnalysis.GameId }, createdAnalysis);
    }

    [HttpPost("opponent")]
    public async Task<ActionResult<OpponentAnalysis>> CreateOpponentAnalysis(OpponentAnalysis analysis)
    {
        var createdAnalysis = await _analysisRepository.CreateOpponentAnalysisAsync(analysis);
        return CreatedAtAction(nameof(GetOpponentAnalysis), new { gameId = createdAnalysis.GameId }, createdAnalysis);
    }

    [HttpPut("offense/{id}")]
    public async Task<IActionResult> UpdateOffenseAnalysis(int id, OffenseAnalysis analysis)
    {
        if (id != analysis.Id)
        {
            return BadRequest();
        }

        var updatedAnalysis = await _analysisRepository.UpdateOffenseAnalysisAsync(analysis);
        
        if (updatedAnalysis == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("opponent/{id}")]
    public async Task<IActionResult> UpdateOpponentAnalysis(int id, OpponentAnalysis analysis)
    {
        if (id != analysis.Id)
        {
            return BadRequest();
        }

        var updatedAnalysis = await _analysisRepository.UpdateOpponentAnalysisAsync(analysis);
        
        if (updatedAnalysis == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPost("predict")]
    public ActionResult<object> PredictPlay([FromBody] PlayPredictionRequest request)
    {
        // Placeholder logic – you’ll replace this with your model later
        double predictedYards = request.PlayType.ToLower() == "rush"
            ? 4.3
            : 6.2;

        var similarPlay = new
        {
            play_text = "Kedon Slovis pass short left to Kody Epps for 7 yards",
            actual_yards = 7,
            date = "2023-09-21"
        };

        return Ok(new
        {
            predicted_yards = predictedYards,
            similar_play = similarPlay
        });
    }

    [HttpPost("defense-predict")]
    public IActionResult GetOpponentPrediction([FromBody] OpponentPredictionRequest request)
    {
        var mockResult = new
        {
            play_type_probabilities = new
            {
                pass = 0.68,
                rush = 0.32
            },
            possible_receivers = new[]
            {
            "Boogie Wilson",
            "Chamon Metayer",
            "Kyson Brown"
        }
        };

        return Ok(mockResult);
    }


}