> 本文件为《端侧模型技术路线与指标对比·数据支撑清单》的中间产物，合并进正式清单后可删除。
> 检索日期：2026-09-09。所有"官方口径"均指厂商自报数字。

---

## 汇总说明（先看这三条）

1. **本次检索中途 WebSearch 配额耗尽**（200/200），后半程全部靠 WebFetch 直取一手页面完成。有 2 个点因此**未能证实**，已在文中明确标注为「未证实」而非猜测。
2. **三家都有 2026 年新东西，且都不在知识截止内** —— Apple 出了 **AFM 3**（2026-06-08，含一个 20B 稀疏端侧模型），NVIDIA 出了 **Nemotron 3 Nano 系列**（2025-12 起）+ **Cosmos 3 Edge**（2026-07），OpenAI **没有**任何 gpt-oss 后继开放权重模型。
3. **口径陷阱全部踩实了**，见文末专章 —— 尤其 Apple 的 30 tokens/s 只存在于 2024 年那一版，2025/2026 官方再也没给过任何绝对吞吐数字。

---

# 一、APPLE

## A1. AFM-on-device（2024 版，Apple Intelligence 首发）

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | Apple Foundation Model — AFM-on-device（端侧版） | [machinelearning.apple.com/research/introducing-apple-foundation-models](https://machinelearning.apple.com/research/introducing-apple-foundation-models) |
| 2 公司 | Apple | 同上 |
| 3 首发 | 2024-06（WWDC24 公布，2024-07-29 随技术报告更新数据；随 iOS 18.1 落地） | 同上；[arxiv.org/abs/2407.21075](https://arxiv.org/abs/2407.21075) |
| 4 参数量 | **非嵌入 2.58B + 嵌入 0.15B ≈ 2.73B**，官方口径称「~3 billion parameter」。输入/输出 embedding 共享 | [arxiv.org/html/2407.21075v1](https://arxiv.org/html/2407.21075v1) Table 1 |
| 5 架构 | Dense Transformer。model dim 3072 / head dim 128 / 24 query heads / 8 KV heads（GQA）/ 26 layers / vocab 49K（BPE, SentencePiece） | 同上 |
| 6 蒸馏来源 | **未在本次核验中确认**（2024 报告未在我取到的段落中给出明确父模型）→ 记「未披露」 | — |
| 7 量化 | **混合 2-bit / 4-bit palettization，平均 3.7 bpw（实际出货值）**。默认 4-bit（K-means 16 个码字，每 16 列/行共享一套查找表，block 可达 100k），部分层压到 2-bit。原文：可压到「about 3.5 bits per weight (bpw) without significant quality loss」，但出货用 3.7 bpw 因为「already meets the memory requirements」。共享 embedding 单独处理：per-channel **8-bit 整数**。bit-rate 逐算子选择由内部工具 **Talaria** 决定。**Apple 未公布 GB 数字** | [arxiv.org/html/2407.21075v1](https://arxiv.org/html/2407.21075v1)；[machinelearning.apple.com/research/introducing-apple-foundation-models](https://machinelearning.apple.com/research/introducing-apple-foundation-models) |
| 8 上下文 | 训练：core 4096 → continued 8192 → context-lengthening 32768（RoPE base 500k→6,315,089）。**推理侧未给固定窗口**；开发者框架实际暴露 4096 | 同上 |
| 9 许可 | 闭源，随 OS 捆绑（closed OS-bundled） | — |
| 10 官方性能 | **官方口径 @ iPhone 15 Pro**：「time-to-first-token latency of about **0.6 millisecond per prompt token**, and a generation rate of **30 tokens per second**」，且明确是**未启用 token speculation 之前**的数字 | [machinelearning.apple.com/research/introducing-apple-foundation-models](https://machinelearning.apple.com/research/introducing-apple-foundation-models) |
| 11 Benchmark | 2024 页面以人工偏好评测为主；技术报告含 MMLU/GSM8K 等（本次未逐项取回） | [arxiv.org/abs/2407.21075](https://arxiv.org/abs/2407.21075) |
| 12 模态 | 纯文本 | — |
| 13 LoRA 适配器 | rank **16** 为「optimal tradeoff」，另提供 rank {8, 16, 32}；权重存 16-bit；「the parameters for a **rank 16 adapter typically require 10s of megabytes**」。精度恢复适配器预训练约 **10B tokens**（≈基座训练量的 **0.15%**） | [arxiv.org/html/2407.21075v1](https://arxiv.org/html/2407.21075v1) |

## A2. AFM on-device（2025 版，iOS 26 / Tech Report 2025）

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | Apple On-Device Foundation Model（2025 版），见《Apple Intelligence Foundation Language Models: Tech Report 2025》 | [arxiv.org/abs/2507.13575](https://arxiv.org/abs/2507.13575)（2025-07-17） |
| 2 公司 | Apple | — |
| 3 首发 | 2025-06（WWDC25，随 iOS 26 / macOS 26） | [machinelearning.apple.com/research/apple-foundation-models-2025-updates](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates) |
| 4 参数量 | 「approximately 3-billion-parameter model」。**精确值未披露** | 同上 |
| 5 架构 | Dense Transformer + **块切分 5:3 深度比**：整模型切成 Block 1 / Block 2，**Block 2 的 KV cache 直接复用 Block 1 最后一层**产生的 KV → KV cache 显存降 **37.5%**；且 Block 2 不产生 K/V，prefill 阶段整块跳过 → **TTFT 降约 37.5%**。长上下文用 **interleaved attention**：滑窗局部注意力 + RoPE，混一层无位置编码的全局注意力（**NoPE**）。词表 **100k → 150k**（多语言 token 开销仅 +25%） | [machinelearning.apple.com/research/apple-foundation-models-2025-updates](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates)；[arxiv.org/html/2507.13575v2](https://arxiv.org/html/2507.13575v2) |
| 6 蒸馏来源 | 用蒸馏损失训练；**教师是一个 64-expert / every-2-layer MoE**，由一个预训练 ~3B 模型 **sparse-upcycle** 而来，教师训练成本降 90% | [machinelearning.apple.com/research/apple-foundation-models-2025-updates](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates) |
| 7 量化 | **权重：2 bits-per-weight，QAT**（learnable weight clipping + learnable scaling + EMA 平滑 + 权重初始化）<br>**Embedding table：4-bit，与基座权重联合 QAT**<br>**KV cache：8-bit**<br>压缩后用 low-rank adapter 做质量恢复。<br>**磁盘/内存 GB 数字：Apple 未披露**（技术报告只给 bpw 比率，明确无存储占用数） | [arxiv.org/html/2507.13575v2](https://arxiv.org/html/2507.13575v2)（Table 1 / Table 3）；[machinelearning.apple.com/research/apple-foundation-models-2025-updates](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates) |
| 8 上下文 | 训练末段序列长达 **65K tokens**；多模态续训端侧 16k。**推理侧未声明**；Foundation Models 框架实际 **4096 tokens（输入+输出共享）** | [arxiv.org/html/2507.13575v2](https://arxiv.org/html/2507.13575v2)；[developer.apple.com/documentation/foundationmodels/managing-the-context-window](https://developer.apple.com/documentation/foundationmodels/managing-the-context-window) |
| 9 许可 | 闭源，随 OS 捆绑；仅通过 Foundation Models framework 暴露 | — |
| 10 官方性能 | **tokens/s、TTFT 绝对值全部「未披露」**。2025 报告只有相对值：TTFT ↓~37.5%、KV cache 显存 ↓37.5%。无任何设备型号绑定的吞吐数字 | [arxiv.org/html/2507.13575v2](https://arxiv.org/html/2507.13575v2) |
| 11 Benchmark | 压缩代价：**MGSM −4.6%，MMLU +1.5%**（端侧）；服务端为 MGSM −2.7% / MMLU −2.3%。Table 3 绝对值：端侧 **MMLU 67.8 → 64.4**，**IFEval 85.1 → 82.3**（压缩前→后）。人工评测：优于 Qwen-2.5-3B（全语种），与 Qwen-3-4B / Gemma-3-4B 竞争；图像理解优于 InternVL-2.5-4B、Qwen-2.5-VL-3B-Instruct | 同上 |
| 12 模态 | **文本 + 图像**。端侧视觉骨干 **ViTDet-L，300M 参数**，加 Register-Window (RW) 机制；CLIP 式对比学习在 **6B 图文对** 上对齐 | [machinelearning.apple.com/research/apple-foundation-models-2025-updates](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates) |
| 13 语言 | 报告称支持 **16 种语言**（另一处写 15 种，OCR 支持 15 种）—— 原文两个数字不一致，照实记录 | [arxiv.org/html/2507.13575v2](https://arxiv.org/html/2507.13575v2) |
| — LoRA | 开发者工具包训练 **rank 32 LoRA adapters**（2024 是 rank 16）；每次基座换版必须重训。**adapter 文件大小 MB：2025 报告未给**，只说「each adapter takes significant storage space」 | 同上 |

## A3. AFM 3（2026 版，WWDC 2026）★ 本次最大发现

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | 端侧两款：**AFM 3 Core**、**AFM 3 Core Advanced**（云端三款：AFM 3 Cloud / ADM 3 Cloud (Image) / AFM 3 Cloud Pro） | [machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models](https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models) |
| 2 公司 | Apple —— 原文：「a family of five foundation models **custom-built in collaboration with Google**」 | 同上 |
| 3 首发 | **2026-06-08**（WWDC 2026） | 同上 |
| 4 参数量 | **AFM 3 Core：3-billion-parameter dense model**<br>**AFM 3 Core Advanced：20-billion-parameter model，每次只激活「just 1 to 4 billion parameters at a time」** | 同上 |
| 5 架构 | AFM 3 Core = dense（第三代 3B）。<br>**AFM 3 Core Advanced = 基于 Instruction-Following Pruning (IFP) 的稀疏激活架构**：完整权重常驻 **NAND 闪存**而非 DRAM；一个轻量 dense block 在 **prompt 开始时一次性选定专家集合**（生成过程中周期性重选），**不做逐 token 路由**——因为 NAND→DRAM 带宽不足以支撑逐 token 换出。混合「shared experts」（常驻）+「routed experts」（按需载入 DRAM）；专家挂在 FFN 块上，选中的专家与静态共享权重拼成一个 DRAM 内的 dense 模型。提供「inference-time elasticity」，激活参数量可按场景调。<br>AFM 3 Cloud 沿用 **PT-MoE**（Parallel-Track MoE） | 同上；IFP 原论文 [arxiv.org/pdf/2501.02086](https://arxiv.org/pdf/2501.02086) / [machinelearning.apple.com/research/pruning-large-language](https://machinelearning.apple.com/research/pruning-large-language) |
| 6 蒸馏来源 | 所有模型「share a common initial foundation」后再分化；未点名父模型 → **未披露** | 同上 |
| 7 量化 | 只写了用 **Quantization Aware Training**「compress substantially while maintaining high accuracy」。**bpw、GB 全部未披露** | 同上 |
| 8 上下文 | **未披露**（页面无任何 token 数） | 同上 |
| 9 许可 | 闭源，随 OS 捆绑 | — |
| 10 官方性能 | **tokens/s、TTFT、内存全部未披露**。页面无任何吞吐/延迟数字，也未点名 iPhone 型号，只说 AFM 3 Core Advanced「unlocked by and optimized for our most capable Apple silicon systems」 | 同上 |
| 11 Benchmark | 全部是人工并排偏好，无标准 benchmark：<br>· 文本：AFM 3 Core 在 **45.6%** 的 prompt 上被优选，2025 基线仅 **23.3%**<br>· 图像理解：AFM 3 Core 在有偏好的样本中 **>61%** 优于上代<br>· AFM 3 Cloud vs 2025 AFM Server：**64.7% vs 8.7%**；单边评分整体满意度相对 **+36%**、指令遵循 **+21%**<br>· TTS（AFM 3 Core Advanced，1B 激活，5 分制 MOS）：General Voice **3.87 → 4.15**，Conversational **3.82 → 4.24**<br>· 听写：整体质量优选 **44.7% vs 17.6%**<br>· AFM 3 Cloud Pro vs AFM 3 Cloud：文本 ~+10%、图像 ~+14%、Math 相对 **+14%** | 同上 |
| 12 模态 | AFM 3 Core Advanced **natively multimodal**（文本 + 音频 + 图像理解 + 长上下文推理；驱动 expressive voices 与高精度听写） | 同上 |
| 13 语言 | 四个评测语系组，合计 24 种语言 + 英语（英语含 US/GB/AU/IN 方言；PFIGSCJK；DDNSTV；AFIHHMPRTU） | 同上 |

**AFM 3 关键补充：**
- **技术报告尚未发布。** Apple 原文承诺「updated evaluations and benchmarks, in a technical report **later this summer**」。截至 2026-09-09，我在 [machinelearning.apple.com/research](https://machinelearning.apple.com/research)（按最新排序）与 arXiv 上**均未找到 AFM 3 / Tech Report 2026**。最新的正式技术报告仍是 arXiv:2507.13575（2025 版）。
- **「Siri 用 Google Gemini」这条要小心。** Apple 官方页面**从头到尾没有出现 "Gemini" 一词**，只写「in collaboration with Google」，以及 AFM 3 Cloud Pro 的 PCC 首次扩展到 **Google Cloud 里的 NVIDIA GPU**。「Siri 基于 Gemini 训练」是 AppleInsider/9to5Mac 等第三方口径，不能当官方数据点用。

## A4. Foundation Models framework（开发者 API）

| 版本 | 开发者拿到什么 | 来源 |
|---|---|---|
| **WWDC 2025（iOS 26）** | 原生 Swift API，直接访问驱动 Apple Intelligence 的**同一个端侧模型**；guided generation（`@Generable`/`@Guide`）、constrained tool calling、**LoRA adapter 微调（rank 32）**。<br>**上下文窗口 4096 tokens，输入+输出共享**，超限抛 `exceededContextWindowSize`。iOS 26.4 新增 `contextSize` 属性与 `tokenCount(for:)`。**零推理成本、离线可用、数据不出设备** | [developer.apple.com/documentation/foundationmodels/managing-the-context-window](https://developer.apple.com/documentation/foundationmodels/managing-the-context-window)；[arxiv.org/html/2507.13575v2](https://arxiv.org/html/2507.13575v2) |
| **WWDC 2026（iOS 27）** | ① **框架对任意 LLM provider 开放**：「You can now work with **any language model**, including Apple Foundation Models, cloud models like **Claude and Gemini**, or any other provider that conforms to the **Language Model protocol**」——provider 发布符合协议的 Swift package 后，现有 `LanguageModelSession` 代码不改即可跑<br>② **多模态 prompt**：可随文本传图；Vision 框架工具（OCR、条码识别）可被模型**在端上直接调用**<br>③ **Dynamic Profiles**：会话中动态换模型/工具/指令<br>④ **Evaluations framework** + **fm CLI 与 Python SDK**<br>⑤ **PCC 免费额度**：加入 App Store Small Business Program 且累计首次下载 <200 万的 App，可**零云 API 成本**调用跑在 Private Cloud Compute 上的下一代 AFM | [developer.apple.com/wwdc26/guides/apple-intelligence/](https://developer.apple.com/wwdc26/guides/apple-intelligence/) |

---

# 二、OPENAI

## O1. gpt-oss-20b ★（唯一真正的端侧款）

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | openai/gpt-oss-20b | [huggingface.co/openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) |
| 2 公司 | OpenAI | — |
| 3 首发 | **2025-08-05**（模型卡 arXiv v1 提交 2025-08-08；HF 仓库 updated Aug 26, 2025） | [arxiv.org/abs/2508.10925](https://arxiv.org/abs/2508.10925)；[huggingface.co/openai](https://huggingface.co/openai) |
| 4 参数量 | **20.91B 总 / 3.61B 激活**（模型卡 Table 1 精确值；宣传口径写 21B / 3.6B）。拆分：MLP 19.12B、Attention 0.64B、Embed+Unembed 1.16B | [arxiv.org/html/2508.10925v1](https://arxiv.org/html/2508.10925v1) Table 1 |
| 5 架构 | **MXFP4 MoE Transformer**。24 层；**32 个专家，每 token top-4 激活**；64 query heads / 8 KV heads（GQA）/ head dim 64；residual stream 宽度 2880；RMSNorm + Pre-LN；注意力**交替「banded 滑窗（128 token 带宽）」与「dense 全局」**；RoPE + **YaRN** 外推；MoE 用 **SwiGLU**，softmax-after-topk 路由；每 head 一个可学习的 **attention sink**（softmax 分母加性偏置） | 同上 §2 / §2.2；[huggingface.co/blog/welcome-openai-gpt-oss](https://huggingface.co/blog/welcome-openai-gpt-oss) |
| 6 蒸馏来源 | 摘要称经「large-scale distillation and reinforcement learning」训练，**未点名父模型** → 未披露 | [arxiv.org/abs/2508.10925](https://arxiv.org/abs/2508.10925) |
| 7 量化 + 体积 | **MXFP4，原生（post-trained with MXFP4），只作用于 MoE 层的 linear projection 权重**，存为 `tensor.blocks`（两个值打包进一个 uint8）+ `tensor.scales`；**其余全部 BF16**，激活也建议 BF16。**4.25 bits per parameter**。<br>**checkpoint = 12.8 GiB（≈13.7 GB）**（120b 为 60.8 GiB）<br>**所有 eval 均在同一 MXFP4 量化下跑的** | [arxiv.org/html/2508.10925v1](https://arxiv.org/html/2508.10925v1) Table 1；[github.com/openai/gpt-oss](https://github.com/openai/gpt-oss) |
| 8 上下文 | **131,072** | [arxiv.org/html/2508.10925v1](https://arxiv.org/html/2508.10925v1) §2.2 |
| 9 许可 | **Apache 2.0**（「Build freely without copyleft restrictions or patent risk」），另附一份独立的 `USAGE_POLICY` 文件 | [github.com/openai/gpt-oss](https://github.com/openai/gpt-oss)；[huggingface.co/openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) |
| 10 官方性能 | **官方口径只有内存，没有 tokens/s。**<br>· 「lets the smaller model **run on systems with as little as 16GB memory**」/「run within 16GB of memory」<br>· HF 官方博客补充：「the 20B fits in a single **16GB GPU**」，**若无 mxfp4 kernel 回落 bfloat16 则需 ~48 GB**<br>· **OpenAI 官方从未公布任何 tokens/s 或 TTFT 数字**（README、模型卡、HF 卡均无）→ 未披露<br>· 消费级路径：Ollama（`ollama pull gpt-oss:20b`）、LM Studio（`lms get openai/gpt-oss-20b`）、vLLM、**Apple Silicon Metal 实现**（官方注明「not production-ready but is accurate to the PyTorch implementation」） | [github.com/openai/gpt-oss](https://github.com/openai/gpt-oss)；[huggingface.co/blog/welcome-openai-gpt-oss](https://huggingface.co/blog/welcome-openai-gpt-oss) |
| 11 Benchmark | 模型卡 Table 3，**按 low / medium / high 三档 reasoning effort**：<br>AIME 2024（无工具）**42.1 / 80.0 / 92.1**；（带工具）61.2 / 86.0 / 96.0<br>AIME 2025（无工具）**37.1 / 72.1 / 91.7**；（带工具）57.5 / 90.4 / **98.7**<br>GPQA Diamond（无工具）**56.8 / 66.0 / 71.5**；（带工具）58.0 / 67.1 / 74.2<br>MMLU **80.4 / 84.0 / 85.3**<br>HLE（无工具）4.2 / 7.0 / 10.9；（带工具）6.3 / 8.8 / 17.3<br>SWE-bench Verified **37.4 / 53.2 / 60.7**<br>Tau-Bench Retail 35.0 / 47.3 / 54.8<br>HealthBench 40.4 / 41.8 / 42.5；Hard 9.0 / **12.9** / 10.8（**非单调**）；Consensus 84.9 / 83.0 / 82.6（**随 effort 上升反降**）<br>Codeforces Elo（无工具）1366 / 1998 / 2230；（带工具）1251 / 2064 / **2516** | [arxiv.org/html/2508.10925v1](https://arxiv.org/html/2508.10925v1) Table 3 |
| 12 模态 | **纯文本**（text generation / conversational）。支持函数调用、Python 工具、浏览；**必须用 harmony response format**，否则「will not work correctly」。三档 reasoning effort 通过 system prompt 设置（`Reasoning: high`）。推荐采样 temperature=1.0, top_p=1.0 | [github.com/openai/gpt-oss](https://github.com/openai/gpt-oss)；[huggingface.co/openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) |
| 13 热度参考 | HF 上月下载 **6,551,191** | [huggingface.co/openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) |

## O2. gpt-oss-120b（对照项，边缘/工作站临界）

- **116.83B 总 / 5.13B 激活**；36 层；**128 专家，top-4**；64 Q / 8 KV heads；checkpoint **60.8 GiB**；131,072 上下文；Apache 2.0。
- 官方口径：「fit into a **single 80GB GPU** (like NVIDIA H100 or AMD MI300X)」，单 H100 节点可微调。
- 这不是端侧，是单卡工作站/服务器；放进「端侧地图」只能作为边界对照。
- 来源：[arxiv.org/html/2508.10925v1](https://arxiv.org/html/2508.10925v1)、[github.com/openai/gpt-oss](https://github.com/openai/gpt-oss)

## O3. gpt-oss 之后有没有更新的开放权重端侧模型？→ **没有**

直接查了 [huggingface.co/openai](https://huggingface.co/openai) 官方组织页（39 个模型，按最近更新排序），截至 2026-09-09 全部条目：

| 模型 | 规模 | 更新日期 |
|---|---|---|
| openai/privacy-filter | 1B（Token Classification） | Apr 22 |
| openai/gpt-oss-safeguard-20b | 22B | Jan 14 |
| openai/circuit-sparsity | 0.4B | Dec 12, 2025 |
| openai/gpt-oss-safeguard-120b | 120B | Oct 29, 2025 |
| **openai/gpt-oss-20b** | 21B | Aug 26, 2025 |
| **openai/gpt-oss-120b** | 117B | Aug 26, 2025 |
| whisper-large-v3-turbo / v3 / v2 / large | 0.8B–2B（ASR） | 2024 |

**结论：不存在 gpt-oss-2 或任何新的通用开放权重端侧 LLM。** gpt-oss 之后 OpenAI 在开放权重上只出了三类衍生/专用小模型：**gpt-oss-safeguard-20b/120b**（安全推理模型，基于 gpt-oss，2025-10-29 起）、**circuit-sparsity**（0.4B 可解释性研究模型，2025-12-12）、**privacy-filter**（1B token 分类，2026-04）。组织简介仍把 gpt-oss-120b/20b 当作头牌「New open-weight language models」。同期 OpenAI 闭源侧已经出到 GPT-5.4（2026-03-05）/ GPT-5.5（2026-04-23），但没有任何配套的开放权重发布。
来源：[huggingface.co/openai](https://huggingface.co/openai)

> **未证实项：** OpenAI 与 **Qualcomm** 合作把 gpt-oss-20b 跑在骁龙上的说法 —— 我核查了 [github.com/openai/gpt-oss](https://github.com/openai/gpt-oss) README，**完全没有提到 Qualcomm、Snapdragon 或 Windows AI Foundry**（Windows 只被提及「reference implementations have not been tested on Windows」）。openai.com/index/introducing-gpt-oss/ 返回 403 无法直取，且搜索配额已耗尽。**建议标为「未证实」，不要写进表格。**

---

# 三、NVIDIA

> NVIDIA 的代际关系先理清：**Nemotron Nano v1（Llama 系，2025-03）→ Nemotron Nano v2（Nemotron-H 混合，2025-08）→ Nemotron 3 Nano（混合 MoE，2025-12 起，含 2026-03 的 4B 与 2026-04 的 Omni）**。另有独立的 **Cosmos 3 Edge**（机器人，2026-07）。

## N1. NVIDIA-Nemotron-Nano-9B-v2

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | nvidia/NVIDIA-Nemotron-Nano-9B-v2（v1.0） | [huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2) |
| 2 公司 | NVIDIA | — |
| 3 首发 | **2025-08-18**（HF 与 API Catalog 同日）。训练 2025-06~08，数据截止 2024-09 | 同上 |
| 4 参数量 | **8.89B**（模型卡标 9B；剪枝搜索 Table 10 候选值 8.89B） | [arxiv.org/html/2508.14444v1](https://arxiv.org/html/2508.14444v1) Table 10 |
| 5 架构 | **Mamba2-Transformer Hybrid**（network: Nemotron-Hybrid）。「a hybrid architecture consisting primarily of **Mamba-2 and MLP layers combined with just four Attention layers**」。9B 保留 **56 层**（父模型 62 层），embedding 通道 5120→**4480**，FFN 中间维 20480→**15680**，Mamba heads 保持 **128** | [huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2)；[arxiv.org/html/2508.14444v1](https://arxiv.org/html/2508.14444v1) |
| 6 父模型 | **由 NVIDIA-Nemotron-Nano-12B-v2-Base 剪枝 + 蒸馏而来**，用扩展版 **Minitron** 策略。12B 基座：20T tokens、FP8 训练配方。<br>12B 层构成（一手数据）：「we use **62 layers**, with **6** of them being **self-attention** layers, **28** being **FFN**, and **28** being **Mamba-2** layers」；自注意力约占总层数 8%，均匀分布。model dim **5120**，FFN dim **20480**，GQA **40 query heads / 8 KV heads**；Mamba-2：**8 groups，state dim 128，head dim 64，expansion 2，conv window 4**；无位置编码、RMSNorm、embedding 与 output 权重不绑定、无 dropout、无线性层 bias、FFN 用 squared ReLU | [arxiv.org/html/2508.14444v1](https://arxiv.org/html/2508.14444v1) |
| 7 量化 | **BF16**（官方无一方量化发布，HF 上有 20 个社区量化）。必须加 `--mamba_ssm_cache_dtype float32`，否则「the model's accuracy may degrade」。**GB 数字未披露** | [huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2) |
| 8 上下文 | **128K**（`--max-model-len 131072`） | 同上 |
| 9 许可 | **NVIDIA Open Model License Agreement**（tag: `nvidia-open-model-license`），商用可 | 同上 |
| 10 官方性能 ⚠️ | **⚠️ 这是最典型的「非端侧口径」**：论文原文压缩目标是「enabling inference on up to **128k tokens on a single NVIDIA A10G GPU (22GiB of memory, bfloat16 precision)**」；吞吐宣称「up to **6×**（另处 6.3×）higher inference throughput」相对 Qwen3-8B，**测量配置 = ISL 8k / OSL 16k，vLLM，单张 A10G，batch size 8**（Table 10 数值 161.02 / 156.42 / 155.86）。**A10G 是云端推理卡，不是端侧设备**；显存预算算法为 22.06 GiB − 5% 框架 buffer − 1.3 GiB 视觉编码器预留 = 19.66 GiB。<br>模型卡支持硬件含 **Jetson AGX Thor**，但**没有任何 Jetson 上的 tokens/s 数字** | [arxiv.org/abs/2508.14444](https://arxiv.org/abs/2508.14444)；[arxiv.org/html/2508.14444v1](https://arxiv.org/html/2508.14444v1)；[huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2) |
| 11 Benchmark | （reasoning ON；RULER 为 OFF）vs Qwen3-8B：<br>**AIME25 72.1%**（Qwen3-8B 69.3）｜**MATH500 97.8%**（96.3）｜**GPQA 64.0%**（59.6）｜**LCB 71.1%**（59.5）｜**BFCL v3 66.9%**（66.3）｜**IFEval(Instruction Strict) 90.3%**（89.4）｜**HLE 6.5%**（4.4）｜**RULER 128K 78.9%**（74.1）。<br>注：模型卡**未报 MMLU-Pro**；"LCB" 未展开全称 | [huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2) |
| 12 模态 | 纯文本（text in / text out） | 同上 |
| 13 论文 | **arXiv:2508.14444**（2025-08-20 提交，v4 2025-09-02，CC BY 4.0） | [arxiv.org/abs/2508.14444](https://arxiv.org/abs/2508.14444) |

## N2. NVIDIA-Nemotron-Nano-12B-v2-VL

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16（v1.0） | [huggingface.co/nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16) |
| 3 首发 | **2025-10-28**（Build.NVIDIA.com + HF） | 同上 |
| 4 参数量 | **12.6B**（模型卡正文；侧栏 widget 写 13B —— 原页面自相矛盾，照实记录） | 同上 |
| 5 架构 | 模型卡只标 **"Transformer"**；视觉编码器 **CRadioV2-H**，语言骨干 **NVIDIA-Nemotron-Nano-12B-v2**。⚠️ **页面并未明说是 Mamba 混合**，只有 `mamba-ssm==2.2.5` 依赖和 SGLang 的 `--max-mamba-cache-size` 参数间接暗示 —— 不要直接写「Mamba 混合」 | 同上 |
| 6 父模型 | NVIDIA-Nemotron-Nano-12B-v2（语言骨干） | 同上 |
| 7 量化 | 官方三档：**BF16 / FP8（`...VL-FP8`）/ NVFP4-QAD（`...VL-NVFP4-QAD`）**。**各档 GB 未披露** | 同上 |
| 8 上下文 | **输入+输出 128K**。图像最多 4 张，最小 32×32，最大受「12-tile，每 tile 512×512」约束（如 2048×1536）；视频 2 FPS，8~128 帧 | 同上 |
| 9 许可 | NVIDIA Open Model License Agreement | 同上 |
| 10 官方性能 ⚠️ | 支持/测试硬件全是**数据中心卡**：L40S、A100、B200、H100/H200、RTX PRO 6000 Server Edition、GB200。**页面无任何 Jetson 或单卡端侧宣称，也无 tokens/s** | 同上 |
| 11 Benchmark | MMMU* **68**｜MathVista* **76.9**｜AI2D **87.11**｜OCRBenchv2 **62.0**｜OCRBench **85.6**｜OCR-Reasoning **36.4**｜ChartQA **89.72**｜DocVQA **94.39**｜Video-MME (w/o sub) **65.9**｜Vision Average **74.0** | 同上 |
| 12 模态 | 图像 / 视频 / 文本 → 文本；仅英文 | 同上 |
| — 训练能耗 | Cumulative Compute 2.2e+22；7,827.46 kWh；3.21 tCO2e；训练样本 39,486,703（270 个数据集，27.7 TB） | 同上 |

## N3. Llama-3.1-Nemotron-Nano-8B-v1

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | nvidia/Llama-3.1-Nemotron-Nano-8B-v1（v1.0） | [huggingface.co/nvidia/Llama-3.1-Nemotron-Nano-8B-v1](https://huggingface.co/nvidia/Llama-3.1-Nemotron-Nano-8B-v1) |
| 3 首发 | **2025-03-18**；训练 2024-08 ~ 2025-03；预训练数据截止 2023（继承 Llama 3.1） | 同上 |
| 4 参数量 | **8B** | 同上 |
| 5 架构 | **Dense decoder-only Transformer**（Llama 3.1 8B Instruct 架构）—— 注意这一代**不是** Mamba 混合 | 同上 |
| 6 父模型 | **Meta Llama-3.1-8B-Instruct**（「a derivative of Meta Llama-3.1-8B-Instruct (AKA the reference model)」）。后训练：数学/代码/推理/工具调用 SFT + RL（REINFORCE/RLOO + Online RPO），最终 checkpoint 由 SFT 与 Online RPO checkpoint 合并 | 同上 |
| 7 量化 | **BF16**（tensor type）。GB 未披露 | 同上 |
| 8 上下文 | **131,072 tokens**（输入与输出） | 同上 |
| 9 许可 | **NVIDIA Open Model License** + 附加 **Llama 3.1 Community License Agreement**；「Built with Llama」 | 同上 |
| 10 官方性能 | **无任何吞吐数字**。唯一效率说法是定性的：「**fits on a single RTX GPU and can be used locally**」。测试硬件：1× RTX 50/40/30 系列、1× H100-80GB、1× A100-80GB、**Jetson AGX Thor** | 同上 |
| 11 Benchmark | （Reasoning Off / On）MT-Bench **7.9 / 8.1**｜MATH500 pass@1 **36.6% / 95.4%**｜AIME25 pass@1 **0% / 47.1%**｜GPQA-D **39.4% / 54.1%**｜IFEval Strict-Prompt 74.7% / 71.9%｜IFEval Strict-Instruction 82.1% / 79.3%｜BFCL v2 Live 63.9% / 63.6%｜MBPP 0-shot **66.1% / 84.6%**。评测在 32k 序列长度、最多跑 16 次取均值。推理模式由 system prompt 切换（"detailed thinking on/off"） | 同上 |
| 12 模态 | 纯文本 | 同上 |
| — 相关 | 同系列另有 Llama-3.1-Nemotron-Nano-4B-v1.1（NVIDIA 2025-06-10 博客《Supercharge Edge AI with High Accuracy Reasoning Using Llama Nemotron Nano 4B》，本次未取回其模型卡逐项数据 → 该条 4B 记「未逐项核验」） | [huggingface.co/nvidia](https://huggingface.co/nvidia) 文章列表 |

## N4. NVIDIA-Nemotron-3-Nano-30B-A3B ★（2026 现役主力 Nano）

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16（v1.0）；另有 -FP8、-NVFP4、-Base-BF16 | [huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16) |
| 3 首发 | **2025-12-15**；模型日期 2025-09 ~ 2025-12；后训练数据截止 2025-11-28，预训练截止 2025-06-25 | 同上 |
| 4 参数量 | **30B 总 / 3.5B 激活**（HF 侧栏标 32B params） | 同上 |
| 5 架构 | **Mamba2-Transformer Hybrid Mixture of Experts (MoE)**（network: Nemotron Hybrid MoE）。「a total of **52 layers**, of which there are **23 of each MoE and Mamba-2** and the remaining **6 layers use grouped query attention (GQA) with 2 groups**」；**128 routed experts + 1 shared expert，每 token 激活 6 个专家** | 同上 |
| 6 父模型 | **从零训练**（非蒸馏）；25T tokens，batch size 3072，WSD 调度，peak LR 1e-3 / min LR 1e-5，8B tokens warmup。Megatron-LM 预训练 → SFT → 同步 GRPO 的 RL。模型卡注明「Improved using Qwen.」 | 同上 |
| 7 量化 | 官方三档：**BF16（32B）/ FP8（32B）/ NVFP4（HF 标注 18B）** | [huggingface.co/collections/nvidia/nvidia-nemotron-v3](https://huggingface.co/collections/nvidia/nvidia-nemotron-v3) |
| 8 上下文 | **输入与输出各 1M tokens**；「the default context size in the Hugging Face configuration is **256k** due to higher VRAM requirements」 | [huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16) |
| 9 许可 | **nvidia-nemotron-open-model-license**（注意与旧的 `nvidia-open-model-license` 是不同名字） | 同上 |
| 10 官方性能 ⚠️ | 微架构兼容仅列 **H100-80GB / A100**（数据中心）；**测试硬件**含 **A100 80GB、H100 80GB、B200 192GB、RTX PRO 6000 96GB、Jetson Thor、DGX Spark**，Jetson Thor / DGX Spark 用户被引导到专用 vLLM 容器。<br>**无任何 VRAM 数字、无任何 tokens/s 宣称** → 未披露。引擎：HF / vLLM / TRT-LLM / SGLang / llama.cpp | 同上 |
| 11 Benchmark | MMLU-Pro **78.3**｜AIME25 无工具 **89.1** / 带工具 **99.2**｜GPQA 无工具 **73.0** / 带工具 75.0｜LiveCodeBench **68.3**｜SciCode 33.3｜HLE 10.6 / 15.5｜MiniF2F pass@1 50.0 / pass@32 79.9｜Terminal Bench (hard) 8.5｜SWE-Bench (OpenHands) **38.8**｜BFCL v4 53.8｜TauBench V2 Airline 48.0 / Retail 56.9 / Telecom 42.2 / 均值 49.0｜IFBench 71.5｜Multi Challenge 38.5｜Arena-Hard-V2 均值 67.7｜AA-LCR 35.9｜**RULER-100：256k 92.9 / 512k 91.3 / 1M 86.3**｜MMLU-ProX 59.5｜WMT24++ 86.2 | 同上 |
| 12 模态 | 纯文本；语言 English/German/Spanish/French/Italian/Japanese（预训练另覆盖 19 种语言 + 43 种编程语言） | 同上 |
| — 数据 | 「The total size: 10,648,823,153,919 Tokens」，其中 3,534,013,958,278 为合成数据，141 个数据集 | 同上 |

## N5. NVIDIA-Nemotron-3-Nano-4B ★★（本轮最纯粹的端侧模型）

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | nvidia/NVIDIA-Nemotron-3-Nano-4B-BF16 / -FP8 / -GGUF（v1.0） | [huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-BF16) |
| 3 首发 | **2026-03-16**（模型卡 Release Date 3/16/2026；NVIDIA 博客《Nemotron 3 Nano 4B: A Compact Hybrid Model for Efficient Local AI》Mar 17）；模型日期 2025-12 ~ 2026-01；数据新鲜度 2024-09 | 同上；[huggingface.co/nvidia](https://huggingface.co/nvidia) |
| 4 参数量 | 「Number of model parameters **3.97 × 10⁹**」（侧栏 4B） | 同上 |
| 5 架构 | **Mamba2-Transformer Hybrid**（Nemotron-Hybrid）：「primarily of **Mamba-2 and MLP layers combined with just four Attention layers**」 | 同上 |
| 6 父模型 | **由 nvidia/NVIDIA-Nemotron-Nano-9B-v2 压缩而来，用 Nemotron Elastic 框架**；模型树根为 NVIDIA-Nemotron-Nano-12B-v2-Base（12B → 9B → 4B 三级） | 同上 |
| 7 量化 + 体积 | 官方 **BF16 / FP8 / GGUF**。**GGUF 唯一档位 Q4_K_M = 2.84 GB**（这是三家里少见的官方直接给出的端侧体积数字）。另有 48 个社区量化 | [huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF) |
| 8 上下文 | **262K**（`--max-model-len 262144`），输入输出均是 | [huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-BF16) |
| 9 许可 | NVIDIA Nemotron Open Model License | 同上 |
| 10 官方性能 ⚠️ | **明确的端侧定位**：「Target edge platforms: **Jetson Thor, GeForce RTX, DGX Spark**」；测试硬件「NVIDIA GeForce RTX, H100 80GB, **DGX Spark, Jetson Thor/Orin Nano**」。本地栈完整：llama.cpp（`llama-server -hf ...:Q4_K_M`）、**Ollama**（`ollama run hf.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF:Q4_K_M`）、**LM Studio**、Docker Model Runner。<br>**但仍然没有任何 tokens/s 或显存数字** → 未披露 | 同上两页 |
| 11 Benchmark | **Reasoning ON**：AIME25 **78.5**｜MATH500 **95.4**｜GPQA **53.2**｜LCB **51.8**｜BFCL v3 61.1｜IFEval-Prompt 87.9 / Instruction 92｜Tau2 Airline 33.3 / Retail 39.8 / Telecom 33<br>**Reasoning OFF**：BFCL v3 61.1｜IFBench-Prompt 43.2 / Instruction 44.2｜Orak 22.9（Super Mario / Darkest Dungeon / Stardew Valley）｜IFEval-Prompt 82.8 / Instruction 88｜HaluEval 62.2｜**RULER (128k) 91.1**｜Tau2 Airline 28.0 / Retail 34.8 / Telecom 24.9｜EQ-Bench3 63.2 | 同上 |
| 12 模态 | 纯文本；主语言英语（后训练语料另含德/西/法/意/韩/葡/俄/日/中） | 同上 |
| — 热度 | 上月下载 2,784,092（BF16）+ 11,375（GGUF） | 同上 |

## N6. Nemotron-3-Nano-Omni-30B-A3B-Reasoning（多模态，2026-04）

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16 / -FP8 / -NVFP4 | [huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16](https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16) |
| 3 首发 | **2026-04-28**（HF / NGC / build.nvidia.com） | 同上 |
| 4 参数量 | 「**31B (Mamba2-Transformer hybrid MoE)**」总，激活「**~3B per token**」（3.1×10¹⁰）；HF 侧栏 33B | 同上 |
| 5 架构 | **Mamba2-Transformer Hybrid MoE**；骨干 = Nemotron 3 Nano LLM (30B A3B)；视觉编码器 **CRADIO v4-H**；语音编码器 **Parakeet (parakeet-tdt-0.6b-v2)** | 同上 |
| 7 量化 + 体积 ★ | **BF16 61.5–62 GB（16.00 bpw）｜FP8 32.8–33 GB（8.5 有效 bpw）｜NVFP4 20.9–21 GB（4.98 有效 bpw）**。编码器与 MLP projector 保持 BF16。<br>量化精度损失（非推理模式 9 项非 ASR 均值）：**BF16 65.80 / FP8 65.40 / NVFP4 65.43**（Δ −0.40、−0.38） | 同上 |
| 8 上下文 | **256k tokens**（输入输出） | 同上 |
| 9 许可 | nvidia-open-model-agreement | 同上 |
| 10 官方性能 ⚠️ | **最低硬件是明确的**：BF16「1× H100 80GB」｜FP8「1× L40S 48GB」｜**NVFP4「1× RTX 5090 32GB」**。支持微架构含 Blackwell 下的 **DGX Spark、Jetson Thor、RTX 5090**。运行时含 vLLM / TensorRT-LLM / **TensorRT Edge-LLM** / llama.cpp / Ollama / SGLang。**无 tokens/s 数字** | 同上 |
| 11 Benchmark | vs Nemotron Nano VL V2：CVBench2D **83.95**（78.3, +6.73%）｜OCRBenchV2(EN) **67.04**（54.8, +18.26%）｜**OSWorld 47.4**（11.1, +76.58%）｜Charxiv Reasoning **63.6**（41.3）｜MMlongBench Doc **57.5**（38）｜MathVista_MINI **82.8**（75.5）｜OCR_Reasoning **54.14**（33.9）｜Video-MME **72.2**｜World Sense **55.4**｜Daily Omni **74.52**｜Voice interaction **89.39** | 同上 |
| 12 模态 | **Video / Audio / Image / Text 输入 → 文本输出**（pipeline tag 标 any-to-any，但实际输出仅文本）。视频 mp4 ≤2 分钟；音频 wav/mp3 ≤1 小时、≥8kHz；支持 JSON、CoT、工具调用、**词级时间戳转写**。仅英文 | 同上 |
| 13 论文 | **arXiv:2604.24954**（《Nemotron 3 Nano Omni: Efficient and Open Multimodal Intelligence》） | 同上 |

## N7. Cosmos 3 Edge（机器人端侧，2026-07/08）★

| 字段 | 内容 | 来源 |
|---|---|---|
| 1 全名 | **NVIDIA Cosmos 3 Edge**（后训练策略版：Cosmos3-Edge-Policy-DROID）。同族还有 Cosmos 3 Nano、Cosmos 3 Super | [developer.nvidia.com/blog/post-train-nvidia-cosmos-3-edge-for-on-device-robot-control/](https://developer.nvidia.com/blog/post-train-nvidia-cosmos-3-edge-for-on-device-robot-control/) |
| 3 首发 | HF 文章《Introducing Cosmos 3 Edge》Jul 20, 2026；本篇技术博客 **2026-08-19**。Cosmos 3 家族本体 2026-05-31 | 同上；[developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/](https://developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/) |
| 4 参数量 | 「**a 4B omni-model (with a 2B NVIDIA Nemotron-based reasoner)**」 | 同上 |
| 5 架构 | World foundation model，「natively generates actions based on physical understanding and prediction capabilities」（博客未称其为 VLA）。输入 = 三路相机拼图 + 本体感知：wrist 360×640 叠两路外部视角 180×320 → 540×640，`use_state=true`。输出 = **action chunk：每次预测 32 个未来动作 @15 Hz**，动作空间「joint_pos: 8-D absolute（7 关节 + 夹爪）」 | 同上 |
| 6 父模型 | 推理器来自 NVIDIA Nemotron（2B） | 同上 |
| 7 体积 | **checkpoint 约 9 GB（BF16）**。未提更低比特量化 | 同上 |
| 9 许可 | **OpenMDW 1.1**（权重 + 框架开放） | 同上 |
| 10 官方性能 ★端侧实测 | **官方口径 @ NVIDIA Jetson AGX Thor T5000**：「it generates each action chunk in about **1.53 seconds**（running at 640×540 resolution and 15 Hz）」，每个 chunk 覆盖约 **2.13 秒**机器人动作，因此下一 chunk 在当前 chunk 结束前就绪；控制循环示例为「执行 32 个中的前 16 个，然后重规划」@15 Hz。<br>**这是三家里唯一一条真正在边缘硬件上测出来的官方延迟数字。**<br>（训练侧另算：DGX Station GB200/GB300；64 节点 × 4× GB200，60K 迭代，约 68 小时） | 同上 |
| 11 Benchmark | RoboLab 120 项任务成功率：后训练 Edge 策略 **22.9%**，Cosmos 3 Nano **36.8%** | 同上 |
| 12 模态 | 视觉（多相机）+ 本体感知 → 动作 | 同上 |
| 13 资源 | [huggingface.co/nvidia/Cosmos3-Edge](https://huggingface.co/nvidia/Cosmos3-Edge)｜[huggingface.co/nvidia/Cosmos3-Edge-Policy-DROID](https://huggingface.co/nvidia/Cosmos3-Edge-Policy-DROID)｜数据集 [huggingface.co/datasets/nvidia/Cosmos3-DROID](https://huggingface.co/datasets/nvidia/Cosmos3-DROID)（76k 遥操作轨迹，约 350 小时，86 任务，564 场景）｜[huggingface.co/collections/nvidia/cosmos3](https://huggingface.co/collections/nvidia/cosmos3) | 同上 |

## N8. NVIDIA 2026 边缘生态补充

- **Cosmos Reason 2**：面向物理 AI / 机器人的开放可定制推理 VLM，**上下文 256K 输入 tokens**，被点名可跑在 Jetson Thor / DRIVE AGX Thor 上。
- **Nemotron 2 Nano 在嵌入式芯片上**：官方博客称其「enabling a new class of **System 2 reasoning directly on embedded chipsets**」，架构为 Hybrid Mamba-2-Transformer。该文给出的唯一数字是精度而非吞吐：加 `/think` 提示后 **MATH500 达 97.8%**，**且未说明该数字在什么硬件上测的**。
- **Alpamayo 1**（自动驾驶，Cosmos Reason 蒸馏骨干 + Qwen3-VL）：在 DRIVE Thor 上「achieves production-viable latencies, using **FP8 acceleration for the ViT components**」——**纯定性，无毫秒数**。
- 以上均出自 [developer.nvidia.com/blog/build-next-gen-physical-ai-with-edge‑first-llms-for-autonomous-vehicles-and-robotics/](https://developer.nvidia.com/blog/build-next-gen-physical-ai-with-edge%e2%80%91first-llms-for-autonomous-vehicles-and-robotics/)（2026-03-12）
- **不属于端侧、仅供对照**：Nemotron 3 Super 120B-A12B、Nemotron 3 Ultra 550B-A55B、Nemotron 3.5 Lightning 30B-A3B（2026-08，含 NVFP4 及 DSpark/DFlash 草稿模型 0.8B/0.7B）。见 [huggingface.co/collections/nvidia/nvidia-nemotron-v3](https://huggingface.co/collections/nvidia/nvidia-nemotron-v3)

---

# 四、口径陷阱（做表时必须标注的六条）★

### 陷阱 1｜Apple 的「2-bit / 4-bit 混合量化」到底混的是什么，以及为什么没有 GB
**两代是两套完全不同的方案，不能混着说：**
- **2024 版**：Post-training **palettization**（调色板量化，K-means 16 码字），**默认 4-bit、部分层压到 2-bit**，加权平均得到 **3.7 bpw** 的出货值。论文说 3.5 bpw 也不掉点，但因为「已经满足内存要求」所以出货用 3.7。逐算子的位宽由内部工具 Talaria 挑。共享 embedding 走另一条路：**per-channel 8-bit 整数**。
- **2025 版**：不再是混合调色板，而是**统一 2 bpw + QAT**（learnable clipping / learnable scaling / EMA），embedding **4-bit 联合 QAT**，KV cache **8-bit**，最后靠 LoRA 恢复精度。
- **「bits per weight 怎么平均出来的」**：3.7 bpw 是 2024 年在解码器投影权重上按层混合 2/4-bit 后的加权平均，**不含 embedding（8-bit）也不含 KV cache**。2025 年的 2 bpw 同理只指 decoder 权重，报告用一张三行表（weights / embedding table / KV cache）分别列出，本身就说明单一 bpw 数字覆盖不了整个模型。
- **✅ 「Apple 不公布 GB」属实。** 我逐字核过 2024 报告、2025 报告（arXiv:2507.13575 v2）、2025 更新博文与 2026 AFM 3 博文：**没有任何一处给出磁盘或内存占用的 GB/MB 数字**，2025 报告只给 bpw 比率。表里请写「未披露」。
  - 唯一的量级参考是第三方逆向：GitHub 项目 fguzman82/apple-foundation-model-analysis 称 iOS 26 的 `AFMTextV7` 为 **3.18B 参数、约 1GB Apple Silicon 占用** —— **第三方数据，必须标注来源，不能当官方口径。**

### 陷阱 2｜Apple 的「0.6ms」和「30 tokens/s」是两个阶段的两个指标，而且只属于 2024 年 + iPhone 15 Pro
- 官方原文一句话里的两个数：「time-to-first-token latency of about **0.6 millisecond per prompt token**, and a generation rate of **30 tokens per second**」。
- **0.6 ms/prompt token = prefill（预填充）阶段的每输入 token 摊销延迟**，不是首字延迟本身 —— 真正的 TTFT ≈ 0.6ms × prompt 长度（比如 1000 token 提示 ≈ 0.6 秒）。
- **30 tokens/s = decode（解码）阶段的输出吞吐**。两者是不同阶段、不同单位，做表时必须分两行。
- **硬件已核实：iPhone 15 Pro**（A17 Pro），不是 16 Pro。
- 官方还附了一个常被漏掉的限定：这是 **「before employing token speculation techniques」** 的数字。
- **⚠️ 最关键的一条：这两个数字此后再没被复述过。** 2025 技术报告（arXiv:2507.13575 v2）里**没有任何 tokens/s、毫秒或设备型号**，只有相对值「TTFT ↓ ~37.5%」「KV cache 显存 ↓ 37.5%」；2026 AFM 3 博文同样**零吞吐数字**。所以**不能**把「30 tokens/s」标到 2025/2026 版模型上，也不能拿 37.5% 去反推 2025 的绝对值（基线设备未知）。

### 陷阱 3｜gpt-oss-20b 的「16GB」是运行内存，不是文件大小，二者差一倍
- **16GB = 运行所需内存**，且**前提是用原生 MXFP4 kernel**。官方原话：MXFP4「lets the smaller model run on systems with as little as 16GB memory」；HF 官方博客更直白：「the 20B fits in a single **16GB GPU**」。
- **若运行时不支持 mxfp4、回落到 bfloat16，需要约 48 GB** —— 这是最容易被漏掉的分支，直接决定它能不能算「端侧」。
- **文件大小是另一个数：checkpoint 12.8 GiB（≈13.7 GB）**（模型卡 Table 1）。**12.8 GiB ≠ 16 GB**，中间的差额是 KV cache + 激活 + 框架开销。
- MXFP4 **只作用于 MoE 层的 linear projection 权重**（存为 `tensor.blocks` + `tensor.scales`，两个值打包进一个 uint8），**其余权重与激活都是 BF16**。有效位宽 **4.25 bits/param**。
- 另一个容易被误用的点：**所有官方 benchmark 都是在同一 MXFP4 量化下跑的**（"All evals were performed with the same MXFP4 quantization"），所以 benchmark 分数和量化版本是自洽的，不需要另找「量化后掉点」数据。
- **OpenAI 官方从未给过 gpt-oss-20b 的 tokens/s 或 TTFT** —— README、模型卡、HF 卡全无。表里写「未披露」。

### 陷阱 4｜NVIDIA 的吞吐宣称几乎全在数据中心 GPU 上测，唯一例外是 Cosmos 3 Edge
- **Nemotron-Nano-9B-v2 的「6× 吞吐」⚠️ 不是端侧数字**：测量条件是**单张 NVIDIA A10G（22 GiB，bfloat16）**，vLLM，**ISL 8k / OSL 16k**，batch size 8，对比对象 Qwen3-8B（生成密集场景下区间为 3×–6×，另处写 6.3×）。**A10G 是云推理卡（G5 实例），不是任何端侧设备。**「单卡跑 128k 上下文」这个卖点同样是 A10G 口径。
- **Nemotron 3 Nano 30B-A3B / 4B / Omni：完全没有 tokens/s 数字**，只有硬件兼容性列表。4B 虽明确写了「Target edge platforms: Jetson Thor, GeForce RTX, DGX Spark」，也**没有任何 Jetson 上的实测吞吐**。
- **Nemotron Nano 12B v2 VL 的支持硬件里根本没有 Jetson**（全是 L40S/A100/B200/H100/H200/RTX PRO 6000/GB200）—— 不要因为它叫 "Nano" 就当端侧。
- **✅ 唯一的真·边缘实测：Cosmos 3 Edge 在 Jetson AGX Thor T5000 上「about 1.53 seconds per action chunk」@640×540、15 Hz。** 这条可以放心标「端侧官方口径」。
- 「Nemotron 2 Nano 在嵌入式芯片上 MATH500 97.8%」这条**没写测试硬件**，是精度不是性能，别当边缘性能证据用。

### 陷阱 5｜「Nano」不等于「端侧」，参数量在 NVIDIA 这里已经和产品线名脱钩
NVIDIA 的 "Nano" 现在指的是产品线档位（Nano < Super < Ultra），不是绝对尺寸：**Nemotron 3 Nano 是 30B 总参数**（激活 3.5B），BF16 权重 32B 规模；Omni 版 BF16 要 **62 GB / 1× H100**。真正能塞进手机/Jetson 量级的只有 **Nemotron 3 Nano 4B（GGUF Q4_K_M 仅 2.84 GB）** 和 **Cosmos 3 Edge（BF16 约 9 GB）**。建表时建议按「实际可部署硬件」而非型号名分组。

### 陷阱 6｜Apple 的上下文有三个不同的数，别混用
- **训练序列长度**：2024 = 4096 → 8192 → 32768（RoPE base 500k→6,315,089）；2025 = 末段最长 **65K tokens**。
- **推理侧模型能力**：**两版技术报告都没有声明**。
- **开发者实际拿到的**：Foundation Models framework **4096 tokens，且输入+输出共享同一预算** —— 所以会出现「内容 4092 token 却报 `exceededContextWindowSize`（上限 4096）」这种看似矛盾的错误，因为模型没有空间生成回复。iOS 26.4 起可用 `contextSize` 属性和 `tokenCount(for:)` 自查。**AFM 3（iOS 27）的上下文数字 Apple 尚未公布。**

---

# 五、三家横向速览（可直接作为表格骨架）

| 模型 | 公司 | 首发 | 参数（总/激活） | 架构 | 量化 & 体积 | 上下文 | 许可 | 官方端侧性能 |
|---|---|---|---|---|---|---|---|---|
| AFM-on-device (2024) | Apple | 2024-06 | 2.73B | Dense Transformer, GQA | 混合 2/4-bit palettization, **3.7 bpw**；GB 未披露 | 4096（框架） | 闭源随 OS | **iPhone 15 Pro：0.6 ms/prompt token (prefill)；30 tok/s (decode)** |
| AFM on-device (2025) | Apple | 2025-06 | ~3B | Dense + 5:3 块切分 KV 共享 + interleaved/NoPE | **2 bpw QAT** + emb 4-bit + KV 8-bit；GB 未披露 | 4096（框架） | 闭源随 OS | 仅相对值：TTFT ↓~37.5%，KV 显存 ↓37.5% |
| **AFM 3 Core** | Apple | **2026-06** | **3B dense** | Dense | QAT，bpw 未披露 | 未披露 | 闭源随 OS | 未披露 |
| **AFM 3 Core Advanced** | Apple | **2026-06** | **20B / 1–4B 激活** | **IFP 稀疏激活，权重常驻 NAND，按 prompt 路由** | QAT，bpw 未披露 | 未披露 | 闭源随 OS | 未披露 |
| **gpt-oss-20b** | OpenAI | 2025-08 | **20.91B / 3.61B** | MXFP4 MoE，24 层，32 专家 top-4 | **MXFP4（仅 MoE，4.25 bpw）**；ckpt **12.8 GiB**，运行 **16 GB**（bf16 回落需 ~48 GB） | **131,072** | **Apache 2.0** | 无 tok/s（未披露） |
| gpt-oss-120b（对照） | OpenAI | 2025-08 | 116.83B / 5.13B | MoE，36 层，128 专家 top-4 | MXFP4；ckpt 60.8 GiB；单卡 80GB | 131,072 | Apache 2.0 | 无 tok/s |
| Llama-3.1-Nemotron-Nano-8B-v1 | NVIDIA | 2025-03 | 8B | Dense Llama-3.1 | BF16 | 131,072 | NVIDIA Open Model + Llama 3.1 | 仅定性「single RTX GPU / locally」 |
| Nemotron-Nano-9B-v2 | NVIDIA | 2025-08 | 8.89B | **Mamba2-Transformer 混合**，56 层 / 仅 4 注意力层 | BF16 | 128K | NVIDIA Open Model | ⚠️ 6× vs Qwen3-8B **@单卡 A10G 22GiB，ISL8k/OSL16k —— 非端侧** |
| Nemotron-Nano-12B-v2-VL | NVIDIA | 2025-10 | 12.6B | Transformer + CRadioV2-H | BF16/FP8/NVFP4-QAD | 128K | NVIDIA Open Model | 硬件全为数据中心卡，无 Jetson |
| **Nemotron 3 Nano 30B-A3B** | NVIDIA | **2025-12** | **30B / 3.5B** | **Mamba2-Transformer 混合 MoE**，52 层（23 MoE + 23 Mamba2 + 6 GQA），128+1 专家 top-6 | BF16 / FP8 / NVFP4 | **1M（HF 默认 256k）** | nvidia-nemotron-open-model | 未披露；测试机含 Jetson Thor / DGX Spark |
| **Nemotron 3 Nano 4B** | NVIDIA | **2026-03** | **3.97B** | Mamba2-Transformer 混合，4 注意力层 | BF16/FP8/**GGUF Q4_K_M = 2.84 GB** | **262K** | nvidia-nemotron-open-model | 未披露；官方目标平台 Jetson Thor / RTX / DGX Spark |
| **Nemotron 3 Nano Omni 30B-A3B** | NVIDIA | **2026-04** | **31B / ~3B** | 混合 MoE + CRADIO v4-H + Parakeet | BF16 62GB / FP8 33GB / **NVFP4 21GB** | 256K | nvidia-open-model-agreement | 最低 **NVFP4 @ 1× RTX 5090 32GB** |
| **Cosmos 3 Edge** | NVIDIA | **2026-07** | **4B（含 2B Nemotron reasoner）** | World foundation model，输出 action chunk | BF16，**约 9 GB** | — | **OpenMDW 1.1** | ★**Jetson AGX Thor T5000：1.53 s / action chunk @640×540, 15 Hz** |

---

# 六、遗留缺口（建议后续补）

1. **Apple AFM 3 技术报告**：Apple 承诺「later this summer」，截至 2026-09-09 在 machinelearning.apple.com/research 与 arXiv 上均未出现。这份报告一旦发布，会补上 AFM 3 的 bpw、上下文、吞吐 —— 值得设个提醒盯。
2. **OpenAI × Qualcomm 骁龙跑 gpt-oss-20b**：**未证实**。github.com/openai/gpt-oss README 完全没提；openai.com 对 WebFetch 返回 403；搜索配额耗尽。请勿写入表格，或标「待核」。
3. **Llama-3.1-Nemotron-Nano-4B-v1.1** 的逐项规格未取回（只确认 NVIDIA 有 2025-06-10 的《Supercharge Edge AI with High Accuracy Reasoning Using Llama Nemotron Nano 4B》博文）。
4. **Nemotron 3 Nano 4B / 30B 的 FP8 与 NVFP4 具体文件体积**：HF collection 只给了 NVFP4 的「18B params」标注，未给 GB。
5. **iOS 27 下 Foundation Models 的上下文窗口**：第三方口径分歧（一说仍 4096，一说 8192，一说 PCC 32K），Apple 官方文档未更新确认 —— 目前只能引 iOS 26 的 4096。
6. 本次 WebSearch 配额已用尽（200/200），若要补第 2、5 条建议新开会话或提高 `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`。

---

## Sources

**Apple**
- [Introducing Apple's On-Device and Server Foundation Models (2024)](https://machinelearning.apple.com/research/introducing-apple-foundation-models)
- [Apple Intelligence Foundation Language Models (arXiv:2407.21075)](https://arxiv.org/abs/2407.21075) · [HTML 全文](https://arxiv.org/html/2407.21075v1)
- [Updates to Apple's On-Device and Server Foundation Language Models (2025)](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates)
- [Apple Intelligence Foundation Language Models: Tech Report 2025 (arXiv:2507.13575)](https://arxiv.org/abs/2507.13575) · [HTML v2](https://arxiv.org/html/2507.13575v2) · [Apple 页面](https://machinelearning.apple.com/research/apple-foundation-models-tech-report-2025)
- [Introducing the Third Generation of Apple's Foundation Models (2026-06-08)](https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models)
- [Instruction-Following Pruning for LLMs (arXiv:2501.02086)](https://arxiv.org/pdf/2501.02086) · [Apple 页面](https://machinelearning.apple.com/research/pruning-large-language)
- [WWDC26 Apple Intelligence guide](https://developer.apple.com/wwdc26/guides/apple-intelligence/)
- [Managing the context window — Apple Developer](https://developer.apple.com/documentation/foundationmodels/managing-the-context-window)
- [Apple ML Research 出版物列表](https://machinelearning.apple.com/research)
- 第三方参考（需标注）：[fguzman82/apple-foundation-model-analysis](https://github.com/fguzman82/apple-foundation-model-analysis)、[AppleInsider iOS 27](https://appleinsider.com/inside/ios-27)、[9to5Mac AFM3 解读](https://9to5mac.com/2026/06/11/apples-new-foundation-models-explained-on-device-ai-cloud-ai-and-everything-in-between/)、[MacStories](https://www.macstories.net/linked/the-third-generation-of-apples-foundation-models-and-afm-core-advanced/)

**OpenAI**
- [huggingface.co/openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) · [huggingface.co/openai（组织页）](https://huggingface.co/openai)
- [gpt-oss-120b & gpt-oss-20b Model Card (arXiv:2508.10925)](https://arxiv.org/abs/2508.10925) · [HTML 全文](https://arxiv.org/html/2508.10925v1)
- [github.com/openai/gpt-oss](https://github.com/openai/gpt-oss)
- [Welcome GPT OSS — Hugging Face 官方博客](https://huggingface.co/blog/welcome-openai-gpt-oss)
- [Introducing gpt-oss | OpenAI](https://openai.com/index/introducing-gpt-oss/)（WebFetch 403，仅作引用）

**NVIDIA**
- [nvidia/NVIDIA-Nemotron-Nano-9B-v2](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2)
- [NVIDIA Nemotron Nano 2 技术报告 (arXiv:2508.14444)](https://arxiv.org/abs/2508.14444) · [HTML 全文](https://arxiv.org/html/2508.14444v1)
- [nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16)
- [nvidia/Llama-3.1-Nemotron-Nano-8B-v1](https://huggingface.co/nvidia/Llama-3.1-Nemotron-Nano-8B-v1)
- [nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16)
- [nvidia/NVIDIA-Nemotron-3-Nano-4B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-BF16) · [GGUF 版](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF)
- [nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16](https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16)（论文 arXiv:2604.24954）
- [NVIDIA Nemotron v3 collection](https://huggingface.co/collections/nvidia/nvidia-nemotron-v3)
- [Post-Train NVIDIA Cosmos 3 Edge for On-Device Robot Control (2026-08-19)](https://developer.nvidia.com/blog/post-train-nvidia-cosmos-3-edge-for-on-device-robot-control/) · [nvidia/Cosmos3-Edge](https://huggingface.co/nvidia/Cosmos3-Edge) · [cosmos3 collection](https://huggingface.co/collections/nvidia/cosmos3)
- [Build Next-Gen Physical AI with Edge-First LLMs (2026-03-12)](https://developer.nvidia.com/blog/build-next-gen-physical-ai-with-edge%e2%80%91first-llms-for-autonomous-vehicles-and-robotics/)
- [Develop Physical AI with NVIDIA Cosmos 3 (2026-05-31)](https://developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/)
- [Inside NVIDIA Nemotron 3](https://developer.nvidia.com/blog/inside-nvidia-nemotron-3-techniques-tools-and-data-that-make-it-efficient-and-accurate/) · [Nemotron 标签页](https://developer.nvidia.com/blog/tag/nemotron/) · [Cosmos 标签页](https://developer.nvidia.com/blog/tag/cosmos/)