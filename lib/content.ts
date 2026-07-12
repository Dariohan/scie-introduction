import type { Locale } from "@/lib/i18n";

type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer Item)[]
        ? readonly DeepWiden<Item>[]
        : T extends object
          ? { readonly [Key in keyof T]: DeepWiden<T[Key]> }
          : T;

const zhContent = {
  locale: "zh",
  htmlLang: "zh-CN",
  metadata: {
    title: "深圳国际交流书院｜立足深圳，连接世界",
    description:
      "走进深圳国际交流书院：学校概况、校园地标、人文特色、美食生活，以及连接世界的未来寄语。",
    openGraphTitle: "深圳国际交流书院｜立足深圳，连接世界",
    openGraphDescription: "一所学校，生长在深圳的时间里，也连接世界的坐标。",
    openGraphLocale: "zh_CN",
    imageAlt: "深圳国际交流书院：立足深圳，连接世界",
  },
  officialSources: {
    mission: "https://www.scie.com.cn/mission-statement/",
    history: "https://www.scie.com.cn/our-college/history/",
    principal: "https://www.scie.com.cn/welcome-from-principal/",
  },
  navigation: [
    { id: "overview", label: "学校概况" },
    { id: "landmarks", label: "地标与风景" },
    { id: "culture", label: "人文与特色" },
    { id: "life", label: "美食与生活" },
    { id: "future", label: "未来寄语" },
  ],
  shared: {
    schoolName: "深圳国际交流书院",
    schoolAbbreviation: "深国交",
    tagline: "立足深圳 · 连接世界",
    address: "广东省深圳市福田区安托山六路3号",
    emblemAlt: "深圳国际交流书院校徽",
    viewOriginal: "查看原图",
    officialSourceAction: "查看校方原文",
  },
  header: {
    skipToContent: "跳至主要内容",
    brandAria: "返回学校概况",
    desktopNavigationAria: "主导航",
    openNavigationAria: "打开导航",
    closeNavigationAria: "关闭导航",
    mobileNavigationAria: "移动端主导航",
    mobileIntro: "选择一段旅程",
    mobileOutro: "向下滚动，走进深国交",
    languageSwitcherAria: "切换网站语言",
    englishLabel: "EN",
    englishName: "English",
    chineseLabel: "中文",
    chineseName: "简体中文",
  },
  backToTop: {
    aria: "返回页面顶部",
    label: "回到顶部",
  },
  overview: {
    hero: {
      eyebrow: "中国 · 深圳 · 福田",
      titleLines: ["深圳国际", "交流书院"],
      leadLines: ["在一座向海而生的城市，", "学会认识世界，也准备改变世界。"],
      action: "开始探索",
      coordinatesLabel: "校园坐标",
      coordinatesLines: ["中国 · 深圳", "福田 · 安托山"],
      scrollCue: "继续向下",
    },
    heading: {
      number: "01",
      eyebrow: "学校概况",
      title: "一所学校，生长在深圳的时间里",
      description:
        "从水围到安托山，从一间间教室到连接世界的坐标，二十余年的变化最终沉淀为一种持续向上的姿态。",
    },
    location: {
      kicker: "地理位置",
      title: "在福田，靠近城市，也保留一座绿色校园的呼吸。",
      body:
        "校园位于深圳市福田区安托山六路3号。城市的开放、速度与多元，不只是背景，也成为学习经验的一部分。",
      visualAria: "深圳与世界坐标示意",
      city: "深圳",
      areaLabel: "所在区域",
      district: "福田区",
      neighbourhood: "安托山",
    },
    statsAria: "学校数据",
    stats: [
      {
        value: 2003,
        decimals: 0,
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
        decimals: 0,
        suffix: "+",
        label: "在校学生",
        note: "剑桥国际公开学校资料口径",
      },
    ],
    history: {
      kicker: "历史沿革",
      titleLines: ["时间不是年表，", "而是一代代人的共同记忆。"],
      timelineAria: "学校历史时间轴",
      events: [
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
      ],
    },
    campusMap: {
      kicker: "校园空间导览",
      titleLines: ["沿着真实图纸，", "读懂一座立体校园。"],
      description: "点击下方选项切换校园空间图；不同图纸的比例与方向均依原图保留。",
      selectorAria: "校园空间图选择",
      openOriginalAriaPrefix: "打开",
      openOriginalAriaSuffix: "原图",
      plans: [
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
      ],
    },
  },
  landmarks: {
    heading: {
      number: "02",
      eyebrow: "地标与风景",
      title: "建筑让人向上，风景让时间慢下来",
      description:
        "穿过连廊、台阶与垂直花园，校园以一种独属于深圳的方式，把密度、自然与日常叠在一起。",
    },
    feature: {
      imageAlt: "星光大道台阶与空中连廊",
      badge: "标志空间 · 星光大道",
      quote: "踏上这段台阶，才能通往教学楼。此时，你永远都在往上走。",
      source: "来自校园素材中的一句话",
    },
    gallery: {
      kicker: "互动影像馆",
      titleLines: ["把校园的光，", "一帧一帧收藏。"],
      previousAria: "上一张校园照片",
      selectorAria: "校园照片选择",
      nextAria: "下一张校园照片",
      items: [
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
      ],
    },
    rednote: {
      label: "校园影像 · 小红书",
      title: "春日深国交｜校园风景正在上新",
      action: "漫游春日校园",
      href: "https://xhslink.com/o/6KqsnbE3H",
    },
    panorama: {
      kicker: "校园实景",
      title: "抬头，看见树冠、连廊与天空。",
      body: "连廊穿过树冠，阳光落进校园中庭。一张真实照片，保留此刻最完整的空间与光线。",
      imageAlt: "树荫与空中连廊实景",
      captionLabel: "校园实景",
      captionTitle: "树冠、连廊与天空",
    },
    city: {
      kicker: "深圳城市名片",
      title: "校园之外，整座城市都是第二课堂。",
      places: [
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
      ],
    },
    video: {
      aria: "校徽视觉动效档案",
      kicker: "视觉档案",
      title: "校徽图形演绎",
      body: "这里展示素材中的视觉研究；终章则由实时网页技术重新实现。",
      play: "播放",
      pause: "暂停",
      loading: "视频加载中",
      stalled: "网络较慢，正在恢复播放",
      error: "视频暂时无法播放",
      retry: "重新加载",
    },
  },
  culture: {
    heading: {
      number: "03",
      eyebrow: "人文与特色",
      title: "教育最终留下的，是一个人面对世界的方式",
      description:
        "知识之外，社会责任、创造力、独立与热情，让独立思考有了温度，也让“追求卓越”不只指向结果。",
    },
    missionStatement:
      "在充满挑战的国际化环境中教育学生，使其取得最高水平的学术成就；培养社会责任感、创造力、独立精神与热情，为每一位学生把握未来机遇做好最充分的准备。",
    missionSource: "深圳国际交流书院校方使命宣言",
    motto: {
      kicker: "学校精神",
      title: "追求卓越",
      sourceNote: "依据校方公开英文校训作中文意译",
      statementLines: [
        "卓越不是把所有人推向同一个终点，",
        "而是让每个人找到值得全力以赴的方向。",
      ],
    },
    valuesCarousel: {
      kicker: "学校使命中的四种力量",
      previousAria: "上一条核心价值",
      selectorAria: "核心价值选择",
      viewAriaPrefix: "查看",
      nextAria: "下一条核心价值",
      values: [
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
      ],
    },
    spirit: {
      imageAlt: "师生共同参与学院主题活动",
      kicker: "校风所在",
      title: "自主、开放、协作、行动",
      body:
        "这不是校方发布的固定四字校风，而是从学院活动、社团实践、舞台表达与公共讨论中读到的校园气质：允许不同，也要求每个人为选择负责。",
      housesAria: "金木水火四大学院",
      houses: ["金", "木", "水", "火"],
    },
    stories: {
      kicker: "名人故事与学生成长",
      titleLines: ["不是“标准答案”，", "而是各自成立的人生。"],
      description: "不制造“名人标签”，只依据校方公开档案，记录真实可核验的成长路径。",
      sourceAction: "查看校方原文",
      items: [
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
      ],
    },
    alumni: {
      imageAlt: "校园师生群像",
      kicker: "校友群像",
      title: "从这里走出去，去往更大的世界。",
      body: "校友分布在不同国家、学科与行业。比目的地更重要的，是继续保持好奇、同理与行动的能力。",
    },
  },
  life: {
    heading: {
      number: "04",
      eyebrow: "美食与生活",
      title: "真正被记住的校园，藏在每一个普通日常里",
      description:
        "一顿午饭、一场排练、一次讨论、一只路过的猫——生活不是学习的间隙，它本身就是成长发生的地方。",
    },
    foodIntro: {
      kicker: "食堂特色",
      title: "从一碗热饭开始，照顾好每一个忙碌的日子。",
      body:
        "校园影像记录了中餐食堂与咖啡空间，也呈现主食、轻食、点心与饮品的多样选择。菜单会随实际供应调整，因此这里讲述用餐体验，不设置未经核验的固定招牌菜。",
    },
    foodCards: [
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
    ],
    rednote: {
      label: "校园餐食 · 小红书",
      title: "深国交的学生平时都吃些什么？",
      action: "看看深国交吃什么",
      href: "https://xhslink.com/o/7gpEZBQlrrG",
    },
    flavours: {
      kicker: "深圳地方风味",
      titleLines: ["一座移民城市，", "把四方味道变成日常。"],
      body:
        "深圳没有单一的味觉答案。岭南、潮汕、客家与滨海饮食在这里相遇，也映照出城市开放而包容的性格。",
      items: [
        { name: "粤式早茶", note: "一盅两件，慢下来分享一张桌" },
        { name: "潮汕风味", note: "粿品、卤味与清鲜汤水" },
        { name: "客家滋味", note: "朴实、丰足，也保存迁徙记忆" },
        { name: "滨海鲜味", note: "城市向海，餐桌也感知潮汐" },
      ],
    },
    lifestyle: {
      kicker: "校园生活影像",
      titleLines: ["一起经历，", "才会成为共同记忆。"],
      previousAria: "上一张生活照片",
      nextAria: "下一张生活照片",
      selectorAria: "校园生活照片选择",
      items: [
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
      ],
    },
    daily: {
      kicker: "校园一日体验",
      titleLines: ["从清晨到入夜，", "每一刻都有自己的节奏。"],
      disclaimer: "以下为叙事性日程，不代表学校发布的固定作息表。",
      schedule: {
        openAria: "打开课表示例原图",
        imageAlt: "2023至2024学年深国交个人课表示例",
        viewOriginal: "查看原图",
        kicker: "真实课表示例",
        title: "一周，被课程、午餐与社团共同排布。",
        body: "图中为2023—2024学年个人课表示例；班级、课程与时段因学生和学期而异。",
      },
      moments: [
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
      ],
    },
  },
  future: {
    intro: {
      number: "05",
      kicker: "未来寄语",
      titleLines: ["我们选择在有海的深圳读书。", "从这里走出去，世界很大。"],
      body: "认识它，理解它，然后用自己的方式改变它。",
    },
    footer: {
      address: "广东省深圳市福田区安托山六路3号",
      mapCreditBefore: "世界地图素材：阿尔·麦克唐纳、弗里茨·莱克沙斯，按",
      mapLicenseLabel: "“知识共享 署名—相同方式共享 3.0”",
      mapLicenseHref: "https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans",
      mapCreditAfter: "许可使用。",
      dataNote:
        "页面数据优先采用学校、深圳市教育主管部门、剑桥国际及建筑设计授权项目资料；校园生活内容由素材影像提炼。校园平面图与课表示例采用本次提供素材，叙事性一日日程不代表固定作息。",
    },
  },
  worldConnection: {
    kicker: "未来寄语",
    titleLines: ["从深圳，", "连接世界"],
    introCopy: "世界不只是远方，也是每一位深国交学子即将抵达的课堂。",
    routesAria: "深圳连接伦敦、纽约、东京与新加坡",
    cities: {
      shenzhen: "深圳",
      london: "伦敦",
      newYork: "纽约",
      tokyo: "东京",
      singapore: "新加坡",
    },
    networkCaption: "全球坐标正在点亮",
    finalKicker: "深圳国际交流书院",
    finalTitle: "让世界看见你的坐标",
    finalLines: ["以深圳为起点，以求知为航向。", "愿每一次成长，都让世界更加相连。"],
    scrollCue: "继续向下 · 汇入校徽",
    progress: "连接中",
    noscriptTitle: "深圳国际交流书院连接世界",
    noscriptBody: "以深圳为起点，以求知为航向。",
  },
} as const;

