import pageMeta from "./injected/pageMeta";
import removeElements from "./injected/removeElements";

const files = [pageMeta, removeElements];

const wrapWithTryCatch = (content: string, fileName: string): string => {
	return `try {
                ${content}
            } 
            catch (error) {
                // alert('Error executing the content of ${fileName}:'+error.message);
            }`;
};

const readAndProcessFiles = (): string => {
	const fileContents: string[] = [];

	for (const file of files) {
		const wrappedContent = wrapWithTryCatch(file.content, file.fileName);
		fileContents.push(wrappedContent);
	}

	return fileContents.join("\n");
};

export const INJECTED_SCRIPTS = readAndProcessFiles();
