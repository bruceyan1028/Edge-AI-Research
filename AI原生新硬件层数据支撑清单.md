# 端侧 AI 原生新硬件层 · 数据支撑清单

整理日期：2026-09-08。所有数字均来自公开来源并附链接；标注"自有口径"的为基于本项目 41 家玩家数据集的计算，计算方法见第 E 节。本清单为**本地留存**，不放到页面上。

**本层口径**：只覆盖全景图 L5 终端设备层中"AI 原生新硬件"这一分支，含 5 个品类——AI Pin / 挂件录音、无屏 AI 助理、AI 陪伴玩具、AI 翻译硬件、开发套件 / 极客硬件。**不含** AI 眼镜 / XR 头显 / 手表 / 耳机（已单列入可穿戴页）、机器人（已单列入机器人页）、手机 / PC / 汽车。

---

## A. 市场规模

本层 5 个品类的市场成熟度差异极大：AI 玩具与开发板有相对成型的市场统计，AI Pin / 无屏助理则**尚无独立的市场规模口径**（机构普遍并入"AI 可穿戴"或"智能录音设备"统计），引用时必须说明。

### A1. AI 玩具 / AI 陪伴玩具 —— 本层唯一有大量机构覆盖的品类

| 指标 | 数值 | 口径 | CAGR | 机构 · 日期 | 来源 |
|---|---|---|---|---|---|
| 全球智能玩具市场规模 | 2025 年 $22.43B → 2026 年 $25.7B → 2034 年 $76.44B | Smart Toys 广义口径，含非 AI 智能玩具 | 14.6% | Fortune Business Insights · 2026-08 | https://www.fortunebusinessinsights.com/industry-reports/smart-toys-market-100337 |
| 全球 AI 智能玩具市场规模 | 2025 年 $3.14B → 2032 年 $26.21B | AI Smart Toys 窄口径 | 35.0% | QY Research | https://www.qyresearch.com/reports/3116245/ai-smart-toys |
| 全球 Smart AI Toys 市场规模 | 2024 年 $7.69B → 2025 年 $8.55B → 2035 年 $25.0B | 中间口径 | 11.3% | WiseGuy Reports | https://www.wiseguyreports.com/reports/smart-ai-toys-market |
| 全球 AI 玩具 2033 年预测 | 将达 $60B | 广义口径 | — | Global Times 转引 · 2025-07 | https://www.globaltimes.cn/page/202507/1339287.shtml |
| 中国 AI 玩具市场规模 | 2024 年约 246 亿元 → 2025 年约 290 亿元 → 2030 年约 850 亿元 | 有历史基数，非单点预测 | — | 中商产业研究院 | https://finance.sina.com.cn/stock/relnews/cn/2025-09-22/doc-infrizmn1614038.shtml |
| 中国 AI 玩具市场规模（另一口径） | 2025 年达 400 亿元，渗透率突破 25% | 含智能早教机 / 陪伴机器人 | — | 中国玩具协会 | https://www.chinabgao.com/info/1301294.html |
| 亚太区收入占比 | 占 2025 年全球 AI 玩具收入 42.5%，约 $5.4B | 区域结构 | — | Dataintelo | https://dataintelo.com/report/global-smart-ai-toys-market |

**口径提醒**：全球口径分歧达 8 倍（$3.14B 的 QY Research 窄口径 vs $22.43B 的 Fortune 广义口径），CAGR 分歧达 3 倍（11.3% vs 35.0%），属"同名不同物"，**绝对不可混用或相加**。中国口径同样分歧（246 亿 / 290 亿 / 400 亿 / 450 亿元），差异主要来自是否纳入智能早教机、陪伴机器人、AI 宠物。建议：全球基准用 Fortune Business Insights（口径披露最清晰、2026-08 更新），中国基准用中商产业研究院（唯一给出历史基数的）。

### A2. AI Pin / 挂件录音硬件 —— 无独立市场口径，只能用公司数据反推

**未找到公开的"AI Pin / AI 挂件录音硬件"独立市场规模统计**。机构普遍将其并入"AI 可穿戴"或"智能录音笔"统计，且两者都不能准确代表本品类。本品类的规模判断只能依赖头部公司披露（见 B1 节 Plaud 数据）。这是本层最大的数据缺口，见 G 节。

### A3. AI 翻译硬件

**全球翻译设备（整机）市场** —— 各机构 2025 年基数从 $1.22B 到 $6.87B 不等，差异逾 5 倍，主因是是否计入翻译软件 / 服务、以及是否计入带翻译功能的通用耳机与智能眼镜。

| 指标 | 数值 | 口径 | CAGR | 机构 · 日期 | 来源 |
|---|---|---|---|---|---|
| 全球翻译设备市场 | 2025 年 $1.28B → 2026 年 $1.40B → 2030 年 $1.94B | 含 handheld（便携翻译机）与 wearable（翻译眼镜 / 耳机），厂商出厂口径（factory gate value），覆盖 8 区域 16 国 | 8.4%（2026-2030） | The Business Research Company · 2026-01-22 | https://www.giiresearch.com/report/tbrc1923321-language-translation-device-global-market-report.html |
| 全球翻译设备市场增量 | 2026-2030 年**增量** $795.5M（非市场总值）；2025→2026 同比 +11.7% | 增量口径；亚太贡献增量 28.3%，北美约占 28% | 13.3% | Technavio · 2026-04 | https://www.technavio.com/report/language-translation-devices-market-industry-analysis |
| 手持式翻译机细分 | 2024 年 $447.5M，为最大产品类型细分；市场结构为"分散型" | handheld 细分 | — | Technavio · 2026-04 | 同上 |
| 全球翻译设备市场（交叉验证） | 2024 年 $1.22B → 2025 年 $1.31B → 2030 年 $1.86B | 整机 | 7.27% | Research and Markets | https://www.researchandmarkets.com/report/language-translating-device |
| 全球翻译设备市场（离群值） | 2025 年 $6.87B → 2034 年 $16.91B | 基数显著高于其他所有机构，**本清单不采用** | 10.52% | Verified Market Research | https://www.giiresearch.com/report/vmr1949183-global-language-translation-device-market-size.html |
| 全球翻译耳机细分 | 2024 年 $314M → 2031 年 $667M | **口径最窄，仅统计专用翻译硬件**，不含通用 TWS | 11.5% | Valuates / QYResearch | https://reports.valuates.com/market-reports/QYRE-Auto-15S10249/global-translator-earbuds |
| 全球翻译耳机细分（宽口径） | 2026 年 $2.14B → 2034 年 $5.72B | 将 Apple / Samsung / Google 列为 key players，含通用 TWS | 13.2% | Verified Market Reports | https://www.verifiedmarketreports.com/product/translator-earbuds-market/ |
| 中国翻译机市场规模 | 2020 年 27.7 亿元 / 2021 年近 28 亿元 | 中文行研，数据来源标注为"公开资料整理" | — | 华经产业研究院 · 2022-02 / 前瞻 · 2022-02 | https://www.huaon.com/channel/trend/786482.html |
| 中国翻译机销量 | 2016 年 3.5 万台 → 2021 年 92.2 万台 → 2023 年预计 180.6 万台；2021 年均价 3,350 元/台 | 需求量口径 | — | 智研咨询 · 2023-07 | https://www.chyxx.com/industry/1150661.html |

