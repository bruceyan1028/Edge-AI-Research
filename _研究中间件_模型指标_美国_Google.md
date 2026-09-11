# 研究中间件：美国端侧模型型号参数 · Google

> 本文件为《端侧模型技术路线与指标对比·数据支撑清单》的中间产物，合并进正式清单后可删除。
> 检索日期：2026-09-09。**待核验**：Gemma 4 / Gemini Nano 4 等 2026 年条目超出模型知识截止，发布前需抽样复核一手页面。

---

## 0. 前提：Gemma 4 已存在

**已验证**：Gemma 4 于 **2026-03-31** 发布（官方 releases 页），博客 **2026-04-02**。5 个尺寸：**E2B、E4B、12B Unified、26B A4B (MoE)、31B Dense**。**只有 E2B / E4B 是端侧型号**，12B 及以上不属端侧。后续：2026-04-16 Gemma 4 - MTP；2026-06-03 Gemma 4 12B Unified。
- https://ai.google.dev/gemma/docs/releases · https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/

---

## 1. Gemma 4 E2B / E4B（当前一代端侧旗舰）

| 字段 | Gemma 4 E2B | Gemma 4 E4B |
|---|---|---|
| 全名 | Gemma 4 E2B (-pt/-it) | Gemma 4 E4B (-pt/-it) |
| 公司 / 首发 | Google DeepMind / **2026-03**（03-31，博客 04-02） | 同左 |
| **参数量** | **有效 2.3B / 总计 5.1B** | **有效 4.5B / 总计 8B** |
| 架构 | Dense Transformer + **Per-Layer Embeddings (PLE)**；**35 层**；混合注意力（局部滑窗 512 与全局交替，末层必为全局）；全局层 unified KV + p-RoPE (p=0.25)；局部:全局 = **4:1**；KV 共享 20/35 | 同类型；**42 层**；局部:全局 = **5:1**；KV 共享 18/42 |
| 蒸馏 | 官方称与 Gemini 3 同源技术，但技术报告**未把 E2B 明示为某父模型的蒸馏产物** → 父模型未披露。（反向关系：Gemini Nano 4 基于 Gemma 4） | 同左 |
| **量化体积** | bf16 11.4GB → SFP8 5.7GB → Q4_0 2.9GB → **移动端 1.1GB（纯文本 0.84GB）**；技术报告 Table 3（纯文本 32k）：bf16 4.6GB → **移动量化 0.8GB**，KV +0.05GB | bf16 17.9GB → SFP8 8.9GB → Q4_0 4.5GB → **移动端 2.5GB（纯文本 2.2GB）**；报告：bf16 9.0GB → **2.3GB**，KV +0.14GB |
| 官方推荐量化 | `-qat-mobile-ct` / `-qat-mobile-transformers`：自定义 **wNa8o8**，int2+int4 混合权重 + int8 激活，含定向 2-bit 解码层、优化 KV cache、静态激活；另有 `-qat-q4_0-gguf`、`-qat-w4a16-ct`。**均为 QAT，非 PTQ** | 同左 |
| 上下文 | **128K**（LiteRT-LM 端侧构建为 32K） | 同左 |
| **许可** | **Apache 2.0**（Gemma 系列首次改标准开源许可） | 同左 |
| 模态 | 文本 + 图像 + **音频**输入 → 文本；视频按帧（≤60s @1fps），音频 ≤30s；视觉编码器 ~150M、音频编码器 ~305M | 同左 |

**技术报告 Table 1 参数拆解**（关键口径证据）：

| Model | Audio Enc. | Vision Enc. | Embedder | Einsums | Drafter |
|---|---|---|---|---|---|
| E2B | 305M | 150M | **400M + 2,340M** | 1,870M | 76M |
| E4B | 305M | 150M | **670M + 2,820M** | 3,940M | 77M |

脚注明确：额外的 embedder 参数就是 PLE，**不计入 effective 参数**。

