# C. 开源生态

> 观测基准日：2026-09-08（GitHub 星标/分叉数为动态数据，均以此日期为准）

## C1. 小智AI xiaozhi-esp32（GitHub: 78/xiaozhi-esp32，作者"虾哥"）

### 仓库指标（2026-09-08 观测）

Star 数 29.7k（页面显示为四舍五入值，非精确整数）—— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
Fork 数 6.9k —— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
Watchers 249 —— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
Open Issues 635、Open PR 55、累计 Commits 996 —— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
许可证标注为 MIT —— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
项目定位："An MCP-based chatbot | 一个基于MCP的聊天机器人" —— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)

### 生态广度（仓库内建代理指标）

仓库内含 138 个开发板目录（Board Directories）、171 个发布变体（Release Variants）—— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
支持芯片族：ESP32、ESP32-C3、ESP32-C5、ESP32-C6、ESP32-S3、ESP32-P4 —— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
已适配的第三方硬件包括：立创ESP32-S3、乐鑫 ESP32-S3-BOX-3、M5Stack CoreS3、M5Stack AtomS3R + Echo Base、微雪 ESP32-S3-Touch-AMOLED-1.8、LILYGO T-Circle-S3、SenseCAP Watcher 等 —— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
主线工具链已迁移至 ESP-IDF v6.0+（171 个变体中 170 个基于 IDF 6.0.x 构建）—— 来源：[GitHub](https://github.com/78/xiaozhi-esp32)
小智已被乐鑫收录进官方 ESP-IoT-Solution 组件库，作为双向流式对话组件，支持 WebSocket 与 MQTT+UDP、OPUS/G.711/PCM 编解码及设备端 MCP 控制 —— 来源：[乐鑫 ESP-IoT-Solution 官方文档](https://docs.espressif.com/projects/esp-iot-solution/zh_CN/latest/ai/xiaozhi.html)

### 发布历史

最新版本 v2.4.2，发布于 2026-08-06（依据 release 附件时间戳 `2026-08-06T00:55:13Z`）—— 来源：[GitHub Releases](https://github.com/78/xiaozhi-esp32/releases)
Releases 列表共 7 页（每页 10 条），首页可见版本依次为 v2.4.2、v2.4.0、v2.2.6、v2.2.4、v2.2.3、v2.2.2、v2.1.0、v2.0.5、v1.9.4、v2.0.4 —— 来源：[GitHub Releases](https://github.com/78/xiaozhi-esp32/releases)

### 采用规模（媒体报道，非官方审计数据）

截至 2025 年 4 月，接入小智AI 的硬件设备两个月内增长至 10 万台，且"每个月的接入设备数量翻倍" —— 数据性质：媒体报道（极客公园采访小智团队，属企业自述口径）—— 来源：[极客公园 / 新浪科技转载](https://finance.sina.com.cn/tech/roll/2025-04-08/doc-inesmrat7029547.shtml)
上述 10 万台中，官方售卖的"语音盒子"仅一千多台，其余均由爱好者、开发者、商家 DIY 组装；小智团队本身不生产硬件 —— 数据性质：媒体报道 —— 来源：[极客公园 / 新浪科技转载](https://finance.sina.com.cn/tech/roll/2025-04-08/doc-inesmrat7029547.shtml)
日活跃用户约 1.5 万–2 万，月活超 9.4 万 —— 数据性质：媒体报道（企业自述）—— 来源：[极客公园 / 新浪科技转载](https://finance.sina.com.cn/tech/roll/2025-04-08/doc-inesmrat7029547.shtml)
项目已吸引 4 万名开发者 —— 数据性质：媒体报道（企业自述）—— 来源：[极客公园 / 新浪科技转载](https://finance.sina.com.cn/tech/roll/2025-04-08/doc-inesmrat7029547.shtml)
语音响应延迟约 300 毫秒 —— 数据性质：媒体报道（企业自述）—— 来源：[极客公园 / 新浪科技转载](https://finance.sina.com.cn/tech/roll/2025-04-08/doc-inesmrat7029547.shtml)
芯片厂商适配情况：思澈（Sifli）、全志已完成适配，其他厂商进行中 —— 数据性质：媒体报道 —— 来源：[极客公园 / 新浪科技转载](https://finance.sina.com.cn/tech/roll/2025-04-08/doc-inesmrat7029547.shtml)
项目归属：十方融海（在线教育公司），发起人为董事长黄冠（网名"虾哥"），团队规模不足 10 人 —— 数据性质：媒体报道 —— 来源：[极客公园 / 新浪科技转载](https://finance.sina.com.cn/tech/roll/2025-04-08/doc-inesmrat7029547.shtml)
2025 年 5 月，有技术博客称接入设备超 20 万台、且作者变更开源协议为不可商用 —— 数据性质：个人技术博客转述（未找到一手来源，且与当前 GitHub 页面标注的 MIT 许可证存在冲突，**建议报告中不采用或另行核实**）—— 来源：[CSDN 博客](https://blog.csdn.net/klandor2008/article/details/147791254)
2025-06-27，Seeed Studio 与十方融海在柴火创客空间举办交流会，虾哥首次系统讲解小智AI 开源项目与 AI+MCP 方案 —— 数据性质：主办方活动页 —— 来源：[柴火创客](https://www.chaihuo.org/activity/poster?id=554)

## C2. 树莓派（Raspberry Pi）社区规模与累计出货

> 说明：树莓派控股（Raspberry Pi Holdings plc）FY2025 年度业绩公告 PDF 为 CID 编码，本次未能直接提取原文文字。以下财务与出货数字均来自转述该公告的媒体报道，数据性质标注为"媒体报道（引述公司业绩公告）"，建议正式引用前以公告 PDF 原文复核。

FY2025 全年出货 760 万台（板卡与模组），同比增长 9%（下半年 400 万台 / 上半年 360 万台）—— 数据性质：媒体报道（引述业绩公告，2026-03-31 发布）—— 来源：[Investing.com](https://www.investing.com/news/company-news/raspberry-pi-fy2025-slides-semiconductor-sales-eclipse-boards-93CH-4590913)
FY2025 首次出现 RP2040 / RP2350 自研 MCU 出货量超过板卡与模组，芯片出货 840 万颗，同比增长 47%，公司称之为"交叉之年"（the cross-over year）—— 数据性质：媒体报道（引述业绩公告）—— 来源：[Investing.com](https://www.investing.com/news/company-news/raspberry-pi-fy2025-slides-semiconductor-sales-eclipse-boards-93CH-4590913)
FY2025 营收 3.232 亿美元，调整后 EBITDA 4640 万美元（同比 +25%），税前利润 2650 万美元（同比 +63%），ASP 由 43.30 美元升至 46.70 美元，美国区营收同比增长 56% —— 数据性质：媒体报道（引述业绩公告）—— 来源：[Electronic Specifier](https://www.electronicspecifier.com/news/analysis/raspberry-pi-grows-25-to-323-2m/)
截至 2026 年 3 月，累计售出超过 7500 万台（2025 年 3 月为 6800 万台）；该口径混合了板卡/模组与 Pico 系列产品 —— 数据性质：媒体/百科转述业绩公告 —— 来源：[Wikipedia: Raspberry Pi](https://en.wikipedia.org/wiki/Raspberry_Pi)
历史参照：截至 2024 年初（自 2012-02-29 起满 12 年），Eben Upton 确认售出 5700 万台，计入 Pico 后约 6100 万台 —— 数据性质：媒体报道 —— 来源：[Tom's Hardware](https://www.tomshardware.com/raspberry-pi/raspberry-pi-celebrates-12-years-as-sales-break-61-million-units)
业绩公告原文（一手来源，PDF）—— 来源：[Raspberry Pi Holdings plc 投资者关系](https://investors.raspberrypi.com/reports/11/document)

## C3. Arduino 社区规模与累计出货

Arduino 官方口径的社区规模为"全球超过 3000 万用户" —— 数据性质：媒体转述（Elektor 为 Arduino 合作方，非 arduino.cc 一手页面）—— 来源：[Elektor Magazine](https://www.elektormagazine.com/elektor-arduino)
历史里程碑：2011 年（Leonardo 发布年）累计售出超过 30 万块原版 Arduino 板 —— 数据性质：第三方零售商博客 —— 来源：[Botland](https://botland.store/blog/the-real-history-behind-the-arduino-cross-platform/)
历史里程碑：截至 2013 年累计售出约 70 万块，另有大致等量的仿制板，故实际用户基数接近 140 万 —— 数据性质：第三方案例研究（哈佛商学院 Digital Initiative 学生作业）—— 来源：[Harvard D3](https://d3.harvard.edu/platform-digit/submission/the-arduino-community/)
计数方法论说明：Arduino 硬件采用 CC BY-SA、软件采用 LGPL/GPL，任何人可合法生产兼容板，因此不存在可核实的累计出货总量 —— 来源：[Harvard D3](https://d3.harvard.edu/platform-digit/submission/the-arduino-community/)

## C4. 主流边缘 AI 开发板 价格 vs 算力对照表

> 每行均为可单独溯源的数据。凡官方未披露的字段一律标注"未找到公开数据"，未做任何估算。TOPS 均为厂商标称值。

| 开发板 | 芯片 / NPU | AI 算力（含精度口径） | 官方价格 | 数据性质 | 来源 |
|---|---|---|---|---|---|
| NVIDIA Jetson Orin Nano Super 开发套件 | Ampere GPU（无 DLA） | 67 TOPS（稀疏 INT8）/ 33 TOPS（稠密 INT8）；17 FP16 TFLOPS。算力全部来自 GPU | 249 美元（原 499 美元降价） | 官方披露 | [NVIDIA 开发者博客 2024-12-17](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) |
| NVIDIA Jetson AGX Orin 开发套件 | Ampere GPU + 2×DLA | 275 TOPS（稀疏 INT8）合计；其中 GPU 170 稀疏 / 85 稠密 INT8，DLA 105 稀疏 / 52.5 稠密 INT8 | 未找到公开数据（官网页面不列价） | 官方披露（算力） | [NVIDIA Jetson Orin 产品页](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) |
| NVIDIA Jetson AGX Orin 64GB（模组，非套件） | Ampere GPU + 2×DLA | 248 TOPS（稀疏 INT8）合计；GPU 156 稀疏 / 78 稠密，DLA 92 稀疏 / 46 稠密 | 未找到公开数据 | 官方披露（算力） | [NVIDIA Jetson Orin 产品页](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) |
| Raspberry Pi AI HAT+（13 TOPS 版） | Hailo-8L | 13 TOPS，**官方页面未标注精度** | 起售价 70 美元（页面仅给"from $70"，未分版本标价） | 官方披露 | [Raspberry Pi 官网](https://www.raspberrypi.com/products/ai-hat/) |
| Raspberry Pi AI HAT+（26 TOPS 版） | Hailo-8 | 26 TOPS，**官方页面未标注精度** | 未单独标价（同上"from $70"） | 官方披露 | [Raspberry Pi 官网](https://www.raspberrypi.com/products/ai-hat/) |
| Radxa Orion O6 | Cix P1（Armv9.2，12 核） | 45 TOPS，**为 NPU+CPU+GPU 合计值**；NPU 单独 TOPS 未披露，NPU 支持 INT4/INT8/INT16/FP16/TF32 | 未找到公开数据（官网仅提供"认证合作伙伴"渠道入口） | 官方披露 | [Radxa 官网](https://radxa.com/products/orion/o6/) |
| BeagleY-AI | TI AM67A（4×Cortex-A53 @1.4GHz） | 4 TOPS（双 C7x DSP + MMA 合计）；TI 芯片页明确为 8bit 整型，每个 MMA 至多 2 TOPS(8b) | 未找到公开数据（官网仅称"low-cost"并链接分销商） | 官方披露 | [BeagleBoard 官网](https://www.beagleboard.org/boards/beagley-ai) ／ [TI AM67A 产品页](https://www.ti.com/product/AM67A) |
| Arduino UNO Q（2GB 版） | Qualcomm Dragonwing QRB2210（4×Cortex-A53 @2.0GHz）+ STM32U585 | **官方页面未给出任何 TOPS 数值**，仅描述"One-Click AI：部署预训练模型到 Qualcomm AI engine" | €59.90（含增值税）；美元价未列 | 官方披露 | [Arduino 官方商店](https://store.arduino.cc/products/uno-q) |
| Milk-V Duo / Duo S | 官网未标注具体 SoC | 1 TOPS @ INT8（TPU） | 未找到公开数据（官网页面未渲染价格） | 官方披露 | [Milk-V 官网](https://milkv.io/) |
| Rockchip RK3588（芯片，非整板） | 三核 NPU | 6 TOPS，**原厂页面未标注该数值对应的精度**；NPU 支持 INT4/INT8/INT16/FP16/BF16/TF32；8nm 工艺 | 不适用（芯片） | 官方披露 | [瑞芯微官网](https://www.rock-chips.com/a/en/products/RK35_Series/2022/0926/1660.html) |
| CanMV-K230 / Kendryte K230（芯片） | 双 RISC-V 核（1.6GHz + 0.8GHz，128bit RVV 1.0）+ KPU | **官方页面未给出 TOPS/GOPS 数值**；KPU 支持 INT8 与 INT16；以帧率表述：ResNet50 ≥85fps@INT8、MobileNet_v2 ≥670fps@INT8、YoloV5S ≥38fps@INT8；称推理能力达 K210 的 13.7 倍 | 未找到公开数据 | 官方披露 | [嘉楠 Kendryte 官网](https://www.kendryte.com/zh/proDetail/230) |

补充说明：

Radxa 官网给出的端侧大模型实测口径为"30 tokens per second (based on Qwen2-1.5B)" —— 数据性质：官方披露 —— 来源：[Radxa 官网](https://radxa.com/products/orion/o6/)
Raspberry Pi AI HAT+ 承诺量产至 2030 年 1 月；Raspberry Pi 5 承诺量产至 2036 年 1 月 —— 来源：[Raspberry Pi 官网](https://www.raspberrypi.com/products/ai-hat/)

# D. 技术拐点

## D1. SBC / 边缘开发套件运行 7B 级大模型的能力演进

2024-12-17 —— NVIDIA 发布 Jetson Orin Nano Super 开发套件，售价由 499 美元降至 249 美元，算力由 40 稀疏 INT8 TOPS 提升至 67 稀疏 INT8 TOPS（稠密 20→33），GPU 主频 635MHz→1020MHz，内存带宽提升至 102GB/s，新增 25W MAXN 功耗模式；官方称生成式 AI 性能提升"最高 1.7 倍"，且明确指出硬件架构未变、性能提升完全来自 JetPack 6.1 软件 —— 数据性质：官方披露 —— 来源：[NVIDIA 开发者博客](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)

2024-12-17 —— NVIDIA 官方 LLM 吞吐基准（INT4 量化，MLC 推理框架，单位 tokens/sec，Orin Nano 原始版 → Super 版）—— 数据性质：官方披露 —— 来源：[NVIDIA 开发者博客](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) ／ 同表另见 [NVIDIA Jetson AI Lab](https://www.jetson-ai-lab.com/archive/benchmarks.html)

| 模型 | 原始版 | Super 版 | 增益 |
|---|---|---|---|
| Llama 3.1 8B | 14 | 19.14 | 1.37× |
| Qwen2.5 7B | 14.2 | 21.75 | 1.53× |
| Gemma 2 9B | 7.2 | 9.21 | 1.28× |
| Llama 3.2 3B | 27.7 | 43.07 | 1.55× |
| Phi 3.5 3B | 24.7 | 38.1 | 1.54× |
| Gemma 2 2B | 21.5 | 34.97 | 1.63× |
| SmolLM2 | 41 | 64.5 | 1.57× |

> 上表即"7B 级模型在 249 美元级开发套件上可用"的最直接官方证据：Llama 3.1 8B 达 19.14 tok/s、Qwen2.5 7B 达 21.75 tok/s，均为 INT4 量化。NVIDIA 同时说明该套件支持至多 8B 参数模型，并将 Orin 生命周期延长至 2032 年。

2024-12-17 —— 同批次视觉语言模型（VLM）增益 1.38×–2.04×，其中 InternVL2.5 4B 由 2.5 提升至 5.1 tok/s（2.04×）为最高；VILA/LLAVA 采用 INT4+MLC，其余采用 FP4 + HuggingFace Transformers。ViT 吞吐（FP16 + TensorRT）增益 1.43×–1.69× —— 数据性质：官方披露 —— 来源：[NVIDIA 开发者博客](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)

2026-09-08 观测 —— llama.cpp（ggml-org/llama.cpp）Star 数 127.5k、Fork 数 22.9k、累计 Commits 10,858；项目定位为"以最简配置在广泛硬件上实现最先进推理性能"，已提供面向骁龙的 Hexagon 后端与面向 Adreno GPU 的 OpenCL 后端 —— 数据性质：官方仓库 —— 来源：[GitHub](https://github.com/ggml-org/llama.cpp)

## D2. 低成本 SoC 的 NPU 普及时间线

| 芯片 | NPU 算力与精度口径 | 其他关键规格 | 数据性质 | 来源 |
|---|---|---|---|---|
| Rockchip RK3588 | 6 TOPS，三核 NPU，**原厂页未标注该值对应精度**；支持 INT4/INT8/INT16/FP16/BF16/TF32 加速 | 4×Cortex-A76 + 4×Cortex-A55，8nm | 官方披露 | [瑞芯微](https://www.rock-chips.com/a/en/products/RK35_Series/2022/0926/1660.html) |
| Kendryte K230 | **未公布 TOPS/GOPS**；KPU 支持 INT8/INT16；ResNet50 ≥85fps@INT8、MobileNet_v2 ≥670fps@INT8、YoloV5S ≥38fps@INT8；称为 K210 的 13.7 倍 | 双 RISC-V 核 1.6GHz + 0.8GHz，128bit RVV 1.0 | 官方披露 | [嘉楠 Kendryte](https://www.kendryte.com/zh/proDetail/230) |
| TI AM67A | 4 TOPS 合计（两个深度学习加速器，每个 MMA 至多 2 TOPS **@8bit 整型**，1.0GHz） | 4×Cortex-A53 @1.4GHz，3×Cortex-R5F @800MHz，IMG BXS-4-64 GPU 至多 50 GFLOPS；每个加速器另配 C7x DSP 至多 40 GFLOPS | 官方披露 | [TI AM67A](https://www.ti.com/product/AM67A) |
| Espressif ESP32-P4 | **无独立 NPU，官网无任何 TOPS/GOPS 数值**；仅为 RISC-V 核上的"AI 指令扩展"（AI instruction extensions） | 双核 RISC-V 至多 400MHz + LP-Core 至多 40MHz，768KB 片上 SRAM | 官方披露 | [乐鑫](https://www.espressif.com/en/products/socs/esp32-p4) |
| Hailo-8L（模组形态，Raspberry Pi AI HAT+） | 13 TOPS，未标注精度 | — | 官方披露 | [Raspberry Pi](https://www.raspberrypi.com/products/ai-hat/) |
| Hailo-8（模组形态，Raspberry Pi AI HAT+） | 26 TOPS，未标注精度 | — | 官方披露 | [Raspberry Pi](https://www.raspberrypi.com/products/ai-hat/) |
| Cix P1（Radxa Orion O6） | 45 TOPS，**为 NPU+CPU+GPU 合计**，NPU 单独值未披露；NPU 支持 INT4/INT8/INT16/FP16/TF32 | Armv9.2，12 核（4×A720 大核 + 4×A720 中核 + 4×A520 小核），Immortalis G720 MC10 GPU，128bit LPDDR5 5500MT/s，至多 64GB，带宽 100GB/s | 官方披露 | [Radxa](https://radxa.com/products/orion/o6/) |

> 注：本表缺少各芯片的**发布/量产日期**。RK3588、AM67A、ESP32-P4 的厂商页面均未标注产品发布日期（TI 页面仅有文档修订日期，不等同于产品发布日期），瑞芯微页面亦无。相关日期本轮未能取得可引用的一手来源。

## D3. RISC-V 边缘 AI 开发板进展

Kendryte K230：双 RISC-V 核（大核 1.6GHz，含 32KB I-cache / 32KB D-cache / 256KB L2、128bit RVV 1.0 扩展；小核 0.8GHz，128KB L2），KPU 支持 INT8/INT16 —— 数据性质：官方披露 —— 来源：[嘉楠 Kendryte](https://www.kendryte.com/zh/proDetail/230)
Kendryte K230D：K230 的小封装变体，集成 128MB LPDDR4 内存，面向空间受限设计 —— 数据性质：官方披露 —— 来源：[Kendryte 官网](https://www.kendryte.com/product/canmv-k230)
K230 系列可选 SDK：CanMV、RT-Smart、Linux、Linux+RT-Smart —— 数据性质：官方披露 —— 来源：[Kendryte 官网](https://www.kendryte.com/product/canmv-k230)
Milk-V Duo：双核至多 1GHz（RISC-V / ARM 可选），至多 256MB 内存，1 TOPS@INT8 TPU，可同时运行 Linux 与 RTOS —— 数据性质：官方披露 —— 来源：[Milk-V 官网](https://milkv.io/)
Milk-V Duo S：同为双核配置，至多 512MB 内存，1 TOPS@INT8 TPU，支持 Wi-Fi 6/BT 5.0、USB 2.0 Host、100Mbps 以太网、双路 MIPI CSI —— 数据性质：官方披露 —— 来源：[Milk-V 官网](https://milkv.io/)
Milk-V 产品线另含 Mars、Megrez、Jupiter、Titan；Jupiter2 被官方称为"首款符合 RVA23 规范的 RISC-V SBC"，Titan 被称为"最强 RISC-V MINI-ITX"，但官网首页未给出这四款的 SoC 型号、TOPS 与价格 —— 数据性质：官方披露（宣传语）—— 来源：[Milk-V 官网](https://milkv.io/)
Milk-V 官网列出的自有/合作芯片型号：SG2000、SG2002、CV1800B、SG2380（页面未建立芯片与具体板卡的对应关系）—— 数据性质：官方披露 —— 来源：[Milk-V 官网](https://milkv.io/)

---

# 未能核实项 / 未找到公开数据

本轮研究在中途耗尽了 WebSearch 配额（200/200，被本会话并发任务占用），后半程仅能对已知 URL 直接抓取，因此以下条目**并非确认不存在，而是本轮未能取得可引用来源**，建议提高 `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` 后补充检索。

## C 部分
- xiaozhi-esp32 的**精确** Star / Fork 整数值：GitHub 网页仅显示 29.7k / 6.9k 四舍五入值；api.github.com 在本机沙箱中被网络策略拒绝（curl 与 gh CLI 均返回 403 / user denied），故无法取得精确整数。
- xiaozhi-esp32 的**贡献者人数**与**Releases 总数**：GitHub 网页对应区块未渲染；Releases 仅能确认为 7 页。
- xiaozhi-esp32 的**首个 release 日期**与**仓库创建日期**：未找到公开数据。
- 早期 releases（v2.4.0 及更早）的**年份**：GitHub 列表页不显示年份，仅 v2.4.2 可由附件时间戳确认为 2026 年。
- **许可证冲突未解决**：GitHub 当前页面标注 MIT，而 2025 年 5 月的技术博客称作者已变更为"不可商用"协议。需核实一手来源。
- 小智 xiaozhi **server 端生态**（Python / Java / Go 社区服务端实现）的仓库名、星标与规模：未找到公开数据。
- 小智 **2025 年 4 月之后的接入设备数**（含 20 万台说法的一手来源）：未找到可引用来源。
- 小智**出货厂商名单**与**累计出货量**：未找到公开数据。
- Raspberry Pi 累计出货的**一手数字**：FY2025 业绩公告 PDF 为 CID 编码，本地无 pdftotext，未能提取原文；现有数字均为媒体/百科转述。
- Arduino **官方一手页面**（arduino.cc）的社区规模数字：未取得；3000 万用户为合作媒体转述。
- Arduino **近年累计出货量**：未找到公开数据（Arduino 为私有公司，且开源许可导致兼容板无法计数）。

## C4 表格中未能补齐的行
- **Huawei Atlas 200I DK A2**：hiascend.com 的两个候选 URL 均返回 404，本轮完全未取得算力与价格。
- **Jetson AGX Orin 开发套件官方售价**：NVIDIA 产品页不列价，marketplace.nvidia.com 抓取超时。
- **Raspberry Pi 5 各内存版本官方售价**：抓取到的页面仅有 16GB 版"$305"一个数字，且该页面同时包含明显被篡改的合规联系人邮箱，**该价格可疑，已刻意排除不予采用**。
- **Rockchip RK3588 整板价格**（Orange Pi 5 Plus / Radxa ROCK 5B / Firefly）：未取得。
- **CanMV-K230 开发板售价**：未取得。
- **BeagleY-AI 官方售价**：官网不标价。
- **Radxa Orion O6 各内存版本售价**：官网不标价。
- **Qualcomm Dragonwing / RB3 Gen 2 开发套件**：未取得。
- **Arduino UNO Q 4GB 版售价**与**美元定价**：未取得。

## D1 部分（缺口较大）
- **llama.cpp 项目启动日期**（2023 年 3 月，ggerganov）与首个 release：GitHub 页面未渲染，未取得一手来源。
- **2023 年"LLaMA 跑在树莓派 4 上"的原始推文 / Issue / 博客**及其实测速度：未取得。
- **ggml / Q4 量化里程碑**的日期：未取得。
- **Jetson AGX Orin 运行 Llama-2-7B 的官方 tok/s 数值**：jetson-ai-lab 归档页该部分以图片形式嵌入，正文无数字，无法引用。
- **Raspberry Pi 5 运行 Llama 3 8B / Phi-3 / Qwen 的社区实测**（Jeff Geerling 等）：未取得。
- **Rockchip RKLLM / RKNN-LLM 工具链发布日期**与 RK3588 上 Qwen 7B 的 tok/s：未取得。
- **Llama 3.2 1B/3B、Qwen2.5-0.5B/1.5B、Phi-3-mini、Gemma 的官方发布日期**：未取得一手来源。
- **中文来源的端侧大模型里程碑**：未取得。

## D2 部分
- **所有芯片的发布/量产日期**：RK3588、K230、AM67A、ESP32-P4 的厂商页面均无发布日期，需另寻发布会稿或新闻通稿。
- **Amlogic**（A311D 5 TOPS、A311D2、S905D3、C308X）：未取得。
- **Allwinner 全志**（V853、R329、T527）：未取得。
- **ESP32-S3 的 ESP-DL / AI 加速能力**：未取得。
- **Qualcomm Dragonwing 系列**（2025 年 3 月发布，IQ/RB 系列）TOPS 与发布日期：未取得。
- **TI AM68A / AM62A**：未取得。
- **爱芯元智 AX650N / AX630C、Kneron**：未取得。
- **RK3576 / RK3588S 及更新的 RK35xx**：未取得。

## D3 部分
- **StarFive VisionFive 2 / JH7110**：starfivetech.com 目标页返回 404，发布日期、Kickstarter 众筹金额与台数、售价均未取得。
- **SiFive**（P870 / X280 / HiFive 系列）：未取得。
- **SpacemiT K1/M1 与 Banana Pi BPI-F3**：docs.banana-pi.org 页面正文未渲染，规格、TOPS、价格、发布日期均未取得。
- **Milk-V Mars / Megrez / Jupiter / Titan** 的 SoC、TOPS、价格、发布日期：官网首页未提供，需逐个抓取产品子页。
- **Milk-V Duo 的 SoC 型号**：官网未建立板卡与芯片的对应关系。
- **RISC-V 累计核心出货量**（RISC-V International / SHD Group / Semico 等）：未取得。
- **所有 RISC-V 开发板的出货量数字**：未找到公开数据。
