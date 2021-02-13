//founction for making post request
const getResource = async (url) => {
        const _apiBase = 'http://127.0.0.1:5000/api/';
        const res = await fetch(`${_apiBase}${url}`).catch((error) => {return {'error':error}});
        if ('error' in res) {
            return res;
        }
        if(!res.ok) {
             throw new Error(`Could not fetch ${url}`+
         `,      received ${res.status}`)
         }
        const body = await res.json();
        return body;
}; 

// function for getting exact block
const getBlockByNumber = async (number) => {
    const  result = await getResource(`block/${number}`);
    return result;
};

export default getBlockByNumber;
