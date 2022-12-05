using Microsoft.EntityFrameworkCore;
using SingnalR.API.Model;

namespace SingnalR.API.Db
{
    public class SignalRContext : DbContext
    {
        public SignalRContext(DbContextOptions<SignalRContext> options)
            : base(options)
        {

        }

        public DbSet<Issue> Issues { get; set; }
    }
}
