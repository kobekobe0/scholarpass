/**
 * Abbreviates a given string to show initials followed by the last word.
 * 
 * @param {string} str - The string to abbreviate.
 * @returns {string} The abbreviated string.
*/
const abbrev = (str) => {
    const exclusions = new Set(['of', 'and', 'the', 'in', 'for', 'a', 'an', 'to', 'with']);
    const words = str.split(' ').filter(word => !exclusions.has(word.toLowerCase()) && word.length > 1);
    const initials = words.map(word => word[0].toUpperCase());

    return initials.join('');
};


export default abbrev;