**口径提醒**：
1. **翻译耳机窄口径（$314M）与宽口径（$2.14B）差近 7 倍**，分水岭是是否计入 Apple / Samsung / Google 的通用 TWS——而这恰恰是本品类的核心竞争问题（见 D3），所以引用窄口径才有意义。
2. **中国翻译机市场找不到 2024 年之后的公开数据**：可检索到的中文行研文章最新数据点是 2021 年实际值与 2023 年预测值，且智研咨询的产销数据自相矛盾（2023 年预测需求量 180.6 万台 > 预测产量 133.4 万台）。IDC / Counterpoint / Canalys / 艾瑞 / 洛图均无翻译机专项公开出货量数据（洛图确认翻译机在其监测品类内，但不公开数字）。见 G 节。
3. 华经、智研、前瞻的图表数据来源普遍标注为"公开资料整理"，无一手统计机构背书，且各家"翻译机"边界（是否含翻译笔、翻译耳机、软件）不一致，不可混用。
4. 相邻但**不可当硬件市场引用**的口径：机器翻译软件 / 服务市场 2025 年 $1.4B → 2033 年 $7.2B（CAGR 22.1%，Grand View Research）；中国机器翻译行业 2021 年 79.42 亿元（智研咨询）。软件市场增速（22.1%）远高于硬件（8.4%），本身就是替代关系的体现。

### A4. 边缘 AI 与开发板（开发套件品类的上游市场）

| 指标 | 数值 | 口径 | CAGR | 机构 · 日期 | 来源 |
|---|---|---|---|---|---|
| 全球 Edge AI 硬件市场 | 2025 年 $26.14B → 2030 年 $58.90B | 硬件口径 | 17.6% | MarketsandMarkets | https://www.marketsandmarkets.com/Market-Reports/edge-ai-hardware-market-158498281.html |
| 全球 Edge AI 市场 | 2025 年 $11.8B → 2030 年 $56.8B | BCC 自有口径 | 36.9% | BCC Research | https://www.bccresearch.com/pressroom/ift/edge-ai-market-to-grow-at-369-cagr |
| 全球 Edge AI 市场 | 2025 年 $24.9B → 2033 年 $118.7B | 全口径 | 21.7% | Grand View Research | https://www.grandviewresearch.com/industry-analysis/edge-ai-market-report |
| 全球 Edge AI 市场 | 2025 年 $25.65B → 2035 年 $165.05B | 全口径 | 20.46% | Precedence Research | https://www.precedenceresearch.com/edge-ai-market |
| Edge AI 硬件占比 | 硬件占 2025 年 Edge AI 收入 51%+；推理占 2024 年出货量 99.8% | 结构占比 | — | Grand View Research | https://www.grandviewresearch.com/industry-analysis/edge-ai-market-report |
| 全球单板计算机（SBC）市场 | 2025 年 $4.3B → 2026 年 $4.5B → 2035 年 $7.3B | SBC 整机 | 5.7% | Global Market Insights | https://www.gminsights.com/industry-analysis/single-board-computer-sbc-market |
| 全球单板计算机市场（交叉验证） | 2025 年 $3.81B → 2033 年 $5.55B | SBC 整机 | 4.8% | SkyQuest | https://www.skyquestt.com/report/single-board-computer-market |
| SBC 市场份额 | 树莓派 2025 年份额 16.5%+ 居首；前五（树莓派、研华、Kontron、AAEON、Digi）合计 46.8% | 份额（单位口径） | — | Global Market Insights | https://www.gminsights.com/industry-analysis/single-board-computer-sbc-market |

**口径提醒**：Edge AI 各家 2025 年基数差 2 倍（$11.8B–$26.1B）、2030 年差 3 倍，CAGR 差 2 倍（17.6%–36.9%），必须指明具体机构而非取平均。**SBC 市场（$3.8–4.3B，CAGR 约 5%）与 Edge AI 市场（$25B 级，CAGR 约 20%）是两个市场**：开发板本身是个低增速的小市场，真正高增长的是它承载的边缘 AI 应用——这正是"开发套件是底座而非终局"的数据依据。

---

## B. 出货、营收与渗透

### B1. AI Pin / 录音硬件：Plaud 是唯一跑通规模化盈利的样本

| 指标 | 数值 | 性质 | 来源 |
|---|---|---|---|
| Plaud 累计出货 | 超 200 万台；2025 年 7 月突破 100 万台，约一年后翻倍 | 公司披露 | https://techcrunch.com/2026/06/16/plaud-says-its-software-business-topped-100m-in-arr-after-shipping-over-2m-ai-notetakers/ |
| Plaud 软件订阅 ARR | 超 $100M；两年内从 $1M 增至 $100M（100 倍） | 公司披露，未经审计 | 同上 |
| Plaud 总营收 | 2025 年预计 $250M（硬件 + 软件合计）；2026 年目标 $500M | 联合创始人徐高对 Forbes / Bloomberg 表述 | https://www.forbes.com/sites/iainmartin/2025/09/02/how-an-ai-notetaker-became-one-of-the-few-profitable-ai-startups/ |
| Plaud 2024 年营收 | 约 $56M，利润率接近 20% | **媒体转述知情人士**，可信度较低 | https://sacra.com/c/plaud/ |
| Plaud 融资与覆盖 | 累计融资仅约 $6M（创始人自有资金 + $1M 众筹），未拿 VC；覆盖 170 个国家；已盈利 | 公司披露 | https://www.forbes.com/sites/iainmartin/2025/09/02/how-an-ai-notetaker-became-one-of-the-few-profitable-ai-startups/ |
| Plaud 定价 | 硬件起价 $159；订阅 Pro $99.99/年、Unlimited $239.99/年；转写包 $59.99 / 3,000 分钟 | 官方定价 | 同上 |

**口径提醒**：$250M（总营收）与 $100M（软件 ARR）是两个不同口径，媒体经常混用甚至误当作"下降"，引用务必区分。Plaud 的关键意义在于 **$6M 融资撑起 $100M ARR** 的资本效率，是本层"轻量刚需切口 + 自负盈亏"路线的唯一实证。

### B2. 无屏 AI 助理：本层淘汰率最高的品类

