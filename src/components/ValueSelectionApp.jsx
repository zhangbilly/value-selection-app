import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Grip, Check, Globe } from 'lucide-react';

const ValueSelectionApp = () => {
    // 状态定义
    const [language, setLanguage] = useState('zh'); // 默认中文
    const [allValues, setAllValues] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [unselectedIndex, setUnselectedIndex] = useState(0);
    const [showAllSelected, setShowAllSelected] = useState(false);
    const [isDragging, setIsDragging] = useState(null);

    // Fisher-Yates 洗牌算法
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    // 初始化数据
    useEffect(() => {
        // 中文价值观数据
        const zhData = [
            { "value": "富足", "description": "生活充满由内心驱动的体验" },
            { "value": "接受", "description": "接纳周围的人与经历" },
            { "value": "问责", "description": "坚守自己的承诺" },
            { "value": "准确性", "description": "保持正确或精确" },
            { "value": "成就", "description": "获得成果与成功" },
            { "value": "推动", "description": "推动一项事业或计划" },
            { "value": "冒险", "description": "体验大胆的经历" },
            { "value": "倡导", "description": "公开支持某项事业" },
            { "value": "抱负", "description": "实现目标或成就的强烈渴望" },
            { "value": "欣赏", "description": "认可并享受他人或事物的优点" },
            { "value": "不卑不亢", "description": "既不委屈自己，也不忽视他人" },
            { "value": "吸引力", "description": "对他人具有吸引力" },
            { "value": "真诚", "description": "在关系中保持诚实与真实" },
            { "value": "权威", "description": "对他人拥有权力与控制" },
            { "value": "自主权", "description": "独立且不受他人控制" },
            { "value": "觉察", "description": "保持对自我与他人的认知与感知" },
            { "value": "平衡", "description": "合理分配必须完成的事务与个人兴趣的时间" },
            { "value": "美丽", "description": "欣赏周围的美好品质" },
            { "value": "善行", "description": "对他人行善" },
            { "value": "魄力", "description": "自信或勇敢地冒险" },
            { "value": "冷静", "description": "保持情绪平稳" },
            { "value": "关怀", "description": "对他人展现善意与关心" },
            { "value": "挑战", "description": "尝试超越自己能力的事情" },
            { "value": "变化", "description": "享受多样的经历" },
            { "value": "慈善", "description": "帮助需要的人" },
            { "value": "乐观", "description": "以乐观拥抱生活" },
            { "value": "聪明", "description": "机智、创新、智慧或诙谐" },
            { "value": "协作", "description": "与他人分工合作以创造具体成果" },
            { "value": "舒适", "description": "拥有物质与身体上的安逸" },
            { "value": "献身精神", "description": "全心投入某项事业或活动" },
            { "value": "社群", "description": "与志同道合的群体互动" },
            { "value": "同情心", "description": "关注自己与他人的福祉" },
            { "value": "自信", "description": "相信自身能力" },
            { "value": "一致性", "description": "坚持相同的原则或行动" },
            { "value": "贡献", "description": "为他人利益而行动" },
            { "value": "配合", "description": "为共同目标协调行动或资源" },
            { "value": "勇气", "description": "自信而勇敢地面对事物" },
            { "value": "礼貌", "description": "对他人展现尊重与礼貌" },
            { "value": "创造力", "description": "以新方式表达想法" },
            { "value": "好奇心", "description": "渴望学习或了解事物" },
            { "value": "敢做敢想", "description": "有胆量，敢于冒险" },
            { "value": "果断", "description": "快速有效做决定" },
            { "value": "奉献", "description": "对任务或目标全心投入" },
            { "value": "可靠性", "description": "值得信赖" },
            { "value": "多样性", "description": "拥有广泛经历与兴趣" },
            { "value": "义务", "description": "履行道德或法律义务" },
            { "value": "生态", "description": "尊重环境" },
            { "value": "同理心", "description": "理解并考虑他人感受" },
            { "value": "鼓励", "description": "给予他人支持、信心与希望" },
            { "value": "热情", "description": "以享受、兴趣与认可的方式参与体验" },
            { "value": "道德", "description": "遵循道德准则约束行为" },
            { "value": "卓越", "description": "以高标准要求行动" },
            { "value": "兴奋", "description": "充满热情与刺激的生活" },
            { "value": "表达力", "description": "通过行动展现意义与情感" },
            { "value": "公平", "description": "公正对待他人" },
            { "value": "忠诚", "description": "建立基于忠诚与信任的关系（伴侣、朋友）" },
            { "value": "名誉", "description": "被众人所知" },
            { "value": "家庭", "description": "拥有团结有爱的家庭" },
            { "value": "体能", "description": "参与体育活动并保持健壮或强壮" },
            { "value": "灵活性", "description": "愿意在必要时改变或妥协" },
            { "value": "专注", "description": "心无旁骛完成任务" },
            { "value": "宽恕", "description": "释怀对他人的负面情绪" },
            { "value": "自由", "description": "按自己的意愿行动、说话或思考" },
            { "value": "友谊", "description": "建立友好支持的关系" },
            { "value": "乐趣", "description": "享受轻松、积极与有趣的体验" },
            { "value": "慷慨", "description": "无私地分享" },
            { "value": "真实", "description": "保持本真" },
            { "value": "成长", "description": "持续发展与进化" },
            { "value": "健康", "description": "远离疾病与伤害" },
            { "value": "乐于助人", "description": "随时支持他人" },
            { "value": "诚实", "description": "对自己与他人诚实" },
            { "value": "希望", "description": "对未来的积极期待" },
            { "value": "谦逊", "description": "保持谦虚" },
            { "value": "幽默", "description": "做个有趣的人，做些有趣的事" },
            { "value": "包容性", "description": "接纳并欢迎他人" },
            { "value": "独立", "description": "独立做事" },
            { "value": "个性", "description": "忠于自身独特品质" },
            { "value": "勤奋", "description": "勤勉投入工作" },
            { "value": "内心的平静", "description": "体验内在安宁" },
            { "value": "创新", "description": "追求新方法、想法或产品" },
            { "value": "灵感", "description": "激发创造力" },
            { "value": "正直", "description": "以道德与诚实行事" },
            { "value": "智力", "description": "获取并应用知识与技能" },
            { "value": "亲密", "description": "与他人建立亲密关系" },
            { "value": "直觉", "description": "本能地理解事物" },
            { "value": "喜悦", "description": "从事带来愉悦感的行为" },
            { "value": "正义", "description": "按照规则公平行事" },
            { "value": "善良", "description": "友好、慷慨且体贴" },
            { "value": "知识", "description": "广泛了解事实与信息" },
            { "value": "领导力", "description": "领导团队或组织" },
            { "value": "学习", "description": "通过教育与经验获取知识或技能" },
            { "value": "休闲", "description": "参与放松与恢复活力的活动" },
            { "value": "爱", "description": "与他人分享情感" },
            { "value": "忠心", "description": "对他人展现真诚的支持与拥护（团队、组织）" },
            { "value": "影响力", "description": "对个人、情境或社会产生重大影响" },
            { "value": "精通", "description": "在特定领域拥有全面知识或技能" },
            { "value": "正念", "description": "专注当下并不加评判" },
            { "value": "温和", "description": "避免极端行为并寻求平衡" },
            { "value": "专一伴侣", "description": "拥有唯一长期亲密关系" },
            { "value": "动力", "description": "充满热情追求活动" },
            { "value": "不墨守成规", "description": "不局限于大众普遍接受的方式或信念" },
            { "value": "培养", "description": "关爱与保护他人" },
            { "value": "开放心态", "description": "接纳新观点、想法或信念" },
            { "value": "秩序", "description": "保持条理并遵循既定惯例" },
            { "value": "激情", "description": "拥有强烈感受或信念" },
            { "value": "耐心", "description": "平静等待期望的结果" },
            { "value": "平和", "description": "以宁静而放松的方式生活" },
            { "value": "坚持", "description": "坚定追求目标" },
            { "value": "个人发展", "description": "主动追求个人成长" },
            { "value": "好玩", "description": "轻松或充满乐趣" },
            { "value": "愉悦", "description": "体验满足与享受" },
            { "value": "受欢迎", "description": "被多数人支持与钦佩" },
            { "value": "积极", "description": "对经历与人保持积极态度" },
            { "value": "权力", "description": "对他人具有影响力" },
            { "value": "准备就绪", "description": "处于随时可行动的状态" },
            { "value": "主动性", "description": "掌控并推动事物发展" },
            { "value": "目的", "description": "拥有明确的奋斗目标" },
            { "value": "理性", "description": "依逻辑行事" },
            { "value": "现实主义", "description": "基于实际与真相" },
            { "value": "关系", "description": "与他人建立联系" },
            { "value": "可靠性", "description": "值得信赖或始终如一" },
            { "value": "宗教", "description": "遵循自身宗教信仰" },
            { "value": "韧性", "description": "从挑战中恢复" },
            { "value": "机智", "description": "快速找到解决方案" },
            { "value": "责任", "description": "可靠并对自身行为负责" },
            { "value": "反应能力", "description": "轻松且迅速回应" },
            { "value": "风险", "description": "承担可能带来负面结果的机会" },
            { "value": "浪漫", "description": "参与深刻而令人兴奋的爱的行为" },
            { "value": "安全", "description": "处于安全受保护状态" },
            { "value": "自我接纳", "description": "善待并接纳自己" },
            { "value": "自制力", "description": "控制情绪、行为与欲望" },
            { "value": "自尊", "description": "尊重并相信自身价值与能力" },
            { "value": "自我认识", "description": "了解自身价值观、能力与情感" },
            { "value": "服务", "description": "帮助或为他人工作" },
            { "value": "性生活", "description": "拥有满意的性生活" },
            { "value": "简单", "description": "以最低需求生活" },
            { "value": "独处", "description": "拥有远离他人的个人空间" },
            { "value": "灵性", "description": "触及更深层的意义或目标" },
            { "value": "稳定", "description": "保持相对稳定的生活" },
            { "value": "坚韧", "description": "在挑战中保持情绪稳定" },
            { "value": "成功", "description": "实现目标或目的" },
            { "value": "团队合作", "description": "与他人协作" },
            { "value": "体贴", "description": "考虑他人需求" },
            { "value": "宽容", "description": "尊重不同观点与行为" },
            { "value": "传统", "description": "遵循先辈习俗" },
            { "value": "透明", "description": "公开且诚实无隐瞒" },
            { "value": "信任", "description": "相信他人的真实性" },
            { "value": "可信赖", "description": "作为诚实可靠的人被依赖" },
            { "value": "理解", "description": "对他人抱有同理心与宽容" },
            { "value": "独特", "description": "成为独一无二的个体" },
            { "value": "多才多艺", "description": "适应多种职能或活动" },
            { "value": "美德", "description": "展现高道德标准" },
            { "value": "远见", "description": "为未来思考或规划" },
            { "value": "温暖", "description": "以热情、关爱或善意待人" },
            { "value": "财富", "description": "拥有大量物质或金钱" },
            { "value": "福祉", "description": "处于舒适、健康与满足状态" },
            { "value": "智慧", "description": "拥有经验、知识与良好判断力" },
            { "value": "世界和平", "description": "致力于建立全球和谐" },
            { "value": "热忱", "description": "对事业充满活力与热情" }
        ];

        // 转换数据格式，添加id字段
        shuffleArray(zhData)
        const formattedZhData = zhData.map((item, index) => ({
            id: index + 1,
            name: item.value,
            description: item.description
        }));

        // 生成英文数据的示例（您可以替换为真实的英文数据）
        const enData = [
            {
                "value": "ABUNDANCE",
                "description": "to have a life filled with heart-driven experiences"
            },
            {
                "value": "ACCEPTANCE",
                "description": "to accept the people and experiences around me"
            },
            {
                "value": "ACCOUNTABILITY",
                "description": "to hold true to my commitments"
            },
            {
                "value": "ACCURACY",
                "description": "to be correct or precise"
            },
            {
                "value": "ACHIEVEMENT",
                "description": "to have accomplishments and successes"
            },
            {
                "value": "ADVANCEMENT",
                "description": "to promote a cause or a plan"
            },
            {
                "value": "ADVENTURE",
                "description": "to have daring experiences"
            },
            {
                "value": "ADVOCACY",
                "description": "to demonstrate public support or a cause"
            },
            {
                "value": "AMBITION",
                "description": "to fulfil a strong desire to do or achieve something"
            },
            {
                "value": "APPRECIATION",
                "description": "to recognise and enjoy the good qualities of someone or something"
            },
            {
                "value": "ASSERTIVENESS",
                "description": "to stand up for myself while considering the needs of others"
            },
            {
                "value": "ATTRACTIVENESS",
                "description": "to be appealing to others"
            },
            {
                "value": "AUTHENTICITY",
                "description": "to be honest and real in relationships"
            },
            {
                "value": "AUTHORITY",
                "description": "to have power and control over others"
            },
            {
                "value": "AUTONOMY",
                "description": "to be independent and free from control by others"
            },
            {
                "value": "AWARENESS",
                "description": "to maintain knowledge and perception about myself and others"
            },
            {
                "value": "BALANCE",
                "description": "to create time for the things I have to do and want to do"
            },
            {
                "value": "BEAUTY",
                "description": "to appreciate the qualities around me"
            },
            {
                "value": "BENEVOLENCE",
                "description": "to engage in acts of kindness towards others"
            },
            {
                "value": "BOLDNESS",
                "description": "to take risks and act with confidence or courage"
            },
            {
                "value": "CALMNESS",
                "description": "to be free from agitation or strong emotion"
            },
            {
                "value": "CARING",
                "description": "to display kindness and concern for others"
            },
            {
                "value": "CHALLENGE",
                "description": "to take on situations that stretch my abilities"
            },
            {
                "value": "CHANGE",
                "description": "to enjoy variety in situations and experiences"
            },
            {
                "value": "CHARITY",
                "description": "to give help to those in need"
            },
            {
                "value": "CHEERFULNESS",
                "description": "to embrace life with optimism"
            },
            {
                "value": "CLEVERNESS",
                "description": "to be smart, inventive, wise or witty"
            },
            {
                "value": "COLLABORATION",
                "description": "to work with others to produce something"
            },
            {
                "value": "COMFORT",
                "description": "to have a life with physical and material ease"
            },
            {
                "value": "COMMITMENT",
                "description": "to be dedicated to a cause or activity"
            },
            {
                "value": "COMMUNITY",
                "description": "to engage with other groups with similar attitudes or interests"
            },
            {
                "value": "COMPASSION",
                "description": "to behave with consideration for the wellbeing of myself and others"
            },
            {
                "value": "CONFIDENCE",
                "description": "to have belief in my own abilities"
            },
            {
                "value": "CONSISTENCY",
                "description": "to maintain adherence to the same principles or actions"
            },
            {
                "value": "CONTRIBUTION",
                "description": "to do something for the benefit of others"
            },
            {
                "value": "COOPERATION",
                "description": "to engage with others towards a common goal"
            },
            {
                "value": "COURAGE",
                "description": "to approach things with confidence and bravery"
            },
            {
                "value": "COURTESY",
                "description": "to demonstrate respect for and politeness towards others"
            },
            {
                "value": "CREATIVITY",
                "description": "to express ideas in new ways"
            },
            {
                "value": "CURIOSITY",
                "description": "to have a strong desire to know or learn something"
            },
            {
                "value": "DARING",
                "description": "to be adventurous or bold"
            },
            {
                "value": "DECISIVENESS",
                "description": "to make decisions quickly and effectively"
            },
            {
                "value": "DEDICATION",
                "description": "to be committed to a task or purpose"
            },
            {
                "value": "DEPENDABILITY",
                "description": "to be able to be relied on"
            },
            {
                "value": "DIVERSITY",
                "description": "to have a range of experiences and interests"
            },
            {
                "value": "DUTY",
                "description": "to act in accordance with moral or legal obligations"
            },
            {
                "value": "ECOLOGY",
                "description": "to act with respect for the environment"
            },
            {
                "value": "EMPATHY",
                "description": "to understand and engage with consideration of the feelings of others"
            },
            {
                "value": "ENCOURAGEMENT",
                "description": "to give others support, confidence and hope"
            },
            {
                "value": "ENTHUSIASM",
                "description": "to engage in experiences with enjoyment, interest and approval"
            },
            {
                "value": "ETHICS",
                "description": "to have moral principles governing my behaviour"
            },
            {
                "value": "EXCELLENCE",
                "description": "to have outstanding standards governing my actions"
            },
            {
                "value": "EXCITEMENT",
                "description": "to live life with enthusiasm and thrills"
            },
            {
                "value": "EXPRESSIVENESS",
                "description": "to display meaning and emotion in my actions"
            },
            {
                "value": "FAIRNESS",
                "description": "to provide impartial and just treatment with others"
            },
            {
                "value": "FAITHFULNESS",
                "description": "to have relationships built on loyalty and trust"
            },
            {
                "value": "FAME",
                "description": "to be known by many"
            },
            {
                "value": "FAMILY",
                "description": "to have a cohesive and loving family"
            },
            {
                "value": "FITNESS",
                "description": "to engage in physical activity and be toned or strong"
            },
            {
                "value": "FLEXIBILITY",
                "description": "to be willing to change or compromise when required"
            },
            {
                "value": "FOCUS",
                "description": "to concentrate on a task without distraction"
            },
            {
                "value": "FORGIVENESS",
                "description": "to let go of ill feelings towards others"
            },
            {
                "value": "FREEDOM",
                "description": "to act, speak, or think as I want"
            },
            {
                "value": "FRIENDSHIP",
                "description": "to have amicable, supportive relationships"
            },
            {
                "value": "FUN",
                "description": "to have light-hearted, positive and playful experiences"
            },
            {
                "value": "GENEROSITY",
                "description": "to share in abundance"
            },
            {
                "value": "GENUINENESS",
                "description": "to be authentic and real"
            },
            {
                "value": "GROWTH",
                "description": "to keep developing and evolving"
            },
            {
                "value": "HEALTH",
                "description": "to be free from illness or injury"
            },
            {
                "value": "HELPFULNESS",
                "description": "to be available to support others"
            },
            {
                "value": "HONESTY",
                "description": "to be truthful with myself and others"
            },
            {
                "value": "HOPE",
                "description": "to have positive expectations for the future"
            },
            {
                "value": "HUMILITY",
                "description": "to be humble and modest"
            },
            {
                "value": "HUMOUR",
                "description": "to be amusing or engage in amusing experiences"
            },
            {
                "value": "INCLUSIVENESS",
                "description": "to let people in and make them feel welcome"
            },
            {
                "value": "INDEPENDENCE",
                "description": "to do things for myself"
            },
            {
                "value": "INDIVIDUALITY",
                "description": "to be true to the quality or character that distinguishes me from others"
            },
            {
                "value": "INDUSTRY",
                "description": "to work with diligence and commitment"
            },
            {
                "value": "INNER PEACE",
                "description": "to experience internal tranquillity"
            },
            {
                "value": "INNOVATION",
                "description": "to pursue or create new methods, ideas or products"
            },
            {
                "value": "INSPIRATION",
                "description": "to be stimulated to do something creative"
            },
            {
                "value": "INTEGRITY",
                "description": "to engage ethically and honestly"
            },
            {
                "value": "INTELLIGENCE",
                "description": "to acquire and apply knowledge and skills"
            },
            {
                "value": "INTIMACY",
                "description": "to share intimate connections with others"
            },
            {
                "value": "INTUITION",
                "description": "to understand something instinctively"
            },
            {
                "value": "JOY",
                "description": "to engage in actions that provide feelings of pleasure"
            },
            {
                "value": "JUSTICE",
                "description": "to engage fairly and in line with rules"
            },
            {
                "value": "KINDNESS",
                "description": "to be friendly, generous and considerate"
            },
            {
                "value": "KNOWLEDGE",
                "description": "to have broad awareness of facts and information"
            },
            {
                "value": "LEADERSHIP",
                "description": "to lead a group of people or an organisation"
            },
            {
                "value": "LEARNING",
                "description": "to acquire knowledge or skills through education and experience"
            },
            {
                "value": "LEISURE",
                "description": "to engage in relaxing and rejuvenating activities"
            },
            {
                "value": "LOVE",
                "description": "to share affection with others"
            },
            {
                "value": "LOYALTY",
                "description": "to demonstrate honest allegiance and support to others"
            },
            {
                "value": "MAKING A DIFFERENCE",
                "description": "to have a significant effect on a person, situation or society"
            },
            {
                "value": "MASTERY",
                "description": "to have comprehensive knowledge or skill in a particular area"
            },
            {
                "value": "MINDFULNESS",
                "description": "to embrace the present moment intentionally and without judgement"
            },
            {
                "value": "MODERATION",
                "description": "to avoid extremes in behaviour or opinions and find the middle ground"
            },
            {
                "value": "MONOGAMY",
                "description": "to have only one longstanding intimate partner"
            },
            {
                "value": "MOTIVATION",
                "description": "to pursue activities with enthusiasm"
            },
            {
                "value": "NON-CONFORMITY",
                "description": "to move away from generally accepted ways of engaging or beliefs"
            },
            {
                "value": "NURTURE",
                "description": "to care for and protect others"
            },
            {
                "value": "OPEN-MINDEDNESS",
                "description": "to consider new opinions, ideas or beliefs"
            },
            {
                "value": "ORDER",
                "description": "to be well organised and follow a predetermined routine"
            },
            {
                "value": "PASSION",
                "description": "to have strong feelings or beliefs"
            },
            {
                "value": "PATIENCE",
                "description": "to wait for a desired outcome without becoming agitated"
            },
            {
                "value": "PEACE",
                "description": "to engage in life with tranquility and relaxation"
            },
            {
                "value": "PERSISTENCE",
                "description": "to work with determination towards a goal"
            },
            {
                "value": "PERSONAL DEVELOPMENT",
                "description": "to consciously pursue personal growth"
            },
            {
                "value": "PLAYFULNESS",
                "description": "to be light-hearted or full of fun"
            },
            {
                "value": "PLEASURE",
                "description": "to experience satisfaction and enjoyment"
            },
            {
                "value": "POPULARITY",
                "description": "to be supported and admired by many others"
            },
            {
                "value": "POSITIVITY",
                "description": "to have a positive outlook on experiences and individuals"
            },
            {
                "value": "POWER",
                "description": "to be in a position of influence over others"
            },
            {
                "value": "PREPAREDNESS",
                "description": "to be in a state of readiness"
            },
            {
                "value": "PROACTIVITY",
                "description": "to take control and make things happen"
            },
            {
                "value": "PURPOSE",
                "description": "to have a specific objective that you are working towards"
            },
            {
                "value": "RATIONALITY",
                "description": "to act in accordance with logic"
            },
            {
                "value": "REALISM",
                "description": "to be grounded in practicality and truth"
            },
            {
                "value": "RELATIONSHIPS",
                "description": "to connect with others"
            },
            {
                "value": "RELIABILITY",
                "description": "to be trustworthy or consistent"
            },
            {
                "value": "RELIGION",
                "description": "to act in accordance with my religious beliefs"
            },
            {
                "value": "RESILIENCE",
                "description": "to bounce back from challenges"
            },
            {
                "value": "RESOURCEFULNESS",
                "description": "to find quick and clever ways to resolve situations"
            },
            {
                "value": "RESPONSIBILITY",
                "description": "to be able to be relied upon and accountable for my actions"
            },
            {
                "value": "RESPONSIVENESS",
                "description": "to react easily and readily"
            },
            {
                "value": "RISK",
                "description": "to take chances with the possibility of something bad happening"
            },
            {
                "value": "ROMANCE",
                "description": "to engage in deep and exciting acts of love"
            },
            {
                "value": "SAFETY",
                "description": "to be secure and protected"
            },
            {
                "value": "SELF-ACCEPTANCE",
                "description": "to be kind to and accepting of myself"
            },
            {
                "value": "SELF-CONTROL",
                "description": "to control my own emotions, actions and desires"
            },
            {
                "value": "SELF-ESTEEM",
                "description": "to have self-respect and confidence in my own worth and abilities"
            },
            {
                "value": "SELF-KNOWLEDGE",
                "description": "to know my own values, abilities and emotions"
            },
            {
                "value": "SERVICE",
                "description": "to help or do work for others"
            },
            {
                "value": "SEXUALITY",
                "description": "to have a satisfying sex life"
            },
            {
                "value": "SIMPLICITY",
                "description": "to live life with minimal needs"
            },
            {
                "value": "SOLITUDE",
                "description": "to have my own space away from others"
            },
            {
                "value": "SPIRITUALITY",
                "description": "to be in touch with a deeper sense of meaning or purpose"
            },
            {
                "value": "STABILITY",
                "description": "to have a fairly consistent life"
            },
            {
                "value": "STOICISM",
                "description": "to remain emotionally strong and undisturbed through challenge"
            },
            {
                "value": "SUCCESS",
                "description": "to accomplish an aim or purpose"
            },
            {
                "value": "TEAMWORK",
                "description": "to engage cooperatively with a group"
            },
            {
                "value": "THOUGHTFULNESS",
                "description": "to consider the needs of others"
            },
            {
                "value": "TOLERANCE",
                "description": "to respect differing opinions and behaviours"
            },
            {
                "value": "TRADITION",
                "description": "to follow customs from previous generations"
            },
            {
                "value": "TRANSPARENCY",
                "description": "to be open and honest with nothing to hide"
            },
            {
                "value": "TRUST",
                "description": "to believe in the truth of others"
            },
            {
                "value": "TRUSTWORTHINESS",
                "description": "to be relied on as honest or truthful"
            },
            {
                "value": "UNDERSTANDING",
                "description": "to be sympathetic and tolerant of others"
            },
            {
                "value": "UNIQUENESS",
                "description": "to be one of a kind, special or unusual"
            },
            {
                "value": "VERSATILITY",
                "description": "to adapt to many different functions or activities"
            },
            {
                "value": "VIRTUE",
                "description": "to display high moral standards in my behaviour"
            },
            {
                "value": "VISION",
                "description": "to think or plan for the future"
            },
            {
                "value": "WARMTH",
                "description": "to engage with enthusiasm, affection or kindness"
            },
            {
                "value": "WEALTH",
                "description": "to have an abundance of valuable possessions or money"
            },
            {
                "value": "WELLBEING",
                "description": "to be comfortable, healthy and content"
            },
            {
                "value": "WISDOM",
                "description": "to have experience, knowledge and good judgement"
            },
            {
                "value": "WORLD PEACE",
                "description": "to work towards establishing greater peace and harmony in the world"
            },
            {
                "value": "ZEAL",
                "description": "to have high energy and enthusiasm for a cause"
            }
        ];

        shuffleArray(enData)
        // 转换数据格式，添加id字段
        const formattedEnData = enData.map((item, index) => ({
            id: index + 1,
            name: item.value,
            description: item.description
        }));

        setAllValues(language === 'zh' ? formattedZhData : formattedEnData);
    }, [language]);

    // 切换语言
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
        setSelectedValues([])
        setUnselectedIndex(0)
    };

    // 添加到已选列表
    const addToSelected = (important = true) => {
        if (unselectedIndex >= allValues.length) return;

        const valueToAdd = allValues[unselectedIndex];

        if (important) {
            setSelectedValues(prev => [valueToAdd, ...prev]);
        } else {
            setSelectedValues(prev => [...prev, valueToAdd]);
        }

        setUnselectedIndex(prev => prev + 1);
    };

    // 开始拖拽
    const handleDragStart = (index) => {
        setIsDragging(index);
    };

    // 拖拽结束
    const handleDragEnd = () => {
        setIsDragging(null);
    };

    // 处理拖拽排序
    const handleDragOver = (index) => {
        if (isDragging === null || isDragging === index) return;

        const newSelectedValues = [...selectedValues];
        const draggedItem = newSelectedValues[isDragging];

        newSelectedValues.splice(isDragging, 1);
        newSelectedValues.splice(index, 0, draggedItem);

        setSelectedValues(newSelectedValues);
        setIsDragging(index);
    };

    // 将选中项向上移动
    const moveUp = (index) => {
        if (index === 0) return;
        const newSelectedValues = [...selectedValues];
        [newSelectedValues[index], newSelectedValues[index - 1]] = [newSelectedValues[index - 1], newSelectedValues[index]];
        setSelectedValues(newSelectedValues);
    };

    // 将选中项向下移动
    const moveDown = (index) => {
        if (index === selectedValues.length - 1) return;
        const newSelectedValues = [...selectedValues];
        [newSelectedValues[index], newSelectedValues[index + 1]] = [newSelectedValues[index + 1], newSelectedValues[index]];
        setSelectedValues(newSelectedValues);
    };

    // 当前未选择的价值观
    const currentUnselectedValue = allValues[unselectedIndex];

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-6xl mx-auto">
                <header className="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {language === 'zh' ? '价值观选择' : 'Value Selection'}
                    </h1>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                        <Globe size={18} />
                        {language === 'zh' ? 'English' : '中文'}
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 未选择的价值观 */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-700">
                                {language === 'zh' ? '待选价值观' : 'Unselected Value'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {language === 'zh'
                                    ? `还剩 ${allValues.length - unselectedIndex} 个未选择`
                                    : `${allValues.length - unselectedIndex} values remaining`}
                            </p>
                        </div>

                        {currentUnselectedValue && (
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-medium mb-2">{currentUnselectedValue.name}</h3>
                                    <p className="text-gray-600">{currentUnselectedValue.description}</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => addToSelected(true)}
                                        className="flex-1 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Check size={18} />
                                        {language === 'zh' ? '重要' : 'Important'}
                                    </button>
                                    <button
                                        onClick={() => addToSelected(false)}
                                        className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        {language === 'zh' ? '不重要' : 'Not Important'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {!currentUnselectedValue && (
                            <div className="p-6 text-center">
                                <p className="text-gray-600">
                                    {language === 'zh' ? '所有价值观已查看完毕' : 'All values have been reviewed'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 已选择的价值观 */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow">
                        <div className="p-4 border-b flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {language === 'zh' ? '已选价值观' : 'Selected Values'}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {language === 'zh'
                                        ? `已选择 ${selectedValues.length} 个`
                                        : `${selectedValues.length} values selected`}
                                </p>
                            </div>
                        </div>

                        <div className="p-4">
                            {selectedValues.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    {language === 'zh' ? '暂无已选价值观' : 'No values selected yet'}
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {(showAllSelected ? selectedValues : selectedValues.slice(0, 30)).map((value, index) => (
                                        <li
                                            key={value.id}
                                            className={`p-3 bg-gray-50 rounded-md flex items-center gap-3 border ${isDragging === index ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={() => handleDragOver(index)}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <div className="text-gray-400 cursor-move flex-shrink-0">
                                                <Grip size={18} />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-medium mb-2">{value.name}</h3>
                                                <p className="text-gray-600">{value.description}</p>
                                            </div>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    onClick={() => moveUp(index)}
                                                    className="p-1 text-gray-500 hover:bg-gray-200 rounded"
                                                    disabled={index === 0}
                                                >
                                                    <ChevronUp size={18} />
                                                </button>
                                                <button
                                                    onClick={() => moveDown(index)}
                                                    className="p-1 text-gray-500 hover:bg-gray-200 rounded"
                                                    disabled={index === selectedValues.length - 1}
                                                >
                                                    <ChevronDown size={18} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {selectedValues.length > 30 && (
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => setShowAllSelected(!showAllSelected)}
                                        className="text-blue-600 flex items-center gap-1 mx-auto"
                                    >
                                        {showAllSelected
                                    ? (language === 'zh' ? '收起' : 'Collapse')
                                    : (language === 'zh' ? '查看全部' : 'View All')}
                                        {showAllSelected ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValueSelectionApp;