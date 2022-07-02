﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Common
{
    public abstract class BaseAggregateRoot<TA, TKey> : BaseEntity<TKey>, IAggregateRoot<TKey> where TA : IAggregateRoot<TKey>
    {

        // Queuing all events
        private readonly Queue<IDomainEvent<TKey>> _events = new Queue<IDomainEvent<TKey>>();

        protected BaseAggregateRoot() { }
        protected BaseAggregateRoot(TKey id) : base(id)
        {

        }

        protected void AddEvent(IDomainEvent<TKey> @event)
        {
            if(@event == null)
            {
                throw new ArgumentNullException(nameof(@event));
            }

            _events.Enqueue(@event);
            Apply(@event);
            Version++;
        }

        /// <summary>
        /// This method is implemented in the derived class
        /// Apply this method to implement different events
        /// </summary>
        /// <param name="event"></param>
        
        protected abstract void Apply(IDomainEvent<TKey> @event);

        // Implementation of IAggregateRoot
        // Aggregate version
        public long Version{ get; private set; }

        // Implementation of IAggregateRoot
        public IReadOnlyCollection<IDomainEvent<TKey>> Events => _events.ToImmutableArray();

        // Implementation of IAggregateRoot
        public void ClearEvents()
        {
            _events.Clear();
        }

        #region Factory

        public static readonly ConstructorInfo Ctor;

        static BaseAggregateRoot()
        {
            var aggregateType = typeof(TA);
            Ctor = aggregateType.GetConstructor(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public,
                null, new Type[0], new ParameterModifier[0]);
            if (null == Ctor)
                throw new InvalidOperationException($"Unable to find required private parameterless constructor for Aggregate of type '{aggregateType.Name}'");
        }

        public static TA Create(IEnumerable<IDomainEvent<TKey>> events)
        {
            if(null == events || !events.Any())
                throw new ArgumentNullException(nameof(events));

            var result = (TA)Ctor.Invoke(new object[0]);

            var baseAggregate = result as BaseAggregateRoot<TA, TKey>;

            if (baseAggregate != null)
                foreach (var @event in events)
                    baseAggregate.AddEvent(@event);

            result.ClearEvents();

            return result;
        }

        #endregion  
    }
}
