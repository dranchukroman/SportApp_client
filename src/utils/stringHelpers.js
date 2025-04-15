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

export default convertStringToArray;