### 官方端侧性能（LiteRT-LM 官方模型卡）
统一方法学：**1024 token prefill + 256 token decode，context = 2048**；CPU 走 LiteRT XNNPACK delegate 4 线程；**TTFT 不含加载时间，cache 已预热**。

**E2B**（litert-community/gemma-4-E2B-it-litert-lm，2/4/8-bit 混合，磁盘 2583MB）

| 设备 | 后端 | Prefill | **Decode** | TTFT | 内存 |
|---|---|---|---|---|---|
| Galaxy S26 Ultra | CPU | 557 | 46.9 | 1.8s | 1733MB |
| Galaxy S26 Ultra | GPU | 3,808 | 52.1 | 0.3s | 676MB |
| iPhone 17 Pro | CPU | 532 | 25.0 | 1.9s | 607MB |
| iPhone 17 Pro | GPU | 2,878 | 56.5 | 0.3s | 1450MB |
| MacBook Pro M4 Max | GPU | 7,835 | 160.2 | 0.1s | 1623MB |
| RTX 4090 (Linux) | GPU | 11,234 | 143.4 | 0.1s | 913MB |
| Intel Lunar Lake | GPU | 3,751 | 48.4 | 0.29s | 3540MB |
| Raspberry Pi 5 16GB | CPU | 133 | 7.6 | 7.8s | 1546MB |
| Jetson Orin Nano | GPU | 1,142 | 24.2 | 0.9s | 2739MB |
| **Qualcomm Dragonwing IQ8** | **NPU** | 3,747 | 31.7 | 0.3s | 1869MB（**该行 ctx=4096**） |
| MacBook M4 Max | WebGPU | 4,853 | 73 | 1.09s | ~1800MB |

**MTP 投机解码加成（S26 Ultra GPU）**：baseline decode 51.5 → 摘要 91.7 / 代码 84.4 / 改写 87.4 / 自由问答 66.5 tok/s。

**E4B**（磁盘 3654MB）

| 设备 | 后端 | Prefill | **Decode** | TTFT | 内存 |
|---|---|---|---|---|---|
| Galaxy S26 Ultra | CPU | 195 | 17.7 | 5.3s | 3283MB |
| Galaxy S26 Ultra | GPU | 1,293 | 22.1 | 0.8s | 710MB |
| iPhone 17 Pro | GPU | 1,189 | 25.1 | 0.9s | 3380MB |
| MacBook Pro M4 Max | GPU | 2,560 | 101.1 | 0.4s | 3217MB |
| RTX 4090 | GPU | 7,260 | 91.2 | 0.2s | 1119MB |
| Raspberry Pi 5 16GB | CPU | 51 | 3.2 | 20.5s | 3069MB |

MTP 加成（S26 Ultra GPU）：21.9 → 46.0 / 49.4 / 47.5 / 36.7 tok/s。

技术报告另称：视觉编码器"相对 Gemma 3n 在较新硬件上端侧延迟降低 44%"（硬件未点名）；音频编码器磁盘 390MB → 87MB（**-78%**）；视觉编码器 W8A8 使前向内存 400MB → 200MB。**技术报告本身不含任何 tok/s 数据**。

### 官方 benchmark（IT）
| Benchmark | E2B | E4B | (Gemma 3 27B no-think) |
|---|---|---|---|
| MMLU Pro | 60.0 | 69.4 | 67.6 |
| GPQA Diamond | 43.4 | 58.6 | 42.4 |
| AIME 2026 (no tools) | 37.5 | 42.5 | 20.8 |
| LiveCodeBench v6 | 44.0 | 52.0 | 29.1 |
| Codeforces ELO | 633 | 940 | 110 |
| Tau2 (avg of 3) | 24.5 | 42.2 | 16.2 |
| BigBench Extra Hard | 21.9 | 33.1 | 19.3 |
| MMMLU | 67.4 | 76.6 | 70.7 |
| MMMU Pro (vision) | 44.2 | 52.6 | 49.7 |
| MATH-Vision | 52.4 | 59.5 | 46.0 |
| OmniDocBench 1.5（越低越好） | 0.290 | 0.181 | 0.365 |
| CoVoST (audio) | 33.47 | 35.54 | — |
| FLEURS（越低越好） | 0.09 | 0.08 | — |
| MRCR v2 8-needle 128k | 19.1 | 25.4 | 13.5 |

