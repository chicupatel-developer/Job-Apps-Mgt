using System;
using System.Collections.Generic;
using System.Text;
using EFCore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EFCore.Context
{
    public class JobResumeConfiguration : IEntityTypeConfiguration<JobResume>
    {
        public void Configure(EntityTypeBuilder<JobResume> builder)
        {
            builder.HasKey(c => c.JobResumeId);

            builder.Property(c => c.FileName)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(c => c.FilePath)
              .IsRequired();
        }
    }
}
