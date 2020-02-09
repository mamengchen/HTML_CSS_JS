var getElementsByClassName = function(opts) {
	var searchClass = opts.searchClass; //类名
	var node = opts.node || document; //范围 例子ul，或者document
	var tag = opts.tag || '*'; 	//标签名
	var result = [];
	if (document.getElementsByClassName) {
		var nodes = node.getElementsByClassName(searchClass);
		if (tag !== "*") {
			for (var i = 0; node = nodes[i++];) {
				if (node.tagName === tag.toUpperCase()) {
					result.push(node);
				}
			}
		} else {
			result = nodes;
		}
		return result;
	} else {
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var i,j;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				result[j++]=els[i];
			}
		}
		return result;
	}
}
