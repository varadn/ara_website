//utils/helpers.ts
export function convertGoogleDriveUrl(url: string): string {
  //Checking if it's a Google Drive link
  if (url.includes('drive.google.com/file/d/')) {
    //Extract the file ID
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  //Return original URL if it's not a Google Drive link
  return url;
}