interface ISounds {
    readonly notificationsOn: HTMLAudioElement;
    
    readonly notification: HTMLAudioElement;
}

const sounds: ISounds = {
    notification: new Audio(require("../resources/sounds/confirm.mp3")),
    notificationsOn: new Audio(require("../resources/sounds/notification-toggle.mp3"))
};

export default abstract class Sounds {
    public static notificationsOn(): void {
        sounds.notificationsOn.load();
        sounds.notificationsOn.play();
    }

    public static notification(): void {
        sounds.notification.load();
        sounds.notification.play();
    }
}