**E2B/E4B 的 LMArena Elo 未披露**（官方只公布 31B 为 Arena.ai 文本榜"全球第 3 开源模型"、26B A4B 第 6，截至 2026-04-01，无具体数值）。训练数据截止 **2025-01**；预训练 140+ 语言，开箱支持 35+；默认采样 temp 1.0 / top_p 0.95 / top_k 64。

---

## 2. Gemma 3n E2B / E4B

| 字段 | E2B | E4B |
|---|---|---|
| 首发 | **2025-06**（06-26 正式；05-20 I/O 预览） | 同左 |
| 参数量 | **原始 5B / 有效 1.91B**（官方精确值） | **原始 8B / 有效 ~4B**（精确值未披露） |
| 架构 | **MatFormer + PLE + LAuReL + AltUp + KV Cache Sharing**；MobileNet-V5-300M 视觉编码器；USM-based 音频编码器 | 同左（E4B 内嵌 E2B 子模型） |
| 派生关系 | **是**：E2B 是嵌在 E4B 内部、训练时同步优化的子模型，可直接抽取独立发布 | E4B 为主模型；上游父模型未披露 |
| 量化体积 | LiteRT `dynamic_int4`：**.tflite 2991MB**；官方称最低 **2GB 内存**可运行 | **.tflite 4201MB**；最低 **3GB 内存** |
| 上下文 | **32K** | **32K** |
| **许可** | **Gemma Terms of Use**（非 Apache，HF gated） | 同左 |
| 模态 | 文本+图像+音频+视频 → 文本；图像 256/512/768px（各 256 token），音频 6.25 token/s（≈160ms/token），上限 30s 片段 | 同左 |

训练 ~11T tokens，知识截止 **2024-06**，TPUv4p/v5p/v5e + JAX。

### 官方端侧性能（`google/gemma-3n-*-it-litert-preview`）
方法学：**Galaxy S25 Ultra，4096 KV cache，1024 prefill / 256 decode**，`dynamic_int4`，CPU 走 XNNPACK 4 线程，视觉编码器固定 GPU 512×512，cpufreq 锁 performance。

| 模型 | 后端 | Prefill | Decode | TTFT | 体积 | Peak RSS | GPU Mem |
|---|---|---|---|---|---|---|---|
| E2B | CPU | 163 | 17.6 | 6.7s | 2991MB | 2704MB | 193MB |
| E2B | GPU | 620 | 23.3 | 12.7s | 2991MB | 3408MB | 3408MB |
| E4B | CPU | 118 | 12.8 | 9.2s | 4201MB | 3924MB | 193MB |
| E4B | GPU | 446 | 16.1 | 15.1s | 4201MB | 5504MB | 3048MB |

其他官方主张：**KV Cache Sharing 相对 Gemma 3 4B 有 2× prefill 提升**；**MatFormer 抽取的 E2B 最高 2× 更快推理**（相对 E4B）；**MobileNet-V5-300M vs Gemma 3 的 SoViT，在 Pixel Edge TPU 上量化后 13× 加速（不量化 6.5×）、参数少 46%、内存小 4×，Pixel 上可达 60 fps**。

### 官方 benchmark
- **E4B：LMArena 分数 "over 1300"**，官方称首个突破 1300 的 10B 以下模型（具体数值未披露）
- MMLU(IT)：E2B **60.1** / E4B **64.9**；MMLU Pro 40.5 / 50.6；GPQA-D 24.8 / 23.7；LiveCodeBench v5 18.6 / 25.7；AIME2025 6.7 / 11.6；MBPP 56.6/63.6；HumanEval 66.5/75.0；HiddenMath 27.7/37.7；MGSM 53.1/60.7；Global-MMLU 55.1/60.3

---

## 3. Gemma 3（1B / 4B 为端侧档）+ QAT int4

