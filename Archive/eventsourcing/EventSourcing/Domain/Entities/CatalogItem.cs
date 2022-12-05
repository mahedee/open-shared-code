using Domain.Entities.Common;
using Domain.Events.CatalogItem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CatalogItem : BaseAggregateRoot<CatalogItem, int>
    {
        private CatalogItem()
        {

        }

        public CatalogItem(int id, string name, string description, double price, int availableStock, 
            int restockThreshold, int maxStockThreshold, bool onReorder) : base(id)
        {
            Id = id;
            Name = name;
            Description = description;
            Price = price;
            AvailableStock = availableStock;
            RestockThreshold = restockThreshold;
            MaxStockThreshold = maxStockThreshold;
            OnReorder = onReorder;

            if (Version > 0)
            {
                throw new Exception("Catalog item already created");
            }

            if (string.IsNullOrEmpty(name))
            {
                //Validation Exception will be placed here
                throw new Exception("Name Can not be Empty");
            }

            if (price <= 0)
            {
                //Validation Exception will be placed here
                throw new Exception("Price must be positive value");
            }

            // Add CatalogItem Event Here to create
            AddEvent(new CatalogItemCreated(this));
        }


        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

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

        public static CatalogItem Create(int id, string name, string description, double price, int availableStock, 
            int restockThreshold, int maxStockThreshold, bool onReorder)
        {
            return new CatalogItem(id, name, description, price, availableStock, restockThreshold, maxStockThreshold, onReorder);
        }

        public void Update(int id, string name, string description, double price, int availableStock,
         int restockThreshold, int maxStockThreshold, bool onReorder)
        {
            Id = id;
            Name = name;
            Description = description;
            Price = price;
            AvailableStock = availableStock;
            RestockThreshold = restockThreshold;
            MaxStockThreshold = maxStockThreshold;
            OnReorder = onReorder;

            AddEvent(new CatalogItemUpdated(this));
        }

        public void Delete(int id)
        {
            Id = id;

            AddEvent(new CatalogItemDeleted(this));
        }



        protected override void Apply(IDomainEvent<int> @event)
        {
            switch (@event)
            {
                case CatalogItemCreated catalogItemCreated: OnCatalogItemCreated(catalogItemCreated); break;
                case CatalogItemUpdated catalogItemUpdated: OnCatalogItemUpdated(catalogItemUpdated); break;
                case CatalogItemDeleted catalogItemDeleted: 
                    Name = catalogItemDeleted.Name;
                    break;

            }
        }

        // On Catalog Item Created Event
        private void OnCatalogItemCreated(CatalogItemCreated catalogItemCreated)
        {
            Name = catalogItemCreated.Name;
            Price = catalogItemCreated.Price;
            AvailableStock = catalogItemCreated.AvailableStock;
            RestockThreshold = catalogItemCreated.RestockThreshold;
            MaxStockThreshold = catalogItemCreated.MaxStockThreshold;
            OnReorder = catalogItemCreated.OnReorder;
        }

        // On Catalog Item Updated Event
        private void OnCatalogItemUpdated(CatalogItemUpdated catalogItemUpdated)
        {
            Name = catalogItemUpdated.Name;
            Price = catalogItemUpdated.Price;
            AvailableStock = catalogItemUpdated.AvailableStock;
            RestockThreshold = catalogItemUpdated.RestockThreshold;
            MaxStockThreshold = catalogItemUpdated.MaxStockThreshold;
            OnReorder = catalogItemUpdated.OnReorder;
        }
    }
}
