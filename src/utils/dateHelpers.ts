export function convertDateToText(dateString: string): string {
    // Create a Date object from the yyyy/mm/dd string
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

export function formatDateToSupabase(date: Date): string {
    // convert standard DateTime representation to Supabase timestamptz format
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Get timezone offset in minutes and convert to HH:MM format
    const offset = date.getTimezoneOffset(); // Offset in minutes
    const offsetSign = offset > 0 ? '-' : '+'; // Invert sign for display
    const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
    const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, '0');
    const timezoneOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezoneOffset}`;
}