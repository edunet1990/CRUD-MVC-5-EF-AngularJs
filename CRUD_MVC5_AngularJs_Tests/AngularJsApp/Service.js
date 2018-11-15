/**
 * Arquivo: Service.js
 * Data: 10/12/2017
 * Descrição: Esse arquivo é responsável por carrefar os dados via 4http.get - do MVC Controller
 * (onde transformará os dados em Json)
 * Author: Eduardo Estevão
 */

funcionarioApp.service('funcionarioService', function ($http) {

    //Método responsável por listar todos os funcionários: READ
    this.getTodosFuncionarios = function () {
        return $http.get("/Funcionario/GetFuncionario");
    }

    //Método responsável por Adicionar Funcionario: CREATE
    this.adicionarFuncionario = function (funcionario) {
        var request = $http({
            method: 'post',
            url: '/Funcionario/AdicionarFuncionario',
            data: funcionario
        });

        return request;
    }

    //Método responsável por Atualizar Funcionario: UPDATE
    this.atualizarFuncionario = function (funcionario) {
        var request = $http({
            method : 'post',
            url: '/Funcionario/AtualizarFuncionario',
            data: funcionario
        });

        return request;
    }

    //Método responsável por Excluir Funcionario: DELETE
    this.excluirFuncionario = function (AtualizadoFuncionarioId) {
        return $http.post('/Funcionario/ExcluirFuncionario/' + AtualizadoFuncionarioId);
    }
});