| 字段 | 1B | 4B | (12B / 27B，非端侧) |
|---|---|---|---|
| 首发 | **2025-03**（03-10） | 同左 | 同左 |
| 参数量 | ~1.0B = emb **302M** + non-emb **698M** + 视觉 **0** | ~4.3B = 视觉 **417M** + emb **675M** + non-emb **3,209M** | 12B ≈12.2B；27B ≈27.4B |
| 架构 | Dense；局部:全局 = **5:1**，局部层滑窗 **1024**；全局层 RoPE base 提至 1M（局部保持 10k）；词表 262k | 同左 + 冻结 **400M SigLIP**（896×896 → 256 token，推理期 Pan & Scan） | 同 4B |
| 蒸馏 | 技术报告称预训练用 knowledge distillation，**教师未披露** | 同左 | 同左 |
| **量化体积（官方 Table 3，权重 / +32K KV）** | bf16 2.0GB → **int4 0.5GB**；+KV：2.9 → **1.4GB** | bf16 8.0GB → **int4 2.6GB**；+KV：12.7 → **7.3GB** | 12B 24.0→6.6GB；27B 54.0→**14.1GB**（+KV **32.8GB**） |
| 上下文 | **32K** | **128K** | 128K |
| 许可 | Gemma Terms of Use | 同左 | 同左 |
| 模态 | 纯文本 | 文本+图像 → 文本 | 多模态 |

训练 token：1B=2T，4B=4T，12B=12T，27B=14T；知识截止 **2024-08**。

**QAT int4 官方口径（2025-04-18）**：27B 从 H100 级降到**单张 RTX 3090 (24GB)**；12B 可跑 **RTX 4060 Laptop (8GB)**。方案：训练中模拟量化 **QAT ~5000 步**，以未量化 checkpoint 的概率分布为目标，官方称 **Q4_0 下 perplexity 下降幅度减少 54%**。提供 per-channel int4 / per-block int4 / switched fp8 三种目标格式。**官方明确警告：以上仅权重显存，运行还需 KV cache 额外显存。**

### 官方端侧性能（LiteRT）
**Gemma3-1B-IT**
| 设备 | 后端 | 量化 | ctx | Prefill | Decode | TTFT | 模型 | 内存 |
|---|---|---|---|---|---|---|---|---|
| S24 Ultra | CPU | fp32 baseline | 1280 | 49 | 10 | 5.59s | — | 4123MB |
| S24 Ultra | CPU | dyn_int4 blk128 | 1280 | 138 | 50 | 2.33s | 657MB | 982MB |
| S24 Ultra | CPU | dyn_int4 QAT | 2048 | 322 | 47 | 3.10s | **529MB** | 1138MB |
| S24 Ultra | GPU | dyn_int4 QAT | 2048 | 2585 | 56 | 4.50s | 529MB | 1205MB |
| S24 Ultra (LiteRT-LM) | CPU | dyn_int4 QAT | 2048 | 379 | 55 | — | 529MB | 1009MB |
| **S25 Ultra (LiteRT-LM)** | **NPU** | **a16w4 QAT** | 1280 | **5836** | **85** | — | 689MB | 626MB |
| MacBook M4 Max | WebGPU/F16 | dyn_int4 | 1280 | 4339 | 133 | 0.51s | 700MB | GPU 1331MB |

**Gemma3-4B-IT**（MacBook Pro M4 Max / Chrome WebGPU，1280 KV，1024/256）
| 精度 | 量化 | Prefill | Decode | TTFT | GPU Mem | 模型 |
|---|---|---|---|---|---|---|
| F16 | int8 | 1192 | 39 | 2.01s | 4.5GB | 3.9GB |
| F16 | int4 | 1195 | 55 | 1.29s | 3.3GB | 2.56GB |
| F16 | Q4_0 (QAT) | 1205 | 54 | 1.51s | 3.5GB | 2.89GB |

