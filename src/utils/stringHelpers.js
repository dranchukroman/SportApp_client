function convertStringToArray(str) {
    try {
        // Replace curly braces with square brackets
        const jsonArrayStr = str.replace(/{/g, '[').replace(/}/g, ']');
        // Parse the string into an array
        return JSON.parse(jsonArrayStr);
    } catch (error) {
        console.error('Failed to convert string to array: ', error);
        return [];
    }
}

export const parseRestTime = (rest_time) => {
    const [minutes, seconds] = rest_time.split(':');
    return { minutes, seconds };
};

export function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error during formating date: ', error);
    }
}

export default convertStringToArray;