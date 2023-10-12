using Authentication.Entities;

namespace Authentication.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {
            
        }

        public DbSet<Project> Project { get; set; }

    }
}
