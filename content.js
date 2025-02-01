(function removeComments(node) {
	if (!node) {
		return;
	} 

	if (node.nodeType === Node.COMMENT_NODE) {
		node.remove();
	} else {
		let child = node.firstChild;
		while (child) {
			const next = child.nextSibling;
			removeComments(child);
			child = next;
		}
	}
})(document);
