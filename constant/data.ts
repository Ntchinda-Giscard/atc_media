import { IMediaPlaylist } from "./interphase";

export const mediaPlaylist: IMediaPlaylist[] = [
    {
        id: "1",
        name: "Promo Week-end",
        duration: "3m:20s",
        files: [
            {
                id: "1",
                name: "pub_1.mp4",
                type: "VIDEO",
            },
            {
                id: "2",
                name: "pub_2.mp4",
                type: "VIDEO",
            },
            {
                id: "3",
                name: "pub_3.mp4",
                type: "VIDEO",
            }
        ]
    },
    {
        id: "2",
        name: "Vitrine Printemps 2025",
        duration: "2m:30s",
        files: [
            {
                id: "1",
                name: "promo_avril.mp4",
                type: "VIDEO",
            },
            {
                id: "2",
                name: "promo_banniere.png.png",
                type: "IMAGE",
            },
            {
                id: "3",
                name: "pub.html",
                type: "WEB",
            }
        ]
    },
]