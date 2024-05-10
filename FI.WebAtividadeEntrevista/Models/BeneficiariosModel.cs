using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        public string Nome { get; set; }
        public string CPF { get; set; }
        public long Id { get; set; }
        public long IdCliente { get; set; }
    }
}