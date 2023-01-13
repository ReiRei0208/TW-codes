(function(Scratch) {
class StrictEqualityExtension {
	getInfo() {
	  return {
		  id: 'pageinteract', 
		  name: 'Page Interact',
		  blocks: [

      {
        opcode: 'aget',
        blockType: Scratch.BlockType.REPORTER,
        text: '从 [URL] 获取',
        arguments: {
          URL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: 'https://extensions.turbowarp.org/hello.txt'
          }
        }
      },
      {
        opcode: 'aout',
        blockType: Scratch.BlockType.COMMAND,
        text: '在新窗口打开 [a]',
         arguments: {
           a: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: 'https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4'
          }
        }
      },
      {
        opcode: 'ain',
        blockType: Scratch.BlockType.COMMAND,
        text: '在当前窗口打开 [a]',
        arguments: {
          a: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: 'https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4'
          }
        }
      },
					
      "---",
            
      {
      opcode: 'br',
      blockType: Scratch.BlockType.COMMAND,
       text: '页面换行 <br/>',
      },  
      {
        opcode: 't',
        blockType: Scratch.BlockType.COMMAND,
        text: '页面输出 [t] [color]',
        arguments: {
          t: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: '这是一串字符'
          },
          color: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: '#000000'
          }
        }
      },         
      {
      opcode: 'h',
      blockType: Scratch.BlockType.COMMAND,
      text: '页面标题 [t] [n] 级',
      arguments: {
        t: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: '这是一段标题'
        },
        n: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: '1'
        }
        }
      },
      {
      opcode: 'p',
      blockType: Scratch.BlockType.COMMAND,
      text: '页面段落 [t]',
      arguments: {
        t: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: '这是一个段落'
        }
      }
      },
      {
      opcode: 'Print',
      blockType: Scratch.BlockType.COMMAND,
      text: '页面命令 [t]',
      arguments: {
        t: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: '<del>这是一个删除线</del>'
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
      },
      {
      opcode: 'Alert3',
      blockType: Scratch.BlockType.REPORTER,
      text: '弹窗询问 [a] 返回输入值',
      arguments: {
        a: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: '这是一个问题'
        },
      }
      },
      {
      opcode: 'Alert2',
      blockType: Scratch.BlockType.BOOLEAN,
      text: '弹窗询问 [a] 返回布尔值',
      arguments: {
        a: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: '这是一个问题'
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
      },
      {
      opcode: 'Console2',
      blockType: Scratch.BlockType.COMMAND,
      text: '控制台信息 [a]',
      arguments: {
        a: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: '这是一条信息'
        },
      }
      },
      {
      opcode: 'Console3',
      blockType: Scratch.BlockType.COMMAND,
      text: '控制台警告 [a]',
      arguments: {
        a: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: '这是一条警告'
        },
      }
      },
      {
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
	

  aout(args) {
        window.open(args.a,'_blank');
  }
    ain(args) {
        window.open(args.a);
  }
  async aget (args) {
        try {
            const r = await fetch(args.URL);
            return await r.text();
        } catch {
            return '';
        }
  }
  t(args) {
        document.write( '<span style="color:' + args.color + '">' + args.t +'</span>' )
  }
  h(args) {
        document.write( '<h' + args.n + '>' + args.t + '</h' + args.n + '>' )
  }
  p(args) {
        document.write( '<p>' + args.t + '</p>' )
  }
  br(args) {
        document.write( '<br/>' )
  }
  Print(args) {
        document.write( args.t )
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
}
Scratch.extensions.register(new StrictEqualityExtension());
})(Scratch);