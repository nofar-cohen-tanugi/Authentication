namespace Authentication.Entities
{
    public class Project
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public int DurationInDays { get; set; }
        public int BugsCount { get; set; }
        public bool MadeDadeline { get; set; }

    }
}