| 指标 | 数值 | 性质 | 来源 |
|---|---|---|---|
| Humane AI Pin 实际销量 | 目标 10 万台，实际仅售出约 1 万台（完成度 10%） | 媒体报道（NYT / Forbes） | https://www.forbes.com/sites/johnkoetsier/2024/06/18/rabbit-sells-130000-r1-units-says-early-bugs-mostly-fixed/ |
| Humane 累计融资 | 自 2018 年成立累计融资 $230M | 媒体报道 | https://quantumzeitgeist.com/hp-acquires-humane-for-116-million-gains-300-patents-and-employees-shuts-down-ai-pin/ |
| Humane 服务终止 | 2025-02-28 12:00 PST 后设备断连，通话 / 消息 / AI 查询 / 云端全部失效，云端数据永久删除；退款仅限 90 天窗口内 | 官方公告 | https://www.ghacks.net/2025/02/19/humanes-ai-pin-ceases-operations-following-hp-acquisition/ |
| Rabbit r1 销量 | 2024 年 6 月 CEO 称全球售出 13 万台（原预期 1 万台）；2024-03-22 预购达 10 万台；售价 $199 | **CEO 会议发言，未经审计，且无更新数据** | https://www.forbes.com/sites/johnkoetsier/2024/06/18/rabbit-sells-130000-r1-units-says-early-bugs-mostly-fixed/ |
| Rabbit r1 活跃度 | 2024-09 CEO 承认约 10 万购买者中**仅约 5,000 人为活跃用户（留存约 5%）** | CEO 公开表述 | https://9to5mac.com/2024/09/17/rabbit-r1-active-users/ |
| Rabbit 融资 | 2023-12 A 轮 $10M（Khosla 领投），官方口径累计 $30M；Tracxn 记累计 $64.7M / 5 轮（含 2024-03 的 $28.7M，**无官宣**）。估值未找到官方披露 | 官方 + 第三方数据库（口径冲突） | https://www.rabbit.tech/newsroom/rabbit-raises-additional-10m |
| Limitless（前 Rewind）出货与融资 | 售价 $99 挂件；累计融资**超 $33M**（2022 首轮 $10M / 估值 $75M，a16z 领投；2023 A 轮估值 $350M，NEA 出资 $12M）；投资方含 Sam Altman、a16z、NEA、First Round | 媒体 + 官方 | https://techcrunch.com/2024/04/17/a16z-backed-rewind-pivots-to-build-ai-powered-pendant-to-record-your-conversations |
| Friend（friend.com） | 首轮 $2.5M / 估值 $50M；Fortune 称累计仅约 **$7M**；其中 **$1.8M 用于购买 friend.com 域名**（占累计融资 26%） | 媒体报道 | https://fortune.com/2025/10/01/who-is-avi-schiffmann-friend-ai-pendant-necklace |
| Omi / Based Hardware | 2025-01 官宣 **$2M**，Tim Draper 领投；此前约 $0.7M。Dealroom 记 $3M（口径冲突） | 官方博客 | https://www.omi.me/blogs/news/omi-raises-2m-from-tim-draper |
| Bee（Amazon 收购） | 2024-07 种子轮 **$7M**（Exor 领投，含 $1.5M pre-seed）；手环 $49.99 + $19/月订阅；2025-07-22 被 Amazon 收购，**金额未披露** | 官方 + TechCrunch | https://techcrunch.com/2025/07/22/amazon-acquires-bee-the-ai-wearable-that-records-everything-you-say/ |
| Nirva | **$8M 种子轮**，Lightspeed 参与（官方博文用词为 "partnership"，未称领投），South Park Commons 参投；CES 2026 发布；团队来自 Meta Reality Labs / XREAL | Lightspeed 官方博客 | https://lsvp.com/stories/why-we-partnered-with-nirva/ |
| Genspark（SecondBrain Note 母公司） | 累计融资约 **$6.45亿**：2024-06 种子 $60M → A 轮 $100M（估值 $530M）→ 2025-11 B 轮 $275M（估值 $1.25B）→ 2026-06 B 轮追加至 **$485M，投后估值 $2.6B**。硬件 SecondBrain Note 于 2026-07-21 东京发布 | Business Wire / Axios Pro | https://www.finsmes.com/2026/06/genspark-ai-extends-series-b-to-485m-at-2-6-billion-valuation.html |

**口径提醒**：Rabbit 13 万台是 2024 年年中的一次性口径，**2026 年不应作为现状引用**。Humane 1 万台 vs Rabbit 13 万台的对比常被引用，但两者形态与价位不同（$699 vs $199），不完全可比。

### B3. AI 玩具：中国出货与营收

| 指标 | 数值 | 性质 | 来源 |
|---|---|---|---|
| 跃然创新 BubblePal 累计销量 | 售价 399 元，2024-07-30 国内开售；2025-08 官宣 A 轮时累计突破 **20 万台**；上线 11 个月累计 **25 万台**；另有口径称"近 30 万台 / 销售额超 1 亿元" | 媒体报道（多口径） | https://cn.chinadaily.com.cn/a/202508/26/WS68ad2274a310f07257744e6d.html |
| 珞博智能 Fuzozo 芙崽 | 售价 399 元，2025-06 预售；2025-09 月销 2 万台 → 2025-12 单月超 5 万台 → 截至 2026-01 累计 **12 万台**；截至 2026-06 国内累计近 30 万台（**该条出自知乎独家稿，未经主流财经媒体交叉印证**） | 媒体报道，末条未证实 | https://www.geekpark.net/news/350636 |
| 萌友智能 Ropet | 售价 2,000–3,000 元；2025-09 起累计出货**近 2 万台**，覆盖 50 多国，**约七成来自海外**；**全球退货率 <4%，90 天留存 80–90%** | 媒体报道（公司口径） | http://www.duozhi.com/industry/insight/2026040918352.shtml |
| 萌友智能众筹（非股权） | 2024-12 Kickstarter 累计 $40 万；2025-08 日本 Makuake **一小时突破 2,700 万日元** | 媒体报道 | https://news.pedaily.cn/202509/554619.shtml |
| FoloToy | 成立于 2023-07，主体为上海喜梨信息科技；2B 产品为对话模组 Magicbox；字节火山引擎定制 AI 毛绒玩具"显眼包"合作方；**2026 年目标全球出货 30 万台** | 媒体报道（创始人口径） | https://www.21jingji.com/article/20260601/herald/3071c116ece697730a82f0a042d9fae8.html |
| 淘云科技（阿尔法蛋，讯飞系） | 前身为科大讯飞 2009 年玩具事业部，2015 年独立、2016 年推"阿尔法蛋"；36氪称 2023 年营收超 10 亿元、为"隐形独角兽"；2023 年词典笔销量 92 万台、份额超 30% | 媒体报道，无审计数据；**融资轮次 / 估值 / IPO 状态全部未找到** | https://36kr.com/p/2908646639213187 |
| AI 玩具线上销售增速 | 线上销售额增速超 390%（另有口径称销量增速超 960%）；2025 年头部品牌份额仅 14.5%，集中度极低 | 媒体转引 | https://www.chinabgao.com/info/1301294.html |
| 义乌玩具出口 | 2025 年玩具及相关产品出口 256.3 亿元（+20.1%）；2026 年 1–4 月 82.7 亿元（+11.6%），部分企业 AI 玩具出口订单同比增超 200% | 海关 / 地方口径 | https://finance.sina.com.cn/stock/relnews/cn/2025-09-22/doc-infrizmn1614038.shtml |
| 退货率 | 有报道称 AI 玩具赛道退货率达 35% | **媒体报道，单一来源**；与萌友智能自述的 <4% 差距近 10 倍，两者不可能同时代表全行业 | https://m.ofweek.com/ai/2025-10/ART-201714-8500-30671899.html |

**口径提醒**：AI 玩具的出货数字**全部出自公司自述或融资稿**，无第三方监测（洛图只公开词典笔与电子纸单词卡，不公开 AI 玩具）。BubblePal 一家就有"20 万 / 25 万 / 近 30 万台"三个流传口径，差异来自统计时点不同；引用时必须带时点。**主体易混淆**：BubblePal 属**跃然创新（Haivivi）**，Fuzozo 芙崽属**珞博智能（Robopoet）**，是两家不同公司，媒体常混为一谈。

### B4. 翻译硬件

