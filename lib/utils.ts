import { IPlaylistFile } from "@/constant/interphase";

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export function convertArrayOfFilesToString(files: IPlaylistFile[]) {
  const counts = {
    VIDEO: 0,
    IMAGE: 0,
    WEB: 0
  };

  for (const file of files) {
    counts[file.type]++;
  }

  const labels: { [key in keyof typeof counts]: string } = {
    VIDEO: 'video',
    IMAGE: 'image',
    WEB: 'HTML'
  };

  const result = Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .map(([key, count]) => `${count} ${labels[key as keyof typeof counts]}`)
    .join(', ');

  return result;
}