/**
 * Arquivo: Controller.js
 * Data: 10/12/2017
 * Descrição: Esse arquivo vai conter o código do 'funcionarioCTRL', a qual controlerá os módules de funcionarios
 * realizar as operações do CRUD por maio do ng-app na parte view da aplicação
 * Author: Eduardo Estevão
 */

//Controller - Funcionário:
funcionarioApp.controller('funcionarioCTRL', function ($scope, funcionarioService) {
    //Aqui estamos carregando todos os dados gravados do Funcionario quando a oágina for recarregada
    carregarFuncionarios();

    //Método responsável por carregar todas as propriedades de funcionários
    function carregarFuncionarios() {
        var listarFuncionarios = funcionarioService.getTodosFuncionarios();

        listarFuncionarios.then(function (d) {
            //se tudo der certo:
            $scope.Funcionarios = d.data;
        },

            function () {
                alert("Ocorreu um erro ao tentar listar todos os funcionários")
            });


    }

    //Método responsável por adicionar cada propriedade de um novo Funcionário

    $scope.adicionarFuncionario = function () {
        var funcioario = {
            funcionarioId: $scope.funcionarioId,
            nome: $scope.nome,
            email: $scope.email,
            departamento: $scope.departamento,
            cargo: $scope.cargo,
        };

        var adicionarInfos = funcionarioService.adicionarFuncionario(funcioario);

        adicionarInfos.then(function (d) {
            if (d.data.success === true) {
                carregarFuncionarios();
                alert("Funcionário adicionado com sucesso!");

                $scope.limpaDados();

            } else { alert("Funcionário não adicionado"); }
        },
            function () {
                alert("Erro ocorrido ao tentar adicionar");
            });

    }

    //Limpa os campos após inserir os dados no db
    $scope.limpaDados = function () {
        $scope.funcionarioId = '';
            $scope.nome = '';
            $scope.email = '';
            $scope.departamento = '';
            $scope.cargo = '';

    }

    //Método responsável por atualizar Funcionario pelo Id:
    $scope.atualizarFuncionarioPorId = function (funcionario) {

        $scope.AtualizadoFuncionarioId = funcionario.FuncionarioId;
        $scope.AtualizadoNome = funcionario.Nome;
        $scope.AtualizadoEmail = funcionario.Email;
        $scope.AtualizadoDepartamento = funcionario.Departamento;
        $scope.AtualizadoCargo = funcionario.Cargo;
    }

    //Método responsável por resgatar os dados para exclusão do Funcionário:
    $scope.excluirFuncionarioPorId = function (funcionario) {
        $scope.AtualizadoFuncionarioId = funcionario.FuncionarioId;
        $scope.AtualizadoNome = funcionario.Nome;
    }

    //Método responsável por atualizar dados do Funcionario:
    $scope.atualizarFuncionario = function () {
        var funcionario = {
            FuncionarioId: $scope.AtualizadoFuncionarioId,
            Nome: $scope.AtualizadoNome,
            Email: $scope.AtualizadoEmail,
            Departamento: $scope.AtualizadoDepartamento,
            Cargo: $scope.AtualizadoCargo,
        };

        var atualizarInfos = funcionarioService.atualizarFuncionario(funcionario);
        atualizarInfos.then(function (d) {
            if (d.data.success === true) {
                carregarFuncionarios();

                alert("Funcionário Atualizado com Sucesso");
                $scope.limpaDadosAtualizados();
            } else {
                alert("Funcionário não Atualizado");
            }
        }, function () {
            alert("Ocorreu um errro ao tentar atualizar o Funcionário");
        });
    }

    //Método responável por Limpar os Dados de Atualizar Funcionarios:
    $scope.limpaDadosAtualizados = function () {
        $scope.AtualizadoFuncionarioPorId = '';
            $scope.AtualizadoNome = '';
            $scope.AtualizadoEmail = '';
            $scope.AtualizadoDepartamento = '';
        $scope.AtualizadoCargo = '';

    }

    //Método responsável por Excluir Funcionario pelo Id:

    $scope.excluirFuncionario = function (AtualizadoFuncionario) {
        var excluirInfos = funcionarioService.excluirFuncionario($scope.AtualizadoFuncionarioId);
        excluirInfos.then(function (d) {
            if (d.data.success === true) {
                carregarFuncionarios();

                alert("Excluído com sucesso");
            } else {
                alert("NÃO Excluído");
            }

        }, function () {
            alert("Ocorreu um erro ao tentar excluir o Funcionario");
        });
    }

});


