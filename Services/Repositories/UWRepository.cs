using EFCore.DBFirst_SQLTOLINQ_Models;
using Services.DTO;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Repositories
{
    public class UWRepository : IUWRepository
    {
        private readonly UWContext uwContext;

        public UWRepository(UWContext uwContext)
        {
            this.uwContext = uwContext;
        }
        public IEnumerable<LeftJoin_Uut_Uuga> GetUutGrpByDebitCredit_GL_Number()
        {
            List<UutGrpByDebitCredit_GL_Number> datas = new List<UutGrpByDebitCredit_GL_Number>();
            List<UutGrpByDebitCredit_GL_Number> grpByGL_Number_Datas = new List<UutGrpByDebitCredit_GL_Number>();
            List<LeftJoin_Uut_Uuga> joinDatas = new List<LeftJoin_Uut_Uuga>();

            // 1))
            // group by DebitGlNumber
            // SQL
            /*
            	select UUT.Debit_GL_Number as GL_Number, Sum(UUT.Debit_Amount) as Debit_Amount, 0 as Credit_Amount
	            from UUT
	            group by UUT.Debit_GL_Number
            */
            var grpByDebitGlNumber = uwContext.Uut.GroupBy(c => c.DebitGlNumber).
                  Select(g => new
                  {
                      GL_number = g.Key,
                      Debit_Amount = g.Sum(s => s.DebitAmount),
                      Credit_Amount = 0
                  });
            foreach (var f in grpByDebitGlNumber)
            {
                datas.Add(new UutGrpByDebitCredit_GL_Number()
                {
                    GL_Number = f.GL_number,
                    Debit_Amount = (int)f.Debit_Amount,
                    Credit_Amount = f.Credit_Amount
                });
            }

            // 2))
            // group by CreditGlNumber
            // SQL
            /*
            	select UUT.Credit_GL_Number as GL_Number, 0 as Debit_Amount, Sum(UUT.Credit_Amount) as Credit_Amount
	            from UUT
	            group by UUT.Credit_GL_Number 
            */
            var grpByCreditGlNumber = uwContext.Uut.GroupBy(c => c.CreditGlNumber).
                Select(g => new
                {
                    GL_number = g.Key,
                    Debit_Amount = 0,
                    Credit_Amount = g.Sum(s => s.CreditAmount)
                });
            foreach (var f in grpByCreditGlNumber)
            {
                datas.Add(new UutGrpByDebitCredit_GL_Number()
                {
                    GL_Number = f.GL_number,
                    Debit_Amount = f.Debit_Amount,
                    Credit_Amount = (int)f.Credit_Amount
                });
            }


            // 3))
            // [[group by GL_Number, Sum<Debit_Amount>, Sum<Credit_Amount>]] for,,, <outer-query>
            var grpByGL_Number = datas.GroupBy(c => c.GL_Number).
                Select(g => new
                {
                    GL_number = g.Key,
                    Debit_Amount = g.Sum(s => s.Debit_Amount),
                    Credit_Amount = g.Sum(s => s.Credit_Amount)
                });
            foreach (var f in grpByGL_Number)
            {
                grpByGL_Number_Datas.Add(new UutGrpByDebitCredit_GL_Number()
                {
                    GL_Number = f.GL_number,
                    Debit_Amount = f.Debit_Amount,
                    Credit_Amount = f.Credit_Amount
                });
            }


            // 4))
            // join and order by
            var result = from UUT in grpByGL_Number_Datas
                         join UUGA in uwContext.Uuga.ToList()
                         on UUT.GL_Number.Replace("-", string.Empty) equals UUGA.ChrtAcctNo.ToString()
                         orderby UUT.GL_Number
                         select new
                         {
                             GL_Number = UUT.GL_Number,
                             Debit_Amount = UUT.Debit_Amount,
                             Credit_Amount = UUT.Credit_Amount,
                             Net_Amount = UUT.Debit_Amount - UUT.Credit_Amount,
                             Chrt_Acct_Desc = UUGA.ChrtAcctDesc
                         };
            foreach (var f in result)
            {
                joinDatas.Add(new LeftJoin_Uut_Uuga()
                {
                    GL_Number = f.GL_Number,
                    Chrt_Acct_Desc = f.Chrt_Acct_Desc,
                    Debit_Amount = f.Debit_Amount,
                    Credit_Amount = f.Credit_Amount,
                    Net_Amount = f.Net_Amount
                });
            }

            return joinDatas;
        }
    
        public IEnumerable<Uwuser> GetUniversity_Users()
        {
            List<Uwuser> users = new List<Uwuser>();
            users = uwContext.Uwuser.ToList();
            return users;
        }

        public string GetUniversity_Users_As_Str()
        {
            var builder = new StringBuilder();
            builder.AppendLine("Id,FirstName,LastName,Email,PhoneNumber");
            var users = GetUniversity_Users();
            foreach (var user in users)
            {
                builder.AppendLine($"{user.UwuserId},{user.FirstName},{user.LastName},{user.Email},{user.PhoneNumber}");
            }
            return builder.ToString();
        }
    }
}