| 指标 | 数值 | 性质 | 来源 |
|---|---|---|---|
| 网易有道智能设备营收 | 2026 Q2 净营收 8,682 万元（$12.8M），**同比 −31.5%**；**已连续 5 个季度同比下滑**（2025Q2 −23.9%、Q3 −22.1%、Q4 −26.6%、2026Q1 −42.6%、Q2 −31.5%） | **官方财报披露**（PR Newswire / SEC 6-K，未经审计） | https://www.prnewswire.com/news-releases/youdao-reports-second-quarter-2026-unaudited-financial-results-302856265.html |
| 网易有道智能设备 · 季度序列（人民币百万元） | 2024: Q1 181.2 / Q2 166.7 / Q3 315.3 / Q4 240.4；2025: Q1 190.5 / Q2 126.8 / Q3 245.8 / Q4 176.5；2026: Q1 109.4 / Q2 86.8 | **官方财报**，四季合计已与年报数交叉验证一致 | 同上（各季新闻稿） |
| 网易有道智能设备 · 年度序列 | FY2022 12.56 亿元 → FY2023 9.09 亿元（−27.6%）→ FY2024 9.04 亿元（持平）→ FY2025 7.40 亿元（**−18.2%**）；2026 上半年仅 1.96 亿元（上年同期 3.17 亿元） | **官方财报** | https://www.prnewswire.com/news-releases/youdao-reports-fourth-quarter-and-fiscal-year-2025-unaudited-financial-results-302684699.html |
| 网易有道官方归因（原文） | 2025Q2「the declined demands of consumer electronics」；2025Q3/Q4、2026Q1/Q2 连续四季均为「a decline in demand for smart learning devices」；毛利率下滑归因于「increased bill of materials cost」 | **官方财报原文** | 同上 |
| 对照：有道同期总营收 | FY2024 56.26 亿元（+4.4%）→ FY2025 59.09 亿元（+5.0%）；2026 Q2 总营收 14.67 亿元（+3.5%），其中学习服务 +20.9% | **官方财报** | 同上 |
| 科大讯飞智能硬件分部营收 | 2024 年 **20.23 亿元（+25.07%）**；2025 全年 AI 硬件 **21.83 亿元（+7.92%）**——增速从 25% 掉到 8%；2025 H1 8.70 亿元（**−3.27%**）；**2026 H1 7.32 亿元（−15.96%）**，占营收 6.29% | **官方年报 / 半年报**（数字经巨潮 / 深交所 PDF 原文解码核对） | https://disc.static.szse.cn/disc/disk03/finalpage/2026-04-29/650b2e59-ad5d-453d-b88e-4a7e3ccbfed9.PDF |
| 科大讯飞翻译机累计销量 | 累计销售 **30 万台**，占品类销售额 **70%** | **官方披露**，出自 2018 年年报（2019-04-18），**此后 7 年再未披露过任何绝对销量台数** | https://www.geekpark.net/news/240856 |
| 科大讯飞份额的两个官方口径 | (a) **"双平台市占率超 80%"** = 京东+天猫翻译机细分品类**销售额**份额，出自公司新闻稿（2025-04-18）；(b) **2026 H1 年报口径"国内细分市场 GMV 占比 61%"**。两者口径不同、不可混用，且**均无第三方机构背书** | **官方新闻稿 + 年报** | https://edu.iflytek.com/about-us/news/company-news/2037 |
| 科大讯飞电商排名（企业战报） | 2017 年双 11 首获翻译机品类销售额冠军；截至 2024 年**连续八年**618 京东+天猫双平台品类冠军；2025 年双 11 口径扩为京东/天猫/抖音**三平台连续 9 年**冠军 | **企业战报口径**，无第三方核验 | https://m.21jingji.com/article/20241115/herald/ab521fa526e3f8788bdf2b6b90d4467d.html |
| 科大讯飞出海 | 2025 年出海业务营收同比 **+275%**；办公本 / 翻译机 / 录音笔等硬件在美日韩等重点市场营收 **+438%** | **官方年报**（逐字解码原文） | 同上年报 |
| 科大讯飞整体营收 | 2025 全年 271.05 亿元（+16.12%），归母净利 8.39 亿元；2026 H1 116.23 亿元（+6.52%），归母净利 **−2.04 亿元** | **官方财报** | https://www.ithome.com/0/992/253.htm |
| 相邻品类：中国词典笔线上零售 | 2023 年 362.6 万台 / 17.8 亿元；2024 Q1 84.3 万台（+17.3%）但销额 3.6 亿元（**−2.1%**），呈「量增额减」；2024 Q1 阿尔法蛋+网易有道合计销量份额 56.9%（同比 +17.1pct）；300 元以下产品占 43.5% | 洛图科技（媒体转述，洛图官网不可访问） | https://m.pchome.net/article/content-2174567.html |
| 时空壶营收与结构 | 2024 年营收超 2 亿元，2025 年继续增长；**海外营收占比约 70%，欧美贡献 60%+**；创始人称已实现盈利 | 媒体报道（CEO 口径），非财报披露 | https://finance.sina.com.cn/stock/t/2025-11-12/doc-infxcctc1242708.shtml |
| 时空壶出货与用户 | **年出货量数十万台**（模糊表述，无精确值）；累计注册用户超 **100 万**；覆盖 **170 多个国家**；月翻译词汇量超 1 亿 | 媒体报道（创始人口径） | https://finance.sina.cn/stock/jdts/2026-08-11/detail-inimxvum4232195.d.html |
| 时空壶增长曲线 | 2022 年从跨境电商转向品牌独立站后**连续三年同比增长接近 100%**；年出口体量增速超 80%；北美市占率超 30%，两年拿下亚马逊翻译机销量第一 | 媒体报道 / 通稿 | https://www.geekpark.net/news/345365 |
| 时空壶产品矩阵与定价 | 6 大系列近 15 种产品；CES 2025 官方定价 W4 Pro $449 / W3 $349.99 / X1 $699.99 / T1 $299.99 / T1 Mini $149.99；Babel OS 支持 52 语言 106 口音，平均延迟 <4 秒 | **官方新闻稿** | https://www.prnewswire.com/news-releases/timekettle-w4-pro-earbuds-featuring-babel-os-launches-real-time-2-way-call-translation-enabling-natural-cross-lingual-conversations-302344100.html |
| 时空壶获奖 | CES 2024 创新奖（X1 Interpreter Hub）；**CES 2026 创新奖（W4）同时入选 AI / 耳机 / 移动设备 3 个类别**；研发投入占比 25% | **CES 官网可核实** | https://www.ces.tech/ces-innovation-awards/2026/timekettle-w4-ai-interpreter-earbuds/ |
| 时空壶融资 | 2018 数百万元天使轮、2019 千万级 Pre-A、2021-12 数千万元 A 轮（国家中小企业发展基金 / 东方富海独家投资）。**A 轮之后未见新一轮公开股权融资**；另有 2017 WT2 海外众筹近 $30 万、2019 ZERO 日本 Makuake 超 7,000 万日元（18 分钟达标）、台湾超 2,200 万新台币（均非股权融资） | 官网 + 36氪 | https://www.36kr.com/p/1540716111702277 |
| 翻译耳机大盘（QYResearch 口径） | 独立同传翻译耳机 2025 年约 **$252M** → 2032 年 $345M（CAGR 4.6%），中国区占全球约 21%；若计入 AirPods Pro 3 / Galaxy Buds3 Pro 等带翻译功能的通用 TWS，大盘 2025 年约 **$2.1B**、中国约 27 亿元 | 第三方转引，原报告未直接访问 | https://finance.sina.cn/stock/jdts/2026-08-11/detail-inimxvum4232195.d.html |
| Vasco Electronics（波兰） | 2024 年营收 **1.202 亿兹罗提（+14.5%）**，销量 **101,500 台**（首破 10 万台，+27%）；但**利润 1,130 万兹罗提，同比 −17%**（2023 年为 1,370 万）；覆盖 26 个市场，200+ 员工来自 20 国；2008 年成立 | **公司官方新闻稿**（非审计报表）；**未找到 2025 年度业绩** | https://vasco-electronics.pl/artykuly/press-release/rok-dynamicznego-rozwoju-vasco-electronics/ |
| Pocketalk（日本，ソースネクスト 持股 68.82%） | 系列**累计出货 130 万台**（2026-03-02 公告；2022-12 时点为 100 万台）；导入企业超 10,000 家 | **官方披露**；130 万台的具体基准日未能确认 | https://pocketalk.jp/pocketalk/s1 |
| Pocketalk 母公司财务 | ソースネクスト 2025 年 12 月期（9 个月过渡决算）营收 92.74 亿日元（+7.2%），但**营业亏损 13.08 亿日元、净亏损 21.28 亿日元**；2025 年 3 月期亦亏损 34.80 亿日元。**海外渠道（欧美 Pocketalk 销售）13.70 亿日元，同比 −17.6%**，归因为「美国政策变更导致面向教育机构销售减少」 | **官方決算短信**（单一分部披露，无 Pocketalk 独立分部数据） | https://finance-frontend-pc-dist.west.edge.storage-yahoo.jp/disclosure/20260212/20260212555384.pdf |

