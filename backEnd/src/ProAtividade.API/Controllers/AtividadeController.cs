using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly IAtividadeService _service;

        public AtividadeController(IAtividadeService service)
        {
            _service = service;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await _service.PegarTodasAtividadesAsync();
                if (atividades == null)
                    return NoContent();
                
                return Ok(atividades);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Atividades. Erro: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await _service.PegarAtividadePorIdAsync(id);
                if (atividade == null)
                    return NoContent();

                return Ok(atividade);              
            }
            catch (System.Exception ex)
            {                
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Atividade com id: {id}. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Atividade model)
        {
            try
            {
                var atividade = await _service.AdicionarAtividade(model);
                if (atividade == null)
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        "Você não conseguiu adicionar uma atividade.");

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Você não conseguiu adicionar uma atividade. Erro: {ex.Message}");
            }            
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Put(int id, Atividade model)
        {
            try
            {
                if(model.Id != id)
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        "Você está tentando atualizar a atividade errada!");

                var atividade = await _service.AtualizarAtividade(model);
                if (atividade == null)
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        $"Você não conseguiu atualizar a atividade com id {id}!");

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        $"Você não conseguiu atualizar a atividade com id {id}!. Erro: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var atividade = await _service.PegarAtividadePorIdAsync(id);
                if (atividade == null)
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        "Você está tentando deletar uma atividade que não existe");

                var excluiu = await _service.DeletarAtividade(id);

                if (!excluiu)
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        $"Você não conseguiu excluir a atividade com id {id}!.");

                return Ok(excluiu);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        $"Você não conseguiu atualizar a atividade com id {id}!. Erro: {ex.Message}");
            }
        }
    }
}
