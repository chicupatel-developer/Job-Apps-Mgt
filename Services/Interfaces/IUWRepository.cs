using EFCore.DBFirst_SQLTOLINQ_Models;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IUWRepository
    {
        IEnumerable<LeftJoin_Uut_Uuga> GetUutGrpByDebitCredit_GL_Number();
        IEnumerable<Uwuser> GetUniversity_Users();
        string GetUniversity_Users_As_Str();
    }
}
