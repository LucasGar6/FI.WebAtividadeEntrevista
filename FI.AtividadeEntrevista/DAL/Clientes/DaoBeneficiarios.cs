using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FI.AtividadeEntrevista.DML;

namespace FI.AtividadeEntrevista.DAL
{
    /// <summary>
    /// Classe de acesso a dados de Beneficiarios
    /// </summary>
    internal class DaoBeneficiarios : AcessoDados
    {
        /// <summary>
        /// Inclui um novo Beneficiarios
        /// </summary>
        /// <param name="Beneficiarios">Objeto de Beneficiarios</param>
        internal long Incluir(DML.Beneficiarios Beneficiarios)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
            
            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", Beneficiarios.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", Beneficiarios.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IdCliente", Beneficiarios.IdCliente));

            DataSet ds = base.Consultar("FI_SP_IncBeneficiariosV2", parametros);
            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);
            return ret;
        }
        internal bool VerificarExistencia(string CPF, long id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IdCliente", id));

            DataSet ds = base.Consultar("FI_SP_VerificaBeneficiarios", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }
        internal DML.Beneficiarios ConsultarBeneficiarios(long Id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("IdCliente", Id));

            DataSet ds = base.Consultar("FI_SP_ConsBeneficiarios", parametros);
            List<DML.Beneficiarios> cli = ConverterBeneficiario(ds);

            return cli.FirstOrDefault();
        }
        /// <summary>
        /// Lista todos os Beneficiarioss
        /// </summary>
        internal List<DML.Beneficiarios> Listar(long id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("IdCliente", id));

            DataSet ds = base.Consultar("FI_SP_ConsBeneficiarios", parametros);
            List<DML.Beneficiarios> cli = ConverterBeneficiario(ds);

            return cli;
        }

        /// <summary>
        /// Inclui um novo Beneficiarios
        /// </summary>
        /// <param name="Beneficiarios">Objeto de Beneficiarios</param>
        internal void Alterar(DML.Beneficiarios Beneficiarios)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", Beneficiarios.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", Beneficiarios.Id));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", Beneficiarios.CPF));

            base.Executar("FI_SP_AltBenef", parametros);
        }


        /// <summary>
        /// Excluir Beneficiarios
        /// </summary>
        /// <param name="Beneficiarios">Objeto de Beneficiarios</param>
        internal void Excluir(long Id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Id", Id));

            base.Executar("FI_SP_DelBeneficiarios", parametros);
        }
        private List<DML.Beneficiarios> ConverterBeneficiario(DataSet ds)
        {
            List<DML.Beneficiarios> lista = new List<DML.Beneficiarios>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.Beneficiarios cli = new DML.Beneficiarios();
                    cli.Id = row.Field<long>("Id");
                    cli.Nome = row.Field<string>("Nome");
                    cli.CPF = row.Field<string>("CPF");
                    cli.IdCliente = row.Field<long>("IdCliente");
                    lista.Add(cli);
                }
            }
            return lista;
        }
    }
}