**口径提醒**：
1. 网易有道智能设备**连续 5 个季度同比下滑**（−23.9% / −22.1% / −26.6% / −42.6% / −31.5%），年度口径 FY2022 12.56 亿 → FY2025 7.40 亿元（四年蒸发 41%），是本清单最有信号价值的一组硬数据——它是唯一一家按季度公开披露翻译 / 学习硬件收入的上市公司，为"手机端免费 AI 正在侵蚀独立学习 / 翻译硬件"提供了财报级证据，比任何市场预测都可靠。**两点口径限制**：(a) 有道"智能设备"以词典笔等学习硬件为主，不纯是翻译机；(b) 官方归因写的是"smart learning devices 需求下降"，未点名 AI 手机替代，因果链是本清单的推断而非公司表述。
2. 科大讯飞的"30 万台 / 70% 份额"广为流传，但**原始出处是 2018 年年报**，已过时 7 年；此后公司只披露电商平台品类排名与相对增速，唯一的份额表述是 2024 年企业战报自述的"双平台超 80%"（无第三方核验），2025 年口径又从"双平台"悄悄扩为"三平台"——**平台冠军 ≠ 市场份额**，两者不可等同。
3. 时空壶"海外占 70%、欧美 60%+"与有道的国内下滑形成对照——本品类国内需求受手机替代冲击更快，出海是当前的主要出路。但时空壶的所有数字均出自创始人访谈与品牌通稿，无审计支撑，且口径本身在漂移（海外占比 2021 年"约 9 成"→2025 年"70%"；覆盖国家数 100 多 → 170 多 → 部分通稿写 200 多）。
4. **词典笔"量增额减"（2024Q1 销量 +17.3% 但销额 −2.1%，300 元以下占 43.5%）是比总量下滑更早的领先指标**：需求没有消失，是单价在崩——这与有道毛利率被"BOM 成本上升"侵蚀是同一件事的两面。

### B5. 开发套件

| 指标 | 数值 | 性质 | 来源 |
|---|---|---|---|
| 树莓派 FY2025 业绩（官方原文核实） | 营收 **$323.2M（+25%）**；毛利率 24.1%（−0.3pp）；税前利润 **$26.5M（+63%）**；调整后 EBITDA $46.4M（+25%）；ASP **$46.7**（上年 $43.3） | **官方 RNS 公告**（2026-03-31 发布，截至 2025-12-31） | https://www.investegate.co.uk/announcement/rns/raspberry-pi-holdings-wi---rpi/fy-2025-results/9499135 |
| 树莓派出货结构 · 交叉之年 | 板卡及模组 **760 万台（+9%）**；MCU 芯片 **840 万颗（+47%）**——**2025 年 MCU 出货首次超过板卡**，公司原文称之为「the cross-over year」 | 官方 RNS | 同上 |
| 树莓派累计出货 | 官方原文「over 75 million units have been sold」——**口径未说明是否含 Pico 及独立 MCU 芯片** | 官方 RNS | 同上 |
| 树莓派 H1 2026 | 出货指引超 400 万台，调整后 EBITDA ≥$38M；**未披露收入数字**，正式中报 2026-09-29 | 官方交易更新（2026-06-05） | https://investors.raspberrypi.com/financial-calendar |
| 树莓派上市 | 发行价 280 便士，2024-06-11 定价 / 06-14 上市（LSE: RPI）；IPO 估值 5.42 亿英镑，募资 1.66 亿英镑，首日收涨约 38% | 官方 IPO 页 + 媒体（估值/涨幅未从 RNS 原文核实） | https://investors.raspberrypi.com/ipo |
| 树莓派市场地位 | SBC 市场份额 16.5%+ 居首 | GMI（**该站拒绝抓取，数字来自搜索摘要，未经原页核验**） | https://www.gminsights.com/industry-analysis/single-board-computer-sbc-market |
| 高通收购 Arduino | 2025-10-07 宣布签署、**2025-10-31 交割完成**；**交易金额官方明确未披露**；新闻稿称 Arduino 有「33M+ active users」 | 官方新闻稿 | https://www.qualcomm.com/news/releases/2025/10/qualcomm-to-acquire-arduino-accelerating-developers--access-to-i |
| 嘉楠科技 AI 业务占比 | **该数据点在官方口径下不存在**——FY2025 Form 20-F 收入拆分仅 Product / Mining / Foundry Service 三类，2023–2025 三年均无 AI 分部标签。替代佐证：矿机及零配件占总收入 83.1% / 82.6% / **77.9%** | **官方 SEC 20-F** | https://www.sec.gov/Archives/edgar/data/1780652/000110465926043786/can-20251231x20f.htm |
| 乐鑫科技 FY2025 | 营收 25.65 亿元（+27.82%），归母净利 4.98 亿元（+46.72%），毛利率 46.63%（+6.19pp） | **业绩快报的媒体一致转引**，官方年报 PDF 为图片型无法提取，**建议二次复核** | https://www.cls.cn/detail/2297165 |
| 乐鑫累计出货 | 官网标称「1.5 Billion+ Global IoT SoC Shipments」（超 15 亿颗），**未标注截止日期**；客户超 10,000 家，生态开发者超 300 万 | 官方 About 页 | https://www.espressif.com/en/company/about-espressif |
| 小智 AI（xiaozhi-esp32） | 2026-09-08 观测：Star **29.7k**、Fork 6.9k、Open Issues 635、累计 Commits 996；含 138 个开发板目录 / 171 个发布变体；已被乐鑫收录进官方 ESP-IoT-Solution 组件库 | 官方仓库网页（api.github.com 被沙箱拒绝，无法取精确整数） | https://github.com/78/xiaozhi-esp32 |

**开发板「算力 / 价格」对照（TOPS 均为厂商标称值，精度口径已注明；官方未披露者一律留空）**

| 开发板 | 芯片 / NPU | AI 算力（含精度口径） | 官方价格 |
|---|---|---|---|
| Jetson Orin Nano Super 套件 | Ampere GPU（无 DLA） | **67 TOPS 稀疏 INT8 / 33 稠密 / 17 FP16 TFLOPS** | $249（2024-12-17 由 $499 降价） |
| Jetson AGX Thor 套件 | Blackwell GPU | 2,070 TFLOPS FP4 稀疏 @130W | $3,499（2025-08-25） |
| NVIDIA DGX Spark | GB10 Grace Blackwell | 1 PFLOP FP4（稀疏），128GB 统一内存 | $3,999【媒体，官方页不列价】；2026-02 涨至 $4,699 |
| Pi 5 + AI HAT+ 2 | Hailo-10H | **40 TOPS（INT4）**，板载 8GB LPDDR4X | $130（2026-01-15） |
| Pi 5 + AI HAT+（26T / 13T） | Hailo-8 / 8L | 26 / 13 TOPS，**官方未标精度** | $110 / $70 |
| Arduino UNO Q 2GB / 4GB | Dragonwing QRB2210 + STM32U585 | **官方未给出任何 TOPS 数值** | $59 / $79（2026-09 现价；发布价 $44 / $59，涨价原因无官方说明） |
| 华为 Atlas 200I DK A2 | 昇腾 | 8 TOPS（精度标签未从官方页核实） | 1,999 元（**2023-05-06 发布价，2026 现价未核实**） |
| CanMV-K230 | Kendryte K230 KPU | **官方 datasheet 无任何 TOPS**，仅给帧率（ResNet-50 ≥85fps@INT8） | **未找到公开数据**（官网不标价） |
| Radxa Orion O6 | Cix P1 | 45 TOPS（**NPU+CPU+GPU 合计**，NPU 单独值从未披露） | 官网不标价 |
| BeagleY-AI | TI AM67A | 4 TOPS @8bit 整型 | 官网不标价 |
| Seeed reComputer J3011 | Jetson Orin Nano 8GB | 67 TOPS 稀疏 INT8 | $699 |
| Seeed SenseCAP Watcher | ESP32-S3 + Himax HX6538 | 未标 | $54.90 |
| 乐鑫 ESP32-P4 | 双核 RISC-V ≤400MHz | **无独立 NPU，无任何 TOPS**，仅「AI 指令扩展」 | — |

