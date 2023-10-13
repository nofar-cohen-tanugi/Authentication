namespace Authentication.Entities
{
    public class PersonalDetails : Base
    {
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime JoinedAt { get; set; }
        public string Avatar { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
