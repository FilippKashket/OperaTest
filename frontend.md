# Test Assignment -- React

Show a block of Ethereum using Cloudflare Ethereum API gateway.


* Create a SPA that displays the block number, block hash and the table of transactions (a table of from, to, transaction hash).
* Use React https://reactjs.org
* Use https://react-bootstrap.github.io to stylize the webpage (just use standard components from there)
* Create a backend and RESTful API that returns data for the Ethereum block of a specific number or "latest": `GET /api/block/latest` or `GET /api/block/11000000`
* You can use one of the following languages for backend: Go, Rust, Python, Javascript, TypeScript (or double-check with me)
* When you load the page it should display the latest block by default and then user should be able to select the block number to visualise
* Don't forget about error handling and input validation


Getting a latest block:
* Make an HTTP POST request to the url https://cloudflare-eth.com
* Add an additional header Content-Type with value application/json
* The request body should be the following JSON
```
{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", true],"id":1}
```

Example of a block explorer: https://etherscan.io/block/11634304


---
The code should be committed to a github repository