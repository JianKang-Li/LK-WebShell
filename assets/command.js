// 存储已输入指令
const commandStack = []
// 解析指令
function Analysis() {
  const value = input.value.trim()
  commandStack.push(value)
  commandIndex++
  let params = value.split(" ").filter((value) => {
    return value != ''
  })
  let command = params[0].toLowerCase()
  params.shift()
  if (commands[command]) {
    commands[command].run(params)
  } else {
    print(`没有${command}指令，请输入help查看支持的命令`, 'red')
  }
}

// 参数判断
function paramsJu(num, args) {
  return args.length === num
}

function ParamsWarn(command, params) {
  print(`${command} needs ${params} params`, 'red')
}

// 定义指令
const commands = {
  search: {
    description: "用于搜索，第一个参数为搜索源，第二个参数为搜索关键词",
    detail: `search source keyword`,
    run: function () {
      if (paramsJu(2, arguments[0])) {
        let type = arguments[0][0]
        let key = arguments[0][1]
        search(type, key)
        print("Successful!", 'green')
      } else {
        ParamsWarn('search', 2)
      }
    }
  },
  help: {
    description: "查询命令的使用方法",
    detail: `使用:help`,
    run: function () {
      print(`**参数请使用空格作为分割**`)
      for (let key in commands) {
        print(`${key} --${commands[key].description}`, 'green')
      }
    }
  },
  time: {
    description: "返回当前时间",
    detail: `使用:time`,
    run: function () {
      let time = (new Date()).toTimeString().slice(0, 8)
      print(`当前时间: ${time}`, 'green')
    }
  },
  cls: {
    description: "清除控制台",
    detail: `使用:cls`,
    run: function () {
      let prints = document.querySelectorAll('.print')
      prints.forEach((print) => {
        print.remove()
      })
    }
  },
  go: {
    description: "前往指定网站",
    detail: `使用:go URL`,
    run: function () {
      if (paramsJu(1, arguments[0])) {
        let url = arguments[0][0]
        if (url.indexOf("http") === -1) {
          url = `http://${url}`
        }
        window.open(url)
        print('Successful!', "green")
      } else {
        ParamsWarn('go', 1)
      }
    }
  },
  date: {
    description: "返回当前日期",
    detail: `使用:date`,
    run: function () {
      let date = new Date();
      let day =
        date.getFullYear().toString().padStart(4, 0) +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        date.getDate().toString().padStart(2, 0);
      print(`当前日期: ${day}`, 'green')
    }
  },
  set: {
    description: "对网站某些属性进行设置",
    detail: `使用:set type value;<br>
    支持设置的属性有background`,
    run: function (type, value) {
      console.log(type, value);
    }
  },
  detail: {
    description: "返回某个指令的detail",
    detail: `使用:detail command`,
    run: function () {
      if (paramsJu(1, arguments[0])) {
        let command = arguments[0][0].toLowerCase()
        if (commands[command]) {
          print(commands[command].detail, "green")
        } else {
          print(`无效命令${command}`, 'red')
        }
      } else {
        ParamsWarn('detail', 1)
      }
    }
  }
}
