export interface INotification {
    event: string;
    title: string;
    subtitle: string;
    actions: {
        label: string;
        link: string;
    }[];
    body: string;
}