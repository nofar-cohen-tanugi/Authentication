using Authentication.Entities;

namespace Authentication.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {
            
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<PersonalDetails> PersonalDetails { get; set; }



    }
}
