namespace FootballAnalytics.API.Models
{
    public class OpponentPredictionRequest
    {
        public int Period { get; set; }
        public string Clock { get; set; } = string.Empty;
        public int OffenseScore { get; set; }
        public int DefenseScore { get; set; }
        public int YardsToGoal { get; set; }
        public int Down { get; set; }
        public int Distance { get; set; }
        public string PlayType { get; set; } = string.Empty;
    }
}
