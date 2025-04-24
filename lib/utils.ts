import { FileType, IPlaylistFile } from "@/constant/interphase";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertArrayOfFilesToString(files: IPlaylistFile[]) {
  const counts = {
    VIDEO: 0,
    IMAGE: 0,
    WEB: 0,
    DOC: 0,
  };

  for (const file of files) {
    counts[file.type]++;
  }

  const labels: { [key in keyof typeof counts]: string } = {
    VIDEO: 'video',
    IMAGE: 'image',
    WEB: 'web',
    DOC: 'doc'
  };

  const result = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([key, count]) => `${count} ${labels[key as keyof typeof counts]}`)
    .join(', ');

  return result;
}

export const getFileType = (file: File): FileType | null => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ext) return null;

  const imageExt = ['jpg', 'jpeg', 'png'];
  const videoExt = ['mp4', 'webm'];
  const docExt = ['pdf', 'mp3'];
  const webExt = ['html', 'rss'];

  if (imageExt.includes(ext)) return 'IMAGE';
  if (videoExt.includes(ext)) return 'VIDEO';
  if (docExt.includes(ext)) return 'DOC';
  if (webExt.includes(ext)) return 'WEB';

  return null;
};

export const getCurrentDate = (date?: Date) => {
  const today = date ?? new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};