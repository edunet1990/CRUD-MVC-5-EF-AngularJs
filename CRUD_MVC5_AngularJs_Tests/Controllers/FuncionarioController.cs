using CRUD_MVC5_AngularJs_Tests.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUD_MVC5_AngularJs_Tests.Controllers
{
    public class FuncionarioController : Controller
    {
        #region Método para listar funcionários - READ

        //GET Funcionario/GETFuncionarios
        public JsonResult GetFuncionario()
        {
            using (var db = new FuncionariosEntities2()) //depois de new usar o nome do banco que criou, procurar em web.config e connectionstring em name
            {                                           //ctr . using CRUD tall
                List<Funcionario> listarFuncionarios = db.Funcionario.ToList();

                return Json(listarFuncionarios, JsonRequestBehavior.AllowGet);
            }                                        
        }
        #endregion

        #region Método para Adicionar Funcionários - CREATE
        //POST Funcionario
        [HttpPost]
        public JsonResult AdicionarFuncionario(Funcionario funcionario)
        {
            if (funcionario != null)
            {
                using (var db = new FuncionariosEntities2()){
                    db.Funcionario.Add(funcionario);
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }

            return Json(new { succes = false });
        }

        #endregion

        #region Método para Atualiar Funcionários - UPDATE

        [HttpPost]
        public JsonResult AtualizarFuncionario(Funcionario funcionario)
        {
            using(var db = new FuncionariosEntities2())
            {
                var funcionarioAtualizado = db.Funcionario.Find(funcionario.FuncionarioId);

                if (funcionarioAtualizado == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    funcionarioAtualizado.Nome = funcionario.Nome;
                    funcionarioAtualizado.Departamento = funcionario.Departamento;
                    funcionarioAtualizado.Cargo = funcionario.Cargo;
                    funcionarioAtualizado.Email = funcionario.Email;

                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }
        #endregion

        #region Método para excluir funcionário

        [HttpPost]
        public JsonResult ExluirFuncionario(int id)
        {
            using (var db = new FuncionariosEntities2())
            {
                var funcionario = db.Funcionario.Find(id);
                if (funcionario == null)
                {
                    return Json(new { success = false });
                }

                db.Funcionario.Remove(funcionario);
                db.SaveChanges();

                return Json(new { success = true });

            }

        }
        #endregion
    }
}