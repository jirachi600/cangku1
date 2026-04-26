/* 洛克王国世界攻略 — 主应用脚本 */
/* 功能：搜索、目录导航、日夜主题、豆包AI对话（含CORS代理支持） */

// ==================== 攻略数据 ====================
var GUIDE_DATA = [
  {
    id: "gradient",
    title: "一、精灵梯度榜",
    subsections: [
      { id: "t0", title: "T0 — 版本核心", content: '<p class="text-sm text-gray-500 mb-2">版本：2026 年 4 月下旬（含 4/23 版本更新）| 基于 PVP 出场率、高端局使用率与潜在强度综合评定</p><table><thead><tr><th>精灵</th><th>属性</th><th>定位</th><th>核心特点</th><th>推荐性格</th></tr></thead><tbody><tr><td><strong>圣羽翼王</strong></td><td>翼系</td><td>速攻输出</td><td>速度 125 种族值，疾风连袭低费连续输出</td><td>固执 / 胆小</td></tr><tr><td><strong>恶魔狼</strong></td><td>恶魔系</td><td>收割</td><td>被动叠加攻击力越战越强，蝙蝠+吞噬收割</td><td>固执</td></tr><tr><td><strong>沉铁兽</strong></td><td>—</td><td>反强化</td><td>先发制人抢节奏，克制强化队</td><td>加速度</td></tr><tr><td><strong>寂灭骨龙</strong></td><td>龙系</td><td>联防</td><td>不朽复活（3 回合后复活），抵抗 9 属性</td><td>加物防/生命</td></tr></tbody></table>' },
      { id: "t1", title: "T1 — 强力主力", content: '<table><thead><tr><th>精灵</th><th>属性</th><th>定位</th><th>核心特点</th><th>推荐性格</th></tr></thead><tbody><tr><td>天鹅</td><td>—</td><td>多面手</td><td>传递增益/减益特性，可辅助可输出</td><td>看定位</td></tr><tr><td>火狗</td><td>火系</td><td>破盾</td><td>高速物攻，消印记专家</td><td>固执</td></tr><tr><td>火神</td><td>火系</td><td>输出</td><td>火系技能后永久双攻加成</td><td>固执 / 胆小</td></tr><tr><td>优光绒绒</td><td>—</td><td>控场</td><td>折返控制节奏，流沙+摇篮曲控场</td><td>加速度</td></tr><tr><td>嘟嘟锅</td><td>—</td><td>肉盾</td><td>700 种族值，双防基石</td><td>加物防/魔防</td></tr><tr><td>海豹船长</td><td>水武系</td><td>底牌</td><td>压轴出场特性，水武技能威力递增</td><td>固执</td></tr><tr><td>棋绮后→棋契陛下</td><td>地系</td><td>数值怪</td><td>种族值 761，渗透特性叠加攻防</td><td>加物攻</td></tr><tr><td>雪影娃娃</td><td>冰系</td><td>控制</td><td>暴风雪+冰墙，冰队核心</td><td>加速度</td></tr><tr><td>龙息帕尔</td><td>—</td><td>先发</td><td>先发制人+力量增效，爆发力强</td><td>固执</td></tr></tbody></table>' },
      { id: "t2", title: "T2 — 可用但需搭配", content: '<table><thead><tr><th>精灵</th><th>说明</th></tr></thead><tbody><tr><td>罗隐</td><td>PVP 模式下数值强制统一，不依赖个人养成</td></tr><tr><td>迪莫</td><td>七日登录赠送，被动克制后滚雪球，开荒优先</td></tr><tr><td>冰猪</td><td>特性带地系技能，地刺 3 费高性价比打断</td></tr><tr><td>羚羊</td><td>机械血脉学啮合，速度拉满，克制热门自爆流</td></tr><tr><td>薪燃虫</td><td>火队续航，引燃+火焰护盾</td></tr><tr><td>尖嘴狐仙</td><td>万金油辅助，多属性技能池灵活</td></tr><tr><td>火红尾</td><td>魔攻 129 种族值，特性天通地明对污染怪伤害翻倍</td></tr></tbody></table><h4>数值说明</h4><ul><li>PVP 模式下数值强制统一，不依赖个人养成</li><li>关键机制：<strong>啮合传递</strong>（1 费提供 80 速度+100% 物攻加成）大幅改变强度体系</li><li>速度种族值 125+ 为高速线</li><li>种族值总和 700+ 为强力线，760+ 为数值怪</li></ul><h4>参考工具</h4><ul><li>在线伤害计算器：<a href="https://1earnback.github.io/rocom-damage-calc/" target="_blank" class="text-primary hover:underline">rocom-damage-calc</a></li><li>阵容编辑器：<a href="https://wiki.lcx.cab/lk/team_builder.php" target="_blank" class="text-primary hover:underline">team_builder</a></li><li>属性克制工具：<a href="https://meba.uno/" target="_blank" class="text-primary hover:underline">meba.uno</a></li></ul>' }
    ]
  },
  {
    id: "type-chart",
    title: "二、属性克制表",
    subsections: [
      { id: "type-table", title: "完整克制关系", content: '<p class="text-sm text-gray-500 mb-2">版本：2026 年 4 月公测 | 仅限手游版本</p><div class="overflow-x-auto"><table><thead><tr><th>属性</th><th>克制（伤害 2×）</th><th>被克制（承受 2×）</th><th>抵抗（伤害 1/2）</th></tr></thead><tbody><tr><td><strong>火</strong></td><td>草、冰、虫、机械</td><td>水、土、石、龙</td><td>草、火、冰</td></tr><tr><td><strong>水</strong></td><td>火、石、土</td><td>草、龙、电</td><td>火、水、冰</td></tr><tr><td><strong>草</strong></td><td>水、土、石</td><td>火、毒、翼、冰</td><td>水、草、土、电</td></tr><tr><td><strong>冰</strong></td><td>草、龙、土、翼</td><td>火、水、机械、石</td><td>冰</td></tr><tr><td><strong>电</strong></td><td>水、翼</td><td>土、草、龙、电</td><td>电</td></tr><tr><td><strong>土</strong></td><td>火、石、毒、机械、电</td><td>草、冰、水、虫</td><td>毒、石</td></tr><tr><td><strong>石</strong></td><td>翼、火、冰、虫、普通</td><td>草、土、水、机械</td><td>普通、翼、火</td></tr><tr><td><strong>虫</strong></td><td>草、萌、恶魔、武、土</td><td>火、翼、石、机械</td><td>草、土、萌</td></tr><tr><td><strong>翼</strong></td><td>草、虫、武</td><td>电、冰、石、机械</td><td>草、虫</td></tr><tr><td><strong>萌</strong></td><td>毒、武</td><td>恶魔、幽灵、虫、机械</td><td>毒、萌</td></tr><tr><td><strong>毒</strong></td><td>草、萌</td><td>土、石、幽灵</td><td>草、毒</td></tr><tr><td><strong>幽灵</strong></td><td>萌、毒、虫、幽灵</td><td>恶魔、机械、龙</td><td>普通、毒</td></tr><tr><td><strong>恶魔</strong></td><td>幽灵、萌、恶魔</td><td>虫、武、机械、恶魔</td><td>幽灵</td></tr><tr><td><strong>武</strong></td><td>石、恶魔、冰、机械、普通</td><td>翼、毒、萌、虫</td><td>火、石、恶魔</td></tr><tr><td><strong>机械</strong></td><td>冰、石、萌、虫、恶魔、幽灵、翼、草、普通、龙</td><td>火、土、水、电、武</td><td>毒、幽灵、萌</td></tr><tr><td><strong>龙</strong></td><td>龙</td><td>冰、龙</td><td>火、水、草、电</td></tr><tr><td><strong>普通</strong></td><td>无</td><td>武、石、机械</td><td>—</td></tr><tr><td><strong>光</strong></td><td>幽灵、恶魔</td><td>冰、草、幽灵、恶魔</td><td>幽灵、恶魔</td></tr></tbody></table></div><h4>双属性规则</h4><ul><li><strong>双重克制（4×）</strong>：精灵两个属性同时被同一属性克制（例：石+土 承受草/水 4×）</li><li><strong>双重抵抗（1/4）</strong>：精灵两个属性同时抵抗同一属性</li></ul>' }
    ]
  },
  {
    id: "battle-formula",
    title: "三、战斗公式与机制",
    subsections: [
      { id: "damage-formula", title: "伤害计算公式", content: '<pre>伤害 = 技能威力 × (攻击方属性 ÷ 防御方属性) × 属性克制倍率 × 天气/环境倍率 × 性格修正 × 随机浮动 - 防御减伤</pre><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>技能威力</td><td>每个技能固定值，高费技能威力更高</td></tr><tr><td>攻防比</td><td>物攻/物防 或 魔攻/魔防</td></tr><tr><td>属性克制</td><td>克制 2×、抵抗 0.5×、双重克制 4×、双重抵抗 0.25×</td></tr><tr><td>天气/环境</td><td>部分天气对特定属性技能有加成/削弱</td></tr><tr><td>性格修正</td><td>加成 +10%、减益 -10%</td></tr><tr><td>随机浮动</td><td>0.85 ~ 1.15</td></tr></tbody></table>' },
      { id: "energy-system", title: "能耗系统", content: '<table><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>起始能量</td><td>3 点</td></tr><tr><td>每回合回复</td><td>+1</td></tr><tr><td>能量上限</td><td>10 点</td></tr><tr><td>技能费用</td><td>1~7 费</td></tr><tr><td>迅捷技能</td><td>可在回合中优先释放</td></tr></tbody></table>' },
      { id: "status-effects", title: "异常状态", content: '<table><thead><tr><th>状态</th><th>效果</th><th>捕捉加成</th></tr></thead><tbody><tr><td>睡眠</td><td>无法行动</td><td>×2.0</td></tr><tr><td>冰冻</td><td>无法行动（有概率自动解除）</td><td>×2.0</td></tr><tr><td>麻痹</td><td>12.5% 概率无法行动</td><td>×1.5</td></tr><tr><td>中毒</td><td>每回合扣血</td><td>×1.5</td></tr><tr><td>烧伤</td><td>每回合扣血</td><td>×1.5</td></tr><tr><td>混乱</td><td>可能攻击自己</td><td>—</td></tr></tbody></table><h4>战斗机制要点</h4><ul><li>轮换制：双方各 6 只，每次 1v1，击败对方全部获胜</li><li>每回合可：使用技能 或 轮换精灵</li><li>轮换不消耗能量</li><li>印记系统：部分技能/特性附加正面或负面 buff，可被消印记技能清除</li><li>强化/弱化：部分技能提升/降低攻防速</li></ul>' }
    ]
  },
  {
    id: "team-builds",
    title: "四、主流配队详解",
    subsections: [
      { id: "team1", title: "队伍一：大师高胜率队（胜率 ~80%）", content: '<p class="text-sm text-gray-500 mb-2">核心理念：四核心 + 两摇摆位</p><table><thead><tr><th>位置</th><th>精灵</th><th>定位</th><th>核心技能</th><th>打法要点</th></tr></thead><tbody><tr><td>核心</td><td>天鹅</td><td>输出/辅助</td><td>风系物攻、水刃、风墙、迅捷/先发</td><td>逆向当输出，风墙联防</td></tr><tr><td>核心</td><td>沉铁兽</td><td>反强化</td><td>先发制人、截拳/冰爪、有效预防</td><td>抢节奏+克制强化队</td></tr><tr><td>核心</td><td>火狗</td><td>破盾手</td><td>物攻火系技能、消印记</td><td>上场逼退草/机械系</td></tr><tr><td>核心</td><td>恶魔狼</td><td>收割</td><td>蝙蝠、火切割、有效预防、吞噬</td><td>压血线后轮换收割</td></tr><tr><td>摇摆</td><td>冰猪</td><td>地系打断</td><td>地刺（3 费打断）</td><td>针对冰队</td></tr><tr><td>摇摆</td><td>羚羊</td><td>奇兵</td><td>啮合（机械血脉）</td><td>一次啮合速度全场第一</td></tr></tbody></table><p class="text-sm mt-2">摇摆位替换：化蝶、首领花、海豹、鱿鱼、圆号鱼、卡瓦重</p>' },
      { id: "team2", title: "队伍二：国家队（全能强势）", content: '<table><thead><tr><th>精灵</th><th>技能配置</th></tr></thead><tbody><tr><td>寂灭骨龙</td><td>隼鳞、龙吼、风墙、坟场搏击</td></tr><tr><td>古卷执政官</td><td>许愿星、虹光冲击、无畏之心、有效防御</td></tr><tr><td>圣羽翼王</td><td>羽化加速、虹光冲击、回旋风暴、魔法增效</td></tr><tr><td>泥吼牙</td><td>落石、倾泻、鸣沙陷阱、羽化加速</td></tr><tr><td>火神</td><td>流星火雨、力量增效、火轮车、吹火</td></tr><tr><td>疾光千兽</td><td>羽化加速、无影脚、光刃、三股作气</td></tr></tbody></table>' },
      { id: "team3", title: "队伍三：冰队（控制拉满）", content: '<table><thead><tr><th>精灵</th><th>技能配置</th></tr></thead><tbody><tr><td>雪影娃娃</td><td>冬至、暴风雪、爆米花爆破、冰墙</td></tr><tr><td>嗜波螺</td><td>地刺、泡沫幻影、水刃、泡沫</td></tr><tr><td>雪巨人</td><td>有效预防、无畏之心、追打、先发制人</td></tr><tr><td>尖嘴狐仙</td><td>冰墙、火苗、借用、高温回火</td></tr><tr><td>帕帕斯卡</td><td>龙卷风、齿轮扭矩、俯冲猛击、借用</td></tr><tr><td>圣代甜甜</td><td>霜天、霜降、碎冰冰、冰捆缚</td></tr></tbody></table>' },
      { id: "team-counter", title: "环境针对速查", content: '<table><thead><tr><th>环境热门</th><th>反制推荐</th><th>原因</th></tr></thead><tbody><tr><td>强化队</td><td>沉铁兽、冰猪</td><td>先发制人+打断</td></tr><tr><td>自爆流（书魔/巨獭）</td><td>羚羊（机械血脉啮合）</td><td>一次啮合速度全场第一</td></tr><tr><td>冰队</td><td>火系精灵</td><td>高费火系技能秒冰</td></tr><tr><td>印记流</td><td>火狗</td><td>消印记专家</td></tr><tr><td>消能量队</td><td>羚羊</td><td>对消能量有抵抗</td></tr></tbody></table><h4>配队构建原则</h4><ol><li><strong>属性互补</strong>：队伍不超过 3 只同属性，避免被同一属性 4 倍克制</li><li><strong>攻防兼备</strong>：至少 1 联防位 + 1 输出核心 + 1 功能位</li><li><strong>速度线合理</strong>：至少 1 高速手（抢先手）+ 1 低速手（后手收割）</li><li><strong>反热门</strong>：根据环境配置反制位</li></ol>' }
    ]
  },
  {
    id: "training",
    title: "五、养成系统",
    subsections: [
      { id: "race-stats", title: "种族值与面板", content: '<ul><li>每种精灵固定六维：生命、物攻、魔攻、物防、魔防、速度</li><li>种族值总和越高基础面板越高（示例：嘟嘟锅 700、棋契陛下 761）</li></ul><pre>最终属性值 = (种族值 + 个体资质加成) × 性格修正 × 成长星级加成</pre><table><thead><tr><th>属性</th><th>100 种族值 → 面板</th></tr></thead><tbody><tr><td>生命</td><td>341</td></tr><tr><td>其他五维</td><td>236</td></tr><tr><td>每 1 点种族值差</td><td>~2 点面板</td></tr></tbody></table>' },
      { id: "talent", title: "天分系统", content: '<table><thead><tr><th>档位</th><th>品质</th><th>建议</th></tr></thead><tbody><tr><td>第 1 档</td><td>最低</td><td>❌ 不推荐</td></tr><tr><td>第 2 档</td><td>中等</td><td>⚠️ 资源有限可考虑</td></tr><tr><td>第 3 档</td><td>优秀</td><td>✅ 值得培养</td></tr><tr><td><strong>第 4 档</strong></td><td><strong>了不起的天分</strong></td><td>⭐ 最优选择</td></tr></tbody></table><h4>天分修改道具</h4><table><thead><tr><th>道具</th><th>功能</th><th>获取</th></tr></thead><tbody><tr><td>适格钥匙</td><td>重置天分</td><td>炼金：10 许愿星 + 30 万洛克贝（每周 1 次）</td></tr><tr><td>能力钥匙</td><td>资质 +1</td><td>炼金制作</td></tr></tbody></table>' },
      { id: "nature", title: "性格系统", content: '<p>每种性格 <strong>+10% 某属性 / -10% 某属性</strong>。</p><table><thead><tr><th>定位</th><th>推荐加成</th><th>避免减益</th></tr></thead><tbody><tr><td>物攻输出</td><td>物攻 或 速度</td><td>物攻</td></tr><tr><td>魔攻输出</td><td>魔攻 或 速度</td><td>魔攻</td></tr><tr><td>物攻肉盾</td><td>物防 或 生命</td><td>—</td></tr><tr><td>魔攻肉盾</td><td>魔防 或 生命</td><td>—</td></tr><tr><td>辅助</td><td>速度 或 生命</td><td>—</td></tr></tbody></table><h4>性格修改道具</h4><table><thead><tr><th>道具</th><th>功能</th><th>获取</th></tr></thead><tbody><tr><td>残缺魔镜</td><td>保留正面、消除负面</td><td>炼金：15 许愿星 + 20 万洛克贝（每周 1 次）</td></tr><tr><td>镜面相框</td><td>完全重置所有加成/减益</td><td>商城【精灵培养精进包】</td></tr></tbody></table>' },
      { id: "line_age", title: "血脉系统", content: '<table><thead><tr><th>类型</th><th>特点</th></tr></thead><tbody><tr><td>首领血脉</td><td>响应特定共鸣魔法（如进化之力）</td></tr><tr><td>系别血脉</td><td>决定可学习的系别技能</td></tr><tr><td>污染血脉</td><td>特殊外观状态</td></tr><tr><td>奇异血脉</td><td>退污染后获得，保留一个奇异技能</td></tr></tbody></table><h4>血脉修改</h4><table><thead><tr><th>道具</th><th>功能</th><th>获取</th></tr></thead><tbody><tr><td>血脉秘药</td><td>修改血脉属性</td><td>炼金：1 秘药 + 10 灵碎 + 3 万洛克贝 / 稀兽花种掉落</td></tr></tbody></table><blockquote>实战应用：火系被水系克制 → 血脉秘药改为草系 → 学草系技能 → 反制水系</blockquote>' },
      { id: "awakening", title: "精灵觉醒", content: '<p><strong>条件</strong>：60 级 + 成长 5 星</p><h4>觉醒道具与效果</h4><ul><li>使用 <strong>灵魂环印</strong> 觉醒（最多 5 次）</li><li><strong>系别极化</strong>：增伤克制系别、削弱对方抵抗</li><li><strong>系别钝化</strong>：减伤被克制、提升抵抗</li><li><strong>本系伤害强化</strong>：提升本系技能伤害</li></ul>' },
      { id: "training-route", title: "养成路线", content: '<h4>新手开荒</h4><pre>1-30 级：火神 &gt; 迪莫 &gt; 罗隐\n30-60 级：补全 优光绒绒 / 嘟嘟锅\n60 级后：觉醒 + PVP 精灵培养</pre><h4>零氪极品路线</h4><pre>抓「了不起天分 + 资质 10」→ 看性格正面合适 → 残缺魔镜消负面 → 改血脉/学技能 → 60级5星觉醒</pre>' }
    ]
  },
  {
    id: "catch",
    title: "六、捕捉系统",
    subsections: [
      { id: "balls", title: "精灵球类型", content: '<table><thead><tr><th>精灵球</th><th>捕获率</th><th>异色概率</th><th>适用场景</th></tr></thead><tbody><tr><td>普通精灵球</td><td>1×</td><td>1/4000</td><td>日常捕捉</td></tr><tr><td>中级精灵球</td><td>1.5×</td><td>1/4000</td><td>较难的精灵</td></tr><tr><td>高级精灵球</td><td>2×</td><td>1/4000</td><td>难抓的精灵</td></tr><tr><td><strong>噩梦枷锁</strong></td><td><strong>3×</strong></td><td><strong>1/300</strong></td><td>高难/异色目标</td></tr></tbody></table><h4>保底机制</h4><ul><li>噩梦枷锁：累计 300 抽必出异色（保底进度在【背包 → 精灵球】查看）</li><li>普通/中级/高级球：无保底</li></ul>' },
      { id: "catch-tips", title: "捕捉技巧", content: '<h4>提升捕获率</h4><ul><li>将目标血量压到 <strong>红色（1/3 以下）</strong></li><li>施加异常状态：<strong>睡眠（×2.0）> 冰冻（×2.0）> 麻痹/中毒/烧伤（×1.5）</strong></li><li>使用更高级的精灵球</li><li>对 <strong>污染精灵</strong> 使用【净化球】先净化，捕获率大幅提升</li></ul><h4>异色党必看</h4><ul><li>只用「噩梦枷锁」捕捉异色</li><li>查看保底进度：【背包 → 精灵球 → 噩梦枷锁 → 保底计数】</li><li>保底 300 抽，预计花费：300 × 500 = 15 万洛克贝</li><li>可以只花费 5000 洛克贝（10 抽）试探，没出就跑，但不进度保底</li></ul>' },
      { id: "starlight", title: "星光值系统", content: '<p>完成特定行为（捕捉、升级、战斗等）积累「星光值」，可兑换奖励。</p><h4>快速积累方式</h4><ul><li>捕捉精灵：+5~20 星光值（越高星越稀有）</li><li>精灵升级：+2~10 星光值</li><li>PVP 战斗：每场 +15 星光值</li><li>通关主线/副本：+50~200 星光值</li></ul>' }
    ]
  }
];

