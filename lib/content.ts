export const navigation = [
  { id: "overview", label: "学校概况" },
  { id: "landmarks", label: "地标与风景" },
  { id: "culture", label: "人文与特色" },
  { id: "life", label: "美食与生活" },
  { id: "future", label: "未来寄语" },
] as const;

export const schoolStats = [
  {
    value: 2003,
    suffix: "年",
    label: "创校起点",
    note: "在深圳开启国际高中教育探索",
  },
  {
    value: 2.18,
    decimals: 2,
    suffix: "万㎡",
    label: "校园用地",
    note: "建筑设计授权项目资料口径",
  },
  {
    value: 10.28,
    decimals: 2,
    suffix: "万㎡",
    label: "建筑空间",
    note: "建筑设计授权项目资料口径",
  },
  {
    value: 1800,
    suffix: "+",
    label: "在校学生",
    note: "剑桥国际公开学校资料口径",
  },
] as const;

export const historyEvents = [
  {
    year: "2003",
    title: "从深圳出发",
    description:
      "学校经深圳市教育主管部门批准成立，并获得剑桥国际课程相关授权，第一段故事在水围校区展开。",
    image: "/media/campus-starlight-stairs.jpg",
  },
  {
    year: "2020",
    title: "迁入安托山",
    description:
      "告别水围校区，迁入福田区安托山六路的新校园，学习空间从平面向立体生长。",
    image: "/media/campus-court-at-dusk.jpg",
  },
  {
    year: "此刻",
    title: "在世界坐标中继续生长",
    description:
      "来自不同文化背景的师生在同一座校园相遇。每一届学生，都在重写“国际交流”的含义。",
    image: "/media/campus-sunset.jpg",
  },
] as const;

export const campusPlans = [
  {
    id: "overview",
    number: "01",
    label: "校园总览",
    title: "校园总平面导览",
    description: "查看东门、南门、A/B教学楼、住宿区与主要运动空间的位置关系。",
    src: "/media/campus-plan-overview.webp",
    alt: "深圳国际交流书院校园总平面图",
  },
  {
    id: "dining",
    number: "02",
    label: "餐饮空间",
    title: "慕山食堂与安咖啡",
    description: "查看慕山食堂、安咖啡与中庭、剧场及室外球场之间的位置关系。",
    src: "/media/campus-plan-dining.webp",
    alt: "慕山食堂与安咖啡校园位置图",
  },
  {
    id: "support",
    number: "03",
    label: "支持空间",
    title: "学生支持与运动区域",
    description: "查看心理咨询、医务、学生支持空间与室外篮球场的局部位置。",
    src: "/media/campus-plan-support.webp",
    alt: "学生支持空间与室外篮球场局部平面图",
  },
  {
    id: "level-two",
    number: "04",
    label: "教学空间",
    title: "二层教室分布",
    description: "查看A、B两侧教学空间、房间编号与中部连通区域的二层布局。",
    src: "/media/campus-plan-level-two.webp",
    alt: "A区与B区二层教学空间平面图",
  },
] as const;

export const rednotePosts = {
  campus: {
    label: "校园影像 · 小红书",
    title: "春日深国交｜校园风景正在上新",
    action: "漫游春日校园",
    href: "https://xhslink.com/o/6KqsnbE3H",
  },
  food: {
    label: "校园餐食 · 小红书",
    title: "深国交的学生平时都吃些什么？",
    action: "看看深国交吃什么",
    href: "https://xhslink.com/o/7gpEZBQlrrG",
  },
} as const;

export const campusGallery = [
  {
    src: "/media/campus-green-facade.jpg",
    title: "会呼吸的立面",
    caption: "绿意不是装饰，而是建筑的第二层表皮。",
    tag: "垂直花园",
  },
  {
    src: "/media/campus-green-corridor.jpg",
    title: "穿过一座绿廊",
    caption: "阳光从枝叶之间落下，日常通道也有了季节。",
    tag: "校园路径",
  },
  {
    src: "/media/campus-sunset.jpg",
    title: "日落时分",
    caption: "建筑收住最后一束光，也收住一天的喧闹。",
    tag: "光影",
  },
  {
    src: "/media/campus-bougainvillea.jpg",
    title: "三角梅盛开",
    caption: "深圳的颜色，在一段不经意的转角突然出现。",
    tag: "四季",
  },
  {
    src: "/media/campus-court-at-dusk.jpg",
    title: "球场与连廊",
    caption: "向上是课堂，向下是球场，青春在垂直空间里交汇。",
    tag: "标志空间",
  },
  {
    src: "/media/campus-tree-canopy.jpg",
    title: "树荫下的校园",
    caption: "连廊穿过树冠，让建筑保持开放，也让步伐慢下来。",
    tag: "生态校园",
  },
] as const;

export const cityLandmarks = [
  {
    index: "一",
    name: "莲花山公园",
    description: "从山顶读懂城市轴线，也看见深圳向前生长的尺度。",
  },
  {
    index: "二",
    name: "市民中心",
    description: "公共文化与城市生活在这里交汇，成为深圳最清晰的城市名片之一。",
  },
  {
    index: "三",
    name: "深圳湾",
    description: "海风、候鸟、长廊与天际线，构成一堂没有围墙的城市课程。",
  },
] as const;

