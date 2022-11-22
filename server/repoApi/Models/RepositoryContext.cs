using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace repoApi.Models{
 public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options)
            : base(options)
        {
            
        }

        public DbSet<RepositoryItem> RepositoryItems { get; set; } = null!;
    }

}