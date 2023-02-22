## To Run:

*You need Node.JS (16.16.0) and NPM (8.11.0) installed before running this code.*

- Clone the repository `git clone https://github.com/bitjep/UDP_Stream_JSON.git`.

- Create an empty "outputs" folder in the repository dir `mkdir ./UDP_Stream_JSON/outputs`.

- Execute `npm start` to start the server.

- Start the server before starting the JSON stream.

- Stop the server after the JSON stream ends.

- Save your file.

**Note:** The server creates a new file on every start-up.


## To transform the JSON files:

Once you have all your json files in the ***./UDP_Stream_JSON/outputs*** folder, you can run the JSON transformer to match a pyhon dictionary.

- Execute `npm run json-transform` to transform all the files in ***./UDP_Stream_JSON/outputs***.