// ==================== 渲染攻略内容 ====================
function renderContent(filter) {
  var container = document.getElementById('guide-content');
  if (!container) return;
  container.innerHTML = '';

  var matchCount = 0;
  var reg = filter ? new RegExp(escapeRegExp(filter), 'gi') : null;

  for (var i = 0; i < GUIDE_DATA.length; i++) {
    var chapter = GUIDE_DATA[i];
    var chapterEl = document.createElement('div');
    chapterEl.className = 'mb-8';
    chapterEl.id = chapter.id;

    var titleHtml = reg ? highlightText(chapter.title, reg) : chapter.title;
    chapterEl.innerHTML = '<h2>' + titleHtml + '</h2>';

    var hasVisible = false;

    for (var j = 0; j < chapter.subsections.length; j++) {
      var sub = chapter.subsections[j];
      var contentHtml = sub.content;

      if (filter) {
        var textContent = sub.content.replace(/<[^>]+>/g, ' ');
        if (textContent.match(reg) || sub.title.match(reg) || chapter.title.match(reg)) {
          contentHtml = contentHtml.replace(reg, function(m) { return '<span class="search-highlight">' + m + '</span>'; });
          var subTitleHtml = reg ? highlightText(sub.title, reg) : sub.title;
          chapterEl.innerHTML += '<h3 id="' + sub.id + '">' + subTitleHtml + '</h3>' + contentHtml;
          hasVisible = true;
          matchCount++;
        }
      } else {
        chapterEl.innerHTML += '<h3 id="' + sub.id + '">' + sub.title + '</h3>' + contentHtml;
        hasVisible = true;
        matchCount++;
      }
    }

    if (filter && !hasVisible) continue;
    container.appendChild(chapterEl);
  }

  var emptyEl = document.getElementById('search-empty');
  if (emptyEl) emptyEl.classList.toggle('hidden', matchCount > 0);

  var statusEl = document.getElementById('search-status');
  var statusText = document.getElementById('search-status-text');
  if (statusEl && statusText) {
    if (filter) {
      statusText.textContent = '找到 ' + matchCount + ' 个匹配结果';
      statusEl.classList.remove('hidden');
    } else {
      statusEl.classList.add('hidden');
    }
  }
}

