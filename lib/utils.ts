import {
  FileType,
  IMediaFolders,
  // IMediaFiles 
} from "@/constant/interphase";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertArrayOfFilesToString(folder: IMediaFolders) {
  return `${folder.children.length} dossier(s), ${folder.files.length} fichier(s)` ;
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

export function formatDate(input: string): string {
  const date = new Date(input);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function isValidHttpUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (error) {
    console.log(error)
    return false;
  }
}