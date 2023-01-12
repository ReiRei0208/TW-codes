(function(Scratch) {
	"use strict";
	
	const CaseParam = {
		LOWERCASE: "lowercase",
		UPPERCASE: "uppercase",
		TITLECASE: "titlecase"
	};

	let splitCache;
	let matchCache;
	
  class StrictEqualityExtension {
  constructor () {}
		
		getInfo() {
	  return {
		id: 'blocks',
		name: 'Blocks +',
		color1: '#fcb103',
    color2: '#db9a37',
    color3: '#db8937',
		blockIconURI: "data:image/png;base64,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",
		blocks: [
      {
        opcode: "beef1",
        blockType: Scratch.BlockType.REPORTER,
        text: "[a] >= [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          }
        }
      },{
        opcode: "beef2",
        blockType: Scratch.BlockType.REPORTER,
        text: "[a] <= [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          }
        }
      },{
        opcode: "beef5",
        blockType: Scratch.BlockType.REPORTER,
        text: "[a] == [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          }
        }
      },{
        opcode: "beef7",
        blockType: Scratch.BlockType.REPORTER,
        text: "[a] != [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          }
        }
      },{
        opcode: "beef3",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[a] >= [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          }
        }
      },{
        opcode: "beef4",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[a] <= [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          }
        }
      },{
        opcode: "beef6",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[a] == [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          }
        }
      },{
        opcode: "beef8",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[a] != [b]",
        arguments: {
          a: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1"
          },
          b: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0"
          }
        }
      },
      

      "---",

      {
        opcode: 'bitwiseLeftShift',
        blockType: Scratch.BlockType.REPORTER,
        text: '[LEFT] << [RIGHT]',
        arguments: {
          LEFT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '2'
          },
          RIGHT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '1'
          }
        }
      },
      {
        opcode: 'bitwiseRightShift',
        blockType: Scratch.BlockType.REPORTER,
        text: '[LEFT] >> [RIGHT]',
        arguments: {
          LEFT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '2'
          },
          RIGHT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '1'
          }
        }
      },{
        opcode: 'bitwiseXor',
        blockType: Scratch.BlockType.REPORTER,
        text: '[LEFT] ^ [RIGHT]',
        arguments: {
          LEFT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '1'
          },
          RIGHT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '1'
          }
        }
      },{
        opcode: 'bitwiseAnd',
        blockType: Scratch.BlockType.REPORTER,
        text: '[LEFT] && [RIGHT]',
        arguments: {
          LEFT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '1'
          },
          RIGHT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '1'
          }
        }
      },{
        opcode: 'bitwiseOr',
        blockType: Scratch.BlockType.REPORTER,
        text: '[LEFT] || [RIGHT]',
        arguments: {
          LEFT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '1'
          },
          RIGHT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: '0'
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
            defaultValue: "B"
          }
        }
      },{
        opcode: "unicodefrom",
        blockType: Scratch.BlockType.REPORTER,
        text: "将 [NUM] 转为Unicode字符",
        arguments: {
          NUM: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 66
          }
        }
      },{
        opcode: "identical",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[OPERAND1] 与 [OPERAND2] Unicode编码相同？",
        arguments: {
          OPERAND1: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "B"
          },
          OPERAND2: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "b"
          }
        }
      },
      

      "---",

      {
        opcode: "toCase1",
        blockType: Scratch.BlockType.REPORTER,
        text: "将 [STRING] 改为全部小写",
        arguments: {
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "BLOCKS"
          }
        }
      },{
        opcode: "toCase2",
        blockType: Scratch.BlockType.REPORTER,
        text: "将 [STRING] 改为全部大写",
        arguments: {
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "blocks"
          }
        }
      },{
        opcode: "toCase3",
        blockType: Scratch.BlockType.REPORTER,
        text: "将 [STRING] 改为首字母大写",
        arguments: {
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "blocks"
          }
        }
      },{
        opcode: "isCase1",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[STRING] 是 全部小写？",
        arguments: {
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "blocks"
          }
        }
      },{
        opcode: "isCase2",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[STRING] 是 全部大写？",
        arguments: {
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "BLOCKS"
          }
        }
      },{
        opcode: "isCase3",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[STRING] 是 首字母大写？",
        arguments: {
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "Blocks"
          }
        }
      },
      

      "---",

      {
        opcode: "count",
        blockType: Scratch.BlockType.REPORTER,
        text: "[SUBSTRING] 在 [STRING] 的个数",
        arguments: {
          SUBSTRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "c"
          },
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "Blocks by JavaScript"
          }
        }
      },{
        opcode: "indexof",
        blockType: Scratch.BlockType.REPORTER,
        text: "第一个 [SUBSTRING] 在 [STRING] 的位置",
        arguments: {
          SUBSTRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "b"
          },
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "blocks"
          }
        }
      },{
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
            defaultValue: 5
          },
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "blocks"
          }
        }
      },
					

      "---",
      
      {
        opcode: "repeat",
        blockType: Scratch.BlockType.REPORTER,
        text: "将 [STRING] 重复 [REPEAT] 遍",
        arguments: {
          STRING: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "blocks "
          },
          REPEAT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 3
          }
        }
      },{
        opcode: "red",
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
            defaultValue: "blocks"
          }
        }
      },
      
      
      "---",
      
      {
          opcode: 'a',
          blockType: Scratch.BlockType.COMMAND,
          text: '在新窗口打开 [a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4'
            }
          }
        },{
            opcode: 'get',
            blockType: Scratch.BlockType.REPORTER,
            text: '从 [URL] 获取',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/hello.txt'
              }
            }
         },
					
         "---",
         
         {
		  opcode: 'Alert1',
          blockType: Scratch.BlockType.COMMAND,
          text: '弹窗 [a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一个弹窗'
            },
          }
        },{
          opcode: 'Alert3',
          blockType: Scratch.BlockType.REPORTER,
          text: '询问 [a] 返回输入值',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一个问题'
            },
          }
        },{
          opcode: 'Alert2',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '询问 [a] 返回布尔值',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一个问题'
            },
          }
        },
					
        "---",
        
        {
          opcode: 'tst',
          blockType: Scratch.BlockType.COMMAND,
          text: '页面输出 [t]',
          arguments: {
            t: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一串字符'
            },
          }
        },
					
        "---",
        
        {
          opcode: 'Console1',
          blockType: Scratch.BlockType.COMMAND,
          text: '控制台日志 [a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一条日志'
            },
          }
        },{
          opcode: 'Console2',
          blockType: Scratch.BlockType.COMMAND,
          text: '控制台信息 [a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一条信息'
            },
          }
        },{
          opcode: 'Console3',
          blockType: Scratch.BlockType.COMMAND,
          text: '控制台警告 [a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一条警告'
            },
          }
        },{
          opcode: 'Console4',
          blockType: Scratch.BlockType.COMMAND,
          text: '控制台报错 [a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '这是一条报错'
            },
          }
        }
      ]
    };
  }

  
  isCase1(args, util) {
    const string = args.STRING.toString();
    return string.toLowerCase() === string;
  }
  
  isCase2(args, util) {
    const string = args.STRING.toString();
    return string.toUpperCase() === string;
  }
  
  isCase3(args, util) {
    const string = args.STRING.toString();
    return ![...string.matchAll(/\b./g)].some((match) => {
      return match[0].toLowerCase() === match[0];
    });
  }
  
  toCase1(args, util) {
    const string = args.STRING.toString();
    return string.toLowerCase();
  }
  
  toCase2(args, util) {
    const string = args.STRING.toString();
    return string.toUpperCase();
  }
  
  toCase3(args, util) {
    const string = args.STRING.toString();
    return string.split(/\b/g).map((str) => {
      let chars = Array.from(str);
      if (chars.length < 1) return "";
      chars[0] = chars[0].toUpperCase();
      return chars.join("");
    }).join("");
  }
  
  unicodeof(args, util) {
    const chars = Array.from(args.STRING.toString());
    return chars.map((char) => char.charCodeAt(0)).join(" ");
  }
  
  unicodefrom(args, util) {
    return String.fromCharCode(Number(args.NUM) || 0);
  }

  count(args, util) {
    args.STRING = args.STRING.toString().toLowerCase();
    args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();
    
    return args.STRING.split(args.SUBSTRING).length - 1;
  }

  indexof(args, util) {
    args.STRING = args.STRING.toString().toLowerCase();
    args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();
    const found = args.STRING.indexOf(args.SUBSTRING);
    return found === -1 ? 0 : found + 1;
  }

  letters_of(args, util) {
			args.STRING = args.STRING.toString();
			args.LETTER1 = Number(args.LETTER1) || 0;
			args.LETTER2 = Number(args.LETTER2) || 0;
			return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);
		}
    
		_caseInsensitiveRegex(str) {
			return new RegExp(
				str.replaceAll(/[^a-zA-Z0-9]/g, "\\$&"),
				"gi"
			);
		}
		
		
	red(args, util) {
			args.STRING = args.STRING.toString();
			args.SUBSTRING = args.SUBSTRING.toString();
			
			args.REPLACE = args.REPLACE.toString();
			
			const regex = this._caseInsensitiveRegex(args.SUBSTRING);
			
			return args.STRING.replace(regex, args.REPLACE);
		}
		
	repeat(args, util) {
			args.STRING = args.STRING.toString();
			args.REPEAT = Number(args.REPEAT) || 0;
			return args.STRING.repeat(args.REPEAT);
		}	

	identical(args, util) {
			return args.OPERAND1 === args.OPERAND2
	}
		
  a(args) {
	  window.open(args.a,'_blank');
  }

  get (args) {
      return fetch(args.URL)
        .then(r => r.text())
        .catch(() => '');
	}

  Alert1(args) {
    alert(args.a);
  }

  Alert2(args) {
	return window.confirm(args.a);
  }

  Alert3(args) {
	return prompt(args.a);
  }

  Console1(args) {
    console.log(args.a);
  }

  Console2(args) {
    console.info(args.a);
  }

  Console3(args) {
    console.warn(args.a);
  }

  Console4(args) {
    console.error(args.a);
  }

  beef1(args) {
    if (args.a >= args.b) {
      return 1;
    } else {
      return 0;
    }
  }

  beef2(args) {
    if (args.a <= args.b) {
      return 1;
    } else {
      return 0;
    }
  }

  beef3(args) {
    if (args.a >= args.b) {
      return true;
    } else {
      return false;
    }
  }

  beef4(args) {
    if (args.a <= args.b) {
      return true;
    } else {
      return false;
    }
  }
  
  beef5(args) {
    if (args.a == args.b) {
      return 1;
    } else {
      return 0;
    }
  }

  beef6(args) {
    if (args.a == args.b) {
      return true;
    } else {
      return false;
    }
  }
  
  beef7(args) {
    if (args.a != args.b) {
      return 1;
    } else {
      return 0;
    }
  }
  
  beef8(args) {
    if (args.a != args.b) {
      return true;
    } else {
      return false;
    }
  }
  
  bitwiseAnd({ LEFT, RIGHT }) {
    return LEFT & RIGHT;
  }

  bitwiseOr({ LEFT, RIGHT }) {
    return LEFT | RIGHT;
  }

  bitwiseLeftShift({ LEFT, RIGHT }) {
    return LEFT << RIGHT;
  }

  bitwiseRightShift({ LEFT, RIGHT }) {
    return LEFT >> RIGHT;
  }

  bitwiseXor({ LEFT, RIGHT }) {
    return LEFT ^ RIGHT;
  }

  tst(args) {
    document.write( args.t )
  }
  }
  Scratch.extensions.register(new StrictEqualityExtension());
})(Scratch);