export const values = [
  {
    key: "责",
    title: "社会责任",
    quote: "让学习回应更大的共同体。",
    detail: "看见他人的处境，也愿意为共同生活付诸行动。",
  },
  {
    key: "创",
    title: "创造力",
    quote: "对旧问题，提出新的方法。",
    detail: "把好奇转化为探索，把想法推进为可以验证的实践。",
  },
  {
    key: "独",
    title: "独立",
    quote: "作出选择，也为选择负责。",
    detail: "不被标准答案限制，逐步形成自己的判断与方向。",
  },
  {
    key: "热",
    title: "热情",
    quote: "用持续行动，抵达真正相信的方向。",
    detail: "面对困难保留勇气，也让热爱经得起长期投入。",
  },
] as const;

export const cultureStories = [
  {
    type: "校友人物",
    meta: "杰克·邓 · 2019届（中文译写）",
    title: "从深国交到维港：把好奇变成记者的职业路径",
    description:
      "校方故事记录：他先后完成香港中文大学新闻与传播本科学习、香港大学新闻学硕士学习；文章发布时任职于香港奥美。",
    image: "/media/campus-sunset.jpg",
    imageNote: "校园实景配图，并非人物肖像",
    source:
      "https://www.scie.com.cn/from-scie-to-victoria-harbour-my-journalists-journey-of-growth/",
  },
  {
    type: "学生成长",
    meta: "吴思桐",
    title: "在不确定的世界里，做自己的坐标",
    description:
      "从公立高中转入深国交，她经历全英文课程、社团、竞赛与多地区申请。校方文章记录其收到加州大学伯克利分校录取，但未宣称最终入读。",
    image: "/media/student-theatre.jpg",
    imageNote: "校园活动配图，并非人物肖像",
    source:
      "https://www.scie.com.cn/wu-sitong-in-an-uncertain-world-be-your-own-coordinate/",
  },
  {
    type: "校友成长",
    meta: "明妮（中文译写）",
    title: "从参与者到组织者",
    description:
      "校方校友故事记录了她从模拟联合国代表，到主席，再到活动组织者的成长路径：表达观点，也为共同完成一件事负责。",
    image: "/media/student-forum.jpg",
    imageNote: "校园活动配图，并非人物肖像",
    source: "https://www.scie.com.cn/minnie-life-is-an-endless-journey/",
  },
] as const;

export const lifestyleGallery = [
  {
    src: "/media/student-camp-stage.jpg",
    title: "新生营",
    label: "从陌生到同行",
  },
  {
    src: "/media/student-market-fair.jpg",
    title: "慈善美食节",
    label: "把热爱变成行动",
  },
  {
    src: "/media/student-dance.jpg",
    title: "舞台时刻",
    label: "允许每一种表达发生",
  },
  {
    src: "/media/campus-fireworks.jpg",
    title: "夜空庆典",
    label: "记住共同经历的瞬间",
  },
  {
    src: "/media/teacher-student-workshop.jpg",
    title: "学院活动",
    label: "在合作里认识彼此",
  },
  {
    src: "/media/campus-cat.jpg",
    title: "校园朋友",
    label: "日常也有柔软的注脚",
  },
  {
    src: "/media/campus-christmas.jpg",
    title: "节日校园",
    label: "让共同生活拥有仪式感",
  },
] as const;

export const foodCards = [
  {
    title: "一碗热饭",
    description: "米饭、肉类与时蔬，构成忙碌课间最踏实的一餐。",
    src: "/media/campus-lunch-bowl.jpg",
  },
  {
    title: "一份点心",
    description: "从主食、轻食到中式点心，选择跟校园日常一样多元。",
    src: "/media/campus-dessert-moment.jpg",
  },
  {
    title: "一场相聚",
    description: "美食节把学生、教师与家庭聚到一起，分享也因此有了公共意义。",
    src: "/media/student-market-fair.jpg",
  },
] as const;

export const dailyMoments = [
  {
    marker: "清晨",
    title: "带着城市的光进入校园",
    description: "在绿廊、楼梯与连桥之间，准备好一天的学习。",
  },
  {
    marker: "上午",
    title: "课堂不止一种形状",
    description: "讲授、实验、讨论与协作，让知识在不同场景中被重新理解。",
  },
  {
    marker: "午间",
    title: "一餐，也是一次相遇",
    description: "食堂与咖啡空间把不同年级、不同文化背景的人聚在同一张桌旁。",
  },
  {
    marker: "午后",
    title: "把兴趣变成共同体",
    description: "学院活动、社团、体育与艺术，让每个人找到属于自己的参与方式。",
  },
  {
    marker: "入夜",
    title: "灯亮起来，故事仍在继续",
    description: "复盘、排练、交谈或安静阅读，一天在校园里缓缓收束。",
  },
] as const;
