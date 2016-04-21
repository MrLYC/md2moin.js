if (typeof require != "undefined") {
	var marked = require('marked');
}
var MoinRender = new marked.Renderer();
MoinRender.ListItems = [];
MoinRender.NewLine = "\n\n";

MoinRender.code = function (code, language) {
	var highlight = "";
	if (language) {
		highlight = "#!highlight " + language;
	}
	return "{{{" + highlight + "\n" + code + "\n}}}" + MoinRender.NewLine;
};

MoinRender.blockquote = function (quote) {
	return "\t" + quote.trimRight() + MoinRender.NewLine;
};

MoinRender.heading = function (text, level) {
	var flag = new Array(level + 1).join("=");
	return flag + " " + text.trim() + " " +  flag + MoinRender.NewLine;
};

MoinRender.hr = function () {
	return "----" + MoinRender.NewLine;
};

MoinRender.list = function (body, ordered) {
	var content = "\n";
	var flag = "* ";
	for (var i in MoinRender.ListItems) {
		if (ordered) {
			flag = 1 + parseInt(i) + ". ";
		}
		content += " " + flag + MoinRender.ListItems[i] + MoinRender.NewLine;
	}
	MoinRender.ListItems = [];
	return content;
};

MoinRender.listitem = function (text) {
	MoinRender.ListItems.push(text.trim());
	return "";
};

MoinRender.paragraph = function (text) {
	return text.trimRight() + MoinRender.NewLine;
};

MoinRender.table = function (header, body) {
	return header + body.trimRight() + MoinRender.NewLine;
};

MoinRender.tablerow = function (content) {
	return content + " ||\n";
};

MoinRender.tablecell = function (content, flags) {
	if (flags.header) {
		content = "'''" + content + "'''";
	}
	var align = " ";
	if (flags.align == "center") {
		align = "<:> ";
	}
	else if (flags.align == "left") {
		align = "<()> ";
	}
	else if (flags.align == "right") {
		align = "<)> ";
	}
	return "||" + align + content;
};

MoinRender.strong = function (text) {
	return "'''" + text + "'''";
};

MoinRender.em = function (text) {
	return "''" + text + "''";
};

MoinRender.codespan = function (code) {
	return "`" + code + "`";
};

MoinRender.br = function () {
	return MoinRender.NewLine;
};

MoinRender.del = function (text) {
	return "--(" + text + ")--";
};

MoinRender.link = function (href, title, text) {
	return "[[" + href + "|" + text + "]]";
};

MoinRender.image = function (href, title, text) {
	return "{{" + href + "}}";
};

var md2moin = module.exports = function (markdown) {
    return marked(markdown, { renderer: MoinRender });
};
