using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiarios
    {
        /// <summary>
        /// Inclui um novo Beneficiarios
        /// </summary>
        /// <param name="Beneficiarios">Objeto de Beneficiarios</param>
        public long Incluir(DML.Beneficiarios Beneficiarios)
        {
            DAL.DaoBeneficiarios cli = new DAL.DaoBeneficiarios();
            return cli.Incluir(Beneficiarios);
        }

        /// <summary>
        /// Altera um Beneficiarios
        /// </summary>
        /// <param name="Beneficiarios">Objeto de Beneficiarios</param>
        public void Alterar(DML.Beneficiarios Beneficiarios)
        {
            DAL.DaoBeneficiarios cli = new DAL.DaoBeneficiarios();
            cli.Alterar(Beneficiarios);
        }

        /// <summary>
        /// Consulta o Beneficiarios pelo id
        /// </summary>
        /// <param name="id">id do Beneficiarios</param>
        /// <returns></returns>
        public DML.Beneficiarios Consultar(long id)
        {
            DAL.DaoBeneficiarios cli = new DAL.DaoBeneficiarios();
            return cli.ConsultarBeneficiarios(id);
        }
        /// <summary>
        /// Excluir o Beneficiarios pelo id
        /// </summary>
        /// <param name="id">id do Beneficiarios</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiarios cli = new DAL.DaoBeneficiarios();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os Beneficiarioss
        /// </summary>
        public List<DML.Beneficiarios> Listar(long id)
        {
            DAL.DaoBeneficiarios cli = new DAL.DaoBeneficiarios();
            return cli.Listar(id);
        }
        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF, long id)
        {
            DAL.DaoBeneficiarios cli = new DAL.DaoBeneficiarios();
            return cli.VerificarExistencia(CPF, id);
        }
    }
}