**口径提醒（4 条）**：
1. **TOPS 绝对不可横向比较或相加**。NVIDIA 标稀疏 INT8（稠密值仅一半），Hailo-10H 标 INT4，Cix P1 的 45 TOPS 是 NPU+CPU+GPU 合计，乐鑫与嘉楠官方根本不公布 TOPS。页面上若并列展示，必须同时标注精度口径。
2. 树莓派 $323M 营收约占 SBC 市场 7.5%，但单位份额 16.5%——**金额 vs 台数是两个口径**，不可互相印证。
3. **MCU 出货首次超过板卡是结构性拐点**，说明树莓派重心正从「整板」向「芯片级」下沉；这也意味着「累计 7,500 万台」这个数字的构成逐年变化，不宜用作跨年趋势指标。
4. 开发套件品类**无独立市场规模数据**。机构口径的「边缘 AI 硬件」2025 年在 $11.8B（BCC）到 $26.2B（MarketsandMarkets）之间，**2.2 倍分歧**，差异主要来自是否将手机 / PC 内的 CPU、GPU、SoC 计入。

---

## C. 资本：融资与并购

### C1. 巨头收购潮 —— 本层 2025 年最强信号

| 交易 | 金额 | 时间 | 性质 | 来源 |
|---|---|---|---|---|
| OpenAI 收购 io（Jony Ive 团队） | 约 $6.5B 全股票（CNBC 口径 $6.4B，含 OpenAI 原持股）；OpenAI 史上最大收购，超过 $3B 的 Windsurf | 2025-05 宣布，2025-07 完成 | 官方 / Bloomberg | https://www.bloomberg.com/news/articles/2025-07-09/openai-closes-6-5-billion-deal-to-buy-jony-ive-s-device-startup |
| io 团队规模 | 约 55 名来自 Apple 与 LoveFrom 的工程师与设计师，含 Tang Tan、Evans Hankey、Scott Cannon；折合约 $120M / 人 | — | 媒体报道 | https://www.benzinga.com/markets/tech/25/07/46335969/openai-finalizes-6-5-billion-deal-to-acquire-jony-ives-ai-hardware-startup-heres-what-we-know-about-their-first-device |
| HP 收购 Humane 资产 | $116M，含 CosmOS 平台、300+ 项专利及专利申请、多数员工，**不含 AI Pin 硬件业务**（直接关停）；远低于此前接近 $1B 的传闻估值 | 2025-02-18 | Bloomberg | https://www.bloomberg.com/news/articles/2025-02-18/hp-116-million-deal-for-humane-includes-ip-but-no-ai-pin-device |
| Meta 收购 Limitless | **金额未披露** | 2025-12 | CNBC | https://www.cnbc.com/2025/12/05/meta-limitless-ai-wearable.html |
| Limitless 背景 | 前身为 Rewind，累计融资超 $33M，投资方含 Sam Altman、a16z；团队并入 Meta Reality Labs；Pendant 已停售，老用户获约一年支持并免除订阅费 | — | 媒体报道 | https://www.engadget.com/ai/metas-latest-acquisition-suggests-hardware-plans-beyond-glasses-and-headsets-212930339.html |
| Amazon 收购 Bee | **金额未披露**；Bee Pioneer 为腕带形态而非挂件 | 2025-07 | 媒体报道 | https://sfstandard.com/2025/12/14/big-tech-scooping-ai-wearable-startups-customers-spooked/ |
| 高通收购 Arduino | 2025-10（金额待核实，见 G 节） | 2025-10 | 待核实 | 见 G 节 |

**口径提醒**：三笔 AI 挂件收购中有两笔（Meta/Limitless、Amazon/Bee）**未披露金额**，因此"本层并购总额"这个数字算不出来，不要拼凑。真正可比的只有 HP/Humane 的 $116M 与 OpenAI/io 的 $6.5B——两者差 56 倍，分别代表"失败资产贱卖"与"顶级团队溢价"，是本层估值分化最极端的两极。

### C2. AI 玩具赛道融资

| 指标 | 数值 | 性质 | 来源 |
|---|---|---|---|
| 赛道整体 | 2025 年至今 AI 玩具公司相关融资超 50 起、累计金额超 200 亿元 | 媒体基于企查查 / 天眼查 / Wind 统计 | https://www.sohu.com/a/1010480407_116132 |
| 跃然创新 | 2025-08-25 完成 2 亿元融资，中金资本旗下基金、红杉中国种子基金、华山资本、愉悦资本领投，招银国际、Brizan Ventures 参投 | 官方宣布 | https://static.nfnews.com/content/202508/25/c11657000.html |
| 跃然创新背景 | 2023 年成立，创始人李勇为天猫精灵前合伙人；BubblePal 2024-07 推出，接入 MiniMax 语音模型；第二款 CocoMate 与奥特曼 IP 合作 | 媒体报道 | https://hub.baai.ac.cn/view/50395 |
| 2026 年新动向 | 可以科技 D 轮融资破亿；自然选择新一轮融资 3,000 万美元，阿里、蚂蚁参投 | 媒体报道 | https://www.sohu.com/a/1010480407_116132 |

**口径提醒**："超 200 亿元 / 50 起"来自媒体基于工商数据库的统计，非机构正式报告，且"AI 玩具公司相关融资"边界模糊（可能含主业非玩具的公司），引用需标注为媒体口径。

---

## D. 技术、产品与监管拐点

### D1. 形态路线：从"独立设备"退回"手机配件"

