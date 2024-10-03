const script = `
    document.addEventListener("DOMContentLoaded", () => {
        const meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(meta);
    });
`;

export default {
	content: script,
	fileName: "pageMeta.ts",
};
