const script = `
	document.addEventListener("DOMContentLoaded", () => {
		const REMOVE_SELECTORS = [ 
									"#header-float-banner",
									"#widgets-placeholder .gadget-banner",
									"[class*=downloadsWrapper]",
									".promoted-sparkles-text-search-root-container"
								];

		const hideElement = (element) => {
			element.style.display = "none";
		};

		const hideElementsBySelector = () => {
			REMOVE_SELECTORS.forEach((selector) => {
				document.querySelectorAll(selector).forEach(hideElement);
			});
		};

		const observer = new MutationObserver(() => {
			hideElementsBySelector();
		});

		observer.observe(document.body, { childList: true, subtree: true });
		hideElementsBySelector();
	});
`;

export default {
	content: script,
	fileName: "removeElements.ts",
};
