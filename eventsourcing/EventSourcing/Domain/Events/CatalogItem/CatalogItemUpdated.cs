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
    public class CatalogItemUpdated: BaseDomainEvent<Entities.CatalogItem, int>
    {

        private CatalogItemUpdated()
        {

        }
        public CatalogItemUpdated(Entities.CatalogItem catalogItem) : base(catalogItem)
        {
            Name = catalogItem.Name;
            Price = catalogItem.Price;
            AvailableStock = catalogItem.AvailableStock;
            RestockThreshold = catalogItem.RestockThreshold;
            MaxStockThreshold = catalogItem.MaxStockThreshold;
            OnReorder = catalogItem.OnReorder;
        }

        public string Name { get; set; }
        public decimal Price { get; set; }
        // Quantity in stock
        public int AvailableStock { get; set; }
        // Available stock at which we should reorder
        public int RestockThreshold { get; set; }
        // Maximum number of units that can be in-stock at any time (due to physicial/logistical constraints in warehouses)
        public int MaxStockThreshold { get; set; }
        /// <summary>
        /// True if item is on reorder
        /// </summary>
        public bool OnReorder { get; set; }

    }
}
