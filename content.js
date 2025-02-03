(function safeRemoveComments() {
  function moveFocusIfNeeded(node) {
    if (window.$0 === node) {
      let newFocus = node.nextElementSibling || node.previousElementSibling;
      if (newFocus) {
        inspect(newFocus);
      } else {
        const placeholder = document.createTextNode('');
        node.parentNode.insertBefore(placeholder, node.nextSibling);
        inspect(placeholder);
      }
    }
  }

  function traverseAndRemove(node) {
    if (!node) {
		return;
    }
	  
    let child = node.firstChild;
    while (child) {
      
      const next = child.nextSibling;
      if (child.nodeType === Node.COMMENT_NODE) {
        moveFocusIfNeeded(child);
        child.remove();
      } else {
        traverseAndRemove(child);
      }
      child = next;
    }
  }

  traverseAndRemove(document);
})();