function highlightText(text, reg) {
  return text.replace(reg, '<span class="search-highlight">$&</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ==================== 目录导航 ====================
function renderTOC() {
  var nav = document.getElementById('toc-nav');
  if (!nav) return;
  nav.innerHTML = '';

  for (var i = 0; i < GUIDE_DATA.length; i++) {
    var chapter = GUIDE_DATA[i];

    var chapterLink = document.createElement('a');
    chapterLink.href = '#' + chapter.id;
    chapterLink.className = 'block py-1 font-semibold text-gray-800 dark:text-slate-200 toc-link';
    chapterLink.textContent = chapter.title;
    chapterLink.addEventListener('click', function() {
      var sidebar = document.getElementById('sidebar-toc');
      var overlay = document.getElementById('toc-overlay');
      if (sidebar) sidebar.classList.add('-translate-x-full');
      if (overlay) overlay.classList.add('hidden');
    });
    nav.appendChild(chapterLink);

    for (var j = 0; j < chapter.subsections.length; j++) {
      var sub = chapter.subsections[j];
      var subLink = document.createElement('a');
      subLink.href = '#' + sub.id;
      subLink.className = 'block py-0.5 pl-3 text-gray-600 dark:text-slate-400 toc-link text-xs';
      subLink.textContent = sub.title;
      subLink.addEventListener('click', function() {
        var sidebar = document.getElementById('sidebar-toc');
        var overlay = document.getElementById('toc-overlay');
        if (sidebar) sidebar.classList.add('-translate-x-full');
        if (overlay) overlay.classList.add('hidden');
      });
      nav.appendChild(subLink);
    }
  }
}

// ==================== 主题切换 ====================
function setupTheme() {
  var themeBtn = document.getElementById('btn-theme');
  var html = document.documentElement;
  var sunIcon = document.getElementById('icon-sun');
  var moonIcon = document.getElementById('icon-moon');

  function applyTheme(isDark) {
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
    if (moonIcon) moonIcon.classList.toggle('hidden', isDark);
    if (isDark) {
      document.body.classList.add('dark', 'bg-darkbg', 'text-slate-200');
      document.body.classList.remove('bg-gray-50', 'text-gray-800');
    } else {
      document.body.classList.remove('dark', 'bg-darkbg', 'text-slate-200');
      document.body.classList.add('bg-gray-50', 'text-gray-800');
    }
  }

  try {
    var saved = localStorage.getItem('roco-theme');
    if (saved === 'dark') { applyTheme(true); }
    else if (saved === 'light') { applyTheme(false); }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { applyTheme(true); }
  } catch(e) {}

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var isDark = html.getAttribute('data-theme') !== 'dark';
      applyTheme(isDark);
      try { localStorage.setItem('roco-theme', isDark ? 'dark' : 'light'); } catch(e) {}
    });
  }
}

