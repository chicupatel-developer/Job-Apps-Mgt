using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EFCore.DBFirst_SQLTOLINQ_Models
{
    public partial class UWContext : DbContext
    {
        public UWContext()
        {
        }

        public UWContext(DbContextOptions<UWContext> options)
            : base(options)
        {
        }

        public virtual DbSet<MigrationHistory> MigrationHistory { get; set; }
        public virtual DbSet<Uuga> Uuga { get; set; }
        public virtual DbSet<Uut> Uut { get; set; }
        public virtual DbSet<Uwuser> Uwuser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=CHICAAMBICA\\SQLExpress;Database=UWContext;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey })
                    .HasName("PK_dbo.__MigrationHistory");

                entity.ToTable("__MigrationHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.Model).IsRequired();

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<Uuga>(entity =>
            {
                entity.ToTable("UUGA");

                entity.Property(e => e.Uugaid).HasColumnName("UUGAId");

                entity.Property(e => e.ChrtAcctDesc)
                    .HasColumnName("Chrt_Acct_Desc")
                    .HasMaxLength(100);

                entity.Property(e => e.ChrtAcctNo).HasColumnName("Chrt_Acct_No");
            });

            modelBuilder.Entity<Uut>(entity =>
            {
                entity.ToTable("UUT");

                entity.Property(e => e.Uutid).HasColumnName("UUTId");

                entity.Property(e => e.CreditAmount).HasColumnName("Credit_Amount");

                entity.Property(e => e.CreditGlNumber)
                    .HasColumnName("Credit_GL_Number")
                    .HasMaxLength(10);

                entity.Property(e => e.DebitAmount).HasColumnName("Debit_Amount");

                entity.Property(e => e.DebitGlNumber)
                    .HasColumnName("Debit_GL_Number")
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Uwuser>(entity =>
            {
                entity.ToTable("UWUser");

                entity.Property(e => e.UwuserId).HasColumnName("UWUserId");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.PhoneNumber).HasMaxLength(12);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
