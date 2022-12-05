using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Events.CatalogItem
{
    /// <summary>
    /// Catalog item created event
    /// </summary>
    public class CatalogItemDeleted: BaseDomainEvent<Entities.CatalogItem, int>
    {

        private CatalogItemDeleted()
        {

        }
        public CatalogItemDeleted(Entities.CatalogItem catalogItem) : base(catalogItem)
        {
            Name = catalogItem.Name;
        }
        public string Name { get; set; }

    }
}
