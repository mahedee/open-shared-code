Run event store db using the following command

docker run --name esdb-node -it -p 2113:2113 -p 1113:1113 eventstore/eventstore:latest --insecure --run-projections=All --enable-external-tcp --enable-atom-pub-over-http

References:
1. https://www.red-gate.com/simple-talk/development/dotnet-development/take-your-crud-to-the-next-level-with-ddd-concepts/
2. https://www.codeproject.com/Articles/5296451/Domain-Driven-Design-Implementation-Approach-with