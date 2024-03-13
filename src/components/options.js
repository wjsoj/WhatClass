const options = [
  { label: '全部', value: '' },
  { label: '专业课', value: '专业课' },
  { label: '政治课', value: '政治课'},
  { label: '公选课', value: '公选课' },
  { label: '通识课', value: '通识课' },
  { label: '体育课', value: '体育课' },
  { label: '英语课', value: '英语课' },
  { label: '计算机课程', value: '计算机课程' },
]
const options2 = [
  { label: '全部', value: '' },
  { label: '数学科学学院', value: '数学科学学院' },
  { label: '物理学院', value: '物理学院' },
  { label: '化学与分子工程学院', value: '化学与分子工程学院' },
  { label: '生命科学学院', value: '生命科学学院' },
  { label: '地球与空间科学学院', value: '地球与空间科学学院' },
  { label: '心理与认知科学学院', value: '心理与认知科学学院' },
  { label: '软件与微电子学院', value: '软件与微电子学院' },
  { label: '新闻与传播学院', value: '新闻与传播学院' },
  { label: '中国语言文学系', value: '中国语言文学系' },
  { label: '历史学系', value: '历史学系' },
  { label: '考古文博学院', value: '考古文博学院' },
  { label: '哲学系', value: '哲学系' },
  { label: '国际关系学院', value: '国际关系学院' },
  { label: '经济学院', value: '经济学院' },
  { label: '光华管理学院', value: '光华管理学院' },
  { label: '法学院', value: '法学院' },
  { label: '信息管理系', value: '信息管理系' },
  { label: '社会学系', value: '社会学系' },
  { label: '政府管理学院', value: '政府管理学院' },
  { label: '英语语言文学系', value: '英语语言文学系' },
  { label: '外国语学院', value: '外国语学院' },
  { label: '马克思主义学院', value: '马克思主义学院' },
  { label: '体育教研部', value: '体育教研部' },
  { label: '艺术学院', value: '艺术学院' },
  { label: '对外汉语教育学院', value: '对外汉语教育学院' },
  { label: '元培学院', value: '元培学院' },
  { label: '深圳研究生院', value: '深圳研究生院' },
  { label: '信息科学技术学院', value: '信息科学技术学院' },
  { label: '国家发展研究院', value: '国家发展研究院' },
  { label: '教育学院', value: '教育学院' },
  { label: '人口研究所', value: '人口研究所' },
  { label: '前沿交叉学科研究院', value: '前沿交叉学科研究院' },
  { label: '工学院', value: '工学院' },
  { label: '集成电路学院', value: '集成电路学院' },
  { label: '计算机学院', value: '计算机学院' },
  { label: '智能学院', value: '智能学院' },
  { label: '电子学院', value: '电子学院' },
  { label: '城市与环境学院', value: '城市与环境学院' },
  { label: '环境科学与工程学院', value: '环境科学与工程学院' },
  { label: '中国社会科学调查中心', value: '中国社会科学调查' },
  { label: '歌剧研究院', value: '歌剧研究院' },
  { label: '建筑与景观设计学院', value: '建筑与景观设计学院' },
  { label: '汇丰商学院', value: '汇丰商学院' },
  { label: '新媒体研究院', value: '新媒体研究院' },
  { label: '燕京学堂', value: '燕京学堂' },
  { label: '现代农学院', value: '现代农学院' },
  { label: '南南合作与发展学院', value: '南南合作与发展学院' },
  { label: '习近平新时代中国特色社会主义思想研究院', value: '习近平新时代中国特色社会主义思想研究院' },
  { label: '人工智能研究院', value: '人工智能研究院' },
  { label: '材料科学与工程学院', value: '材料科学与工程学院' },
  { label: '未来技术学院', value: '未来技术学院' },
  { label: '学生工作部人民武装部', value: '学生工作部人民武装部' },
  { label: '教务部', value: '教务部' },
  { label: '研究生院', value: '研究生院' },
  { label: '创新创业学院', value: '创新创业学院' },
  { label: '医学部', value: '医学部' },
  { label: '国际合作部', value: '国际合作部' },
]
const tskoptions = [
  { label: '全部', value: '' },
  { label: 'I.人类文明及其传统', value: '课I)' },
  { label: 'II.现代社会及其问题', value: '课II)' },
  { label: 'III.艺术与人文', value: '课III)' },
  { label: 'IV.数学、自然与技术', value: '课IV)' },
]
const engoptions = [
  { label: '全部', value: '' },
  { label: 'A', value: 'A级' },
  { label: 'B', value: 'B级' },
  { label: 'C', value: 'C级' },
  { label: 'C+', value: 'C+级' },
  { label: 'Y', value: 'Y级' },
]
const options3 = [
  { label: '全部', value: '' },
  { label: '专业课', value: '专业课' },
  { label: '政治课', value: '政治课'},
  { label: '公选课', value: '公选课' },
  { label: '通识课I', value: '通识课(通识课I)' },
  { label: '通识课II', value: '通识课(通识课II)' },
  { label: '通识课III', value: '通识课(通识课III)' },
  { label: '通识课IV', value: '通识课(通识课IV)' },
  { label: '体育课', value: '体育课' },
  { label: '英语课', value: '英语课' },
  { label: '计算机课程', value: '计算机课程' },
]

