import { store } from 'react-notifications-component'

export function notification(title,message,type) {
    store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            showIcon:true
        }
    })
}