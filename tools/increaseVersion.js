// eslint-disable-next-line
const fs = require("fs");
// eslint-disable-next-line
const { exec } = require("child_process");

const appJsonPath = "./app.json";

fs.readFile(appJsonPath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading app.json:", err);
		return;
	}

	const appJson = JSON.parse(data);

	let versionParts = appJson.expo.version.split(".").map(Number);
	versionParts[2] += 1;
	appJson.expo.version = versionParts.join(".");

	fs.writeFile(appJsonPath, JSON.stringify(appJson, null, 2), "utf8", (err) => {
		if (err) {
			console.error("Error writing app.json:", err);
			return;
		}
		console.log("\x1b[32m%s\x1b[0m", "Version updated successfully: v" + appJson.expo.version);

		exec(
			`git add ${appJsonPath} && git commit -m "Update version to v${appJson.expo.version}" && git tag v${appJson.expo.version} && git push --no-verify && git push --tags --no-verify`,
			(err) => {
				if (err) {
					console.error("Error executing git commands:", err);
					return;
				}
				console.log("\x1b[32m%s\x1b[0m", "Version tag created successfully: v" + appJson.expo.version);
			},
		);
	});
});
