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
    openGraphDescription: "从安托山校园出发，认识深国交的课程、社群与日常生活。",
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
      leadLines: ["在深圳读书，也在课堂与校园生活里，", "慢慢找到自己愿意投入的方向。"],
      action: "开始探索",
      coordinatesLabel: "校园坐标",
      coordinatesLines: ["中国 · 深圳", "福田 · 安托山"],
      scrollCue: "继续向下",
    },
    heading: {
      number: "01",
      eyebrow: "学校概况",
      title: "从水围到安托山",
      description:
        "SCIE于2003年成立，2020年迁入安托山校区。校园换了地址，课程、社团和学生生活也继续展开。",
    },
    location: {
      kicker: "地理位置",
      title: "在福田安托山，校园与城市相连。",
      body:
        "校园地址是深圳市福田区安托山六路3号。从这里出发，公共文化、城市交通与深圳的日常都离学生很近。",
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
        note: "安托山校园的学习与生活场地",
      },
      {
        value: 10.28,
        decimals: 2,
        suffix: "万㎡",
        label: "建筑空间",
        note: "教学、剧场、运动与公共空间",
      },
      {
        value: 4,
        decimals: 0,
        suffix: "个",
        label: "学生学院",
        note: "金、木、水、火四个学院",
      },
    ],
    history: {
      kicker: "历史沿革",
      titleLines: ["从2003年到今天，", "故事一直向前。"],
      timelineAria: "学校历史时间轴",
      events: [
        {
          year: "2003",
          title: "学校在水围成立",
          description: "学校于2003年经深圳市教育主管部门批准成立，最初位于水围。",
          image: "/media/campus-sunset.jpg",
        },
        {
          year: "2020",
          title: "迁入安托山校区",
          description:
            "2020年，学校从水围迁至福田区安托山六路。新的教学、艺术与运动空间开始投入使用。",
          image: "/media/scie-antuoshan-landmark.webp",
        },
        {
          year: "此刻",
          title: "今天的校园",
          description:
            "课堂、学院、社团和公共活动每天都在这里发生。新一届学生加入，也把自己的兴趣带进校园。",
          image: "/media/scie-house-community.webp",
        },
      ],
    },
    campusMap: {
      kicker: "校园空间导览",
      titleLines: ["从图纸出发，", "读懂校园。"],
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
    academics: {
      kicker: "2026届升学成果",
      title: "从深国交出发，每个人都有自己的方向",
      intro:
        "410多名2026届毕业生，共收到2,100多份来自世界多地高校的录取。牛津、剑桥、英国G5与美国Top 30之外，学生也在更广阔的专业和地区中找到自己的去向。",
      imageAlt: "校园台阶旁的学生肖像展示墙",
      imageTitle: "各有方向",
      sourceHref:
        "https://www.scie.com.cn/scie-class-of-2026%EF%BD%9Cglobal-university-admissions-results/",
      sourceAction: "查看校方2026届升学成果",
      actions: {
        sourceLabel: "校方发布",
        view: "查看结果详情",
        open: "打开校方原文",
        back: "返回成果",
      },
      cards: [
        {
          eyebrow: "全球大学录取",
          value: "2,100+",
          title: "来自多个国家和地区的高校",
          summary: "对应410+名2026届毕业生",
          backTitle: "截至2026年5月7日",
          backBody:
            "校方于2026年5月发布的汇总显示，410多名毕业生共收到2,100多份大学录取或有条件录取通知，呈现出这一届学生广泛而多元的升学选择。",
        },
        {
          eyebrow: "英国方向",
          value: "35",
          title: "学生获牛津或剑桥有条件录取",
          summary: "35名学生收获有条件录取",
          backTitle: "牛津、剑桥录取成果",
          backBody:
            "校方原文写明：330多名英国方向申请者中，35名学生获得牛津大学或剑桥大学的有条件录取。",
        },
        {
          eyebrow: "英国G5",
          value: "70%",
          title: "英国申请者获G5有条件录取",
          summary: "330+名申请者，共423份有条件录取",
          backTitle: "英国方向的广泛选择",
          backBody:
            "校方称，70%的英国方向申请者收到G5大学有条件录取，共423份。文章采用2026 Times英国大学排名口径。",
        },
        {
          eyebrow: "美国方向",
          value: "60%",
          title: "美国 Top 30 录取",
          summary: "190+名申请者，共159份录取",
          backTitle: "美国方向的多元去向",
          backBody:
            "校方称，60%的美国方向申请者收到美国Top 30大学录取，共159份。文章采用2026 U.S. News排名口径。",
        },
      ],
    },
  },
  landmarks: {
    heading: {
      number: "02",
      eyebrow: "地标与风景",
      title: "在连廊、台阶和树影之间",
      description:
        "教学楼、球场和花园分布在不同高度。学生沿着楼梯与连廊往返，校园的结构也因此变得容易理解。",
    },
    feature: {
      imageAlt: "星光大道台阶与空中连廊",
      badge: "标志空间 · 星光大道",
      quote: "踏上这段台阶，才能通往教学楼。此时，你永远都在往上走。",
      source: "星光大道 · 安托山校园",
    },
    gallery: {
      kicker: "互动影像馆",
      titleLines: ["六段校园路径，", "六种日常视角。"],
      previousAria: "上一张校园照片",
      selectorAria: "校园照片选择",
      nextAria: "下一张校园照片",
      items: [
        {
          src: "/media/scie-leafy-passage.webp",
          title: "走进绿荫深处",
          caption: "藤蔓覆在廊架上，日光落进通道。这是学生每天上课会经过的一段路。",
          tag: "绿荫走廊",
        },
        {
          src: "/media/scie-green-corridor.webp",
          title: "穿过一座绿廊",
          caption: "枝叶遮住一部分直射光，这段通道在中午也显得安静。",
          tag: "校园路径",
        },
        {
          src: "/media/scie-campus-evening.webp",
          title: "灯光亮起时",
          caption: "天色暗下来后，中庭、连廊和台阶依次亮灯。",
          tag: "校园暮色",
        },
        {
          src: "/media/scie-bougainvillea-light.webp",
          title: "三角梅盛开",
          caption: "三角梅沿着栏杆开到转角，颜色很难错过。",
          tag: "四季",
        },
        {
          src: "/media/scie-basketball-court.webp",
          title: "球场与连廊",
          caption: "球场在下，教学空间在上，连廊把两边接在一起。",
          tag: "标志空间",
        },
        {
          src: "/media/scie-reeds-sky.webp",
          title: "风从校园经过",
          caption: "芦苇、天空和建筑边缘构成校园里很常见的一角。",
          tag: "自然细节",
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
      title: "沿连廊，走遍校园。",
      body: "高架步道穿过树冠，也把教学空间、球场和花园接到同一条路线里。",
      imageAlt: "树木之间向上延伸的校园连廊",
      captionLabel: "校园实景",
      captionTitle: "连廊、绿意与垂直校园",
    },
    corridor: {
      aria: "穿过深圳国际交流书院校园走廊的实景视频",
      playAria: "播放走廊视频",
      pauseAria: "暂停走廊视频",
      retryAria: "重新加载走廊视频",
    },
    city: {
      kicker: "深圳城市名片",
      title: "放学以后，也去读一读深圳。",
      places: [
        {
          index: "一",
          name: "莲花山公园",
          description: "从山顶可以看到福田中心区与城市轴线。",
        },
        {
          index: "二",
          name: "市民中心",
          description: "市民中心周边集合图书馆、音乐厅与公共广场。",
        },
        {
          index: "三",
          name: "深圳湾",
          description: "海滨步道连接湿地、候鸟观测点与深圳湾天际线。",
        },
      ],
    },
    video: {
      aria: "校徽视觉动效档案",
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
      title: "课堂之外，也学着与人相处",
      description:
        "SCIE用真实、同情、勤勉、热忱解释四项核心品格。它们落在很具体的事情里：怎样说真话、怎样理解别人、怎样把自己的事做好。",
    },
    missionStatement:
      "在充满挑战的国际化环境中教育学生，使其取得最高水平的学术成就；培养社会责任感、创造力、独立精神与热情，为每一位学生把握未来机遇做好最充分的准备。",
    missionSource: "深圳国际交流书院校方使命宣言",
    motto: {
      kicker: "学校精神",
      title: "追求卓越",
      statementLines: [
        "认真把事情做好，",
        "也独立思考。",
      ],
    },
    valuesCarousel: {
      kicker: "SCIE 四项核心品格",
      previousAria: "上一条核心价值",
      selectorAria: "核心价值选择",
      viewAriaPrefix: "查看",
      nextAria: "下一条核心价值",
      values: [
        {
          key: "S",
          title: "真实",
          quote: "真实，但不把它当作残忍的借口。",
          detail: "听从内心所确认的正确原则，不为迎合众人而迷失自己。",
        },
        {
          key: "C",
          title: "同情",
          quote: "理解他人，容纳异见。",
          detail: "掌控自己的情绪，能从他人的角度着想。",
        },
        {
          key: "I",
          title: "勤勉",
          quote: "做足份内事，不成为他人负担。",
          detail: "热爱学习，不偏离学习的真正目的。努力不懈，善始善终。",
        },
        {
          key: "E",
          title: "热忱",
          quote: "遇到困难保持乐观，勇于尝试新事物。",
          detail: "不让恐惧或他人的消极态度阻挠追求；寻找解决之道，而不是纠结于问题本身。",
        },
      ],
    },
    houseSystem: {
      kicker: "学院制度",
      title: "每位学生都属于一个学院",
      intro:
        "入学后，每位学生都会成为金、木、水、火四个学院之一的一员。跨年级的学院队伍，让学生在班级之外认识更多伙伴，也一起投入辩论、知识竞赛、拔河与体育活动。",
      allHousesImage: {
        alt: "金木水火四个学院的学生与学院旗帜在校园台阶合影",
      },
      metalImage: {
        alt: "Metal House学生在校园台阶上的集体合影",
      },
      cardsAria: "金木水火四个学院",
      houses: [
        {
          id: "metal",
          element: "金",
          name: "Metal House",
          identity: "黄色 · 白虎",
          motto: "金光闪耀",
        },
        {
          id: "wood",
          element: "木",
          name: "Wood House",
          identity: "绿色 · 玄武",
          motto: "共同成长",
        },
        {
          id: "water",
          element: "水",
          name: "Water House",
          identity: "蓝色 · 青龙",
          motto: "水力全开",
        },
        {
          id: "fire",
          element: "火",
          name: "Fire House",
          identity: "红色 · 朱雀",
          motto: "燃尽全场",
        },
      ],
      body:
        "学院比赛把不同年级的学生带到同一支队伍里。新生由此认识学长学姐，学生也在筹备活动时练习组织、协作和带队。",
      linksAria: "学院制度与活动进一步阅读",
      links: [
        {
          label: "制度总览",
          title: "学院制如何运作",
          href: "https://www.scie.com.cn/extra-curricular-activities/the-house-system/",
        },
        {
          label: "学院档案",
          title: "四学院的颜色与图腾",
          href: "https://www.scie.com.cn/four-houses-at-scie/",
        },
        {
          label: "学院活动",
          title: "安托山校区首场拔河",
          href: "https://www.scie.com.cn/first-house-event-at-new-campus-tug-of-war/",
        },
        {
          label: "学科活动",
          title: "数学与计算机周学院挑战",
          href: "https://www.scie.com.cn/maths-and-computer-science-week/",
        },
      ],
    },
    community: {
      kicker: "学生社群",
      title: "兴趣在这里遇见同伴",
      body:
        "学生可以加入已有社团，也可以在教师支持下，把一个想法慢慢变成新的社团。每学期的ECA Fair，是彼此认识和找到同行者的开始。",
      imageAlt: "联合国大会堂实景，用作模拟联合国主题背景",
      actions: {
        sourceLabel: "校方社团目录",
        view: "了解社团构成",
        open: "打开社团目录",
        back: "返回社团概览",
      },
      stat: {
        eyebrow: "校园社团",
        value: "250+",
        title: "活跃社团",
        summary: "3大类 · 13个子类",
        backTitle: "250多种参与方式",
        backBody:
          "校方ECA页面列出250多个活跃社团，横跨学术、社会与体育等方向。学生可以加入已有社团，也能在教师支持下发起新的兴趣共同体。",
        sourceHref: "https://www.scie.com.cn/extra-curricular-activities/",
      },
      links: [
        {
          label: "模拟联合国",
          title: "在分歧里继续协商",
          body:
            "2026年SCIEMUN由SCIE与NESSIC联合举办，学生代表参与主题陈述、动议与有主持核心磋商。",
          action: "查看SCIEMUN 2026",
          href: "https://www.scie.com.cn/sciemun-vi-x-nessicmun-2026-successfully-concluded/",
        },
        {
          label: "TEDxSCIE",
          title: "把想法讲给人听",
          body:
            "2026年春，八位讲者在Halo Theater分享经历，学生团队参与筹备与后台工作。",
          action: "查看TEDxSCIE活动",
          href: "https://www.scie.com.cn/tedx-scie-youth-reimagined-eight-lives-one-illuminating-night/",
        },
        {
          label: "ECA目录",
          title: "从学术到体育的社团选择",
          body:
            "校方目录按学术、社会与体育三大类列出社团，名称和数量会随学年调整。",
          action: "查看校方社团目录",
          href: "https://www.scie.com.cn/extra-curricular-activities/",
        },
      ],
    },
    expression: {
      kicker: "表达的现场",
      titleLines: ["舞台、设计与公开讨论，", "都有人认真参与。"],
      description:
        "有些学生站到台前，有些负责设计、制作和组织。作品完成以后，大家也要面对真实的观众。",
      items: [
        {
          src: "/media/scie-expression-stage.webp",
          label: "舞台表演",
          title: "排练以后，站到台前",
        },
        {
          src: "/media/scie-expression-fashion.webp",
          label: "学生设计",
          title: "从草图做到秀场",
        },
        {
          src: "/media/scie-expression-dialogue.webp",
          label: "校园讲座",
          title: "把问题带到公开讨论里",
        },
      ],
    },
    stories: {
      kicker: "名人故事与学生成长",
      titleLines: ["三个人的故事，", "从校园出发。"],
      description: "从新闻职业、大学申请到模拟联合国，三段经历写下了不同的成长方向。",
      sourceAction: "查看校方原文",
      items: [
        {
          type: "校友人物",
          meta: "杰克·邓 · 2019届（中文译写）",
          title: "从深国交到维港：把好奇变成记者的职业路径",
          description:
            "校方故事记录：他先后完成香港中文大学新闻与传播本科学习、香港大学新闻学硕士学习；文章发布时任职于香港奥美。",
          image: "/media/scie-victoria-harbour.webp",
          source:
            "https://www.scie.com.cn/from-scie-to-victoria-harbour-my-journalists-journey-of-growth/",
        },
        {
          type: "学生成长",
          meta: "吴思桐",
          title: "在不确定的世界里，做自己的坐标",
          description:
            "从公立高中转入深国交，她经历全英文课程、社团、竞赛与多地区申请，并收到加州大学伯克利分校录取。",
          image: "/media/student-theatre.jpg",
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
          source: "https://www.scie.com.cn/minnie-life-is-an-endless-journey/",
        },
      ],
    },
    alumni: {
      imageAlt: "深国交师生在星光大道台阶上的校园群像",
      kicker: "校园群像",
      title: "在这里，遇见同行的人。",
    },
  },
  life: {
    heading: {
      number: "04",
      eyebrow: "美食与生活",
      title: "校园生活，大多藏在这些小事里",
      description:
        "午饭、排练、社团活动，还有路过连廊时遇见的那只猫。很多校园记忆，就是这样留下来的。",
    },
    foodIntro: {
      kicker: "食堂特色",
      title: "午饭时间，先想想吃什么。",
      body:
        "热饭、点心、咖啡和一杯课间饮品，让午间成为校园里节奏稍慢的一段时间。",
    },
    foodCards: [
      {
        title: "一碗热饭",
        description: "米饭、肉类与时蔬，是课间常见的一份正餐。",
        src: "/media/campus-lunch-bowl.jpg",
      },
      {
        title: "一份点心",
        description: "不想吃一整份正餐时，也可以选择点心或轻食。",
        src: "/media/campus-dessert-moment.jpg",
      },
      {
        title: "一场相聚",
        description: "美食节让学生、教师与家庭围在同一张桌旁。",
        src: "/media/scie-food-festival.webp",
      },
    ],
    diningStories: {
      drink: {
        alt: "手持一杯粉色奶茶，背景为校园空间",
        kicker: "课间奶茶",
        title: "买杯奶茶，再去下一节课",
        body:
          "拿上一杯奶茶，在连廊下聊几分钟，再赶去下一节课。这是校园里很普通的一小段时间。",
      },
      western: {
        kicker: "安咖啡与西式简餐",
        title: "午间，也可以轻一点",
        body:
          "三明治、沙拉或一杯咖啡，为课程之间留下一种更轻便的选择。",
        examplesAria: "西式简餐示例",
        examples: ["三明治", "沙拉", "轻食"],
        sourceAction: "在校方设施页查看安咖啡",
        sourceHref: "https://www.scie.com.cn/our-college/facilities/",
      },
    },
    rednote: {
      label: "校园餐食 · 小红书",
      title: "深国交的学生平时都吃些什么？",
      action: "看看深国交吃什么",
      href: "https://xhslink.com/o/7gpEZBQlrrG",
    },
    flavours: {
      kicker: "深圳地方风味",
      titleLines: ["在深圳，", "总有熟悉的味道。"],
      body:
        "粤式早茶、潮汕汤水、客家菜和海鲜，都能在这座城市找到。",
      items: [
        { name: "粤式早茶", note: "茶、点心，以及围桌慢慢吃的一顿饭" },
        { name: "潮汕风味", note: "粿品、卤味和清鲜汤水" },
        { name: "客家菜", note: "酿菜、煲仔和偏朴实的家常味" },
        { name: "滨海鲜味", note: "靠海城市常见的鱼、虾与贝类" },
      ],
    },
    lifestyle: {
      kicker: "校园生活影像",
      titleLines: ["课堂之外，", "一天自有节奏。"],
      previousAria: "上一张生活照片",
      nextAria: "下一张生活照片",
      selectorAria: "校园生活照片选择",
      items: [
        {
          src: "/media/scie-life-camp.webp",
          title: "校园营会",
          label: "新学年，从一句你好开始",
        },
        {
          src: "/media/scie-life-creativity.webp",
          title: "校园趣味时刻",
          label: "一场轻松的校园活动",
        },
        {
          src: "/media/scie-life-fashion.webp",
          title: "时装秀场",
          label: "用设计表达自己的视角",
        },
        {
          src: "/media/campus-fireworks.jpg",
          title: "夜空庆典",
          label: "庆典结束前抬头看一次夜空",
        },
        {
          src: "/media/scie-life-house.webp",
          title: "学院共创",
          label: "学院活动里一起动手",
        },
        {
          src: "/media/scie-life-cat.webp",
          title: "校园朋友",
          label: "在连廊边偶遇校猫",
        },
        {
          src: "/media/scie-life-christmas.webp",
          title: "节日校园",
          label: "大家一起布置节日校园",
        },
      ],
    },
    sports: {
      kicker: "体育与学院活动",
      title: "跑道上冲向终点，看台上为彼此加油",
      body:
        "运动会把田径项目和学院文化放到同一天里。有人参赛，有人加油，也有人负责组织、记录和摄影。平时，校队、体育社团与学院比赛又把运动带回日常。",
      sprint: {
        alt: "学生在蓝色跑道上参加短跑项目",
      },
      stadium: {
        alt: "深圳湾体育中心内的学校运动会现场",
      },
      linksAria: "体育活动进一步阅读",
      links: [
        {
          label: "运动会记录",
          title: "2024深国交运动会",
          href: "https://www.scie.com.cn/flowing-with-the-wind-2024-scie-sports-day/",
        },
        {
          label: "体育设施",
          title: "校内运动空间",
          href: "https://www.scie.com.cn/sportsfacilities/",
        },
        {
          label: "参与方式",
          title: "校队、社团与学院比赛",
          href: "https://www.scie.com.cn/extra-curricular-activities/the-house-system/",
        },
      ],
    },
    daily: {
      kicker: "校园一日体验",
      titleLines: ["从第一节课到社团结束，", "一天慢慢展开。"],
      schedule: {
        openAria: "打开课表示例原图",
        imageAlt: "2023至2024学年深国交个人课表示例",
        viewOriginal: "查看原图",
        kicker: "真实课表示例",
        title: "一周，被课程、午餐与社团共同排布。",
      },
      moments: [
        {
          marker: "清晨",
          title: "到校，去往第一节课",
          description: "穿过连廊和楼梯，先确认当天的教室。",
        },
        {
          marker: "上午",
          title: "上课、实验或讨论",
          description: "不同科目的课堂安排并不一样，课表也因学生而异。",
        },
        {
          marker: "午间",
          title: "午间碰面，一起吃饭",
          description: "食堂与咖啡空间是午间最容易遇见同学的地方。",
        },
        {
          marker: "午后",
          title: "去社团、训练或学院活动",
          description: "有人排练，有人训练，也有人留下来准备下一场活动。",
        },
        {
          marker: "入夜",
          title: "收好东西，结束一天",
          description: "活动结束后整理教室或场地，再离开校园。",
        },
      ],
    },
  },
  future: {
    intro: {
      number: "05",
      kicker: "未来寄语",
      titleLines: ["我们选择在有海的深圳读书"],
    },
    footer: {
      address: "广东省深圳市福田区安托山六路3号",
      mapCreditBefore: "世界地图素材：阿尔·麦克唐纳、弗里茨·莱克沙斯，按",
      mapLicenseLabel: "“知识共享 署名—相同方式共享 3.0”",
      mapLicenseHref: "https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans",
      mapCreditAfter: "许可使用。",
      dataNote:
        "本页图片仅用于视觉叙事，不与相邻文字构成一一对应关系；学校相关事实与数据以校方官网及页面所链接的公开资料为准。",
    },
  },
  worldConnection: {
    kicker: "未来寄语",
    titleLines: ["从深圳，", "连接世界"],
    introCopy: "学生从深圳出发，去不同城市读书、工作，也继续认识新的生活。",
    routesAria: "深圳连接伦敦、纽约、东京与新加坡",
    cities: {
      shenzhen: "深圳",
      london: "伦敦",
      newYork: "纽约",
      tokyo: "东京",
      singapore: "新加坡",
    },
    networkCaption: "从深圳出发的几条路径",
    finalKicker: "深圳国际交流书院",
    finalTitle: "认识世界 走向世界 改变世界",
    scrollCue: "继续向下 · 汇入校徽",
    progress: "连接中",
    noscriptTitle: "深圳国际交流书院连接世界",
    noscriptBody: "从深圳出发，去认真过好下一段生活。",
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
      "Explore SCIE's Antuoshan campus, academic results, Houses, clubs and everyday student life.",
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
      leadLines: ["Study in Shenzhen, then find out", "where your interests can take you."],
      action: "Explore SCIE",
      coordinatesLabel: "Campus coordinates",
      coordinatesLines: ["Shenzhen · China", "Antuoshan · Futian"],
      scrollCue: "Continue below",
    },
    heading: {
      number: "01",
      eyebrow: "Our College",
      title: "From Shuiwei to Antuoshan",
      description:
        "SCIE was founded in 2003 and moved to the Antuoshan campus in 2020. The address changed; lessons, clubs and student life carried on in a larger setting.",
    },
    location: {
      kicker: "Location",
      title: "In Antuoshan, Futian, close to the everyday life of the city.",
      body:
        "SCIE is at No. 3 Antuoshan 6th Road in Futian District. Public culture, transport and the rest of Shenzhen are within easy reach of the campus.",
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
        note: "Learning and daily life at Antuoshan",
      },
      {
        value: 102800,
        decimals: 0,
        suffix: " m²",
        label: "Built area",
        note: "Learning, performance, sport and shared space",
      },
      {
        value: 4,
        decimals: 0,
        suffix: " Houses",
        label: "Student Houses",
        note: "Metal, Wood, Water and Fire",
      },
    ],
    history: {
      kicker: "Our History",
      titleLines: ["From 2003 to today,", "the campus has changed address and kept moving."],
      timelineAria: "SCIE history timeline",
      events: [
        {
          year: "2003",
          title: "SCIE opens in Shuiwei",
          description: "SCIE was established in 2003 with approval from the Shenzhen education authorities and first operated in Shuiwei.",
          image: "/media/campus-sunset.jpg",
        },
        {
          year: "2020",
          title: "The move to Antuoshan",
          description:
            "In 2020, SCIE moved from Shuiwei to Antuoshan. The new campus brought teaching, arts and sports spaces together on one site.",
          image: "/media/scie-antuoshan-landmark.webp",
        },
        {
          year: "Today",
          title: "Campus today",
          description:
            "Lessons, House events, clubs and performances take place here throughout the week. Each new cohort adds its own interests to the campus.",
          image: "/media/scie-house-community.webp",
        },
      ],
    },
    campusMap: {
      kicker: "Explore the Campus",
      titleLines: ["Start with the real plans;", "see how the campus connects."],
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
    academics: {
      kicker: "Class of 2026 · University Admissions",
      title: "From SCIE to universities around the world",
      intro:
        "More than 410 graduates in the Class of 2026 received over 2,100 offers from universities worldwide. Beyond Oxford, Cambridge, the UK G5 and US Top 30 institutions, students found destinations across a wider range of subjects and regions.",
      imageAlt: "A student portrait display beside the campus steps",
      imageTitle: "Many paths ahead",
      sourceHref:
        "https://www.scie.com.cn/scie-class-of-2026%EF%BD%9Cglobal-university-admissions-results/",
      sourceAction: "Explore the Class of 2026 admissions results",
      actions: {
        sourceLabel: "Published by SCIE",
        view: "Explore the results",
        open: "Open the official page",
        back: "Return to the results",
      },
      cards: [
        {
          eyebrow: "Offers worldwide",
          value: "2,100+",
          title: "From universities across several regions",
          summary: "For 410+ graduates in the Class of 2026",
          backTitle: "Reported as of 7 May 2026",
          backBody:
            "SCIE's May 2026 summary records more than 2,100 university and conditional offers for over 410 graduates, reflecting the breadth of destinations pursued by the Class of 2026.",
        },
        {
          eyebrow: "UK applications",
          value: "35",
          title: "Students with Oxford or Cambridge conditional offers",
          summary: "35 students in SCIE's Class of 2026",
          backTitle: "Oxford and Cambridge offers",
          backBody:
            "SCIE states that 35 of the 330+ UK applicants secured conditional offers from the University of Oxford or the University of Cambridge.",
        },
        {
          eyebrow: "UK G5",
          value: "70%",
          title: "UK applicants receiving G5 conditional offers",
          summary: "330+ applicants; 423 conditional offers",
          backTitle: "A broad range of UK destinations",
          backBody:
            "SCIE reports 423 G5 conditional offers across 70% of UK applicants. The article uses the 2026 Times ranking for UK universities.",
        },
        {
          eyebrow: "US applications",
          value: "60%",
          title: "US applicants receiving Top 30 offers",
          summary: "190+ applicants; 159 offers",
          backTitle: "A varied range of US destinations",
          backBody:
            "SCIE reports 159 US Top 30 offers across 60% of US applicants. The article uses the 2026 U.S. News ranking for US universities.",
        },
      ],
    },
  },
  landmarks: {
    heading: {
      number: "02",
      eyebrow: "Campus & City",
      title: "Between walkways, steps and trees",
      description:
        "Teaching buildings, courts and gardens sit at different levels. Stairs and walkways make the route between them part of the daily school experience.",
    },
    feature: {
      imageAlt: "The Starlight Avenue steps and elevated walkway",
      badge: "Campus landmark · Starlight Avenue",
      quote: "These steps lead towards the teaching buildings. Here, you are always moving upwards.",
      source: "Starlight Avenue · Antuoshan Campus",
    },
    gallery: {
      kicker: "Interactive Gallery",
      titleLines: ["Six routes through campus,", "seen from six everyday angles."],
      previousAria: "Previous campus photograph",
      selectorAria: "Choose a campus photograph",
      nextAria: "Next campus photograph",
      items: [
        {
          src: "/media/scie-leafy-passage.webp",
          title: "A passage under the vines",
          caption: "Vines cover the frame and filter the midday light. Students use this route between lessons.",
          tag: "Green passage",
        },
        {
          src: "/media/scie-green-corridor.webp",
          title: "Through a green corridor",
          caption: "Leaves block the strongest light, keeping this route quieter at midday.",
          tag: "Campus path",
        },
        {
          src: "/media/scie-campus-evening.webp",
          title: "When the lights come on",
          caption: "As daylight fades, the courtyard, walkways and steps come on one by one.",
          tag: "Campus at dusk",
        },
        {
          src: "/media/scie-bougainvillea-light.webp",
          title: "Bougainvillea in bloom",
          caption: "Bougainvillea follows the rail and carries its colour around the corner.",
          tag: "Seasons",
        },
        {
          src: "/media/scie-basketball-court.webp",
          title: "Court and walkway",
          caption: "The court sits below the classrooms, with a walkway linking both sides.",
          tag: "Signature space",
        },
        {
          src: "/media/scie-reeds-sky.webp",
          title: "A breeze through campus",
          caption: "Reeds, sky and the edge of a building make up a familiar corner of campus.",
          tag: "Natural detail",
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
      title: "Follow the walkway through the campus.",
      body: "The elevated route passes through the trees and connects learning spaces, courts and gardens.",
      imageAlt: "An elevated campus walkway rising through the trees",
      captionLabel: "Campus view",
      captionTitle: "Walkways, greenery and a vertical campus",
    },
    corridor: {
      aria: "A real-time walk through a corridor at Shenzhen College of International Education",
      playAria: "Play the corridor video",
      pauseAria: "Pause the corridor video",
      retryAria: "Reload the corridor video",
    },
    city: {
      kicker: "Shenzhen Landmarks",
      title: "After school, Shenzhen remains within reach.",
      places: [
        {
          index: "I",
          name: "Lianhuashan Park",
          description: "The hilltop overlooks Futian's central district and the city axis.",
        },
        {
          index: "II",
          name: "Civic Center",
          description: "The Civic Center sits beside the library, concert hall and public square.",
        },
        {
          index: "III",
          name: "Shenzhen Bay",
          description: "The waterfront route connects wetlands, birdwatching points and the Shenzhen Bay skyline.",
        },
      ],
    },
    video: {
      aria: "SCIE emblem motion study",
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
      title: "School is also where students learn how to work with other people",
      description:
        "SCIE describes four core qualities: Sincerity, Compassion, Industriousness and Enthusiasm. They show up in practical choices: speaking honestly, listening well and doing your share of the work.",
    },
    missionStatement:
      "SCIE prepares students for future opportunities through a challenging international education that pursues the highest academic standards and develops social responsibility, creativity, independence and enthusiasm.",
    missionSource: "Official SCIE Mission Statement",
    motto: {
      kicker: "College Spirit",
      title: "Striving to Be the Best",
      statementLines: [
        "Do the work in front of you properly,",
        "and keep your own judgement intact.",
      ],
    },
    valuesCarousel: {
      kicker: "SCIE expressed through four qualities",
      previousAria: "Previous core value",
      selectorAria: "Choose a core value",
      viewAriaPrefix: "View",
      nextAria: "Next core value",
      values: [
        {
          key: "S",
          title: "Sincerity",
          quote: "Be truthful, but never use honesty as an excuse for cruelty.",
          detail: "Follow the principles you know to be right; do not lose yourself merely to win others’ approval.",
        },
        {
          key: "C",
          title: "Compassion",
          quote: "Seek to understand others, and make room for different views.",
          detail: "Manage your emotions and learn to see situations from another person’s perspective.",
        },
        {
          key: "I",
          title: "Industrious",
          quote: "Do your part fully, without becoming a burden to others.",
          detail: "Love learning for its true purpose. Persevere, and see every undertaking through.",
        },
        {
          key: "E",
          title: "Enthusiasm",
          quote: "Stay optimistic in difficulty, and be ready to try new things.",
          detail: "Do not let fear or others’ negativity hold you back. Look for solutions rather than dwelling on the problem.",
        },
      ],
    },
    houseSystem: {
      kicker: "The House System",
      title: "Every student belongs to a House",
      intro:
        "Every student becomes part of one of four Houses: Metal, Wood, Water or Fire. Each House brings year groups together through debates, quizzes, tug of war and sport.",
      allHousesImage: {
        alt: "Students from Metal, Wood, Water and Fire Houses with their flags on the campus steps",
      },
      metalImage: {
        alt: "Metal House students gathered for a group photograph on the campus steps",
      },
      cardsAria: "The four SCIE Houses",
      houses: [
        {
          id: "metal",
          element: "M",
          name: "Metal House",
          identity: "Yellow · White Tiger",
          motto: "Golden Glow",
        },
        {
          id: "wood",
          element: "W",
          name: "Wood House",
          identity: "Green · Black Tortoise",
          motto: "We Grow Together",
        },
        {
          id: "water",
          element: "W",
          name: "Water House",
          identity: "Blue · Azure Dragon",
          motto: "Hydro Power",
        },
        {
          id: "fire",
          element: "F",
          name: "Fire House",
          identity: "Red · Vermilion Bird",
          motto: "Burn Them All",
        },
      ],
      body:
        "House competitions bring students from different year groups together. Along the way, students meet older and younger peers, organise events and learn how to take responsibility for a team.",
      linksAria: "Further reading about the House System and House events",
      links: [
        {
          label: "How it works",
          title: "The SCIE House System",
          href: "https://www.scie.com.cn/extra-curricular-activities/the-house-system/",
        },
        {
          label: "House profiles",
          title: "Colours, symbols and identities",
          href: "https://www.scie.com.cn/four-houses-at-scie/",
        },
        {
          label: "House event",
          title: "The first Antuoshan tug of war",
          href: "https://www.scie.com.cn/first-house-event-at-new-campus-tug-of-war/",
        },
        {
          label: "Faculty event",
          title: "A House challenge in Maths and CS Week",
          href: "https://www.scie.com.cn/maths-and-computer-science-week/",
        },
      ],
    },
    community: {
      kicker: "Student Community",
      title: "Where interests find a community",
      body:
        "Students can join an established club or, with a teacher sponsor, turn an idea into something new. Each semester's ECA Fair is where those communities begin to meet.",
      imageAlt: "The United Nations General Assembly Hall, used as context for Model United Nations",
      actions: {
        sourceLabel: "Official ECA directory",
        view: "Explore the community",
        open: "Open the club directory",
        back: "Return to the overview",
      },
      stat: {
        eyebrow: "Student-led community",
        value: "250+",
        title: "Active clubs",
        summary: "3 main categories · 13 subcategories",
        backTitle: "More than 250 ways to take part",
        backBody:
          "SCIE's ECA directory lists more than 250 active clubs across academic, social and sporting interests. Students may join an existing group or, with a teacher sponsor, begin one of their own.",
        sourceHref: "https://www.scie.com.cn/extra-curricular-activities/",
      },
      links: [
        {
          label: "Model United Nations",
          title: "Keep negotiating when views differ",
          body:
            "SCIEMUN 2026 was jointly organised by SCIE and NESSIC, with delegates taking part in speeches, motions and moderated debate.",
          action: "Read about SCIEMUN 2026",
          href: "https://www.scie.com.cn/sciemun-vi-x-nessicmun-2026-successfully-concluded/",
        },
        {
          label: "TEDxSCIE",
          title: "Eight speakers, one student-produced evening",
          body:
            "In spring 2026, eight speakers shared their experiences at Halo Theater, with a student team supporting the programme and backstage work.",
          action: "Read the TEDxSCIE story",
          href: "https://www.scie.com.cn/tedx-scie-youth-reimagined-eight-lives-one-illuminating-night/",
        },
        {
          label: "ECA directory",
          title: "From academic interests to sport",
          body:
            "SCIE's directory groups clubs under academic, social and sports categories. Names and numbers can change from one academic year to the next.",
          action: "Browse the official ECA page",
          href: "https://www.scie.com.cn/extra-curricular-activities/",
        },
      ],
    },
    expression: {
      kicker: "Where Ideas Take the Stage",
      titleLines: ["Performance, design and public discussion", "all have people doing the work."],
      description:
        "Some students take the stage; others design, make or organise. When the work is ready, it meets a real audience.",
      items: [
        {
          src: "/media/scie-expression-stage.webp",
          label: "Performance",
          title: "After rehearsal, step into the light",
        },
        {
          src: "/media/scie-expression-fashion.webp",
          label: "Student design",
          title: "From first sketch to the runway",
        },
        {
          src: "/media/scie-expression-dialogue.webp",
          label: "Campus lecture",
          title: "Take a question into public discussion",
        },
      ],
    },
    stories: {
      kicker: "Alumni and Student Stories",
      titleLines: ["Three people,", "three paths that began at SCIE."],
      description: "Journalism, university applications and Model United Nations frame three different routes through and beyond SCIE.",
      sourceAction: "Read the official story",
      items: [
        {
          type: "Alumni profile",
          meta: "Jack Deng · Class of 2019",
          title: "From SCIE to Victoria Harbour: a journalist's journey",
          description:
            "SCIE's profile traces Jack's studies at CUHK and HKU before his move into professional work with Ogilvy in Hong Kong.",
          image: "/media/scie-victoria-harbour.webp",
          source:
            "https://www.scie.com.cn/from-scie-to-victoria-harbour-my-journalists-journey-of-growth/",
        },
        {
          type: "Student journey",
          meta: "Venus Wu",
          title: "In an uncertain world, be your own coordinate",
          description:
            "After moving from a public high school to SCIE, she navigated an English-medium curriculum, clubs, competitions and applications across several regions, receiving an offer from UC Berkeley.",
          image: "/media/student-theatre.jpg",
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
          source: "https://www.scie.com.cn/minnie-life-is-an-endless-journey/",
        },
      ],
    },
    alumni: {
      imageAlt: "The SCIE community gathered on the Starlight Avenue steps",
      kicker: "The SCIE Community",
      title: "A place to find your people.",
    },
  },
  life: {
    heading: {
      number: "04",
      eyebrow: "Food & Life",
      title: "Most of school life is made of small moments",
      description:
        "Lunch, rehearsals, club meetings and the cat that turns up by the walkway: these are the details people tend to remember.",
    },
    foodIntro: {
      kicker: "Campus Dining",
      title: "At lunchtime, the first question is what to eat.",
      body:
        "A warm meal, something small, coffee or a drink between lessons: lunch is one of the few moments when the pace of campus eases.",
    },
    foodCards: [
      {
        title: "A warm bowl",
        description: "Rice, protein and seasonal vegetables make a familiar meal between lessons.",
        src: "/media/campus-lunch-bowl.jpg",
      },
      {
        title: "Something small",
        description: "When a full meal feels too much, there are smaller dishes and lighter options.",
        src: "/media/campus-dessert-moment.jpg",
      },
      {
        title: "A shared table",
        description: "Food festivals bring students, teachers and families around the same table.",
        src: "/media/scie-food-festival.webp",
      },
    ],
    diningStories: {
      drink: {
        alt: "A hand holding pink milk tea with the campus in the background",
        kicker: "Milk tea between lessons",
        title: "Milk tea, then back to class",
        body:
          "Pick up a milk tea, stop under the walkway for a few minutes, then head to the next lesson. It is a small, recognisable part of the school day.",
      },
      western: {
        kicker: "Ann Café · Sandwiches, salads and coffee",
        title: "A lighter pause between lessons",
        body:
          "Sandwiches, salads and coffee make an easy lunch when the school day is moving quickly.",
        examplesAria: "Examples of lighter Western-style food",
        examples: ["Sandwiches", "Salads", "Light meals"],
        sourceAction: "Find Ann Café in SCIE's facilities guide",
        sourceHref: "https://www.scie.com.cn/our-college/facilities/",
      },
    },
    rednote: {
      label: "Campus dining · REDnote",
      title: "What do SCIE students eat on a typical day?",
      action: "Explore campus dining",
      href: "https://xhslink.com/o/7gpEZBQlrrG",
    },
    flavours: {
      kicker: "Flavours of Shenzhen",
      titleLines: ["In Shenzhen,", "food from many regions feels familiar."],
      body:
        "Cantonese yum cha, Chaoshan soups, Hakka dishes and seafood are all easy to find across the city.",
      items: [
        { name: "Cantonese yum cha", note: "Tea, dim sum and a meal taken slowly around one table" },
        { name: "Chaoshan flavours", note: "Rice cakes, braised dishes and clear, fresh broths" },
        { name: "Hakka cooking", note: "Stuffed dishes, claypot cooking and practical home-style flavours" },
        { name: "Coastal food", note: "Fish, prawns and shellfish in a city beside the sea" },
      ],
    },
    lifestyle: {
      kicker: "Campus Life in Pictures",
      titleLines: ["Beyond lessons,", "there are many ways to spend a day."],
      previousAria: "Previous campus-life photograph",
      nextAria: "Next campus-life photograph",
      selectorAria: "Choose a campus-life photograph",
      items: [
        {
          src: "/media/scie-life-camp.webp",
          title: "SCIE Camp",
          label: "Meet the people who will share the new school year",
        },
        {
          src: "/media/scie-life-creativity.webp",
          title: "A playful campus moment",
          label: "A lighter moment in the school calendar",
        },
        {
          src: "/media/scie-life-fashion.webp",
          title: "Fashion on stage",
          label: "Using design to express a point of view",
        },
        {
          src: "/media/campus-fireworks.jpg",
          title: "A night of celebration",
          label: "Look up before the celebration ends",
        },
        {
          src: "/media/scie-life-house.webp",
          title: "House creativity",
          label: "Make something together at a House event",
        },
        {
          src: "/media/scie-life-cat.webp",
          title: "A campus companion",
          label: "Meet the campus cat by the walkway",
        },
        {
          src: "/media/scie-life-christmas.webp",
          title: "A festive campus",
          label: "Decorate the campus together for the season",
        },
      ],
    },
    sports: {
      kicker: "Sport and House life",
      title: "On the track, they race; in the stands, they cheer one another on",
      body:
        "Sports Day brings athletics and House life into the same programme. Some students compete; others cheer, organise or photograph the day. Across the year, school teams, sports clubs and House competitions keep physical activity part of ordinary campus life.",
      sprint: {
        alt: "Students running a sprint event on a blue athletics track",
      },
      stadium: {
        alt: "An SCIE Sports Day taking place at Shenzhen Bay Sports Center",
      },
      linksAria: "Further reading about sport at SCIE",
      links: [
        {
          label: "Sports Day",
          title: "SCIE Sports Day 2024",
          href: "https://www.scie.com.cn/flowing-with-the-wind-2024-scie-sports-day/",
        },
        {
          label: "Facilities",
          title: "Sports spaces on campus",
          href: "https://www.scie.com.cn/sportsfacilities/",
        },
        {
          label: "Ways to take part",
          title: "Varsity teams, clubs and House sport",
          href: "https://www.scie.com.cn/extra-curricular-activities/the-house-system/",
        },
      ],
    },
    daily: {
      kicker: "A Day at SCIE",
      titleLines: ["From the first lesson to the end of ECA,", "this is how a day may unfold."],
      schedule: {
        openAria: "Open the full timetable example",
        imageAlt: "Example of an individual SCIE timetable from the 2023–2024 academic year",
        viewOriginal: "View full image",
        kicker: "Real timetable example",
        title: "A week shaped by lessons, lunch and activities.",
      },
      moments: [
        {
          marker: "Morning",
          title: "Arrive and find the first classroom",
          description: "Walk through the corridors and stairs, then check where the day begins.",
        },
        {
          marker: "Lessons",
          title: "A lesson, experiment or discussion",
          description: "Different subjects use the classroom differently, and each student's timetable varies.",
        },
        {
          marker: "Lunch",
          title: "Lunch, and a chance to catch up",
          description: "The canteen and café are easy places to run into friends between lessons.",
        },
        {
          marker: "Afternoon",
          title: "Clubs, training or a House event",
          description: "Some students rehearse, some train and others stay to prepare the next event.",
        },
        {
          marker: "Evening",
          title: "Pack up and finish the day",
          description: "When activities end, students clear the room or venue before leaving campus.",
        },
      ],
    },
  },
  future: {
    intro: {
      number: "05",
      kicker: "Looking Ahead",
      titleLines: ["We choose to learn in Shenzhen, beside the sea."],
    },
    footer: {
      address: "No. 3 Antuoshan 6th Rd., Futian District, Shenzhen",
      mapCreditBefore: "World map artwork by Al MacDonald, edited by Fritz Lekschas, used under the",
      mapLicenseLabel: "Creative Commons Attribution-ShareAlike 3.0",
      mapLicenseHref: "https://creativecommons.org/licenses/by-sa/3.0/",
      mapCreditAfter: "licence.",
      dataNote:
        "Images are used for visual storytelling and do not correspond one-to-one with adjacent content. School facts and figures are based on SCIE's official website and the public sources linked on this page.",
    },
  },
  worldConnection: {
    kicker: "Looking Ahead",
    titleLines: ["From Shenzhen,", "connected to the world"],
    introCopy: "Students leave Shenzhen for different cities, courses and kinds of work, carrying their SCIE experience with them.",
    routesAria: "Connections from Shenzhen to London, New York, Tokyo and Singapore",
    cities: {
      shenzhen: "Shenzhen",
      london: "London",
      newYork: "New York",
      tokyo: "Tokyo",
      singapore: "Singapore",
    },
    networkCaption: "A few routes beginning in Shenzhen",
    finalKicker: "Shenzhen College of International Education",
    finalTitle: "Know the world. Step into it. Change it.",
    scrollCue: "Continue · Gather into the emblem",
    progress: "Connecting",
    noscriptTitle: "SCIE connects Shenzhen with the world",
    noscriptBody: "Begin in Shenzhen, then use what you have learned well.",
  },
} as const satisfies SiteContent;

export const siteContentByLocale = {
  en: enContent,
  zh: zhContent,
} as const satisfies Record<Locale, SiteContent>;

export function getSiteContent(locale: Locale): SiteContent {
  return siteContentByLocale[locale];
}