### 官方 benchmark（IT，0-shot）
| Benchmark | 1B | 4B | 12B | 27B |
|---|---|---|---|---|
| MMLU (Pro) | 14.7 | 43.6 | 60.6 | 67.5 |
| GPQA Diamond | 19.2 | 30.8 | 40.9 | 42.4 |
| LiveCodeBench | 1.9 | 12.6 | 24.6 | 29.7 |

（PT MMLU 5-shot：4B 59.6 / 12B 74.5 / 27B 78.6。**LMArena Elo 官方模型卡未列**。）

---

## 4. Gemini Nano（全代际，闭源）

随 Android AICore 系统服务分发，App 不能自带权重，只能经 **Google AI Edge SDK / ML Kit GenAI API** 调用。

### 4.1 Gemini Nano-1 / Nano-2（2023-12）
- 首发 **2023-12**（Gemini 1.0 技术报告，Pixel 8 Pro 首发）
- **Nano-1 = 1.8B；Nano-2 = 3.25B** —— **Google 官方唯一公开披露过 Nano 参数的地方**
- 架构 Dense decoder-only；**官方原文："It is trained by distilling from larger Gemini models"**（父模型具体是 Pro 还是 Ultra 未披露）
- **官方原文："It is 4-bit quantized for deployment"** —— 具体方案未披露
- 上下文未披露（第三方常引 ~4K，非官方）；闭源，无权重发布
- 源：https://arxiv.org/html/2312.11805v5 （Table 1）

### 4.2 nano-v2 / v3 / v4（当前 Android 生产版本，截至 2026-09）
ML Kit 官方按 `getBaseModelName()` 分三档，并**明确警告"不同版本对同一 prompt 可能返回不同输出"**：
- **nano-v2**：Honor Magic V5/7/7 Pro、iQOO 13、Razr 60 Ultra、OnePlus 13/13s、OPPO Find N5、POCO F7 Ultra/F8 Pro/F8 Ultra/X7 Pro/X8 Pro、realme GT 7 Pro、Galaxy Z Fold7、Galaxy Z TriFold、vivo X200 FE、Xiaomi 14T Pro/15/15T/15T Pro/15 Ultra/17/17 Ultra 等
- **nano-v3**：**Pixel 9 与 Pixel 10 全系**、Honor Magic 8 Pro、iQOO 15、Motorola Signature、OnePlus 15/15R、OPPO Find X8/X9 系列、**Galaxy S26 / S26+ / S26 Ultra**、Sharp AQUOS R11、Sony Xperia 1 VIII、vivo X200/X300 系列等
- **nano-v4**：**Pixel 11 / 11 Pro / 11 Pro XL / 11 Pro Fold；Galaxy Z Flip8 / Z Fold8 / Z Fold8 Ultra**

**参数量、上下文、量化方案、tok/s、内存 —— 全部未披露。** 官方只有定性表述："inference speed depends on device hardware"、AICore 统一管理分发故"不占用你 App 的磁盘与运行时内存预算"。

模态（按 ML Kit GenAI API 反推）：文本（Prompt / Summarization / Proofreading / Rewriting）、图像（Image Description、多模态 Prompt）、音频（Speech Recognition，Advanced Mode 目前仅 Pixel 10 / 11）。

**装机量官方口径：Gemini Nano 已覆盖"超过 1.4 亿台设备"（2026-04）。**

### 4.3 Gemini Nano 4（2026-04 开发者预览，年内量产）
- **2026-04-02 AICore Developer Preview**；I/O 2026 宣布；消费级设备 "later this year (2026)"
- **基于 Gemma 4**：官方说明可 "target the E2B (fast) or E4B (full) variants"，UI 对应 **Gemini Nano 4 Fast / Full**。注意：官方**没有逐字写明** Fast=E2B、Full=E4B，只是命名与 `ModelPreference.FAST/FULL` 对齐
- **官方性能主张："up to 4x faster than previous versions"、"uses up to 60% less battery"、E2B 比 E4B 快 3x**。**未说明是 prefill 还是 decode，也未给绝对 tok/s**
- 硬件："latest generation of specialized AI accelerators from **Google, MediaTek, and Qualcomm**"；无 NPU/TPU 加速的设备回落 CPU，官方声明"不代表最终量产性能"
- 模态：文本+图像+音频；140+ 语言
- 预览期路线：Prompt API 将补齐 tool calling、structured output、system prompts、thinking mode