// ==================== 侧栏 ====================
function setupSidebar() {
  var btnToggle = document.getElementById('btn-toc-toggle');
  var btnClose = document.getElementById('btn-toc-close');
  var sidebar = document.getElementById('sidebar-toc');
  var overlay = document.getElementById('toc-overlay');

  if (btnToggle && sidebar && overlay) {
    btnToggle.addEventListener('click', function() {
      sidebar.classList.remove('-translate-x-full');
      overlay.classList.remove('hidden');
    });
  }
  if (btnClose && sidebar && overlay) {
    btnClose.addEventListener('click', function() {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
    });
  }
  if (overlay && sidebar) {
    overlay.addEventListener('click', function() {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
    });
  }
}

// ==================== 搜索 ====================
function setupSearch() {
  var input = document.getElementById('search-input');
  var inputMobile = document.getElementById('search-input-mobile');
  var btnClear = document.getElementById('btn-clear-search');

  function doSearch(val) {
    renderContent(val.trim());
  }

  if (input) {
    input.addEventListener('input', function() {
      var v = input.value;
      if (inputMobile) inputMobile.value = v;
      doSearch(v);
    });
  }
  if (inputMobile) {
    inputMobile.addEventListener('input', function() {
      var v = inputMobile.value;
      if (input) input.value = v;
      doSearch(v);
    });
  }
  if (btnClear) {
    btnClear.addEventListener('click', function() {
      if (input) input.value = '';
      if (inputMobile) inputMobile.value = '';
      renderContent();
    });
  }
}

