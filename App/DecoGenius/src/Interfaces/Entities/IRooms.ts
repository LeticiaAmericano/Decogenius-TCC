export interface IRoom {
    name: string;
    room: string;
    gpt_photo: string;
}

export interface IRoomsResponse {
    designs: IRoom[];
}