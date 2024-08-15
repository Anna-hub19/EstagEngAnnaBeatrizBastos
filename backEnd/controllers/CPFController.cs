using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace CPFValidationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CPFController : ControllerBase
    {
        // GET api/cpf/validate/{cpf}
        [HttpGet("validate/{cpf}")]
        public IActionResult ValidateCPF(string cpf)
        {
            if (IsValidCPF(cpf))
            {
                return Ok(new { valid = true });
            }
            else
            {
                return BadRequest(new { valid = false, message = "CPF inválido. Formato esperado: XXX.XXX.XXX-XX" });
            }
        }

        private bool IsValidCPF(string cpf)
        {
            // Define o padrão regex para CPF
            var pattern = @"^\d{3}\.\d{3}\.\d{3}-\d{2}$";
            var regex = new Regex(pattern);
            return regex.IsMatch(cpf);
        }
    }
}
