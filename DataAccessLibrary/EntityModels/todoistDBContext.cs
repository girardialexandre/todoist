using System;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLibrary.Models
{
    public partial class TodoistDBContext : DbContext
    {
        public TodoistDBContext()
        {
        }

        public TodoistDBContext(DbContextOptions<TodoistDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activity> Activities { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-07V7CJD;Database=todoistDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.HasKey(e => e.ActivityId)
                    .HasName("PK_Activity");

                entity.Property(e => e.DateCompletion).HasColumnType("date");

                entity.Property(e => e.DateCreation).HasColumnType("date");

                entity.Property(e => e.DateEdition).HasColumnType("date");

                entity.Property(e => e.DateRemoval).HasColumnType("date");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Title).IsRequired();
            });
        }
    }
}
