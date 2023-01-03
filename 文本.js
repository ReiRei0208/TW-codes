(function(Scratch) {
	"use strict";
	
    const icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjUuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjI1LjQgMjI1LjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyNS40IDIyNS40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzNEODVDNjt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wLDExMi43QzAsNTAuNSw1MC40LDAsMTEyLjcsMHMxMTIuNyw1MC41LDExMi43LDExMi43cy01MC41LDExMi43LTExMi43LDExMi43UzAsMTc0LjksMCwxMTIuN3oiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3MC40LDc5LjNjLTQuNiwwLTguMi0zLjktOC4yLTguNlY2MmgtNDEuM3YxMDMuM2gxNi41YzQuNiwwLDguMiwzLjksOC4yLDguNmMwLDQuOC0zLjcsOC42LTguMiw4LjZIODcuOQoJYy00LjYsMC04LjItMy45LTguMi04LjZjMC00LjgsMy43LTguNiw4LjItOC42aDE2LjVWNjJINjMuMnY4LjZjMCw0LjgtMy43LDguNi04LjIsOC42cy04LjItMy45LTguMi04LjZWNTMuNAoJYzAtNC44LDMuNy04LjYsOC4yLTguNmgxMTUuNWM0LjYsMCw4LjIsMy45LDguMiw4LjZ2MTcuMkMxNzguNyw3NS40LDE3NSw3OS4zLDE3MC40LDc5LjN6Ii8+Cjwvc3ZnPg=='

	const CaseParam = {
		LOWERCASE: "lowercase",
		UPPERCASE: "uppercase",
		MIXEDCASE: "mixedcase",
		TITLECASE: "titlecase"
	};

	let splitCache;
	let matchCache;
	
	class StringsExt {
		constructor () {}
		
		_initCaseMenu () {
			return [
				{
					text: "全部小写",
					value: CaseParam.LOWERCASE
				},
				{
					text: "全部大写",
					value: CaseParam.UPPERCASE
				},
				{
					text: "单词首字母大写",
					value: CaseParam.TITLECASE
				},
			];
		}
		
		getInfo () {
			return {

				id: "strings",
				name: "文本",
                menuIconURI: icon,
                color1: '#6fa8dc',
                color2: '#6397c6',
                color3: '#5886b0',
				blocks: [
					{
						opcode: "letters_of",
						blockType: Scratch.BlockType.REPORTER,
						text: "取字符串 [STRING] 中的第 [LETTER1] 个到第 [LETTER2] 个字符",
						arguments: {
							LETTER1: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 1
							},
							LETTER2: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 3
							},
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "TSEG"
							}
						}
					},
					{
						opcode: "split",
						blockType: Scratch.BlockType.REPORTER,
						text: "以 [SPLIT] 切割 [STRING] 取第 [ITEM] 项",
						arguments: {
							ITEM: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 4
							},
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "1/2/3/4"
							},
							SPLIT: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "/"
							}
						}
					},
					{
						opcode: "count",
						blockType: Scratch.BlockType.REPORTER,
						text: "[SUBSTRING] 在 [STRING] 的个数",
						arguments: {
							SUBSTRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "1"
							},
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "114514"
							}
						}
					},
					{
						opcode: "indexof",
						blockType: Scratch.BlockType.REPORTER,
						text: "第一个 [SUBSTRING] 在 [STRING] 的位置",
						arguments: {
							SUBSTRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "E"
							},
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "apple"
							}
						}
					},
					
					"---",
					
					{
						opcode: "replace",
						blockType: Scratch.BlockType.REPORTER,
						text: "将 [STRING] 中的 [SUBSTRING] 替换为 [REPLACE]",
						arguments: {
							SUBSTRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "world"
							},
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "Hello world!"
							},
							REPLACE: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "apple"
							}
						}
					},
					{
						opcode: "repeat",
						blockType: Scratch.BlockType.REPORTER,
						text: "将 [STRING] 重复 [REPEAT] 遍",
						arguments: {
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "apple "
							},
							REPEAT: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 3
							}
						}
					},
					
					"---",
					
					{
						opcode: "unicodeof",
						blockType: Scratch.BlockType.REPORTER,
						text: "将 [STRING] 转为Unicode编码",
						arguments: {
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "A"
							}
						}
					},
					{
						opcode: "unicodefrom",
						blockType: Scratch.BlockType.REPORTER,
						text: "将 [NUM] 转为Unicode字符",
						arguments: {
							NUM: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 65
							}
						}
					},
					
					
					"---",
					
					{
						opcode: "identical",
						blockType: Scratch.BlockType.BOOLEAN,
						text: "[OPERAND1] 等于 [OPERAND2]?",
						arguments: {
							OPERAND1: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "A"
							},
							OPERAND2: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "a"
							}
						}
					},
					
					"---",
					
					{
						opcode: "isCase",
						blockType: Scratch.BlockType.BOOLEAN,
						text: "[STRING] 是 [TEXTCASE]?",
						arguments: {
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "apple"
							},
							TEXTCASE: {
								type: Scratch.ArgumentType.STRING,
								menu: "textCase",
								defaultValue: CaseParam.LOWERCASE
							}
						}
					},
					{
						opcode: "toCase",
						blockType: Scratch.BlockType.REPORTER,
						text: "将 [STRING] 转换为 [TEXTCASE]",
						arguments: {
							STRING: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "apple"
							},
							TEXTCASE: {
								type: Scratch.ArgumentType.STRING,
								menu: "textCase",
								defaultValue: CaseParam.UPPERCASE
							}
						}
					}
				],
				menus: {
					textCase: {
						acceptReporters: true,
						items: this._initCaseMenu()
					}
				}
			};
		}
			
		identical(args, util) {
			return args.OPERAND1 === args.OPERAND2
		}
		
		unicodeof(args, util) {
			const chars = Array.from(args.STRING.toString());
			return chars.map((char) => char.charCodeAt(0)).join(" ");
		}
		
		unicodefrom(args, util) {
			return String.fromCharCode(Number(args.NUM) || 0);
		}
		
		letters_of(args, util) {
			args.STRING = args.STRING.toString();
			args.LETTER1 = Number(args.LETTER1) || 0;
			args.LETTER2 = Number(args.LETTER2) || 0;
			return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);
		}
		
		count(args, util) {
			args.STRING = args.STRING.toString().toLowerCase();
			args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();
			
			return args.STRING.split(args.SUBSTRING).length - 1;
		}
		
		_caseInsensitiveRegex(str) {
			return new RegExp(
				str.replaceAll(/[^a-zA-Z0-9]/g, "\\$&"),
				"gi"
			);
		}
		
		split(args, util) {
			args.STRING = args.STRING.toString();
			args.SPLIT = args.SPLIT.toString();
			args.ITEM = Number(args.ITEM) || 0;
			
			// Cache the last split
			if (!(
				splitCache &&
				splitCache.string === args.STRING &&
				splitCache.split === args.SPLIT
			)) {
				const regex = this._caseInsensitiveRegex(args.SPLIT);
				
				splitCache = {
					string: args.STRING,
					split: args.SPLIT,
					arr: args.STRING.split(regex)
				};
			}
			return splitCache.arr[args.ITEM - 1] || "";
		}
		
		replace(args, util) {
			args.STRING = args.STRING.toString();
			args.SUBSTRING = args.SUBSTRING.toString();
			
			args.REPLACE = args.REPLACE.toString();
			
			const regex = this._caseInsensitiveRegex(args.SUBSTRING);
			
			return args.STRING.replace(regex, args.REPLACE);
		}
		
		indexof(args, util) {
			args.STRING = args.STRING.toString().toLowerCase();
			args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();
			const found = args.STRING.indexOf(args.SUBSTRING);
			return found === -1 ? 0 : found + 1;
		}
		
		repeat(args, util) {
			args.STRING = args.STRING.toString();
			args.REPEAT = Number(args.REPEAT) || 0;
			return args.STRING.repeat(args.REPEAT);
		}
		
		replaceRegex(args, util) {
			try {
				args.STRING = args.STRING.toString();
				args.REPLACE = args.REPLACE.toString();
				args.REGEX = args.REGEX.toString();
				args.FLAGS = args.FLAGS.toString();
				
				return args.STRING.replace(
					new RegExp(args.REGEX, args.FLAGS),
					args.REPLACE
				);
			} catch(e) {
				console.error(e);
				return "";
			}
		}
		
		matchRegex(args, util) {
			try {
				args.STRING = args.STRING.toString();
				args.REGEX = args.REGEX.toString();
				args.FLAGS = args.FLAGS.toString();
				args.ITEM = Number(args.ITEM) || 0;
				
				if (!(
					matchCache &&
					matchCache.string === args.STRING &&
					matchCache.regex === args.REGEX &&
					matchCache.flags === args.FLAGS
				)) {
					const newFlags = args.FLAGS.includes("g") ? args.FLAGS : args.FLAGS + "g";
					const regex = new RegExp(args.REGEX, newFlags);
					
					matchCache = {
						string: args.STRING,
						regex: args.REGEX,
						flags: args.FLAGS,
						arr: args.STRING.match(regex)
					};
				}
				return matchCache.arr[args.ITEM - 1] || "";
			} catch(e) {
				console.error(e);
				return "";
			}
		}
		
		testRegex(args, util) {
			try {
				args.STRING = args.STRING.toString();
				args.REGEX = args.REGEX.toString();
				args.FLAGS = args.FLAGS.toString();
				
				return new RegExp(args.REGEX, args.FLAGS).test(args.STRING);
			} catch(e) {
				console.error(e);
				return false;
			}
		}
		
		isCase(args, util) {
			const string = args.STRING.toString();
			const textCase = args.TEXTCASE.toString();
			switch (textCase) {
				case CaseParam.LOWERCASE:
					return string.toLowerCase() === string;
				case CaseParam.UPPERCASE:
					return string.toUpperCase() === string;
				case CaseParam.MIXEDCASE:
					return (!(
						string.toUpperCase() === string ||
						string.toLowerCase() === string
					));
				case CaseParam.TITLECASE:
					return ![...string.matchAll(/\b./g)].some((match) => {
						return match[0].toLowerCase() === match[0];
					});
				default: return false;
			}
		}
		
		toCase(args, util) {
			const string = args.STRING.toString();
			const textCase = args.TEXTCASE.toString();
			switch (textCase) {
				case CaseParam.LOWERCASE:
					return string.toLowerCase();
				case CaseParam.UPPERCASE:
					return string.toUpperCase();
				case CaseParam.MIXEDCASE:
					return Array.from(string).map(
						(char, index) => index % 2 === 0 ?
							char.toUpperCase() :
							char.toLowerCase()
					).join("");
				case CaseParam.TITLECASE:
					return string.split(/\b/g).map((str) => {
						let chars = Array.from(str);
						if (chars.length < 1) return "";
						chars[0] = chars[0].toUpperCase();
						return chars.join("");
					}).join("");
				default: return string;
			}
		}
	}
	
	Scratch.extensions.register(new StringsExt());
})(Scratch);