type DerivedSiteContent = DeepWiden<typeof zhContent>;

export type SiteContent = Omit<DerivedSiteContent, "locale" | "htmlLang"> & {
  readonly locale: Locale;
  readonly htmlLang: "en" | "zh-CN";
};

const enContent = {
  locale: "en",
  htmlLang: "en",
  metadata: {
    title: "Shenzhen College of International Education | From Shenzhen to the World",
    description:
      "Discover Shenzhen College of International Education through its campus, history, culture, student life and global outlook.",
    openGraphTitle: "Shenzhen College of International Education | From Shenzhen to the World",
    openGraphDescription:
      "A school rooted in Shenzhen, preparing students to engage with and contribute to the wider world.",
    openGraphLocale: "en_GB",
    imageAlt: "Shenzhen College of International Education — From Shenzhen to the World",
  },
  officialSources: {
    mission: "https://www.scie.com.cn/mission-statement/",
    history: "https://www.scie.com.cn/our-college/history/",
    principal: "https://www.scie.com.cn/welcome-from-principal/",
  },
  navigation: [
    { id: "overview", label: "Our College" },
    { id: "landmarks", label: "Campus & City" },
    { id: "culture", label: "People & Culture" },
    { id: "life", label: "Food & Life" },
    { id: "future", label: "Looking Ahead" },
  ],
  shared: {
    schoolName: "Shenzhen College of International Education",
    schoolAbbreviation: "SCIE",
    tagline: "Rooted in Shenzhen · Connected to the World",
    address: "No. 3 Antuoshan 6th Rd., Futian District, Shenzhen",
    emblemAlt: "Shenzhen College of International Education emblem",
    viewOriginal: "View full image",
    officialSourceAction: "Read the official story",
  },
  header: {
    skipToContent: "Skip to main content",
    brandAria: "Return to Our College",
    desktopNavigationAria: "Primary navigation",
    openNavigationAria: "Open navigation",
    closeNavigationAria: "Close navigation",
    mobileNavigationAria: "Mobile primary navigation",
    mobileIntro: "Choose a chapter",
    mobileOutro: "Scroll on to discover SCIE",
    languageSwitcherAria: "Switch website language",
    englishLabel: "EN",
    englishName: "English",
    chineseLabel: "中文",
    chineseName: "简体中文",
  },
  backToTop: {
    aria: "Back to the top of the page",
    label: "Back to top",
  },
  overview: {
    hero: {
      eyebrow: "FUTIAN · SHENZHEN · CHINA",
      titleLines: ["Shenzhen College of", "International Education"],
      leadLines: ["In a city shaped by the sea,", "learn to understand the world — and prepare to change it."],
      action: "Begin your journey",
      coordinatesLabel: "Campus coordinates",
      coordinatesLines: ["Shenzhen · China", "Antuoshan · Futian"],
      scrollCue: "Continue below",
    },
    heading: {
      number: "01",
      eyebrow: "Our College",
      title: "A school shaped by Shenzhen and its times",
      description:
        "From Shuiwei to Antuoshan, SCIE has grown from a collection of classrooms into a place connected to the wider world — always looking forward.",
    },
    location: {
      kicker: "Location",
      title: "In the heart of Futian, with room for a green campus to breathe.",
      body:
        "SCIE is located at No. 3 Antuoshan 6th Road in Futian District. Shenzhen's openness, energy and diversity are more than a backdrop; they are part of the learning experience.",
      visualAria: "Diagram showing Shenzhen in relation to the world",
      city: "Shenzhen",
      areaLabel: "District",
      district: "Futian",
      neighbourhood: "Antuoshan",
    },
    statsAria: "Key facts about the College",
    stats: [
      {
        value: 2003,
        decimals: 0,
        suffix: "",
        label: "Founded",
        note: "A pioneering international high school in Shenzhen",
      },
      {
        value: 21800,
        decimals: 0,
        suffix: " m²",
        label: "Campus site",
        note: "Authorised architectural project documentation",
      },
      {
        value: 102800,
        decimals: 0,
        suffix: " m²",
        label: "Built area",
        note: "Authorised architectural project documentation",
      },
      {
        value: 1800,
        decimals: 0,
        suffix: "+",
        label: "Students",
        note: "Current figure published by SCIE",
      },
    ],
    history: {
      kicker: "Our History",
      titleLines: ["History is more than a timeline;", "it is a shared memory across generations."],
      timelineAria: "SCIE history timeline",
      events: [
        {
          year: "2003",
          title: "Where it all began",
          description:
            "Established in 2003 with Shenzhen Education Bureau approval, SCIE gained Cambridge authorisation for its IGCSE and A Level programmes. Its first chapter unfolded at Shuiwei.",
          image: "/media/campus-starlight-stairs.jpg",
        },
        {
          year: "2020",
          title: "A new chapter in Antuoshan",
          description:
            "In 2020, SCIE moved from Shuiwei to its new Antuoshan campus, expanding the setting for learning, arts and sport.",
          image: "/media/campus-court-at-dusk.jpg",
        },
        {
          year: "Today",
          title: "Growing within a global community",
          description:
            "Students and teachers from different cultural backgrounds meet on one campus. Each new cohort brings fresh meaning to international education and exchange.",
          image: "/media/campus-sunset.jpg",
        },
      ],
    },
    campusMap: {
      kicker: "Explore the Campus",
      titleLines: ["Read the real plans;", "discover a campus built in layers."],
      description: "Select a plan below to explore the campus. Each drawing retains the scale and orientation of the source material.",
      selectorAria: "Choose a campus plan",
      openOriginalAriaPrefix: "Open full-size image of",
      openOriginalAriaSuffix: "",
      plans: [
        {
          id: "overview",
          number: "01",
          label: "Campus overview",
          title: "Campus masterplan",
          description: "Locate the East and South Gates, Buildings A and B, residences and principal sports spaces.",
          src: "/media/campus-plan-overview.webp",
          alt: "Masterplan of the Shenzhen College of International Education campus",
        },
        {
          id: "dining",
          number: "02",
          label: "Dining",
          title: "Hill Canteen and Ann Cafe",
          description: "See how the canteen and café connect with the courtyard, theatre and outdoor courts.",
          src: "/media/campus-plan-dining.webp",
          alt: "Campus plan showing Hill Canteen and Ann Cafe",
        },
        {
          id: "support",
          number: "03",
          label: "Student support",
          title: "Wellbeing and sports spaces",
          description: "Locate counselling, medical and student support services beside the outdoor basketball court.",
          src: "/media/campus-plan-support.webp",
          alt: "Plan of student support spaces and the outdoor basketball court",
        },
        {
          id: "level-two",
          number: "04",
          label: "Learning spaces",
          title: "Second-floor classrooms",
          description: "Explore classrooms in Buildings A and B, room numbers and the central connecting space.",
          src: "/media/campus-plan-level-two.webp",
          alt: "Second-floor plan of learning spaces in Buildings A and B",
        },
      ],
    },
  },
  landmarks: {
    heading: {
      number: "02",
      eyebrow: "Campus & City",
      title: "Architecture lifts the eye; landscape slows the pace",
      description:
        "Walkways, steps and vertical gardens bring density, nature and everyday life together in a distinctly Shenzhen campus.",
    },
    feature: {
      imageAlt: "The Starlight Avenue steps and elevated walkway",
      badge: "Campus landmark · Starlight Avenue",
      quote: "These steps lead towards the teaching buildings. Here, you are always moving upwards.",
      source: "A line drawn from the supplied campus materials",
    },
    gallery: {
      kicker: "Interactive Gallery",
      titleLines: ["Collect the light of the campus,", "one frame at a time."],
      previousAria: "Previous campus photograph",
      selectorAria: "Choose a campus photograph",
      nextAria: "Next campus photograph",
      items: [
        {
          src: "/media/campus-green-facade.jpg",
          title: "A living façade",
          caption: "Greenery is not an ornament here; it forms a second skin for the building.",
          tag: "Vertical garden",
        },
        {
          src: "/media/campus-green-corridor.jpg",
          title: "Through a green corridor",
          caption: "Sunlight falls through the leaves, giving an everyday route its own seasons.",
          tag: "Campus path",
        },
        {
          src: "/media/campus-sunset.jpg",
          title: "At sunset",
          caption: "The buildings hold the last light — and the final echoes of a busy day.",
          tag: "Light and shade",
        },
        {
          src: "/media/campus-bougainvillea.jpg",
          title: "Bougainvillea in bloom",
          caption: "A flash of Shenzhen colour appears around an unexpected corner.",
          tag: "Seasons",
        },
        {
          src: "/media/campus-court-at-dusk.jpg",
          title: "Court and walkway",
          caption: "Classrooms above, a court below: student life meets across a vertical campus.",
          tag: "Signature space",
        },
        {
          src: "/media/campus-tree-canopy.jpg",
          title: "Beneath the trees",
          caption: "Walkways pass through the canopy, keeping the architecture open and the pace unhurried.",
          tag: "Green campus",
        },
      ],
    },
    rednote: {
      label: "Campus stories · REDnote",
      title: "Spring at SCIE | A fresh view of campus",
      action: "Explore the spring campus",
      href: "https://xhslink.com/o/6KqsnbE3H",
    },
    panorama: {
      kicker: "Campus View",
      title: "Look up: trees, walkways and sky.",
      body: "Elevated walkways pass through the canopy as sunlight reaches the courtyard below. One photograph preserves the space and light of this moment.",
      imageAlt: "Tree canopy and elevated campus walkways",
      captionLabel: "Campus view",
      captionTitle: "Trees, walkways and sky",
    },
    city: {
      kicker: "Shenzhen Landmarks",
      title: "Beyond the campus, the whole city becomes a classroom.",
      places: [
        {
          index: "I",
          name: "Lianhuashan Park",
          description: "From the hilltop, the city's central axis reveals the scale and momentum of Shenzhen.",
        },
        {
          index: "II",
          name: "Civic Center",
          description: "Public culture and city life meet at one of Shenzhen's most recognisable landmarks.",
        },
        {
          index: "III",
          name: "Shenzhen Bay",
          description: "Sea breeze, migratory birds, a waterfront promenade and the skyline form an open-air lesson in the city.",
        },
      ],
    },
    video: {
      aria: "SCIE emblem motion study",
      kicker: "Visual Archive",
      title: "The emblem in motion",
      body: "This film presents a visual study from the supplied materials; the final chapter reimagines it with real-time web technology.",
      play: "Play",
      pause: "Pause",
      loading: "Loading video",
      stalled: "Connection is slow; resuming playback",
      error: "The video is temporarily unavailable",
      retry: "Reload video",
    },
  },
  culture: {
    heading: {
      number: "03",
      eyebrow: "People & Culture",
      title: "What education leaves behind is a way of meeting the world",
      description:
        "Beyond knowledge, social responsibility, creativity, independence and enthusiasm give independent thought both purpose and warmth.",
    },
    missionStatement:
      "SCIE prepares students for future opportunities through a challenging international education that pursues the highest academic standards and develops social responsibility, creativity, independence and enthusiasm.",
    missionSource: "Official SCIE Mission Statement",
    motto: {
      kicker: "College Spirit",
      title: "Striving to Be the Best",
      sourceNote: "SCIE's official guiding statement",
      statementLines: [
        "Excellence does not send everyone towards the same destination;",
        "it helps each person find a direction worthy of their best effort.",
      ],
    },
    valuesCarousel: {
      kicker: "Four qualities at the heart of the SCIE mission",
      previousAria: "Previous core value",
      selectorAria: "Choose a core value",
      viewAriaPrefix: "View",
      nextAria: "Next core value",
      values: [
        {
          key: "R",
          title: "Social Responsibility",
          quote: "Let learning answer to a wider community.",
          detail: "Recognise the experience of others, then turn empathy into purposeful action.",
        },
        {
          key: "C",
          title: "Creativity",
          quote: "Bring new approaches to enduring questions.",
          detail: "Turn curiosity into inquiry, and ideas into work that can be explored and tested.",
        },
        {
          key: "I",
          title: "Independence",
          quote: "Make choices — and take responsibility for them.",
          detail: "Move beyond standard answers and develop the judgement to shape your own direction.",
        },
        {
          key: "E",
          title: "Enthusiasm",
          quote: "Move towards what you believe in through sustained effort.",
          detail: "Meet difficulty with courage and give genuine interests the commitment they deserve.",
        },
      ],
    },
    spirit: {
      imageAlt: "Students and teachers taking part in a House activity",
      kicker: "The Character of the Campus",
      title: "Agency, openness, collaboration and action",
      body:
        "These are not presented as an official four-part motto. They describe a spirit visible in House activities, clubs, performance and public discussion: difference is welcomed, and each person is expected to take responsibility for their choices.",
      housesAria: "The four Houses: Gold, Wood, Water and Fire",
      houses: ["Gold", "Wood", "Water", "Fire"],
    },
    stories: {
      kicker: "Alumni and Student Stories",
      titleLines: ["No single model answer —", "only lives that take shape in their own way."],
      description: "These accounts avoid celebrity labels and draw only on verifiable stories published by SCIE.",
      sourceAction: "Read the official story",
      items: [
        {
          type: "Alumni profile",
          meta: "Jack Deng · Class of 2019",
          title: "From SCIE to Victoria Harbour: a journalist's journey",
          description:
            "SCIE's profile traces Jack's studies at CUHK and HKU before his move into professional work with Ogilvy in Hong Kong.",
          image: "/media/campus-sunset.jpg",
          imageNote: "Campus image; not a portrait of the subject",
          source:
            "https://www.scie.com.cn/from-scie-to-victoria-harbour-my-journalists-journey-of-growth/",
        },
        {
          type: "Student journey",
          meta: "Venus Wu",
          title: "In an uncertain world, be your own coordinate",
          description:
            "After moving from a public high school to SCIE, she navigated an English-medium curriculum, clubs, competitions and applications across several regions. The official story records an offer from UC Berkeley, without stating where she ultimately enrolled.",
          image: "/media/student-theatre.jpg",
          imageNote: "Campus activity image; not a portrait of the subject",
          source:
            "https://www.scie.com.cn/wu-sitong-in-an-uncertain-world-be-your-own-coordinate/",
        },
        {
          type: "Alumni journey",
          meta: "Minnie",
          title: "From participant to organiser",
          description:
            "SCIE's alumni story follows Minnie from Model United Nations delegate to chair and organising-team member — learning to speak with confidence while taking responsibility for a shared endeavour.",
          image: "/media/student-forum.jpg",
          imageNote: "Campus activity image; not a portrait of the subject",
          source: "https://www.scie.com.cn/minnie-life-is-an-endless-journey/",
        },
      ],
    },
    alumni: {
      imageAlt: "Students and teachers together on campus",
      kicker: "The SCIE Community",
      title: "From here, into a wider world.",
      body: "SCIE alumni continue into different countries, disciplines and professions. Beyond any destination, what matters is the ability to remain curious, empathetic and ready to act.",
    },
  },
  life: {
    heading: {
      number: "04",
      eyebrow: "Food & Life",
      title: "The campus we remember is found in ordinary days",
      description:
        "Lunch, a rehearsal, a conversation, a cat crossing the path — life is not a pause between lessons; it is where growth takes place.",
    },
    foodIntro: {
      kicker: "Campus Dining",
      title: "A warm meal for every busy day.",
      body:
        "Campus photographs show the Chinese canteen and café, alongside a varied choice of main meals, lighter options, dim sum and drinks. Menus change with daily provision, so this section describes the experience rather than claiming any unverified signature dish.",
    },
    foodCards: [
      {
        title: "A warm bowl",
        description: "Rice, protein and seasonal vegetables make a reassuring meal between busy lessons.",
        src: "/media/campus-lunch-bowl.jpg",
      },
      {
        title: "Something small",
        description: "From full meals and lighter choices to Chinese dim sum, variety is part of the everyday rhythm.",
        src: "/media/campus-dessert-moment.jpg",
      },
      {
        title: "A shared table",
        description: "Food festivals bring students, teachers and families together, turning a meal into a community occasion.",
        src: "/media/student-market-fair.jpg",
      },
    ],
    rednote: {
      label: "Campus dining · REDnote",
      title: "What do SCIE students eat on a typical day?",
      action: "Explore campus dining",
      href: "https://xhslink.com/o/7gpEZBQlrrG",
    },
    flavours: {
      kicker: "Flavours of Shenzhen",
      titleLines: ["A city of arrivals,", "where many food traditions become everyday life."],
      body:
        "Shenzhen has no single answer to the question of taste. Cantonese, Chaoshan, Hakka and coastal traditions meet here, reflecting the city's open and inclusive character.",
      items: [
        { name: "Cantonese yum cha", note: "Tea, dim sum and time shared around one table" },
        { name: "Chaoshan flavours", note: "Rice cakes, braised dishes and clear, fresh broths" },
        { name: "Hakka traditions", note: "Generous, grounded cooking shaped by journeys and memory" },
        { name: "Coastal freshness", note: "A city facing the sea brings the tide to the table" },
      ],
    },
    lifestyle: {
      kicker: "Campus Life in Pictures",
      titleLines: ["Shared experiences", "become shared memories."],
      previousAria: "Previous campus-life photograph",
      nextAria: "Next campus-life photograph",
      selectorAria: "Choose a campus-life photograph",
      items: [
        {
          src: "/media/student-camp-stage.jpg",
          title: "New student camp",
          label: "From first introductions to a shared journey",
        },
        {
          src: "/media/student-market-fair.jpg",
          title: "Charity food festival",
          label: "Turning enthusiasm into action",
        },
        {
          src: "/media/student-dance.jpg",
          title: "On stage",
          label: "Making room for every kind of expression",
        },
        {
          src: "/media/campus-fireworks.jpg",
          title: "A night of celebration",
          label: "Remembering a moment shared together",
        },
        {
          src: "/media/teacher-student-workshop.jpg",
          title: "House activities",
          label: "Getting to know one another through collaboration",
        },
        {
          src: "/media/campus-cat.jpg",
          title: "A campus companion",
          label: "A softer footnote to the everyday",
        },
        {
          src: "/media/campus-christmas.jpg",
          title: "A festive campus",
          label: "Giving community life a sense of occasion",
        },
      ],
    },
    daily: {
      kicker: "A Day at SCIE",
      titleLines: ["From morning to evening,", "every moment has its own rhythm."],
      disclaimer: "This is a narrative journey through the day, not an official fixed timetable.",
      schedule: {
        openAria: "Open the full timetable example",
        imageAlt: "Example of an individual SCIE timetable from the 2023–2024 academic year",
        viewOriginal: "View full image",
        kicker: "Real timetable example",
        title: "A week shaped by lessons, lunch and activities.",
        body: "The image shows one student's timetable from the 2023–2024 academic year. Classes, subjects and periods vary by student and term.",
      },
      moments: [
        {
          marker: "Morning",
          title: "Arrive with the light of the city",
          description: "Move through green corridors, stairs and bridges, ready for the day ahead.",
        },
        {
          marker: "Lessons",
          title: "Learning takes more than one form",
          description: "Teaching, experiments, discussion and collaboration allow knowledge to be understood from different angles.",
        },
        {
          marker: "Lunch",
          title: "A meal is also a meeting place",
          description: "The canteen and café bring year groups and cultural backgrounds together around one table.",
        },
        {
          marker: "Afternoon",
          title: "Turn an interest into a community",
          description: "House activities, clubs, sport and the arts offer each student a way to take part.",
        },
        {
          marker: "Evening",
          title: "The lights come on; the story continues",
          description: "Reflection, rehearsal, conversation or quiet reading bring the day gently to a close.",
        },
      ],
    },
  },
  future: {
    intro: {
      number: "05",
      kicker: "Looking Ahead",
      titleLines: ["We choose to learn in Shenzhen, a city by the sea.", "From here, the world opens wide."],
      body: "Know it. Understand it. Then change it in your own way.",
    },
    footer: {
      address: "No. 3 Antuoshan 6th Rd., Futian District, Shenzhen",
      mapCreditBefore: "World map artwork by Al MacDonald, edited by Fritz Lekschas, used under the",
      mapLicenseLabel: "Creative Commons Attribution-ShareAlike 3.0",
      mapLicenseHref: "https://creativecommons.org/licenses/by-sa/3.0/",
      mapCreditAfter: "licence.",
      dataNote:
        "Facts are drawn primarily from SCIE, the Shenzhen education authorities, Cambridge International and authorised architectural project materials. Campus-life writing is based on the supplied photographs. Campus plans and the timetable example come from supplied materials; the narrative school day is not an official fixed schedule.",
    },
  },
  worldConnection: {
    kicker: "Looking Ahead",
    titleLines: ["From Shenzhen,", "connected to the world"],
    introCopy: "The world is more than a distant place; it is the classroom every SCIE student is preparing to enter.",
    routesAria: "Connections from Shenzhen to London, New York, Tokyo and Singapore",
    cities: {
      shenzhen: "Shenzhen",
      london: "London",
      newYork: "New York",
      tokyo: "Tokyo",
      singapore: "Singapore",
    },
    networkCaption: "Global connections are coming to life",
    finalKicker: "Shenzhen College of International Education",
    finalTitle: "Make your place in the world visible",
    finalLines: ["Begin in Shenzhen, guided by curiosity.", "May every step forward bring the world closer together."],
    scrollCue: "Continue · Gather into the emblem",
    progress: "Connecting",
    noscriptTitle: "SCIE connects Shenzhen with the world",
    noscriptBody: "Begin in Shenzhen, guided by curiosity.",
  },
} as const satisfies SiteContent;

export const siteContentByLocale = {
  en: enContent,
  zh: zhContent,
} as const satisfies Record<Locale, SiteContent>;

export function getSiteContent(locale: Locale): SiteContent {
  return siteContentByLocale[locale];
}
