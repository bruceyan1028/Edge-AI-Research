# B-2 调研：Arduino/Qualcomm、嘉楠科技、乐鑫科技

> 时间基准：2026 年 9 月。每条数据均附来源 URL；未获公开数据者明确标注。
> 来源分级：**【官方】**＝公司官网/新闻稿/交易所备案；**【媒体】**＝第三方报道；**【传闻】**＝未经证实。

---

## 一、Arduino / Qualcomm（高通）

### 1.1 收购时间线 —— 用户"2025年10月"说法核验结果：**月份正确，但需区分两个日期**

- **【核验结论】** 用户所述"2025 年 10 月宣布"**属实**，但精确到日应为 **2025 年 10 月 7 日**（宣布签署收购协议），而**交割完成为 2025 年 10 月 31 日**。报告中若只写"10月"会混淆"宣布"与"完成"两个节点，建议分开表述。
- **【官方】** 高通于 **2025 年 10 月 7 日**（发布地：San Diego / Turin）发布新闻稿《Qualcomm to Acquire Arduino—Accelerating Developers' Access to its Leading Edge Computing and AI》，宣布**达成收购 Arduino 的协议** —— 来源：[Qualcomm 官方新闻稿](https://www.qualcomm.com/news/releases/2025/10/qualcomm-to-acquire-arduino-accelerating-developers--access-to-i)
- **【官方】** 同日 Arduino 官方博客发布《A new chapter for Arduino – with Qualcomm, UNO Q, and you!》，说明交易**尚待监管批准及惯例交割条件** —— 来源：[Arduino Blog, 2025-10-07](https://blog.arduino.cc/2025/10/07/a-new-chapter-for-arduino-with-qualcomm-uno-q-and-you/)
- **【官方】** **2025 年 10 月 31 日**，Arduino 官方博客发布《Arduino x Qualcomm Technologies: joining forces to empower developers worldwide》，宣告**交易完成（交割）** —— 来源：[Arduino Blog, 2025-10-31](https://blog.arduino.cc/2025/10/31/arduino-x-qualcomm-technologies-joining-forces-to-empower-developers-worldwide/)
- **【官方】** 高通新闻稿载明交割条件为"subject to regulatory approval and other customary closing conditions"，未给出目标交割日 —— 来源：[Qualcomm 官方新闻稿](https://www.qualcomm.com/news/releases/2025/10/qualcomm-to-acquire-arduino-accelerating-developers--access-to-i)

### 1.2 交易金额 —— **官方未披露**

- **【官方】** 高通官方新闻稿**全文未披露任何收购价格、估值、股份数或融资细节**，仅说明 Arduino 将"保留独立品牌、工具与使命"，并继续支持多家半导体供应商的 MCU/MPU —— 来源：[Qualcomm 官方新闻稿](https://www.qualcomm.com/news/releases/2025/10/qualcomm-to-acquire-arduino-accelerating-developers--access-to-i)
- **【官方】** Arduino 官网 Qualcomm 专题页同样**未提及任何财务条款** —— 来源：[Arduino 官网 Qualcomm 页](https://www.arduino.cc/qualcomm)
- **⚠️ 撰稿提示**：截至核查时未发现任何官方披露的交易对价。报告中**应明确写"交易金额未披露"**；网络流传的具体金额均属媒体推测或传闻，若引用必须标注为"媒体估计/传闻"，不得作为事实陈述。

### 1.3 Arduino 社区规模

- **【官方】** Arduino 社区拥有 **"33M+ active users"（3,300 万以上活跃用户）**，该数字出自高通官方收购新闻稿 —— 来源：[Qualcomm 官方新闻稿](https://www.qualcomm.com/news/releases/2025/10/qualcomm-to-acquire-arduino-accelerating-developers--access-to-i)
- **【媒体】** Forbes 以"33 Million IoT Developers"为题解读该收购的生态价值 —— 来源：[Forbes, 2025-10-22](https://www.forbes.com/sites/stevemcdowell/2025/10/22/behind-qualcomms-arduino-acquisition-33-million-iot-developers/)
- **累计出货板卡数量 / 注册用户数：未找到公开数据。** Arduino 官网 Qualcomm 专题页与 FAQ 均未给出板卡累计出货量或注册用户数，仅有定性表述 —— 已核查来源：[Arduino 官网 Qualcomm 页](https://www.arduino.cc/qualcomm)、[Arduino Qualcomm FAQ](https://www.arduino.cc/qualcomm-faq/)

### 1.4 Arduino UNO Q 规格与价格

**架构（"双脑" dual-brain 设计）** —— 来源：[Arduino 官方文档 UNO Q](https://docs.arduino.cc/hardware/uno-q)

- 应用处理器（MPU）：**Qualcomm Dragonwing™ QRB2210**，四核 Arm Cortex-A53 @ **2.0 GHz**（用户猜测的 QRB2210 **确认无误**）
- GPU：Adreno GPU 3D 图形加速器；影像：2× ISP（13MP + 13MP 或 25MP）@ 30fps
- 实时微控制器（MCU）：**STMicroelectronics STM32U585**，Arm Cortex-M33 最高 160 MHz，2 MB Flash，786 kB SRAM，含 FPU
- 操作系统：MPU 侧运行 **Debian Linux（含上游支持）**；MCU 侧运行 **Arduino Core on Zephyr OS**；两侧通过板载 RPC 库"Arduino Bridge"通信
- 无线：WCBN3536A 模组，**Wi-Fi 5 双频（2.4/5 GHz）** + **Bluetooth 5.1**，均配板载天线
- 扩展：Qwiic 连接器、标准 UNO 排针、底部高速连接器（MIPI-CSI 摄像头 / MIPI-DSI 显示 / 模拟音频）；USB-C 支持有源扩展坞（HDMI、键鼠、USB 摄像头、以太网、microSD、音频）
- 开发工具：Arduino App Lab（同时管理 MPU + MCU），或 Arduino IDE 2.0+ / Arduino CLI（仅 MCU）

**两个版本与官方商店现价（2026 年 9 月核查）**

| 版本 | SKU | RAM | 存储 | 官方商店价（美国站） |
|---|---|---|---|---|
| UNO Q 2GB | ABX00162 | 2GB LPDDR4 | 16GB eMMC | **$59.00** |
| UNO Q 4GB | ABX00173 | 4GB LPDDR4 | 32GB eMMC | **$79.00** |

- 2GB 版规格与售价 —— 来源：[Arduino 官方商店（美国站）UNO Q](https://store-usa.arduino.cc/products/uno-q)
- 4GB 版规格与售价 —— 来源：[Arduino 官方商店（美国站）UNO Q 4GB](https://store-usa.arduino.cc/products/uno-q-4gb)
- 板卡尺寸 68.85 × 53.34 mm（UNO 标准形状），重 0.048 kg，供电 7–24V VIN 或 USB-C —— 来源：[Arduino 官方商店（美国站）UNO Q](https://store-usa.arduino.cc/products/uno-q)
- 官方定位差异：2GB 版面向"成本敏感的轻量专用场景"，4GB 版面向"独立桌面使用、多任务与复杂 AI 模型支持" —— 来源：[Arduino 官方商店（美国站）UNO Q](https://store-usa.arduino.cc/products/uno-q)

**⚠️ 价格随时间变化，务必标注口径**

- **【媒体】** 2025 年 10 月发布时的媒体报道价格为 **2GB 版 €39/$44（2025 年 10 月 25 日起发货）**、**4GB 版约 €53/$59（11 月开放订购，2025 年底前发货）** —— 来源：[IEEE Spectrum](https://spectrum.ieee.org/qualcomm-arduino-acquisition-open-source)
- 与上表 2026 年 9 月官方商店现价（$59 / $79）相比**明显上涨**。报告引用价格时**必须注明是"2025年10月发布价"还是"2026年9月官方商店价"**，两者不可混用。涨价原因未见官方说明，**未找到公开数据**。

**开源许可** —— 来源：[Hackster.io](https://www.hackster.io/news/qualcomm-acquires-arduino-launches-the-new-arduino-uno-q-single-board-computer-57d91d83e890)（媒体）

- 【媒体】原理图与设计文件采用 CC BY-SA 4.0；App Lab、App CLI、Bricks 及示例软件采用 GPL3 与 MPL

**后续产品线（补充线索）**

- **【官方】** **2026 年 3 月**，Arduino 发布 **VENTUNO Q**，搭载 **Qualcomm Dragonwing IQ8 系列** —— 来源：[Qualcomm 官方新闻稿](https://www.qualcomm.com/news/releases/2026/03/arduino-announces-arduino-ventuno-q----powered-by-qualcomm-drago)
- **【官方】** 高通 2026 年 5 月开发者博客阐明生态整合逻辑：Dragonwing 处理器 + Arduino + Qualcomm AI Hub + Edge Impulse + Foundries.io 构成"从想法到量产到工业级部署"的连续路径 —— 来源：[Qualcomm Developer Blog, 2026-05](https://www.qualcomm.com/developer/blog/2026/05/edge-ai-prototype-deployment-qualcomm-dragonwing-developer-ecosystem)
- **【官方】** 高通此前已整合 Edge Impulse 与 Foundries.io 两家公司，Arduino 收购是该战略的第三步 —— 来源：[Qualcomm 官方新闻稿](https://www.qualcomm.com/news/releases/2025/10/qualcomm-to-acquire-arduino-accelerating-developers--access-to-i)

---

## 二、嘉楠科技 Canaan Inc.（NASDAQ: CAN）

### 2.1 CanMV-K230 / K230 芯片规格

**K230 芯片官方规格** —— 来源：[Kendryte（嘉楠）官方 K230 Datasheet](https://www.kendryte.com/k230/dev/zh/00_hardware/K230_datasheet.html)

- CPU：**双核 64 位 RISC-V C908**
  - CPU0：最高 **800 MHz**，RISC-V 64GCB 指令集，L1 32KB I + 32KB D，L2 128KB
  - CPU1：最高 **1.6 GHz**，支持 **RISC-V Vector Extension 1.0**，128-bit 向量处理单元，L1 32KB I + 32KB D，L2 256KB
- **KPU（Knowledge Process Unit，NPU）**：支持 INT8 / INT16 精度，支持权重稀疏压缩；支持 TensorFlow、PyTorch、TFLite、PaddlePaddle、ONNX，量化精度损失 <1%
  - 官方给出的性能指标为**帧率而非 TOPS**：ResNet-50 ≥ 85fps @INT8；MobileNet_v2 ≥ 670fps @INT8；YOLOv5s ≥ 38fps @INT8
- 内存：LPDDR4 双通道 ×16bit 最高 3200Mbps / LPDDR3 32bit 最高 2133Mbps，**最大容量 2GB**；片上 SRAM 2MB 共享 + 2MB（默认供 KPU）
- 其他加速器：DPU（3D 结构光深度计算，1280×800@30fps）、2.5D GPU、AI 2D 引擎、FFT/IFFT（4096点 INT16，<1ms）、GZIP 解压（≥400MB/s）
- 多媒体：3× MIPI-CSI 输入，ISP 总吞吐 8MP@30fps；1× MIPI-DSI 输出；编码 8MP@20fps / 解码 8MP@40fps，支持 H.265/H.264/JPEG/MJPEG
- 工作温度 −40 ~ 85°C；封装分 K230（单die）与 K230D（集成 1Gb LPDDR4）
- 启动速度：3A 首帧图像 ≤ 400ms

**NPU 算力（TOPS）**

- **【官方】** 嘉楠 Kendryte 官网产品页标注 K230 为 **"6T 等效算力"（约 6 TOPS 等效）**，典型功耗 **2W**，定位边缘 AIoT 芯片 —— 来源：[Kendryte 官网产品页](https://www.kendryte.com/zh/products)
- **⚠️ 口径提示**：官方《K230 Datasheet》技术文档中**未出现任何 TOPS 数值**，仅以各网络 fps 表述性能；"6T 等效算力"来自官网营销页。报告中引用时建议标注为"官方标称 6TOPS 等效算力"，并避免与 INT8 峰值算力混用。**制程节点：未找到公开数据**（datasheet 未载明）。

**CanMV-K230 开发板价格**

- **未找到公开数据（官方定价）。** 嘉楠 Kendryte 官网产品页列出 CanMV-K230 系列开发板由多家第三方厂商生产（01科技"CanMV-K230-01 Studio"、嘉立创"庐山派 K230-CanMV"、百问网 DshanPI-CanMV、幻尔机器人、LILYGO T-Display K230、创乐博 CanMV K230 V3.0 等），**页面均未标注价格**，仅提供淘宝跳转链接 —— 已核查来源：[Kendryte 官网产品页](https://www.kendryte.com/zh/products)
- 嘉楠官方商城页面 `canaan.io/product/canmv-k230` 返回 HTTP 403，无法核查。**建议撰稿时以"第三方生态厂商销售、无官方统一定价"表述**，或另行核实具体渠道报价并标注为渠道价。

### 2.2 嘉楠科技 FY2025 全年业绩（官方新闻稿，未经审计）

发布日期 **2026 年 2 月 10 日** —— 来源：[Canaan Inc. 官方新闻稿 (PR Newswire)](https://www.prnewswire.com/news-releases/canaan-inc-reports-unaudited-fourth-quarter-and-full-year-2025-financial-results-302683644.html)

| 项目 | FY2025 | FY2024 | 同比 |
|---|---|---|---|
| 总收入 Total revenues | **US$529.735M** | US$269.324M | **+96.7%** |
| 产品收入 Products（矿机） | **US$413.783M** | US$223.233M | +85.4% |
| 自挖矿收入 Mining | **US$113.236M** | US$44.022M | +157.2% |
| 其他收入 Other | US$2.716M | US$2.069M | +31.3% |
| 毛利 Gross profit | US$41.158M | −US$84.320M（毛损） | 扭亏 |
| **净亏损 Net loss** | **−US$210.267M** | −US$249.752M | 亏损收窄 |
| 每 ADS 亏损 | US$0.45 | US$0.92 | — |
| Non-GAAP 调整后 EBITDA | −US$50.501M | −US$71.495M | — |

**2025 年第四季度** —— 同一来源

| 项目 | Q4 2025 | Q4 2024 | 同比 |
|---|---|---|---|
| 总收入 | **US$196.274M** | US$88.767M | **+121.1%**（环比 +30.4%） |
| 产品收入 | US$164.929M | US$73.452M | +124.5% |
| 自挖矿收入 | US$30.358M | US$15.295M | +98.5% |
| 毛利 / 毛利率 | US$14.583M / 7.4% | −US$6.352M | 扭亏 |
| 净亏损 | −US$85.035M | — | — |

- Q4 2025 售出算力 **14.6 EH/s**（同比 +60.9%，环比 +45.7%）；FY2025 全年售出算力 **36.5 EH/s** —— 同一来源
- 截至 2025-12-31，加密货币储备达 **1,750 BTC 与 3,951 ETH** —— 同一来源
- Q4 增长主因：一笔"超过 5 万台 A15 Pro 矿机"的标志性订单，于 2026 年 1 月初交付完毕 —— 同一来源

### 2.3 **【核心发现】嘉楠不再单独披露"AI 产品"分部收入**

- **【官方 / SEC 备案】** 嘉楠 FY2025 年报（Form 20-F，2026 年 4 月 15 日提交，报告期截至 2025-12-31）的 XBRL 收入拆分标签**仅有三类**：`us-gaap:ProductMember`（产品）、`can:MiningMember`（自挖矿）、`can:FoundryServiceMember`（晶圆代工服务）。**不存在任何"AI products"或 AI 芯片收入分部标签**（2023、2024、2025 三年均无） —— 来源：[SEC EDGAR, Canaan Inc. Form 20-F (FY2025)](https://www.sec.gov/Archives/edgar/data/1780652/000110465926043786/can-20251231x20f.htm)
- **【官方】** 2025 全年业绩新闻稿同样只按 **products / mining / other** 三条线披露收入，**无 AI 分部行项目** —— 来源：[Canaan Inc. 官方新闻稿](https://www.prnewswire.com/news-releases/canaan-inc-reports-unaudited-fourth-quarter-and-full-year-2025-financial-results-302683644.html)
- **【官方 / SEC 备案】** 20-F 风险因素章节披露：**矿机及相关零配件销售占公司总收入的比例，2023、2024、2025 年分别为 83.1%、82.6%、77.9%** —— 来源：[SEC EDGAR, Canaan Inc. Form 20-F (FY2025)](https://www.sec.gov/Archives/edgar/data/1780652/000110465926043786/can-20251231x20f.htm)
- **【官方】** 公司在新闻稿中自我定位为 "an innovator in crypto mining"，2026 年 8 月起改称 "an innovator in compute and energy infrastructure" —— 来源：[Canaan Inc. 官方新闻稿](https://www.prnewswire.com/news-releases/canaan-inc-reports-unaudited-fourth-quarter-and-full-year-2025-financial-results-302683644.html)、[SEC EDGAR 6-K EX-99.1, 2026-08-17](https://www.sec.gov/Archives/edgar/data/1780652/000110465926097615/tm2623380d1_ex99-1.htm)
- **⚠️ 撰稿结论**：**"嘉楠 AI 业务收入占比 X%"这一数据点，在 FY2025 口径下无法从官方披露中取得**，因公司已不再单独列报 AI 产品收入。报告中应如实写明"公司未单独披露 AI 产品分部收入"，并可改用"矿机销售占总收入 77.9%（2025年）"作为替代性佐证。FY2025 的 US$2.716M "其他收入"未标注构成，**不可**解读为 AI 收入。

### 2.4 2026 年季度业绩

**Q1 2026（2026 年 5 月 19 日发布，未经审计）** —— 来源：[SEC EDGAR 6-K EX-99.1, 2026-05-19](https://www.sec.gov/Archives/edgar/data/1780652/000110465926063468/tm2614943d2_ex99-1.htm)

| 项目 | Q1 2026 | Q4 2025 | Q1 2025 |
|---|---|---|---|
| 总收入 | **US$62.693M** | US$196.3M | US$82.8M |
| 产品收入 | US$42.863M | US$164.9M | US$58.3M |
| 自挖矿收入 | US$19.124M | US$30.4M | US$24.3M |
| 其他收入 | US$0.706M | US$1.0M | US$0.2M |
| 净亏损 | **−US$88.748M** | −US$85.0M | −US$86.4M |

- Q1 2026 毛损 US$22.9M（Q4 2025 为毛利 US$14.6M）；Non-GAAP 调整后 EBITDA 亏损 US$76.3M；每 ADS 亏损 US$0.13 —— 同一来源
- 收入下滑主因：一笔美国大客户订单的最终交付完成，叠加比特币价格走弱 —— 同一来源
- 加密货币储备 1,807.60 BTC 与 3,951.53 ETH；当季自挖 257 枚比特币 —— 同一来源
- **Q1 2026 同样未披露 AI 产品分部收入**，收入表仅 products / mining / other 三行 —— 同一来源

**Q2 2026 业绩**

- **【官方】公司指引：Q2 2026 总收入预计 US$35–45 百万** —— 来源：[SEC EDGAR 6-K EX-99.1, 2026-05-19](https://www.sec.gov/Archives/edgar/data/1780652/000110465926063468/tm2614943d2_ex99-1.htm)
- **Q2 2026 实际业绩：截至 2026 年 9 月 8 日核查，未找到公开数据。** 嘉楠 SEC EDGAR 上最新的 6-K 备案为 2026-08-17，内容为"截至 2026 年 7 月 31 日当月的比特币挖矿运营月报"，并非季度财报 —— 已核查来源：[SEC EDGAR Canaan 6-K 备案列表](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001780652&type=6-K&dateb=&owner=include&count=20)

**其他 2026 年重要事项** —— 来源：[SEC EDGAR 6-K EX-99.1, 2026-08-17](https://www.sec.gov/Archives/edgar/data/1780652/000110465926097615/tm2623380d1_ex99-1.htm)

- 2026 年 7 月自挖 46 枚 BTC；月末储备 1,917 BTC 与 3,952 ETH
- 月末装机算力：非合资 10.05 EH/s，合资 4.85 EH/s；全球 12 个在运项目合计运行算力 14.24 EH/s
- 平均全成本电价 US$0.043/kWh；北美非合资机队能效 17.9 J/TH
- **2026 年 7 月 1 日，ADS 由纳斯达克全球市场（Global Market）转至纳斯达克资本市场（Capital Market）**；7 月 15 日获纳斯达克额外 180 天宽限期（至 **2027 年 1 月 11 日**）以满足 Rule 5550(a)(2) 的 US$1.00 最低买价要求
- 2026 年 8 月 4 日，公司授权管理层变现部分数字资产储备以回购 ADS（回购计划经董事会于 2025 年 12 月 12 日批准）
- 埃塞俄比亚业务已暂停运营，但相关算力仍计入装机口径

---

## 三、乐鑫科技 Espressif Systems（SSE STAR: 688018）

### 3.1 FY2025 全年业绩

**⚠️ 来源等级说明**：乐鑫 2025 年年报官方 PDF（[Espressif Systems 2025 Annual Report，2026-03-23 发布](https://www.espressif.com/sites/default/files/financial/Espressif%20Systems%202025%20Annual%20Report.pdf)）为图片型 PDF，本次核查环境无法提取其中文本。下列数字来自**业绩快报的媒体转引**，数值在多个来源间相互一致，但**未能直接核对上交所公告原文**，撰稿时建议以年报 PDF 复核。

| 项目 | FY2025 | 同比 |
|---|---|---|
| 营业收入 | **25.65 亿元** | **+27.82%** |
| 归母净利润 | **4.98 亿元** | **+46.72%** |
| 扣非归母净利润 | 4.55 亿元 | +47.62% |
| 营业利润 | 5.07 亿元 | +51.83% |
| 利润总额 | 5.08 亿元 | +52.47% |
| 基本每股收益 | 3.152 元 | — |

- 2025 年度业绩快报数据（发布于 2026 年 2 月 27 日，原始出处为《科创板日报》并附上交所公告） —— 来源：[财联社](https://www.cls.cn/detail/2297165)
- 同一组业绩快报数据（营收 25.65 亿元 +27.82%，归母净利 4.98 亿元 +46.72%，扣非 4.55 亿元 +47.62%，营业利润 5.07 亿元 +51.83%，利润总额 5.08 亿元 +52.47%） —— 来源：[新浪财经](https://finance.sina.com.cn/stock/bxjj/2026-02-27/doc-inhpfxrk3699192.shtml)

**年报层面的补充指标（媒体简析，等级较低，建议复核）** —— 来源：[证券之星](https://stock.stockstar.com/RB2026032200001686.shtml)

- 毛利率 46.63%（同比 +6.19 个百分点）；净利率 19.48%
- 三费合计 1.6 亿元，占营收 6.24%；每股净资产 26.67 元；每股经营性现金流 3.13 元
- Q4 2025 单季营业总收入 6.53 亿元（同比 +19.4%），单季归母净利润 1.21 亿元（同比 +37.26%）
- 期末研发人员 620 人，同比增长 14.39%
- 业务驱动：下游各行业数字化/智能化渗透率提升；智能家居仍是主要收入来源，但非智能家居领域增速更高

**官方年报 PDF 存档地址（供复核）**

- 乐鑫 2025 年年度报告（2026-03-23 发布） —— 来源：[Espressif 官方投资者关系](https://www.espressif.com/sites/default/files/financial/Espressif%20Systems%202025%20Annual%20Report.pdf)
- 乐鑫投资者关系报告索引页 —— 来源：[Espressif Investor Relations - Reports](https://www.espressif.com/en/company/investor-relations/reports)

### 3.2 2026 年半年报（H1 2026）

- **【官方】** 乐鑫已于 **2026 年 7 月 30 日**发布《Espressif Systems 2026 Q2 & Half-Year Report》（2026 年半年度报告），文件存于官方 IR 页 —— 来源：[Espressif 官方投资者关系报告页](https://www.espressif.com/en/company/investor-relations/reports)；PDF 直链：[2026 Q2 & Half-Year Report](https://www.espressif.com/sites/default/files/financial/Espressif%20Systems%202026%20Q2%20%26%20Half-Year%20Report.pdf)
- **具体财务数字（H1 2026 营业收入、归母净利润、同比增速）：未找到可核实的公开数据。** 该 PDF 为图片型文件，本次核查环境无法提取文本，且未能取得可信的文字版转引。**报告中不应填入任何 H1 2026 数字，除非另行打开该 PDF 核对。**
- **【官方】** 2026 年一季报已于 **2026 年 4 月 20 日**发布 —— 来源：[Espressif Q1 2026 Report](https://www.espressif.com/sites/default/files/financial/Espressif%20Systems%20Q1%202026%20Report.pdf)；具体数字同样**未找到可提取的公开文本数据**。

### 3.3 累计芯片出货量

- **【官方】** 乐鑫官网"关于我们"页公布 **"1.5 Billion+ Global IoT SoC Shipments"（全球物联网 SoC 累计出货 15 亿颗以上）** —— 来源：[Espressif 官网 About Espressif](https://www.espressif.com/en/company/about-espressif)
- **⚠️ 口径提示**：该数字**未附"截至某日"的时间标注**，页面唯一时间线索为页脚版权"Copyright © 2026 Espressif Systems"。撰稿时建议表述为"截至 2026 年，乐鑫官网标称全球 IoT SoC 累计出货超 15 亿颗"，不要虚构具体里程碑日期。
- **【官方】** 同页其他生态指标：AIoT 相关知识产权 239 项；客户数超 10,000 家；生态关注者与开发者超 300 万 —— 来源：[Espressif 官网 About Espressif](https://www.espressif.com/en/company/about-espressif)

### 3.4 ESP32-S3 的 AI 能力

来源：[Espressif 官网 ESP32-S3 产品页](https://www.espressif.com/en/products/socs/esp32-s3)

- CPU：**双核 Xtensa LX7**，主频最高 **240 MHz**
- 内存：**512 KB 片上 SRAM**；支持外扩高速 8 线（octal）SPI Flash 与 PSRAM，带可配置的数据/指令 Cache
- **AI 加速（用户所问的"向量指令"确认属实）**：ESP32-S3 **"support for vector instructions"（支持向量指令）**，官方表述其"provides acceleration for neural network computing and signal processing workloads"（为神经网络计算与信号处理负载提供加速）
- AI 软件栈：开发者通过 **ESP-DSP** 与 **ESP-NN** 库调用这些向量指令；**ESP-WHO**（视觉）与 **ESP-Skainet**（语音）SDK 亦支持该加速
- 无线：2.4GHz Wi-Fi 802.11 b/g/n（40MHz 带宽）；Bluetooth 5 (LE)，支持 Coded PHY 远距离与 2Mbps PHY 高吞吐
- I/O：45 个可编程 GPIO，其中 14 个可作电容触摸输入；含 ULP 超低功耗协处理器
- 安全：AES-XTS Flash 加密、RSA 安全启动、数字签名、HMAC；"World Controller"外设提供两个完全隔离的执行环境（可用于 TEE / 权限隔离）
- 官方定位：**"Designed for AIoT applications"**，主打"Powerful AI acceleration"
- **⚠️ 重要技术口径**：ESP32-S3 **没有独立 NPU**。其"AI 加速"的技术实质是 **CPU 向量指令扩展 + ESP-DSP/ESP-NN 软件库**。官方**未给出任何 TOPS 数值**。报告中不应将其与带独立 NPU 的芯片（如 K230）作同口径算力对比。

### 3.5 ESP32-P4 规格与 AI 能力

来源：[Espressif 官网 ESP32-P4 产品页](https://www.espressif.com/en/products/socs/esp32-p4)

- CPU：**双核 RISC-V 高性能（HP）核心，最高 400 MHz**，含单精度 FPU；另有独立 **LP-Core 低功耗核心，最高 40 MHz**（HP 核休眠时仍可运行）
- **AI 能力**：官方描述为 **"dual-core RISC-V CPU featuring AI instruction extensions"（带 AI 指令扩展的双核 RISC-V CPU）**。官方页面**未给出向量单元规格、未给出 TOPS 数值、未命名具体 ISA 扩展**
- 内存：HP 子系统 **768 KB 片上 SRAM**（外接 PSRAM 时可作 Cache 使用）；8 KB 零等待 TCM RAM；支持外扩 PSRAM
- 相关加速器（非严格 AI）：H.264 编码（1080p@30fps）、像素处理加速器 PPA、2D-DMA、MIPI-CSI 通路上的 ISP
- 多媒体接口：MIPI-CSI + MIPI-DSI 最高 1080p，另有并行摄像头/显示接口
- I/O：55 个可编程 GPIO；USB OTG 2.0 HS、以太网、SDIO Host 3.0、SPI、I2S、I2C、LED PWM、MCPWM、RMT、ADC、UART、TWAI
- 安全：Secure Boot、Flash 加密、密码学加速器、TRNG、数字签名外设、密钥管理单元 KMU
- HMI 特性中列有语音识别（speech recognition）
- **制程节点：未找到公开数据**（官方产品页未载明；Flash 容量、具体 RISC-V ISA 字符串亦未载明，需查 datasheet/TRM）
- **【官方】** ESP32-P4 于 **2026 年 5 月 8 日**发布 v3.x 性能与多媒体升级 —— 来源：[Espressif 官网新闻](https://www.espressif.com/en/company/newsroom/news)

### 3.6 其他可用于报告的乐鑫 2026 年动态

均来源：[Espressif 官网新闻中心](https://www.espressif.com/en/company/newsroom/news)

- 2026.08.05 —— 发布 ESP RainMaker Neo，开源"设备–云–手机"IoT 平台
- 2026.07.27 —— **ESP32-S31 进入量产并开售**
- 2026.07.16 —— 推出 Aliro 方案，面向可互操作的智能门禁产品
- 2026.06.12 —— ESP32-E22 获 **Wi-Fi 6E 认证**，并提供开源 Linux 驱动
- 2026.05.14 —— Anthropic 在 Claude 活动中展示基于 **ESP32-S3** 的硬件（M5Stack Cardputer）
- 2026.04.10 —— ESP32-C6 支持亚马逊 "Alexa Connect Kit SDK for Matter"
- 2026.03.27 —— 发布 ESP-IDF v6.0

---

## 四、未能核实 / 未找到公开数据（撰稿时请勿填充数字）

1. **Qualcomm 收购 Arduino 的交易金额** —— 官方明确未披露。任何流传数字均为媒体估计或传闻，引用须显著标注。
2. **Arduino 累计出货板卡数量** —— 官方未公布。
3. **Arduino 注册用户数** —— 官方仅公布"33M+ 活跃用户"，无"注册用户"口径数据。
4. **UNO Q 2026 年官方涨价原因** —— 无官方说明。
5. **CanMV-K230 开发板官方定价** —— 嘉楠官网未标价（由多家第三方生态厂商销售）；官方商城页面返回 403 无法核查。
6. **嘉楠"AI 产品"分部收入及占比（FY2025 及 2026 各季度）** —— **公司已不再单独列报该分部**，20-F 与业绩新闻稿的收入拆分仅有 products / mining / other 三类。此数据点在官方口径下不存在，建议改用"矿机销售占总收入 77.9%（2025年）"替代。
7. **嘉楠 Q2 2026 实际业绩** —— 截至 2026-09-08 尚未在 SEC 备案发布，仅有公司指引 US$35–45M。
8. **乐鑫 H1 2026（2026年半年报）具体财务数字** —— 半年报已于 2026-07-30 发布，但 PDF 为图片型无法提取文本，未取得可信文字版转引。
9. **乐鑫 Q1 2026 具体财务数字** —— 同上，一季报已于 2026-04-20 发布但数字未能提取。
10. **乐鑫 FY2025 数据的交易所原文核验** —— 现有数字来自业绩快报的多家媒体一致转引，未直接核对上交所公告 / 年报 PDF 原文，建议二次复核。
11. **乐鑫累计出货 15 亿颗的"截至日期"** —— 官网未标注时间点。
12. **K230 制程节点** —— 官方 datasheet 未载明。
13. **K230 的 TOPS 官方技术口径** —— datasheet 仅给 fps，"6T 等效算力"仅见于官网营销页，两者口径不同。
14. **ESP32-P4 制程节点、Flash 容量、具体 RISC-V ISA 扩展名称** —— 官方产品页未载明。
15. **ESP32-S3 / ESP32-P4 的 TOPS 算力** —— 官方从未给出，两者均无独立 NPU。