---

## 5. 其他值得收录的 Google 端侧模型

### 5.1 Gemma 3 270M（2025-08-14）
- **270M = embedding 170M + transformer blocks 100M**（词表 256k 导致 embedding 占比极高）；Dense，无视觉编码器；训练 6T tokens，截止 2024-08
- 官方提供 **INT4 QAT checkpoint**，称"INT4 精度下性能退化极小"；上下文 **32K**；Gemma Terms of Use；纯文本
- **官方端侧性能：Pixel 9 Pro SoC 内部测试，INT4 版跑 25 轮对话仅消耗 0.75% 电量** —— Google 称"迄今最省电的 Gemma 模型"。**无 tok/s、无 TTFT**
- Benchmark：**IFEval 51.2 (0-shot, IT)**；HellaSwag 37.7、PIQA 66.2、ARC-c 28.2、WinoGrande 52.3、BBH 26.7

### 5.2 EmbeddingGemma 308M（2025-09-04）
- **308M = ~100M 模型参数 + ~200M embedding**；基于 Gemma 3 架构的 encoder；**Matryoshka Representation Learning**，输出 768 可截断到 512/256/128；共用 Gemma 3n tokenizer
- **QAT 后可在 <200MB RAM 运行**（官方口径）；上下文 **2K**；100+ 语言
- **官方端侧性能：EdgeTPU 上 256 输入 token 的 embedding 推理 <15ms**（注意这是 embedding 前向，非生成，无 prefill/decode 概念）
- Benchmark：MTEB Multilingual v2 上"500M 以下最强开源多语言文本 embedding 模型"，**具体分值未给**；许可博客未写（HF 上为 Gemma Terms）；技术报告 arXiv 2509.20354

### 5.3 FunctionGemma 270M（2025-12-18，端侧 agent / function calling 专用）
- **270M**，基于 **Gemma 3 270M**（同架构，不同 chat format）；上下文 **32K**；Gemma Terms of Use；纯文本
- **官方端侧性能：Galaxy S25 Ultra CPU，LiteRT XNNPACK 4 线程，512 prefill / 32 decode，ctx 1024，dynamic_int8** —— Mobile Actions 场景 **prefill 1718 tok/s、decode 125.9 tok/s、TTFT 0.3s、模型 288MB、Peak RSS 551MB**；Tiny Garden 场景 1743 / 125.7 / 0.3s / 288MB / 549MB
- Benchmark：BFCL 0-shot Simple 61.6 / Multiple 63.5 / Parallel 39 / Parallel Multiple 29.5 / Live Simple 36.2 / Live Multiple 25.7 / Relevance 61.1 / Irrelevance 73.7；Mobile Actions 微调后 58% → 85%

### 5.4 其他（端侧相关性弱，建议不入主表）
**VaultGemma 1B**（2025-09-13，差分隐私训练）· **T5Gemma v2**（2025-12-18，270M/1B/4B encoder-decoder，官方无端侧性能数据）· **MedGemma 1.5 4B**（2026-01-13）/ MedGemma 4B（2025-05-20）—— 4B 理论可端侧，**无官方端侧 tok/s / 内存** · **TranslateGemma 4B/12B/27B**（2026-01-15）· Gemma Scope 2（2025-12-19，可解释性工具）· ShieldGemma 2 / PaliGemma 2（3B 起，无端侧性能披露）

---

## 6. 口径陷阱（必须在图谱中显式标注）

### 陷阱 A：Gemma 3n / Gemma 4 的 "E" = effective，不是真实参数量
| 模型 | 官方名 | **有效参数** | **实际加载参数** | 差额来源 |
|---|---|---|---|---|
| Gemma 3n E2B | "2B" | **1.91B** | **5B** | PLE + MatFormer |
| Gemma 3n E4B | "4B" | ~4B（未披露精确值） | **8B** | PLE + MatFormer |
| Gemma 4 E2B | "2B" | **2.3B** | **5.1B** | **仅 PLE** |
| Gemma 4 E4B | "4B" | **4.5B** | **8B** | **仅 PLE** |

**差额成因分两条，不要混为一谈：**

1. **Per-Layer Embeddings (PLE)** —— 差额的主要且唯一必然来源。给**每一层 decoder 配一张针对每个 token 的小 embedding 表**。这些表体积巨大（Table 1：E2B 的 PLE = **2,340M**，E4B = **2,820M**，占总参数近一半），但**只做查表，不参与矩阵乘**，因此可放系统内存/快速本地存储、由 CPU 计算并逐层注入，**不占加速器高速内存**。有效参数 = 总参数 − PLE（E2B：5.1B − 2.34B ≈ 2.3B ✓；E4B：8B − 2.82B ≈ 4.5B ✓，数字完全对得上）。

2. **MatFormer 嵌套 —— 只适用于 Gemma 3n，不适用于 Gemma 4。** Gemma 3n 的 E2B 是训练时同步优化、嵌在 E4B 内部的嵌套子模型，还可用 Mix-n-Match（调 FFN hidden dim 8192↔16384 + 跳层）拼出 2B~4B 之间任意中间尺寸。**Gemma 4 技术报告全文没有出现 "MatFormer" 或 "nested submodel"**，且 E2B（35 层）与 E4B（42 层）层数不同、KV 共享比不同 —— **Gemma 4 的 E2B 不是 E4B 的嵌套子模型，而是独立训练的模型**（E2B 在 4096 颗 TPU v6e 上训练，E4B 在 6144 颗上）。**图谱里若沿用"MatFormer"标签描述 Gemma 4 就是错的。**

3. Gemma 3n 另有 **conditional parameter loading**：音频/视觉参数可在加载时跳过，运行时按设备资源动态载入 —— 这也会让实测内存低于总参数量。

### 陷阱 B：tok/s 是 prefill 还是 decode？（差 20~100 倍）
同一台 S26 Ultra、同一个 Gemma 4 E2B、同一次测试：GPU **prefill = 3,808 tok/s** vs GPU **decode = 52.1 tok/s** —— **相差 73 倍**。

任何 Google 端侧 tok/s 必须同时标注：
1. **prefill 还是 decode**（用户体感"打字速度"= decode；"等待响应"= prefill/TTFT）
2. **后端**（Gemma 3 1B 在 S25 Ultra NPU 上 prefill 5836 vs CPU 322）
3. **是否开投机解码/MTP**（Gemma 4 E2B GPU decode 51.5 → 91.7，几乎翻倍）
4. **context 长度**（LiteRT-LM 统一 ctx=2048、1024+256；**Gemma 4 E2B 的 NPU 那一行例外，ctx=4096**）
5. **TTFT 不含加载时间且 cache 已预热** —— 官方注明"first-run latency and memory may differ"。AICore 预览文档说首次推理"可能要约一分钟"用于模型初始化
6. **CPU 走 XNNPACK 4 线程、cpufreq 锁 performance** —— 非日常条件

**Gemini Nano 4 的 "4x faster" 和 "60% less battery" 完全没有说明口径**（相对哪一代、prefill 还是 decode、哪款芯片），只能作 marketing claim 引用。

### 陷阱 C：Gemma 3 QAT int4 的"显存下降"只算权重
官方 27B 54GB→14.1GB、12B 24→6.6、4B 8→2.6、1B 2→0.5。**但博客原文明确限定这只是 "loading model weights"，"Running the model also requires additional VRAM for the KV cache"。** 技术报告 Table 3 含 32K KV 的真实数字差距巨大：27B int4 14.1GB → **+KV = 32.8GB**（RTX 3090 的 24GB 装不下）；4B 2.6 → **7.3GB**；1B 0.5 → **1.4GB**。硬件口径：官方点名 **RTX 3090 (24GB) 跑 27B int4**、**RTX 4060 Laptop (8GB) 跑 12B int4**，基线是 H100 上的 BF16。**博客未提及 RTX 4090。**

