(function removeComments(node) {
    if (!node) {
        return;
    } 

    if (node.nodeType === Node.COMMENT_NODE) {
        // node.remove();
        // console.log(node);
        node.replaceWith(document.createComment("nouveau commentaire"));
    } else {
        let child = node.firstChild;
        while (child) {
            const next = child.nextSibling;
            removeComments(child);
            child = next;
        }
    }
})(document);

// ✅ 
if (window.props) {
    console.log("Received variable:", window.props);
}