const nowClass = ()=> {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  if (hour < 8) {
    return "1"
  } else if (hour === 8) {
    if (minute < 50) {
      return "1"
    } else {
      return "2"
    }
  } else if (hour === 9) {
    if (minute < 50) {
      return "2"
    } else {
      return "3"
    }
  } else if (hour === 10) {
    return "3"
  } else if (hour === 11) {
    return "4"
  } else if (hour === 12) {
    return "5"
  } else if (hour === 13) {
    if (minute < 50) {
      return "5"
    } else {
      return "6"
    }
  } else if (hour === 14) {
    if (minute < 50) {
      return "6"
    } else {
      return "7"
    }
  } else if (hour === 15) {
    return "7"
  } else if (hour === 16) {
    return "8"
  } else if (hour === 17) {
    return "9"
  } else if (hour === 18) {
    return "a"
  } else if (hour === 19) {
    if (minute < 30) {
      return "a"
    } else {
      return "b"
    }
  } else if (hour === 20) {
    if (minute < 30) {
      return "b"
    } else {
      return "c"
    }
  } else if (hour === 21) {
    return "c"
  }
  return "c";
}

const nowEmptyClass = ()=> {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  if (hour <= 8) {
    return [["1","2"],["3","4"]]
  } else if (hour === 9) {
    if (minute < 50) {
      return [["1","2"],["3","4"]]
    } else {
      return [["3","4"],["5","6"]]
    }
  } else if (hour === 10 || hour === 11) {
    return [["3","4"],["5","6"]]
  } else if (hour === 12 || hour === 13) {
    return [["5","6"],["7","8","9"]]
  } else if (hour === 14) {
    if (minute < 50) {
      return [["5","6"],["7","8","9"]]
    } else {
      return [["7","8","9"],["10","11","12"]]
    }
  } else if (hour === 15 || hour === 16 || hour === 17) {
    return [["7","8","9"],["10","11","12"]]
  } else {
    return [["10","11","12"]]
  }
}

const floor = {
  "一教": [1,3],
  "二教": [1,5],
  "三教": [1,5],
  "四教": [3,5],
  "理教": [1,4],
  "文史": [1,3],
  "地学": [1,3],
  "哲学": [1,2],
  "政管": [4,5],
  "国关": [1,3],
}
// f**k typescript
const getFloor = (name) => {
  return floor[name]
}

export {options,options2,options3,tskoptions,engoptions,getFloor,nowClass,nowEmptyClass}