### 陷阱 D：Gemma 4 的"内存需求表"有三套数字，别混用
- **官方文档 Table 1**：E2B Q4_0 = 2.9GB，"Mobile" = 1.1GB，"Mobile 纯文本" = 0.84GB（含 20% overhead，仅基础权重）
- **技术报告 Table 3**（纯文本、32k）：E2B bf16 4.6GB → 移动量化 0.8GB（+KV 0.05GB）
- **LiteRT-LM 模型卡实测磁盘**：E2B 2583MB、E4B 3654MB（含视觉+音频组件，embedding 走 mmap）

三套口径不同（是否含多模态编码器 / 是否含 overhead / 是否含 KV），引用必须注明。

### 陷阱 E：许可证在 Gemma 4 发生断代变化
Gemma 1/2/3/3n/270M/EmbeddingGemma/FunctionGemma = **Gemma Terms of Use**（自定义，HF gated）；**Gemma 4 = Apache 2.0**。做"开源程度"对比时不能把 Gemma 3 和 Gemma 4 归为同一档。

### 陷阱 F：Gemini Nano 的版本号有两套命名
文档用 **nano-v2 / v3 / v4**（`getBaseModelName()` 返回值），对外营销从 Nano 4 才用公开代际数字。初代技术报告的 **Nano-1 (1.8B) / Nano-2 (3.25B)** 指 Gemini 1.0 时代的两个**尺寸档位**，**不是**后来的版本代际 —— 很多二手资料把 "Nano-2 3.25B" 直接套到 nano-v3 上，**这是错的**（nano-v3 参数量 Google 从未披露）。

---

## 7. 未能取得 / 明确"未披露"的字段
- **Gemini Nano nano-v2/v3/v4 的参数量、上下文、量化方案、内存、tok/s** —— 只有 Gemini 1.0 时代的 Nano-1/Nano-2 有数字
- **Gemma 4 E2B/E4B 的 LMArena Elo**
- **Gemma 3n E4B 的精确 effective 参数值**（官方只给了 E2B 的 1.91B）
- **Gemma 3n / Gemma 4 的教师模型** —— 均未点名
- **Gemma 4 技术报告中的 tok/s** —— 报告全文无吞吐数据，端侧数字只在 LiteRT-LM 模型卡
- **Gemini Nano 4 "4x faster / 60% less battery" 的测量口径与硬件**
- **EmbeddingGemma 的 MTEB 具体分值与许可证名称**
- litert-community 的 `gemma-3n-*-litert-lm` 仓库返回 401（gated），Gemma 3n 端侧数字取自 `google/gemma-3n-*-it-litert-preview`（S25 Ultra）

---

## 主要来源
https://ai.google.dev/gemma/docs/releases · /core · /core/model_card_4 · /core/model_card_3 · /gemma-3n · /gemma-3n/model_card · /functiongemma
https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/ · https://developers.googleblog.com/en/introducing-gemma-3n-developer-guide/ · /en/gemma-3-quantized-aware-trained-state-of-the-art-ai-to-consumer-gpus/ · /en/introducing-gemma-3-270m/ · /en/introducing-embeddinggemma/
https://developer.android.com/ai/gemini-nano · https://developers.google.com/ml-kit/genai （设备清单）· https://android-developers.googleblog.com/2026/04/AI-Core-Developer-Preview.html
HF：google/gemma-4-E2B-it · google/gemma-4-E4B-it · google/gemma-3n-E4B-it · google/gemma-3-270m-it · google/functiongemma-270m-it · litert-community/gemma-4-E2B-it-litert-lm · litert-community/gemma-4-E4B-it-litert-lm · litert-community/Gemma3-1B-IT · litert-community/Gemma3-4B-IT
arXiv：Gemma 4 = 2607.02770 · Gemma 3 = 2503.19786 · Gemini 1.0 = 2312.11805 · MatFormer = 2310.07707 · EmbeddingGemma = 2509.20354
