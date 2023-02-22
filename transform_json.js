const fs = require('fs/promises');
const path = require('path');

const output_folder = path.join("outputs", "transformed");
const check_time = true;
let initial_time;

const check_create_folder = async folder_name => {
    try {
        await fs.stat(folder_name);
    } catch (err) {
        if (err.code && err.code === "ENOENT") {
            await fs.mkdir(folder_name);
        } else {
            throw err;
        }
    }
};

const transform_channel_object = chan => {
    const bands = {};
    for (let i = 0; i < chan.length; i++) {
        bands[`band_${i}`] = chan[i];
    }
    return bands;
};

const transform_data_object = data => {
    const channels = {};
    for (let i = 0; i < data.length; i++) {
        // channels[`channel_${i}`] = transform_channel_object(data[i]);
        let chan = data[i];
        for (let j = 0; j < chan.length; j++) {
            channels[`channel_${i}_band_${j}`] = chan[j];
        }
    }
    return channels;
};

const update_single_json = async (src_file_path, dst_file_path) => {
    let start_time;
    if (check_time)
        start_time = new Date().getTime();
    const file = await fs.readFile(src_file_path);
    const JSON_file = file.toString().split('\n');
    let new_json_str = "";
    for (const line of JSON_file) {
        if (!line)
            continue;
        new_json_str += JSON.stringify(transform_data_object(JSON.parse(line).data)) + "\n";
    }
    await fs.writeFile(dst_file_path, new_json_str);
    console.log(`Successfully created ${dst_file_path} from ${src_file_path}.`);
    if (check_time)
        console.log(`Partial time = ${new Date().getTime() - start_time} ms.`);
};

const update_complete_folder = async (input_path, output_path) => {
    if (check_time)
        initial_time = new Date().getTime();
    await check_create_folder(output_path);
    const folder_content = await fs.readdir(input_path);
    const folder_jsons = folder_content.filter(content => {
        const cont_data = path.parse(content);
        if (cont_data.ext && cont_data.ext === ".json")
            return true;
        return false;
    });
    for (let file of folder_jsons) {
        const source = path.join(input_path, file);
        const dest = path.join(output_path, `trns_${file}`);
        await update_single_json(source, dest);
    }
    console.log(`\n\nSuccessfully transformed ${folder_jsons.length} JSONS from ${input_path}.`);
    if (check_time)
        console.log(`Total time = ${new Date().getTime() - initial_time} ms.`);
};

update_complete_folder("outputs", output_folder);