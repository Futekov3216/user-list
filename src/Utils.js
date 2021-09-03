/**
 * 
 * @param {string} url 
 */

export const fetchInfo = (url) => {
    return fetch(url)
        .then(response => response.json())
}

