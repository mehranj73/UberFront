import { webSocket } from "rxjs/webSocket"



export const listenToChannel = () => {
    const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
    console.log(access_token)
    const ws = webSocket(`ws://127.0.0.1:8000/trips/?${access_token}`);
    ws.subscribe(
        msg => {
            console.log("HERE IS THE RECEIVED MESSAGE !"); 
            console.log(msg.type)
        }, 
        err => console.log("error")
    )
    console.log("????")
}