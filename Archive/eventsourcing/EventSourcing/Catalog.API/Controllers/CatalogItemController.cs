using Application.Commands.CatalogItems;
using Application.Common.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogItemController : ControllerBase
    {

        private readonly IMediator _mediator;

        public CatalogItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCatalogItemAsync([FromBody] CreateCatalogItemDTO? dto)
        {
            if (dto == null)
                return BadRequest();

            var command = new CreateCatalogItemCommand(dto.Name, dto.Description, dto.Price, dto.AvailableStock, dto.RestockThreshold,
                dto.MaxStockThreshold, dto.OnReorder);
            await _mediator.Publish(command);

            return Ok(command);
        }
    }
}
