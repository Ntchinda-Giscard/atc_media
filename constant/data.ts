import { IMediaFolders, IMediaPlaylist } from "./interphase";

export const mediaFolders: IMediaFolders[] = [
    {
        id: "1",
        name: "Promotions Avril",
        content: "5 images, 2 vidéos",
        createdAt: "05/04/2025",
        items: 0,
        shared: "Oui",
    },
    {
        id: "2",
        name: "Offres TV",
        content: "3 vidéos",
        createdAt: "01/04/2025",
        items: 10,
        shared: "Non",
    },
    {
        id: "3",
        name: "Templates Vitrine",
        content: "5 images, 4 vidéos, 1 HT...",
        createdAt: "08/04/2025",
        items: 2,
        shared: "Oui",
    },
]

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