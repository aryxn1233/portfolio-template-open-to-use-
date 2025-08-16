/**
 * Utility functions for handling Google Drive URLs for images, videos, and certificates
 */

/**
 * Extracts file ID from Google Drive URL
 * @param driveUrl - Google Drive sharing URL
 * @returns File ID or null if not a Google Drive URL
 */
export const extractGoogleDriveFileId = (driveUrl: string): string | null => {
  if (!driveUrl) return null;
  
  // Check if it's a Google Drive URL
  const driveMatch = driveUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return driveMatch[1];
  }
  
  return null;
};

/**
 * Gets the embeddable URL for Google Drive content
 * @param driveUrl - Google Drive sharing URL
 * @returns Embeddable URL for iframe
 */
export const getGoogleDriveEmbedUrl = (driveUrl: string): string => {
  const fileId = extractGoogleDriveFileId(driveUrl);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  return driveUrl;
};

/**
 * Checks if a URL is a Google Drive URL
 * @param url - URL to check
 * @returns boolean indicating if it's a Google Drive URL
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return url.includes('drive.google.com');
};
