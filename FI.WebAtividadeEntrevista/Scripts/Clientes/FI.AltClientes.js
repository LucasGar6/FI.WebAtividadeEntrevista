$(document).ready(function () {
    preencherCampos();

    //Evitar preencher números em campos de texto
    document.addEventListener("keypress", evitarNumeros);

    // Formatador de CPF
    document.getElementById('CPF').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    // Formatador de CEP
    document.getElementById('CEP').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    // Formatador de Telefone
    document.getElementById('Telefone').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    });
    // Formatador de CPFBeneficiario
    document.getElementById('CPFBeneficiario').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        var clienteData = {
            "Nome": $("#Nome").val(),
            "CEP": $("#CEP").val(),
            "Email": $("#Email").val(),
            "Sobrenome": $("#Sobrenome").val(),
            "Nacionalidade": $("#Nacionalidade").val(),
            "Estado": $("#Estado").val(),
            "Cidade": $("#Cidade").val(),
            "Logradouro": $("#Logradouro").val(),
            "Telefone": $("#Telefone").val(),
            "CPF": $("#CPF").val(),
            "Beneficiarios": []
        };

        var tList = document.getElementById("listaBeneficiarios");

        // Verificar se há linhas na tabela
        if (tList.rows.length > 0) {
            // Percorrer cada linha do tbody
            for (var i = 0; i < tList.rows.length; i++) {
                var row = tList.rows[i];

                var nome = row.cells[1].innerText;
                var cpf = row.cells[0].innerText; 

                // Criar objeto beneficiario
                var beneficiario = {
                    "Nome": nome,
                    "CPF": cpf
                };

                // Adicionar objeto à lista de beneficiários
                clienteData.Beneficiarios.push(beneficiario);
            }
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: JSON.stringify(clienteData),
            contentType: "application/json",
            error: function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success: function (r) {
                ModalDialog("Sucesso!", r);
            }
        });
    });
});
// Chama a função para abrir o modal
function openModal() {
    $('#modalBeneficiario').modal('show');
}
function incluirBeneficiario() {
    // Obter os valores dos campos CPF e Nome
    var cpf = document.getElementById("CPFBeneficiario").value.trim();
    var nome = document.getElementById("NomeBeneficiario").value.trim();

    // Verificar se os campos estão preenchidos
    if (cpf === '' || nome === '') {
        alert('Por favor, preencha todos os campos antes de incluir um beneficiário.');
        return;
    }
    // Verificar se o CPF já existe na lista
    var listaBeneficiarios = document.getElementById("listaBeneficiarios");
    for (var i = 0; i < listaBeneficiarios.rows.length; i++) {
        var cpfExistente = listaBeneficiarios.rows[i].cells[0].innerText;
        if (cpfExistente === cpf) {
            alert('O CPF informado já existe na lista.');
            return;
        }
    }

    // Criar uma nova linha para a tabela listaBeneficiarios
    var newRow = document.createElement("tr");

    // Adicionar as células com os valores de CPF, Nome e botões de ação
    newRow.innerHTML = `
            <td>${cpf}</td>
            <td>${nome}</td>
            <td style="text-align:right">
                <button class="btn btn-info btn-sm" onclick="">Alterar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirBeneficiario(this)">Excluir</button>
            </td>
        `;
    // Adicionar a nova linha à tabela listaBeneficiarios
    document.getElementById("listaBeneficiarios").appendChild(newRow);

    // Limpar os campos de CPF e Nome após a inclusão
    document.getElementById("CPFBeneficiario").value = "";
    document.getElementById("NomeBeneficiario").value = "";
}
function excluirBeneficiario(btnExcluir) {
    // Obter a linha correspondente ao botão "Excluir" clicado
    var row = btnExcluir.closest('tr');

    // Remover a linha da tabela listaBeneficiarios
    row.remove();
}
// Função para preencher dados na tela "Alterar" passando ID do cliente na URL
function preencherCampos() {
    document.getElementById('Nome').value = obj.Nome;
    document.getElementById('Sobrenome').value = obj.Sobrenome;
    document.getElementById('CPF').value = obj.CPF;
    document.getElementById('Nacionalidade').value = obj.Nacionalidade;
    document.getElementById('CEP').value = obj.CEP;
    document.getElementById('Estado').value = obj.Estado;
    document.getElementById('Cidade').value = obj.Cidade;
    document.getElementById('Logradouro').value = obj.Logradouro;
    document.getElementById('Email').value = obj.Email;
    document.getElementById('Telefone').value = obj.Telefone;

    // Preencher a lista de beneficiários
    var listaBeneficiarios = document.getElementById("listaBeneficiarios");
    // Limpar a tabela antes de preencher novamente
    listaBeneficiarios.innerHTML = '';

    // Iterar sobre a lista de beneficiários
    for (var i = 0; i < obj.Beneficiarios.length; i++) {
        var beneficiario = obj.Beneficiarios[i];
        var cpf = beneficiario.CPF;
        var nome = beneficiario.Nome;

        // Criar uma nova linha para a tabela listaBeneficiarios
        var newRow = document.createElement("tr");
        // Adicionar as células com os valores de CPF, Nome e botões de ação
        newRow.innerHTML = `
            <td>${cpf}</td>
            <td>${nome}</td>
            <td style="text-align:right">
                <button class="btn btn-info btn-sm" onclick="">Alterar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirBeneficiario(this)">Excluir</button>
            </td>
        `;
        // Adicionar a nova linha à tabela listaBeneficiarios
        listaBeneficiarios.appendChild(newRow);
    }
}
function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
// Função para validar e impedir a inserção de números em campos específicos
function evitarNumeros(event) {
    var key = event.keyCode || event.which;
    var tecla = String.fromCharCode(key);
    var permitido = /[0-9]/; 

    var camposEspecificos = ["Nome", "Sobrenome", "Nacionalidade", "Estado", "Cidade", "NomeBeneficiario"];

    if (camposEspecificos.includes(event.target.id)) {
        // Se a tecla digitada for um número, cancela a inserção
        if (permitido.test(tecla)) {
            event.preventDefault();
        }
    }
}