// ==================== 回到顶部 ====================
function setupScrollTop() {
  var btn = document.getElementById('btn-scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('opacity-0', window.scrollY < 300);
    btn.classList.toggle('pointer-events-none', window.scrollY < 300);
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== AI 对话（含CORS代理）====================
function setupChat() {
  var panel = document.getElementById('chat-panel');
  var btnToggle = document.getElementById('btn-chat-toggle');
  var btnClose = document.getElementById('btn-chat-close');
  var btnSettings = document.getElementById('btn-toggle-settings');
  var btnSave = document.getElementById('btn-save-settings');
  var input = document.getElementById('chat-input');
  var btnSend = document.getElementById('btn-send');
  var messages = document.getElementById('chat-messages');
  var apiStatus = document.getElementById('api-status');
  var settings = document.getElementById('chat-settings');

  // 从 localStorage 读取配置（含代理地址）
  var apiKey = '';
  var apiEndpoint = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
  var model = 'ep-20260425191504-swd6f';
  var proxyUrl = '';  // 默认直连；填入公开代理地址可解决 CORS 问题

  try {
    apiKey = localStorage.getItem('roco-api-key') || '';
    var savedEndpoint = localStorage.getItem('roco-api-endpoint');
    if (savedEndpoint) apiEndpoint = savedEndpoint;
    var savedModel = localStorage.getItem('roco-model');
    if (savedModel) model = savedModel;
    var savedProxy = localStorage.getItem('roco-proxy-url');
    if (savedProxy !== null) proxyUrl = savedProxy;  // 允许空字符串（直连模式）
  } catch(e) {}

  function updateApiStatus() {
    if (!apiStatus) return;
    if (apiKey) {
      apiStatus.textContent = '✅ 已配置';
      apiStatus.className = 'text-xs text-green-500 ml-auto';
    } else {
      apiStatus.textContent = '未配置';
      apiStatus.className = 'text-xs text-gray-400 ml-auto';
    }
  }
  updateApiStatus();

  // 面板开关
  if (btnToggle && panel) {
    btnToggle.addEventListener('click', function() {
      panel.classList.toggle('translate-x-full');
      var badge = document.getElementById('chat-badge');
      if (badge) badge.classList.add('hidden');
      // 自动聚焦输入框
      if (!panel.classList.contains('translate-x-full') && input) {
        setTimeout(function() { input.focus(); }, 300);
      }
    });
  }
  if (btnClose && panel) {
    btnClose.addEventListener('click', function() {
      panel.classList.add('translate-x-full');
    });
  }

  // 设置面板
  if (btnSettings) {
    btnSettings.addEventListener('click', function() {
      if (settings) settings.classList.toggle('hidden');
      var keyInput = document.getElementById('input-api-key');
      if (keyInput) keyInput.value = apiKey ? '●●●●●●●●' : '';
      var endpointInput = document.getElementById('input-api-endpoint');
      if (endpointInput) endpointInput.value = apiEndpoint;
      var modelInput = document.getElementById('input-model');
      if (modelInput) modelInput.value = model;
      var proxyInput = document.getElementById('input-proxy-url');
      if (proxyInput) proxyInput.value = proxyUrl;
    });
  }

  // 保存设置
  if (btnSave) {
    btnSave.addEventListener('click', function() {
      var keyInput = document.getElementById('input-api-key');
      if (keyInput && keyInput.value && keyInput.value !== '●●●●●●●●') {
        apiKey = keyInput.value;
        try { localStorage.setItem('roco-api-key', apiKey); } catch(e) {}
      }
      var endpointInput = document.getElementById('input-api-endpoint');
      if (endpointInput) {
        apiEndpoint = endpointInput.value;
        try { localStorage.setItem('roco-api-endpoint', apiEndpoint); } catch(e) {}
      }
      var modelInput = document.getElementById('input-model');
      if (modelInput) {
        model = modelInput.value;
        try { localStorage.setItem('roco-model', model); } catch(e) {}
      }
      var proxyInput = document.getElementById('input-proxy-url');
      if (proxyInput) {
        proxyUrl = proxyInput.value;
        try { localStorage.setItem('roco-proxy-url', proxyUrl); } catch(e) {}
      }
      if (settings) settings.classList.add('hidden');
      updateApiStatus();
      addMessage('system', '✅ 设置已保存！现在可以开始对话了。');
    });
  }

  // 发送消息（核心：支持CORS代理）
  function sendMessage() {
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    input.value = '';

    addMessage('user', text);
    scrollMessages();

    if (!apiKey) {
      addMessage('ai', '⚠️ 请先配置豆包 API Key。点击左下角「⚙️ API 设置」输入你的火山引擎 API Key。');
      scrollMessages();
      return;
    }

    var typingId = addMessage('ai', '<span class="typing-dot">.</span><span class="typing-dot" style="animation-delay:0.2s">.</span><span class="typing-dot" style="animation-delay:0.4s">.</span>', true);

    var payload = {
      model: model,
      messages: [
        { role: 'system', content: '你是洛克王国世界（手游）的专属攻略助手。用简洁的中文回答玩家问题，涉及精灵推荐、配队、养成、捕捉等内容。如果问题超出游戏范围，礼貌地引导回游戏话题。' },
        { role: 'user', content: text }
      ]
    };

    // 构造请求：如果配置了代理，走代理；否则直连
    var fetchUrl, fetchOptions;

    if (proxyUrl) {
      // 拼接式 CORS 代理（cors-anywhere / thingproxy 模式）
      // 代理地址拼上真实 API 地址，代理会原样转发所有请求头
      fetchUrl = proxyUrl + apiEndpoint;
      fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(payload)
      };
    } else {
      // 直连模式（需要页面部署在有CORS权限的域名下才可用）
      fetchUrl = apiEndpoint;
      fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(payload)
      };
    }

    fetch(fetchUrl, fetchOptions)
    .then(function(response) {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();

      if (!response.ok) {
        return response.text().then(function(err) {
          var msg = '❌ API 请求失败（' + response.status + '）：' + err.slice(0, 300);
          // 如果是代理模式且失败，给出提示
          if (proxyUrl) {
            msg += '\n\n💡 代理可能不支持 POST 请求。请尝试：\n1. 清空代理地址（直连，需部署后端）\n2. 或部署 api/chat.js 到 Vercel';
          }
          addMessage('ai', msg);
        });
      }

      return response.json().then(function(data) {
        var reply = '';
        if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
          reply = data.choices[0].message.content;
        } else if (data && data.contents && data.contents[0] && data.contents[0].text) {
          // 兼容某些代理返回格式
          reply = data.contents[0].text;
        } else {
          reply = '（没有收到回复，请检查 API 配置）';
        }
        addMessage('ai', reply);
      });
    })
    .catch(function(e) {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      var errMsg = '❌ 网络错误：' + e.message;
      if (e.message && e.message.indexOf('Failed to fetch') !== -1) {
        errMsg += '\n\n💡 CORS 跨域问题依然存在。请尝试：\n1. 确认代理地址是否正确\n2. 部署 api/chat.js 到 Vercel（最可靠）\n3. 或使用 Chrome 启动参数 --disable-web-security（仅开发）';
      }
      addMessage('ai', errMsg);
    })
    .then(function() {
      scrollMessages();
    });
  }

  // 暴露 sendMessage 供按钮和回车键调用
  window.chatSendMessage = sendMessage;

  if (btnSend) {
    btnSend.addEventListener('click', function() { sendMessage(); });
  }
  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  function addMessage(role, content, isHtml) {
    var id = 'msg-' + Date.now();
    var div = document.createElement('div');
    div.id = id;
    div.className = 'fade-in';

    if (role === 'user') {
      div.innerHTML = '<div class="flex items-start gap-2 justify-end"><div class="chat-bubble-user p-3 text-sm max-w-[85%]">' + escapeHtml(content) + '</div><div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center text-sm flex-shrink-0">🧑</div></div>';
    } else if (role === 'system') {
      div.innerHTML = '<div class="text-center text-xs text-gray-400 py-1">' + content + '</div>';
    } else {
      // AI 消息支持 Markdown 简单渲染
      var formatted = formatMarkdown(content);
      div.innerHTML = '<div class="flex items-start gap-2"><div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm flex-shrink-0">🫘</div><div class="chat-bubble-ai p-3 text-sm max-w-[85%]">' + (isHtml ? content : formatted) + '</div></div>';
    }

    if (messages) messages.appendChild(div);
    return id;
  }

  function formatMarkdown(text) {
    // 简单 Markdown 渲染
    var escaped = escapeHtml(text);
    // 代码块
    escaped = escaped.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    // 行内代码
    escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
    // 粗体
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // 换行
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  }

  function scrollMessages() {
    if (messages) messages.scrollTop = messages.scrollHeight;
  }
}

function escapeHtml(text) {
  var d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
  renderContent();
  renderTOC();
  setupTheme();
  setupSidebar();
  setupSearch();
  setupScrollTop();
  setupChat();
});
