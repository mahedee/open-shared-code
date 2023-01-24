How to run
1. Run back end application
* Configure SignalR in Program.cs
* Configure signalr hub in HubConfig -> SignalRHub.cs
* Send notification to hub in IssueController - Create method - here hard coded user = maidul used 

2. Run front end application
* npm install signalR
* SignalR configure on app.js
* Toast container in index.js
* issue list and create form is in components folder
* follow ang-kyc poc
* Route is configured in Routers.js file 


To do 
- Apply axios (done)
- Apply antd (done)
- Show list of issues in grid (done)
- Create issue and notify using signalR (done)
- Add token based authentication and interceptor
- Assign issue to user 
- Clear UI with drop down list 
- Refactor front end application



References:

To read
https://labs.sogeti.com/create-a-simple-real-time-notification-with-net-core-reactjs-and-signalr/
https://medium.com/swlh/creating-a-simple-real-time-chat-with-net-core-reactjs-and-signalr-6367dcadd2c6
https://learn.microsoft.com/en-us/aspnet/core/tutorials/signalr-typescript-webpack?view=aspnetcore-6.0&tabs=visual-studio
https://www.abrahamberg.com/blog/aspnet-signalr-and-react/

https://github.com/alopes2/Medium-Chatty

Ref: Auth service, interceptor
Use axios insted

npm install axios
npm install antd
npm uninstall antd
npm install react-toastify