export function convertDateToText(dateString: string): string {
    // Create a Date object from the yyyy/mm/dd string
    // Note: Using 'new Date(dateString)' directly with '/' separators can lead to inconsistent parsing across browsers.
    // It's safer to replace '/' with '-' for ISO-like parsing or parse components manually.
    const parts = dateString.split('-').map(Number);
    const year = parts[0];
    const month = parts[1] - 1; // Month is 0-indexed in Date object
    const day = parts[2];

    const date = new Date(year, month, day);

    // Define options for toLocaleDateString to get a descriptive format
    const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    };

    // Format the date using toLocaleDateString
    return date.toLocaleDateString('en-US', options); // 'en-US' for English locale
}