- Humane AI Pin（$699，独立蜂窝、无屏投影）追求完全替代手机 → 失败（1 万台）；Plaud（$159，磁吸手机背面、依赖手机 App）定位手机配件 → 成功（200 万台）。这是本层最清晰的一条产品结论，两者形态差异与结果差异见 B1 / B2。 —— 来源：[Forbes](https://www.forbes.com/sites/iainmartin/2025/09/02/how-an-ai-notetaker-became-one-of-the-few-profitable-ai-startups/)
- OpenAI 与 io 的首款产品据报道**不是可穿戴或入耳式设备**，而是口袋 / 桌面尺寸、具备环境感知能力的**无屏**设备。 —— 【媒体报道】来源：[Benzinga](https://www.benzinga.com/markets/tech/25/07/46335969/openai-finalizes-6-5-billion-deal-to-acquire-jony-ives-ai-hardware-startup-heres-what-we-know-about-their-first-device)

### D2. 商业模式：硬件毛利 → 软件订阅

- Plaud 软件 ARR 两年从 $1M 增至 $100M（100 倍），硬件毛利率被创始人类比 iPhone 的约 25%——即硬件负责获客、软件订阅负责利润。 —— 来源：[TechCrunch](https://techcrunch.com/2026/06/16/plaud-says-its-software-business-topped-100m-in-arr-after-shipping-over-2m-ai-notetakers/)

### D3. 翻译硬件面临的替代威胁 —— 本层证据链最完整的一条

**替代方（手机 / 耳机 / 眼镜厂商已全面进场，均为官方披露）：**

| 厂商 | 时间 | 动作 | 关键口径 | 来源 |
|---|---|---|---|---|
| 三星 | 2024-01-17 | Galaxy S24 首推 Live Translate（通话 / 面对面 / 短信） | 对方用 iPhone/Pixel 也可用；要求 Android 14 / One UI 6.1+ | https://www.samsung.com/us/support/answer/ANS10000935 |
| Meta | 2024-12-16 | Ray-Ban Meta v11 上线 live translation | 下载语言包后**可脱网使用**；官方当前口径支持 6 种语言 | https://www.meta.com/ai-glasses/learn/live-translation-captions/ |
| Apple | 2025-09（iOS 26） | AirPods Live Translation，AirPods Pro 3 主打卖点 | **端侧处理，对话数据留在 iPhone 上**；已扩至 9 语；门槛为 iPhone 15 Pro+；**不在中国大陆提供**；欧盟因 DMA 合规延后至 2025-12 | https://www.apple.com/ie/newsroom/2025/11/live-translation-on-airpods-expands-to-the-eu/ |
| 小米 | 2025-06-26 | 小米 AI 眼镜（1,999 元起）支持同声传译 | 媒体口径中文与 10 种语言互译；40g，续航 8.6 小时 | https://www.ifanr.com/1628623 |
| Google | 2025-12-12 | Translate 应用耳机实时翻译 Beta，**不再限 Pixel Buds，任意带麦耳机可用** | 由 **Gemini 2.5 Flash Native Audio** 驱动，支持 70+ 语言 | https://9to5google.com/2025/12/12/google-translate-gemini-headphones/ |

**被替代方（两家上市公司的财报同时转负，是本清单最硬的证据）：**

- **网易有道**智能设备：连续 5 个季度同比下滑，FY2022 12.56 亿 → FY2025 7.40 亿元（−41%）。官方归因连续四季均为「smart learning devices 需求下降」。（见 B4）
- **科大讯飞**智能硬件：增速从 2024 年 +25.07% → 2025 年 +7.92% → **2025H1 −3.27% → 2026H1 −15.96%**。（见 B4）
- **词典笔"量增额减"**：2024Q1 销量 +17.3% 而销额 −2.1%，300 元以下机型占 43.5%——单价崩塌先于总量下滑。（洛图，见 B4）
- 翻译耳机窄口径 CAGR 仅 11.5%，而机器翻译**软件**市场 CAGR 22.1%，差 2 倍（见 A3）。

**口径提醒**：
1. 上述因果链（手机/耳机内置翻译 → 独立硬件下滑）是本清单的**推断**。两家公司的官方归因都只说"需求下降"，从未点名 AI 手机替代；且有道"智能设备"以词典笔为主，与出境翻译是不同使用场景。**未找到任何机构给出"AI 眼镜/耳机对专用翻译机替代率"的量化数据**。
2. 反向证据同样存在：科大讯飞 2025 年**出海**硬件营收 +438%、时空壶海外占比 70%，说明被侵蚀的主要是国内大众市场，专业 / 出境 / 多语种场景仍有壁垒。
3. 各厂商官方**均未公布实时翻译的延迟秒数**（Apple/Meta/Google/三星一致）。可核实的延迟数字只有厂商自报：讯飞 4.0「平均 0.5 秒」、时空壶 W3「0.5 秒」、Meta SeamlessStreaming 论文「约 2 秒」。流传的时空壶"0.2 秒"**未找到官方出处**。

### D4. AI 玩具的安全与监管（本层最大的非市场风险）

- 美国 PIRG 第 40 份年度《Trouble in Toyland》报告发现 FoloToy 的 AI 泰迪熊 Kumma（$99，内置 GPT-4o）会向儿童指导点火柴、讨论性话题；OpenAI 随即以违反政策为由暂停该开发者的 GPT-4o 访问权限。报告发布次日 FoloToy 下架官网全部在售产品，宣布暂停所有销售并进行全公司端到端安全审计。 —— 来源：[CNN](https://www.cnn.com/2025/11/19/tech/folotoy-kumma-ai-bear-scli-intl) · [PIRG](https://pirg.org/edfund/media-center/breaking-ai-toy-removed/)
- 后续：OpenAI 已恢复 FoloToy 的模型访问权限，其网站目前可选 GPT-5.1 Thinking 与 GPT-5.1 Instant。 —— 【媒体报道】来源：[IT之家](https://www.ithome.com/0/898/316.htm)
- 中国《人工智能拟人化交互服务管理暂行办法》已于 **2026-07-15 生效**，对 AI 陪伴类服务作出规范，是 2026 年 AI 玩具市场预测中需单列的变量。 —— 来源：[新浪财经转引](https://finance.sina.com.cn/stock/relnews/cn/2025-09-22/doc-infrizmn1614038.shtml)
- 结构性问题：面向 3–12 岁儿童的产品，其安全护栏**完全依赖上游大模型厂商的政策执行**（FoloToy 是被 OpenAI 断供而非被监管机构处罚才下架的），这是本层独有的风险传导路径。

### D5. 开发套件：算力下沉

- 树莓派 MCU 出货（840 万颗，+47%）首次超过板卡出货（760 万台，+9%），重心从整板向芯片级下沉。 —— 【官方财报】来源：[Raspberry Pi FY2025](https://voxbooster.com/blog/raspberry-pi-statistics-2026/)
- Edge AI 中推理占 2024 年出货量的 99.8%，硬件占 2025 年收入 51%+。 —— 来源：[Grand View Research](https://www.grandviewresearch.com/industry-analysis/edge-ai-market-report)

---

## E. 自有口径：基于本页面 41 家玩家的统计

统计对象为 `NATIVEHW_PLAYERS` 数组全部 41 条目（2026-09-08 版本）。**注意**：条目数 ≠ 公司数，科大讯飞在本页作为独立硬件条目出现两次（pendant 品类的录音笔 / 录音卡、translator 品类的翻译机），故去重后为 **40 家公司**。

### E1. 品类 × 地区结构

| 品类 | 中国 | 美国 | 欧洲 | 其他 | 合计 |
|---|---|---|---|---|---|
| 开发套件 / 极客硬件 | 8 | 2 | 2 | 0 | 12 |
| AI Pin / 挂件录音 | 2 | 7 | 0 | 0 | 9 |
| AI 陪伴玩具 | 4 | 1 | 0 | 4 | 9 |
| 无屏 AI 助理 | 2 | 3 | 0 | 1 | 6 |
| AI 翻译硬件 | 3 | 0 | 1 | 1 | 5 |
| **合计** | **19** | **13** | **3** | **6** | **41** |

**地区占比**：中国 46.3%、美国 31.7%、其他 14.6%、欧洲 7.3%。

### E2. 上市状态结构

| 状态 | 条目数 | 占比 | 说明 |
|---|---|---|---|
| 未上市 | 25 | 61.0% | — |
| 已上市 | 12 | 29.3% | 含出门问问、科大讯飞（×2）、网易有道、嘉楠、乐鑫、NVIDIA、树莓派、索尼、卡西欧、Source Next |
| 子公司 / 已被收购 | 4 | 9.8% | Limitless（Meta）、Bee（Amazon）、Humane（HP）、Arduino（高通） |

**值得注意**：4 起收购**全部集中在 AI Pin / 无屏助理两个品类**（pendant 2 起 + assistant 1 起 + devkit 1 起），AI 玩具与翻译硬件品类零收购。这与 C1 节的巨头收购潮方向一致。

### E3. 品类集中度观察

- **开发套件是条目最多的品类（12 家，29.3%）**，且中国占 8 家（66.7%），是本层中国玩家最密集的一块。
- **AI Pin 品类高度美国化**：9 家中 7 家在美国（77.8%），中国仅 2 家，欧洲、其他为 0。
- **AI 陪伴玩具地区最分散**：中国 4、其他 4（日本索尼 / 卡西欧、印度 Miko、新加坡 Lingverse）、美国 1。
- **欧洲全层仅 3 家**（波兰 Vasco 翻译硬件、英国树莓派、意大利 Arduino），且 2 家在开发套件品类——欧洲在本层消费级几乎空白。
- **翻译硬件品类美国为 0**，是唯一美国完全缺席的品类。

### E4. 口径偏离项（已在页面上显式标注）

- **小智 AI（xiaozhi-esp32）** 是 MIT 协议开源项目而非公司实体，破例收录（它是国内大量 AI 玩具 / 语音硬件的事实参考设计），页面卡片已用 `非公司实体` 明确标注。
- **BeagleBoard.org** 为美国非营利基金会，非商业公司，页面已用 `gov` 样式区分。
- **地区归属按公司总部认定**：BVIO Tech（Violoop）系中国团队创立但在柏林 IFA 国际首发，仍计入中国。
- **已剔除**：幸狐科技 Luckfox（2026-09-08 移除）——RV1106 虽有 0.5 TOPS NPU，但算力量级与本品类其他玩家差两个数量级、跑不了端侧大模型，实际定位为 IP 摄像头 / 视觉 IoT 替代方案，且主要走微雪渠道分销、无可核实的上市 / 融资 / 营收数据。
- **刻意不收录芯片 / 传感器层公司**（Hailo、Sony IMX500、DEEPX 等）：它们属 L2 芯片层，收进本页会模糊 L5 终端设备层的口径。

---

## F. 建议放到页面上的核心数字（10 条）

1. Plaud 累计出货 **200 万台**，软件 ARR **$100M**，累计融资仅 **$6M** —— 本层唯一跑通规模化盈利的样本
2. Humane AI Pin 目标 10 万台、实际售出约 **1 万台**（完成度 10%），累计融资 $230M，最终 **$116M** 卖给 HP
3. OpenAI 以约 **$6.5B** 收购 io，约 55 人团队，折合 **$120M / 人**，是 OpenAI 史上最大收购
4. 2025 年三起 AI 挂件收购：Meta→Limitless、Amazon→Bee、HP→Humane，**全部集中在 AI Pin / 无屏助理品类**
5. 中国 AI 玩具市场 2024 年 **246 亿元** → 2025 年 **290 亿元**（中商产业研究院）
6. 2025 年至今中国 AI 玩具赛道融资 **超 50 起、超 200 亿元**；跃然创新 2 亿元 A 轮，BubblePal 累计销量近 **30 万台**
7. 网易有道智能设备营收 2026 Q2 同比 **−31.5%** —— 独立翻译硬件被手机端 AI 侵蚀的财报级证据
8. 翻译耳机细分 CAGR 仅 **6.4%**，为本层各品类最低；苹果 AirPods 2025-09 上线实时翻译
9. 树莓派 FY2025 营收 **$323.2M**（+25%），累计出货 **7,500 万台**；MCU 出货 840 万颗首次超过板卡
10. 自有口径 41 家玩家：中国 **19** / 美国 **13** / 其他 **6** / 欧洲 **3**；开发套件 12 家为最大品类

---

## G. 未找到或不可靠的项

**未找到公开数据：**
1. **AI Pin / AI 挂件录音硬件的独立市场规模统计** —— 本层最大缺口。机构普遍并入"AI 可穿戴"或"智能录音笔"，无法单独引用。
2. Friend、Omi（Based Hardware）、Nirva 的具体融资轮次与金额（仅在竞品对比中被提及）。
3. Meta 收购 Limitless、Amazon 收购 Bee 的**交易金额**（双方均未披露）。
4. 时空壶 A 轮（2021-12）之后的新融资、2025 年具体营收数字（仅"大幅增长"定性表述）与具体销量台数。
5. ~~Vasco Electronics、Pocketalk（Source Next）的营收与累计销量。~~ **已补齐，见 B4。**
6. 科大讯飞翻译机 / 录音笔的**第三方监测**市场份额（仅有公司自述"份额第一"）。
7. Rabbit r1 在 2024 年 6 月之后的**销量**更新（2024-09 只披露了活跃用户约 5,000，未更新累计销量）。
8. 高通收购 Arduino 的**交易金额** —— **官方明确不披露**（非未找到）。日期已核实：2025-10-07 宣布签署、2025-10-31 交割完成，页面写的 2025-10 成立。
9. 面壁智能松果派 Pinea Pi 的售价、规格与出货数据；嘉楠、乐鑫、矽递、华为昇腾等的开发板专项营收（多数公司不单独披露开发板收入）。
10. ~~小智 AI 的 GitHub star / 采用规模数据。~~ **已补齐，见 B5**（Star 29.7k）。仍缺：精确贡献者数（api.github.com 被沙箱拒绝）。
11. **AI 玩具出货量的第三方监测** —— 全部数字出自公司自述或融资稿，洛图只公开词典笔与电子纸单词卡，无机构监测 AI 玩具。
12. **翻译硬件被手机替代的量化替代率** —— 无任何机构发布该指标；D3 的因果链是本清单的推断，不是公司口径。
13. **各厂商的翻译延迟官方数据** —— 无一家公布；时空壶流传的「0.2 秒」无官方出处。
14. 各边缘 AI 芯片（RK3588 / K230 / AM67A / ESP32-P4）的**发布与量产日期** —— 厂商页面均未标注，因此无法构建「NPU 普及时间线」。
15. Seeed / Radxa / M5Stack / BeagleBoard 的公司财务与融资；面壁智能融资轮次与估值；松果派 Pinea Pi 的规格与售价（官网仅有产品条目）。

**存疑不采用：**
1. "2025 年 AI 玩具市场暴涨 400 亿"类自媒体标题 —— 与机构口径（290 亿）冲突且无方法论说明。
2. 知乎整理的"中国 AI 玩具 2030 年约 38.6 亿美元" —— 与同文中"2025 年 450 亿元"自相矛盾（2030 年反而低于 2025 年），口径明显不一致。
3. AI 玩具"退货率 35%" —— 仅单一自媒体来源，未见一手数据，本清单标注但不建议上页面。
4. Sacra 页面将 Plaud "$100M ARR（2026-06）" 与 "$250M 年化营收（2025-09）" 并列描述为下降 —— 属口径混淆，非真实下滑。
5. Precedence Research 等机构的 Edge AI 数字在不同版本间差异较大，引用需核对报告发布日期。

**待核实项的核验结果（本轮已处理）：**
- ✅ NVIDIA Jetson Orin Nano Super **$249 / 67 TOPS** —— 两个数字均成立，但 **67 TOPS 是稀疏 INT8，稠密值仅 33 TOPS**，与他厂并列时会高估约一倍。
- ⚠️ 华为昇腾 Atlas 200I DK A2 **1,999 元** —— 是 2023-05-06 发布价（8 TOPS / 4GB），**2026 年现价未能核实**（hiascend.com 相关页 404）。网传 20 TOPS 版本均为第三方渠道 listing，无官方 SKU 依据。
- ❌ 嘉楠 CanMV-K230 **售价 249 元** —— **未找到任何官方定价**（官网不标价，由第三方生态厂商生产销售，canaan.io 商城页 403）。**页面若已写此价，需要撤下或标注来源。**
- ⚠️ 乐鑫 FY2025 营收 25.65 亿元（+27.8%）、净利 4.98 亿元 —— 数字与业绩快报的媒体转引一致，但**官方年报 PDF 为图片型，未直接核对上交所公告原文**。其中「模组及开发套件收入占比 61.2%」**本轮未找到任何来源，建议撤下**。
- ⚠️ 树莓派 AI HAT+ 最高 **40 TOPS** —— 成立，但属于 **AI HAT+ 2**（2026-01-15 发布，Hailo-10H，$130，INT4 口径）；初代 AI HAT+ 上限为 26 TOPS。两代不可混称。
- ❌ 嘉楠「AI 业务占比」 —— **官方口径下不存在该数据点**，20-F 无 AI 分部。任何流传的嘉楠 AI 占比数字都无法追溯到一手来源。
