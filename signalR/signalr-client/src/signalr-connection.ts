import * as signalR from "@microsoft/signalr";

//const URL = process.env.HUB_ADDRESS ?? "https://localhost:7154/hub";
const URL = process.env.HUB_ADDRESS ?? "https://localhost:7154/hub"; //or whatever your backend port is

class Connector{
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (username: string, message: string) => void ) => void;

    static instance: Connector;

    constructor(){
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl(URL)
        .withAutomaticReconnect()
        .build();

        this.connection.start().catch(err => document.write(err));

        this.events = (onMessageReceived) => {
            console.log("log: receive event");
            this.connection.on("messageReceived", (username, message) => {
                onMessageReceived(username, message);
            });
        };

    }

    public newMessage = (message: string) => {
        console.log("log: newMessage method" + message);
        this.connection.send("newMessage", "foo", message).then(x => console.log("sent"))
    }

    public static getInstance(): Connector{
        if(!Connector.instance)
            Connector.instance = new Connector();

        return Connector.instance;
    }   
}

export default Connector.getInstance;