using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface ICatalogItemRepository
    {
        //Task SaveAsync(object @event);

        Task AddAsync(CatalogItem catalogItem);

    }
}
