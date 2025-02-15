(function removeComments(node) {
    if (!node) {
        return;
    } 

    if (node.nodeType === Node.COMMENT_NODE) {
        const rework_comment = create_rework_comment(node, window.props.rework_comments);

        if (!window.props.rework_comments.enable || rework_comment === null) {
            node.remove();
            return;
        }
        
        node.replaceWith(document.createComment(rework_comment));
    } else {
        let child = node.firstChild;
        while (child) {
            const next = child.nextSibling;
            removeComments(child);
            child = next;
        }
    }
})(document);

console.log(window.props)

function create_rework_comment(node, props) {
    const node_text = node.textContent || node.nodeValue || "";

    const lines = node_text.split("\n");

    for (let line of lines) {
        if (line.includes("✅")) {
            return line.trim();
        }

        if (props.display_end_template) {   
            if (line.includes("END OUTPUT")) {
                const match = line.match(/END OUTPUT (.+)/);
                if (match) {
                    return "❌ " + match[1].split('/').pop();
                }
            }
        }
    }

    return null;
}

