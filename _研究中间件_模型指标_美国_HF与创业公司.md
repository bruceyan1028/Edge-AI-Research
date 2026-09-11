> 本文件为《端侧模型技术路线与指标对比·数据支撑清单》的中间产物，合并进正式清单后可删除。
> 检索日期：2026-09-09。所有"官方口径"均指厂商自报数字。

---

Research complete. Both delegated agents returned; here is the consolidated dataset.

---

# 端侧 AI 模型技术参数库：Hugging Face + 美国创业公司
**核查日期 2026-09-09｜所有 2026-01 之后的信息均已联网核实**

---

## ⚠️ 先说三条改变结论的核查发现

1. **没有 SmolLM4，也没有 SmolVLM3。** HuggingFaceTB 组织页按"最近更新"排序，最新的 smol 系列仍是 SmolLM3-3B（2025-07）；`huggingface.co/blog/smolvlm3` 返回 **404**；HF 官方博客 2026-08~09 的全部帖子里无任何 SmolLM/SmolVLM/SmolVLA 新版。HF 在 2026 年的 smol 相关产出转向了教学/工具（nanowhale-100m、Smol Training Playbook、WebGPU kernels）。
2. **没有 LFM3。Liquid AI 的当代产品线是 LFM2.5（2026-01 起）**，已迭代到 LFM2.5-2.6B（2026-08）、LFM2.5-VL-3B（2026-08）、LFM2.5-DSpark（2026-08）。
3. **Nexa AI 已并入 Qualcomm。** `nexa.ai` 与 `nexa.ai/blogs` 现均 301 重定向至 `aihub.qualcomm.com/genai`，页面首屏标题为 **"Nexa AI Is Now Part of Qualcomm AI Hub"**，NexaSDK 仓库迁至 `github.com/qualcomm/geniex`。Qualcomm 官方新闻稿列表（2026-06~09）中**没有**该收购公告（同期只有 Modular 的 $4B 收购），**交易日期与条款未披露**。

---

# 一、HUGGING FACE

## 1. SmolLM2（135M / 360M / 1.7B）
| # | 字段 | 内容 |
|---|---|---|
|1|全名|SmolLM2-135M / -360M / -1.7B（各含 -Instruct）|
|2|公司|Hugging Face（Smol Models Research / HuggingFaceTB）|
|3|首发|**2024-11**（论文 arXiv:2502.02737，2025-02-04 提交）|
|4|参数|135M / 360M / **1.7B**（HF 侧栏对 1.7B 显示 "2B params"，以正文 1.7B 为准）|
|5|架构|Transformer decoder（Llama 型），**多头注意力 MHA**（config: num_attention_heads=32 = num_key_value_heads=32，**非 GQA**）；1.7B: 24 层 / hidden 2048 / vocab 49152 / rope_theta 130000|
|6|蒸馏来源|**非蒸馏**，从零预训练 11T tokens（FineWeb-Edu、DCLM、The Stack、FineMath、Stack-Edu）|
|7|量化体积|官方未给；HF 上有 117 个社区量化版（llama.cpp / LM Studio / Jan / Ollama）→ **官方未披露**|
|8|上下文|**8192**（config.json `max_position_embeddings: 8192`）|
|9|许可|**Apache-2.0**|
|10|端侧性能|**官方无 tokens/s / TTFT / 内存数字**，只有定性 "lightweight enough to run on-device"；SmolLM1 博客给过参照系（iPhone 15 6GB DRAM / 15 Pro 8GB）但内存实测只在图片里|
|11|基准（1.7B base，官方口径）|HellaSwag 68.7 / ARC-avg 60.5 / PIQA 77.6 / MMLU-Pro(MCF) 19.4 / CommonsenseQA 43.6 / TriviaQA 36.7 / Winogrande 59.4 / OpenBookQA 42.2 / GSM8K(5shot) 31.0<br>**Instruct**：IFEval 56.7 / MT-Bench 6.13 / HellaSwag 66.1 / ARC 51.7 / GSM8K 48.2 / BBH(3shot) 32.2 / BFCL 27|
|12|模态|纯文本|
|13|来源|https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct ・ https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct/raw/main/config.json ・ https://arxiv.org/abs/2502.02737 ・ https://huggingface.co/blog/smollm|

> 训练：256× H100，nanotron + alignment-handbook。SmolLM**1**（2024-07-16）三档同为 135M/360M/1.7B，但上下文仅 **2048**，训练量 600B/600B/1T，135M+360M 借鉴 MobileLLM 用 GQA + 深而窄。

## 2. SmolLM3-3B
| # | 字段 | 内容 |
|---|---|---|
|1|全名|SmolLM3-3B（+ -Base / -checkpoints / -ONNX / GGUF）|
|2|公司|Hugging Face|
|3|首发|**2025-07-08**（模型卡 updated 2025-09-10）|
|4|参数|**3B**（3.1B，据 Liquid 对比表）|
|5|架构|Transformer decoder（Llama 型）+ **GQA（4 组）** + **NoPE（每第 4 层去掉 RoPE，ratio 3:1）** + intra-document masking + tied embeddings + embedding 层不加 weight decay|
|6|蒸馏来源|**非蒸馏**，从零预训练 11.2T tokens（三阶段课程）|
|7|量化体积|官方未给数值；有官方 GGUF（ggml-org/SmolLM3-3B-GGUF）与 ONNX → **未披露**|
|8|上下文|训练 4k→32k(θ=1.5M)→**64k**(θ=5M)，推理用 **YaRN 外推到 128k**|
|9|许可|**Apache-2.0**|
|10|端侧性能|**官方无 tokens/s / TTFT / 内存数字**|
|11|基准（官方口径）|思考模式 vs 非思考：AIME2025 **36.7 vs 9.3**；LiveCodeBench **30.0 vs 15.2**；GPQA-Diamond **41.7 vs 35.7**。胜率基于 12 项（HellaSwag/ARC/Winogrande/CommonsenseQA/MMLU-CF/MMLU-Pro-CF/PIQA/OpenBookQA/GSM8K/MATH/HumanEval+/MBPP+）。<br>**第三方（Liquid 实测）**：MMLU 59.84 / MMLU-Pro 23.90 / GPQA 26.31 / IFEval 72.44 / GSM8K 81.12 / MATH500 73.6 / HumanEval+ 60.37|
|12|模态|纯文本（6 语言：英法西德意葡）+ 原生 tool calling（XML/Python 双模板）+ `/think` `/no_think` 双模式|
|13|来源|https://huggingface.co/blog/smollm3 ・ https://huggingface.co/HuggingFaceTB/SmolLM3-3B ・ https://www.liquid.ai/blog/lfm2-8b-a1b-an-efficient-on-device-mixture-of-experts|

> 训练：384× H100 × 24 天，2.36M token 全局 batch，WSD 调度，APO 对齐。tokenizer 用 Llama 3.2 的（去掉 bos_token）。

## 3. SmolVLM（2B，初代）
|#|字段|内容|
|---|---|---|
|1|全名|SmolVLM-Instruct / -Base / -Synthetic（+ DPO LoRA）|
|2|公司|Hugging Face|
|3|首发|**2024-11-26**|
|4|参数|**2B**|
|5|架构|Idefics3 架构；视觉塔 **shape-optimized SigLIP（384×384 patch，内 14×14）**；语言塔 **SmolLM2-1.7B**；**pixel shuffle 9× 压缩视觉 token**（Idefics3 是 4×）|
|6|蒸馏来源|非蒸馏（组合式）|
|7|量化体积|未披露（官方只给 GPU RAM 需求）|
|8|上下文|**16k**（把 SmolLM2 的 RoPE base 从 10k 提到 273k 扩展而来）|
|9|许可|**Apache-2.0**（权重+数据集+训练配方）|
|10|端侧性能（官方口径）|**最低 GPU RAM 5.02 GB**（对比：moondream2 3.87 / PaliGemma-3B-448 6.72 / MiniCPM-V-2 7.88 / InternVL2-2B 10.52 / Qwen2-VL-2B 13.70）。**vs Qwen2-VL：prefill 快 3.3–4.5×，generation 快 7.5–16×**（未指明硬件）。单图 prompt 约 1.2k token vs Qwen2-VL 约 16k|
|11|基准|MMMU(val) 38.8 / MathVista(testmini) 44.6 / MMStar(val) 42.1 / DocVQA(test) 81.6 / TextVQA(val) 72.7 / CinePile 27.14|
|12|模态|图像+多图+文本→文本|
|13|来源|https://huggingface.co/blog/smolvlm|

## 4. SmolVLM2（256M / 500M / 2.2B）
|#|字段|内容|
|---|---|---|
|1|全名|SmolVLM2-2.2B-Instruct / -500M-Video-Instruct / -256M-Video-Instruct|
|2|公司|Hugging Face|
|3|首发|**2025-02-20**（论文 arXiv:2504.05299，2025-04-07）|
|4|参数|**2.2B / 500M / 256M**（500M 与 256M 官方称"史上最小的视频语言模型"）|
|5|架构|基于 **Idefics3**；视觉塔 shape-optimized **SigLIP**；文本塔 **SmolLM2-1.7B**（2.2B 版）|
|6|蒸馏来源|非蒸馏（组合式）|
|7|量化体积|官方 MLX 权重（mlx-community/SmolVLM2-500M-Video-Instruct-mlx）为**未量化**；量化体积**未披露**|
|8|上下文|**未披露**（模型卡未标）|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径）|2.2B **视频推理仅需 5.2GB GPU RAM**；"可在免费 Google Colab 上跑"。**iPhone 全本地 App（HuggingSnap，App Store 已上架）跑 500M 版**，代码 github.com/huggingface/huggingsnap。MLX 首日支持（Python + Swift）。**无 tokens/s 数字**|
|11|基准（2.2B）|MathVista 51.5 / MMMU 42 / OCRBench 72.9 / MMStar 46 / AI2D 70 / ChartQA(test) 68.84 / ScienceQA 90 / TextVQA(val) 73.21 / DocVQA(val) 79.98 ；视频：**Video-MME 52.1** / MLVU 55.2 / MVBench 46.27|
|12|模态|图像 / 多图 / **视频** / 文本 → 文本（仅英文）|
|13|来源|https://huggingface.co/blog/smolvlm2 ・ https://huggingface.co/HuggingFaceTB/SmolVLM2-2.2B-Instruct ・ https://arxiv.org/abs/2504.05299|

> 训练数据 3.3M 样本 / 10 个数据集：图像 34.4%、视频 33.0%、文本 20.2%、多图 12.3%。

## 5. SmolVLA（机器人 VLA）
|#|字段|内容|
|---|---|---|
|1|全名|SmolVLA|
|2|公司|Hugging Face（LeRobot）|
|3|首发|**2025-06**（arXiv:2506.01844，2025-06-02）|
|4|参数|**450M（0.45B）**，其中 Action Expert 约 100M|
|5|架构|**裁剪版 SmolVLM-2 视觉语言骨干（SigLIP 视觉编码器 + SmolLM2 语言解码器）+ 基于 flow-matching 的 Transformer "Action Expert"**；优化手段：减少视觉 token、**层跳过（只用 VLM 前 N 层）**、交错注意力|
|6|蒸馏来源|骨干来自 SmolVLM-2（裁剪，非蒸馏）|
|7|量化体积|未披露|
|8|上下文|未披露|
|9|许可|**Apache-2.0**（LeRobot 生态）|
|10|端侧性能（官方口径）|**内存少 7×、训练快 40%**（对比 π0 等）；可**单 GPU 训练**、**消费级 GPU 甚至 CPU 部署**；异步推理栈把动作预测与执行解耦以降延迟。**无绝对 tokens/s / ms 数字**|
|11|基准|与 **π0（3.3B）** 性能相当或超越，参数量仅其 1/7|
|12|模态|视觉-语言-动作（VLA），机器人操控|
|13|来源|https://arxiv.org/abs/2506.01844 ・ https://huggingface.co/papers/2506.01844|

> 训练数据：**481 个社区数据集 / <30,000 episodes / 约 10.6M 帧**（比 SOTA 小一个数量级）；缺失任务描述用 Qwen2.5-VL-3B-Instruct 自动补全。

## 6.（2026 唯一新增）nanowhale-100m — 教学模型，**不建议进对比表**
~110M（41M embedding + 69M non-embedding），**实现 DeepSeek-V4 架构**（MLA + 4 routed experts + 1 shared / top-2 + Hyper-Connections + 1 MTP 层），vocab 129,280，**上下文 2048**，Apache-2.0，H100 单卡训练，仅 2.6B token 预训练。官方明说"**教学用途，非生产**，输出常常语无伦次"。→ https://huggingface.co/HuggingFaceTB/nanowhale-100m

---

# 二、LIQUID AI（重点：架构真相 vs 营销话术）

## ★★ 口径陷阱 #1：LFM2 到底是不是"非 Transformer / 液态网络"

**这是本次调研最需要在图上标注的一条。**

- **LFM 第一代（2024-09-30）的官方原话**：*"This is the first time a **non-GPT architecture** significantly outperforms transformer-based models."* / *"explore ways to build foundation models **beyond Generative Pre-trained Transformers (GPTs)**"* / *"LFMs have a reduced memory footprint **compared to transformer architectures**"*。并把 LFM-3B 排名描述为 *"first place among 3B parameter transformers, hybrids, and RNN models"* —— 把自己列在 transformer **之外**。第一代**未开源**，这些说法无法验证。
  → https://www.liquid.ai/blog/liquid-foundation-models-our-first-series-of-generative-ai-models

- **LFM2 起（2025-07-10）的实际架构（官方自己披露）**：
  - LFM2-350M / 700M / 1.2B：**16 层 = 10 个 double-gated short-range convolution 块 + 6 个 GQA（分组查询注意力）块**
  - LFM2-2.6B：**30 层 = 22 conv + 8 attn**
  - LFM2-8B-A1B：**18 conv + 6 GQA**，MoE（32 experts / top-4）
  - LFM2-24B-A2B：**40 层，attention:conv ≈ 1:3（10 个注意力层）**，64 experts / top-4
  - LFM2.5-2.6B：**30 层 = 22 double-gated short conv + 8 GQA**
  - **每个块内还有 SwiGLU + RMSNorm** —— 这是标准 Transformer 组件
  → 也就是说：**LFM2 内部明确含有注意力层，是"门控短卷积 + GQA 混合"（gated short-conv + GQA hybrid），不是"无注意力"架构。** 官方技术报告 arXiv:2511.23404 的措辞也是中性的：*"a compact hybrid backbone combining **gated short convolutions with a small number of grouped query attention blocks**"*。
  
- **"Liquid" 这个名字的来源**：官方解释是 *"pays homage to our roots in dynamic and adaptive learning systems"*，理论基础是 **LIV（linear input-varying）算子** —— 一个把卷积/递归/注意力统一到"权重由输入现场生成的线性算子"框架下的**设计空间**，再用他们的 NAS 引擎 **STAR** 搜索出最优组合。它是**统一并涵盖**（unifies and subsumes）注意力，而不是**取代**注意力。
- **官网现状（2026-09）已明显软化口径**：首页只写 "Device-native foundation models" / "Liquid neural networks, state-space models, and new training recipes"，**不再出现 "non-GPT" / "beyond Transformers"**。
  → https://www.liquid.ai/

**给行业图的建议表述**：`混合架构：门控短卷积（double-gated short conv）+ GQA 注意力，由 STAR 神经架构搜索在边缘延迟/内存约束下搜出；营销上曾自称"非 GPT 架构"，但 LFM2 起官方披露的层配置中明确含 6~10 个注意力层。`

---

## ★★ 口径陷阱 #2："CPU 上比 Qwen3 快 2×" 的确切口径

- **原话**：*"2x faster decode and prefill performance than Qwen3 on CPU"*（LFM2 发布博客，2025-07-10）
- **硬件（已验证，两个都对）**：**Samsung Galaxy S24 Ultra（Qualcomm Snapdragon）** 与 **AMD Ryzen HX370**
- **框架/量化**：**ExecuTorch（8da4w）** 与 **llama.cpp（Q4_0）**
- **对比基线**：Qwen3-0.6B、Qwen3-1.7B、Llama-3.2-1B-Instruct、gemma-3-1b-it —— 且 **Qwen3 只测非推理模式**（官方理由：边缘输出预算 <4096 token）
- **关键缺陷**：**2025-07 那篇原始博客的正文里没有任何 tokens/s 绝对值**，吞吐数字只存在于两张图表图片（"Throughput comparison on CPU in ExecuTorch / in Llama.cpp"）里。唯一文字数据点是"LFM2-700M 在两个框架的 decode 和 prefill 上都胜过 Qwen3-0.6B，尽管大 16%"。
- **绝对数字要到 2026-01 的 LFM2.5 发布才有**（见下表），且**同机对比 Qwen3-1.7B 是自测**。

---

## 各代模型速查

### LFM2 系列（2025，已被 LFM2.5 取代但仍在 HF 上）
|模型|首发|参数|层配置|上下文|许可|训练量|
|---|---|---|---|---|---|---|
|LFM2-350M|2025-07-10|**354,483,968**|10 conv + 6 GQA|32,768|**LFM Open License v1.0**（tag `lfm1.0`）|10T|
|LFM2-700M|2025-07-10|**742,489,344**|10 conv + 6 GQA|32,768|LFM1.0|10T|
|LFM2-1.2B|2025-07-10|**1,170,340,608**|10 conv + 6 GQA|32,768|LFM1.0|10T|
|LFM2-2.6B|2025-08|**2,569,272,320**|**22 conv + 8 attn（30 层）**|32,768|LFM1.0|10T|
|LFM2-8B-A1B|2025-10-07|**8.3B 总 / 1.5B 激活**|18 conv + 6 GQA；除前两层外每层 MoE，32 experts top-4，sigmoid 门控 + 自适应路由偏置|未在博客披露|LFM1.0|12T|
|LFM2-24B-A2B|2026-02-24|**24B 总 / 2.3B 激活**|40 层，attn:conv≈1:3（10 attn），前两层 dense，64 experts top-4，hidden 2048 / expert inter 1536|未披露|open-weight|17T（仍在训）|

- **vocab**：350M/700M/1.2B/2.6B = 65,536；LFM2-8B-A1B → LFM2.5 时翻倍到 128,000
- **训练法**：LFM1-7B 教师做知识蒸馏（交叉熵）→ 大规模 SFT → 自研 length-normalized DPO → 模型合并。技术报告用的是 **tempered decoupled Top-K 知识蒸馏**
- **许可实质**：LFM Open License v1.0 = "基于 Apache 2.0"，学术/研究免费；**年收入 <$1000 万的公司可商用，超过需另签商业许可**
- **LFM2 官方基准（2025-07 博客，自测）**：

| |LFM2-350M|LFM2-700M|LFM2-1.2B|Qwen3-0.6B|Qwen3-1.7B|Llama-3.2-1B-It|gemma-3-1b-it|
|---|---|---|---|---|---|---|---|
|MMLU(5)|43.43|49.9|55.23|44.93|**59.11**|46.6|40.08|
|GPQA(0)|27.46|28.48|**31.47**|22.14|27.72|28.84|21.07|
|IFEval|65.12|72.23|**74.89**|64.24|73.98|52.39|62.9|
|IFBench|16.41|20.56|20.7|19.75|**21.27**|16.86|17.72|
|GSM8K(0)|30.1|46.4|58.3|36.47|51.4|35.71|**59.59**|
|MGSM(5)|29.52|45.36|55.04|41.28|**66.56**|29.12|43.6|
|MMMLU(5)|37.99|43.28|**46.73**|30.84|46.51|38.15|34.43|

- **LFM2-24B-A2B 吞吐**：vLLM 单卡 **H100 SXM5 约 26.8K total tok/s @ 1024 并发**（胜 gpt-oss-20b、Qwen3-30B-A3B-Instruct-2507）；llama.cpp 在 **AMD Ryzen AI Max+ 395** 上 Q4_K_M 的 prefill/decode **只有图表无数字**；**设计目标是塞进 32GB RAM**。GGUF 提供 Q4_0/Q4_K_M/Q5_K_M/Q6_K/Q8_0/F16。
- 来源：https://www.liquid.ai/blog/liquid-foundation-models-v2-our-second-series-of-generative-ai-models ・ https://arxiv.org/abs/2511.23404 ・ https://huggingface.co/LiquidAI/LFM2-1.2B ・ https://huggingface.co/LiquidAI/LFM2-2.6B ・ https://www.liquid.ai/blog/lfm2-8b-a1b-an-efficient-on-device-mixture-of-experts ・ https://www.liquid.ai/blog/lfm2-24b-a2b

### ★ LFM2.5 系列（2026 当代）
|模型|首发|参数|层配置|上下文|vocab|训练量|许可|
|---|---|---|---|---|---|---|---|
|**LFM2.5-1.2B**（Base/Instruct/JP）|**2026-01-05**|1.17B|10 conv + 6 GQA（16 层）|32,768|65,536|**28T**|lfm1.0|
|**LFM2.5-VL-1.6B**|2026-01-05|1.6B|LFM2.5 骨干 + SigLIP2 NaFlex 400M|—|65,536|—|lfm1.0|
|**LFM2.5-VL-450M**|2026-01-05|0.4B|LFM2.5-350M 骨干 + SigLIP2 NaFlex 86M|**32,768**|65,536|—|lfm1.0|
|**LFM2.5-Audio-1.5B**|2026-01-05|1.5B（LM 1.2B + 音频编码器 115M）|hybrid conv+attention 骨干 + FastConformer（`nvidia/canary-180m-flash`）+ RQ-transformer + **自研 LFM 音频 detokenizer（Mimi 兼容，8 codebooks，INT4 QAT）**|32,768|65,536(文)/2049×8(音)|—|lfm1.0|
|**LFM2.5-8B-A1B**|**2026-05-28**|**8B 总 / ~1B 激活**|同 LFM2-8B-A1B（MoE + GQA + 门控短卷积），**reasoning-only**|**128,000**|**128,000**|**38T**|open-weight|
|**LFM2.5-230M**|**2026-06-25**|~230M|14 层 = 8 conv + 6 GQA|32K 扩展阶段|—|**19T**|open-weight|
|**LFM2.5-350M**|**2026-08-05**|350M|10 conv + 6 GQA（16 层）|32,768|65,536|**28T**|lfm1.0|
|**LFM2.5-2.6B**|**2026-08-04**|**2.69B**|**22 double-gated short conv + 8 GQA（30 层）**|**131,072**|**128,000**|**~34T**|lfm1.0|
|**LFM2.5-VL-3B**|**2026-08-12**|**3.1B**|LFM2.5-2.6B 同基座 + **SigLIP2 400M NaFlex**，非推理模型|未披露|128,000|~34T（视觉预训练 token ×4）|open-weight|
|**LFM2.5-DSpark**（草稿模型）|**2026-08-20**|295.7M / 327.7M|**5 层、block size 9、纯注意力草稿模型**（DFlash 并行骨干 + Markov 串行头 + 置信度调度验证器）|—|—|—|open-weight|

**LFM2.5-1.2B 官方端侧实测（官方口径，1K prefill + 100 decode）** —— 这是全套里最完整的一组数据：

|设备|算力单元|框架|模型|Prefill tok/s|Decode tok/s|内存|
|---|---|---|---|---|---|---|
|AMD Ryzen AI 9 HX 370|CPU|llama.cpp Q4_0|LFM2.5-1.2B-Instruct|**2975**|**116**|**856 MB**|
|Snapdragon X Elite|**NPU**|NexaML|LFM2.5-1.2B-Instruct|2591|63|0.9 GB|
|Snapdragon Gen4（ROG Phone 9 Pro）|**NPU**|NexaML|LFM2.5-1.2B-Instruct|**4391**|82|0.9 GB|
|Dragonwing IQ9（IQ-9075，IoT）|**NPU**|NexaML|LFM2.5-1.2B-Instruct|2143|53|0.9 GB|
|Snapdragon Gen4（Galaxy S25 Ultra）|CPU|llama.cpp Q4_0|LFM2.5-1.2B-Instruct|**335**|**70**|**719 MB**|
|Snapdragon Gen4（Galaxy S25 Ultra）|CPU|llama.cpp Q4_0|*Qwen3-1.7B（基线）*|181|40|1306 MB|
|AMD Ryzen AI 9 HX 370|CPU|llama.cpp Q4_0|*Qwen3-1.7B（基线）*|2008|62|1465 MB|

**其他型号端侧数字（官方口径）**：
- **LFM2.5-230M**：4bit / 2K 输入。**Raspberry Pi 5（-fa 1）：prefill 523 tok/s，decode 42 tok/s，内存 293 MB**；**Galaxy S25 Ultra / Snapdragon Gen4（-fa 0）：prefill 1158 tok/s，decode 213 tok/s，内存 375 MB**。H100 上 512in/32out 的 p50 延迟从并发1约 50ms 到并发64约 205ms（Qwen3.5-0.8B 峰值约 530ms）
- **LFM2.5-2.6B**：**内存 <2.5 GB**；CPU decode **Apple M5 Max 220 tok/s**、**Ryzen AI Max+ 395 113 tok/s**、**手机约 30 tok/s**；单 H100 SXM5（SGLang 0.5.16，BF16，1024in/≤256out）**高并发下近 15K output tok/s ≈ 13 亿 token/天**。**TTFT 官方未给数字**，只说"我们测过的最快"
- **LFM2.5-8B-A1B**：CPU decode **M5 Max 253 tok/s**、**Ryzen AI Max+ 395 146 tok/s**、**手机约 30 tok/s**；笔记本级 CPU **内存 <6 GB**；单 H100 高并发 **18.5K tok/s（>16 亿 token/天）**
- **LFM2.5-VL-3B**：decode **M5 Max 228 tok/s**、**Ryzen AI Max+ 395 116 tok/s**、**Galaxy S26 Ultra 20 tok/s**；**内存约 3 GB**；单 H100 上 5 帧视频片段 **TTFT 约 34 ms**（对比 Gemma 系约 200ms）；高并发约 11K output tok/s ≈ 10 亿 token/天
- **LFM2.5-DSpark 投机解码加速（block size 9，batch 1，temp 0）**：H100 80GB / SGLang BF16 与 **M4 Max MacBook Pro / llama.cpp+Metal FP16 GGUF**

  |基座|H100 均值|M4 Max 均值|
  |---|---|---|
  |LFM2.5-1.2B-Instruct|**2.10×**（656→1384 tok/s）|**2.54×**（138→350 tok/s）|
  |LFM2.5-2.6B|**2.67×**（323→864）|**2.27×**（61→139）|
  |LFM2.5-8B-A1B|**2.54×**（418→1074）|**1.18×**（90→106）|
  
  峰值 3.18×（H100，8B-A1B，MATH500）/ 2.87×（M4 Max，1.2B，HumanEval）。BFCL 函数调用在 M4 Max 上**延迟平均降 57%**。**贪心解码下输出与基线逐字相同**，故基准分数不变。

**LFM2.5 关键基准（官方自测）**：
- **LFM2.5-1.2B-Instruct**：GPQA 38.89 / MMLU-Pro 44.35 / IFEval **86.23** / IFBench 47.33 / Multi-IF 60.98 / AIME25 14.00 / BFCLv3 49.12（基线：Llama3.2-1B-It、Gemma3-1B-IT、Granite-4.0-h-1b、Granite-4.0-1b、Qwen3-1.7B instruct 模式）
- **LFM2.5-230M**：GPQA-D 25.41 / MMLU-Pro 20.25 / IFEval 71.71 / IFBench 38.40 / Multi-IF 37.70 / BFCLv3 43.26 / BFCLv4 21.03 / τ²-Telecom 5.26 / τ²-Retail 13.68（基线含 LFM2.5-350M、LFM2-350M、Granite 4.0-(H-)350M、**Qwen3.5-0.8B Instruct**、Gemma 3 1B IT）
- **LFM2.5-2.6B**（基线：gemma-4-E2B-it 5.1B、gemma-4-E4B-it 8B、**Qwen3.5-4B 4.7B**、Qwen3.5-9B 9.7B）：AA-Omniscience-Public **−29.50** / AIME25 51.87 / LiveCodeBench v6 59.41 / IFBench **59.17** / Multi-IF **80.07** / IFStruct **85.49** / BFCLv4 56.88 / ToolSandbox **77.83** / τ³-Bench Banking 5.67 / Claw-Eval avg(EN) 62.85 / PinchBench 68.22 / BrowseComp+(OpenClaw) 26.89
- **LFM2.5-8B-A1B**：AA-Omni Index −24.70 / IFEval **91.84** / IFBench 56.47 / Multi-IF 79.93 / MATH500 88.76 / AIME25 42.53 / AIME26 50.00 / BFCLv3 64.79 / BFCLv4 49.73 / **τ²-Telecom 88.07** / τ²-Retail 39.82。代际提升极大：Non-Hallucination 7.46→63.47，τ²-Telecom 13.60→88.07
- **LFM2.5-VL-3B**：28 项视觉均分 **69.4**（前代 57.2）；ScreenSpot-v2 avg **80.7**（前代桌面/移动/网页仅 6.0/7.6/2.5）；RefCOCO-avg 87.9 / BLINK 61.5 / MuirBench 58.3 / MMStar 63.3 / RealWorldQA 73.1 / MathVista(mini) 68.5 / DocVQA(val) 91.1 / ChartQA 81.3 / OCRBench v1 84.2 / TextVQA 84.3 / POPE 88.7 / **CountBenchQA 87.3（较前代 92.2 退化）** / ToolSandbox 59.5 / BFCLv4 32.5 / IFEval 82.3
- **LFM2.5-VL-1.6B**（2026-01）：MMStar 50.67 / MM-IFEval 52.29 / BLINK 48.82 / InfoVQA(val) 62.71 / OCRBench v2 41.44 / RealWorldQA 64.84 / MMMU(val) 40.56 / MMMB avg 76.96 / 多语 MMBench avg 65.90（基线 LFM2-VL-1.6B、InternVL3.5-1B、FastVLM-1.5B）
- **LFM2.5-Audio-1.5B**：VoiceBench overall **54.92**（LFM2-Audio 52.77 / Moshi-7B 29.51 / Qwen2.5-Omni-3B 63.57 / Mini-Omni2 33.49）；ASR WER avg **7.53**（LFM2-Audio 9.38 / Qwen2.5-Omni-3B 7.90 / Whisper-large-V3 7.44）；新 detokenizer **在移动 CPU 上同精度比 Mimi 快 8×**
- **LFM2-Audio-1.5B（2025-10-01 前代）**：**端到端延迟 <100ms**（4 秒输入波形→首声），**但博客未指明任何硬件**；VoiceBench 56.78；ASR WER avg 7.24。输入为 tokenizer-free 连续嵌入（约 80ms 波形块直投），输出为离散 Mimi token（每步最多 8 个）

**Liquid Nanos（任务专用小模型，2025-09-25）**：350M–2.6B，**RAM 占用 100MB–2GB**。LFM2-Extract（350M/1.2B，结构化抽取）、LFM2-350M-ENJP-MT（英日互译）、LFM2-1.2B-RAG、LFM2-1.2B-Tool（刻意不思考以降延迟）、LFM2-350M-Math、社区 Luth-LFM2（350M/700M/1.2B 法语）。官方称 **LFM2-1.2B-Extract 在复杂多语结构化输出上胜过 Gemma 3 27B（"22.5 倍于自身"）** —— 基于 5000 份文档 / 100+ 主题的**内部评测 + LLM 裁判**。→ https://www.liquid.ai/blog/introducing-liquid-nanos-frontier-grade-performance-on-everyday-devices

**Liquid 全线来源**：https://www.liquid.ai/blog/introducing-lfm2-5-the-next-generation-of-on-device-ai ・ https://www.liquid.ai/blog/lfm2-5-2-6b ・ https://www.liquid.ai/blog/lfm2-5-8b-a1b ・ https://www.liquid.ai/blog/lfm2-5-230m ・ https://www.liquid.ai/blog/lfm2-5-vl-3b ・ https://www.liquid.ai/blog/lfm2.5-dspark ・ https://www.liquid.ai/blog/lfm2-vl-efficient-vision-language-models ・ https://www.liquid.ai/blog/lfm2-audio-an-end-to-end-audio-foundation-model ・ https://huggingface.co/LiquidAI/LFM2.5-2.6B ・ https://huggingface.co/LiquidAI/LFM2.5-1.2B-Instruct ・ https://huggingface.co/LiquidAI/LFM2.5-350M ・ https://huggingface.co/LiquidAI/LFM2.5-VL-450M ・ https://huggingface.co/LiquidAI/LFM2.5-Audio-1.5B

> 补充：HF 上还有 **LFM2-2.6B-Longevity / LFM2-1.2B-Longevity**（约 2026-09-02 更新，医疗/长寿垂域），以及 LFM2.5-Encoders、LFM2.5 Retrievers、LFM2.5 Q4_0（量化感知蒸馏版）。官网自称 **"56 LFMs shipped，3400+ variants，44.7M downloads"**（LFM2 家族单独宣称 HF 下载超 1000 万）。

---

# 三、ZYPHRA

## 1. Zamba2-1.2B（Zamba2-mini）
|#|字段|内容|
|---|---|---|
|1|全名|Zamba2-1.2B / Zamba2-mini|
|2|公司|Zyphra|
|3|首发|**2024-08-27**|
|4|参数|**1.2B**（精确值未披露，HF 侧栏显示 "1B params"）|
|5|架构|**Mamba2 SSM 骨干 + 单个共享注意力块**（不同于 2.7B/7B 的双块 ABAB 交替）；**共享注意力块与共享 MLP 块上都加 LoRA**；共享注意力带 RoPE。Mistral-7B tokenizer，vocab 32000|
|6|蒸馏来源|**非蒸馏**，从零训练 3T tokens（Zyda-2）+ 100B 退火|
|7|量化体积|**4bit 下 <700 MB**（官方博客口径）|
|8|上下文|**4096**（原生训练长度）|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径，**未指明硬件**）|**TTFT 快 1.67×、内存开销低 23.3% —— 对比基线是 Phi-1.5-1.3B**。**无任何绝对 tok/s / ms**|
|11|基准（技术报告 Table I）|MMLU(5) 43.1 / ARC-E 72.7 / ARC-C(25) 45.9 / HellaSwag(10) 70.9 / PIQA 78.3 / Winogrande 68.0 / BoolQ 75.0 / OBQA 43.6；Instruct: MT-Bench 5.45 / IFEval 41.3|
|12|模态|纯文本|
|13|来源|https://www.zyphra.com/our-work/zamba2-mini ・ https://huggingface.co/Zyphra/Zamba2-1.2B ・ https://arxiv.org/abs/2411.15242|

## 2. Zamba2-2.7B（Zamba2-Small）
|#|字段|内容|
|---|---|---|
|3|首发|**2024-07-28**|
|4|参数|**2.7B**（config: hidden_size 2560，**54 层**，num_mem_blocks 2，adapter_rank 128，混合注意力位于 [6,12,18,24,30,36,42,47,51] 层，vocab 32000）|
|5|架构|**Mamba2 + 两个交替共享注意力块（ABAB）**；LoRA 只加在共享 MLP（不加共享注意力）；**该尺寸无 RoPE**|
|6|蒸馏来源|非蒸馏，3T Zyda-2 + 100B 退火|
|7|量化体积（官方技术报告 §VI）|**BF16 5.38 GB → 4bit 1.55 GB**（线性层）；带 4bit LoRA 为 **1.7 GB**。推荐：4bit，但 **SSM 的 A 矩阵 / dt / conv-state 保持更高精度**|
|8|上下文|4096 原生；长上下文微调后可达 **65536**（passkey retrieval 验证）|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径，**未指明硬件**）|**TTFT 快 2×、内存开销低 27%、生成延迟低 1.29× —— 对比基线 Phi3-3.8B**|
|11|基准|MMLU(5) 55.97 / ARC-E 80.13 / ARC-C(25) 60.0 / HellaSwag(10) 76.35 / PIQA 80.36 / Winogrande 73.24 / BoolQ 74.25 / OBQA 46.4；Instruct: MT-Bench 6.95 / IFEval 48.0|
|13|来源|https://www.zyphra.com/our-work/zamba2-small ・ https://huggingface.co/Zyphra/Zamba2-2.7B ・ arXiv:2411.15242|

## 3. Zamba2-7B
|#|字段|内容|
|---|---|---|
|3|首发|**2024-10-14**|
|4|参数|**7.4B**（技术报告口径；HF 卡显示 7B）。config: hidden 2560，54 层，num_mem_blocks 2，n_mamba_heads 80，adapter_rank 128|
|5|架构|Mamba2 + 双交替共享注意力（ABAB）+ 共享 MLP&注意力 LoRA + 共享注意力 RoPE。**注意力:Mamba = 1:6 → KV cache 比纯 Transformer 小 6×**（官方口径）。训练 2T tokens + 10% StarCoder|
|7|量化体积|**未披露**（报告只量化了 2.7B）|
|8|上下文|4096 原生；**NTK-aware scaling → 约 17000 有效，无需重训**|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径，**未指明硬件**）|**TTFT 快 25%、tok/s 高 20%、内存"显著"降低 —— 对比基线 Llama3-8B**|
|11|基准|MMLU(5) 67.2 / ARC-E 82.0 / ARC-C(25) 68.9 / HellaSwag(10) 81.5 / PIQA 81.0 / Winogrande 77.3 / BoolQ 84.1 / OBQA 48.2；Instruct: MT-Bench 7.42 / IFEval 69.94|
|13|来源|https://www.zyphra.com/our-work/zamba2-7b ・ https://huggingface.co/Zyphra/Zamba2-7B ・ arXiv:2411.15242|

> **Zamba1-7B**（2024-04，谱系参考）：Mamba1 骨干 + **单个全局共享注意力层，每 6 个 Mamba 块施加一次**；约 1T + 50B 退火；Apache-2.0（权重 + 中间 checkpoint 全开）；无数值性能声明。→ https://www.zyphra.com/our-work/zamba ・ arXiv:2405.16712

## 4. ★ Zamba2-VL（1.2B / 2.7B / 7B）— 2026 边缘 VLM
|#|字段|内容|
|---|---|---|
|3|首发|**2026-06-02**|
|4|参数|按骨干标称 1.2B / 2.7B / 7B（含视觉编码器的精确总参**未披露**；HF 对 1.2B 版显示 "2B params"）|
|5|架构|**LLaVA 式：Qwen2.5-VL 的 ViT → 2 层 MLP adapter → Zamba2 混合 LLM 骨干**；约 50B 多模态 token（30B 预训练 + 20B 指令）|
|6|蒸馏来源|骨干为 Zamba2（从零）；ViT 取自 Qwen2.5-VL|
|8|上下文|训练 4k，视觉 token 预算 3.4k|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径）|**"TTFT 比最接近的 Transformer 基线低约一个数量级"**，测量条件为 **LLM 骨干在 32k token 上的 prefill**。**未指明硬件、无绝对毫秒数**。明确把 1.2B/2.7B 定位为 "on-device and edge"|
|11|基准（Table II，14 项）|**7B**：AI2D 90.6 / ChartQA 85.3 / DocVQA 92.9 / TextVQA 81.0 / OCRBench 81.6 / MMMU 43.8 / MathVista 61.2；**1.2B**：AI2D 81.5 / DocVQA 87.4 / OCRBench 71.4 / PixMoCount 62.5（同级领先）|
|12|模态|视觉-语言（图像+文本）|
|13|来源|https://www.zyphra.com/our-work/zamba2-vl ・ https://huggingface.co/Zyphra/Zamba2-VL-1.2B ・ arXiv:2606.00390|

## 5. ZAYA1-8B（2026 旗舰 MoE，**非端侧**，仅作谱系）
2026-05-06（基座报告 2025-11）；**760M 激活 / 8.4B 总参**；40 层，hidden 2048，**16 experts / top-1**，vocab 262272；**Compressed Convolutional Attention（CCA）** + MLP 路由 + 学习式残差缩放；**首个全程在 AMD MI300X（1024 卡）上训练的 MoE**；上下文 **131072**；**Apache-2.0**；**无任何延迟/吞吐/内存声明**。基准：AIME'26 89.1 / HMMT Feb'26 71.6 / GPQA-D 71.0 / MMLU-Pro 74.2 / LiveCodeBench-v6 65.8 / IFEval 85.58 / BFCL-v4 39.22。→ https://www.zyphra.com/our-work/zaya1-8b ・ https://huggingface.co/Zyphra/ZAYA1-8B ・ arXiv:2605.05365
**ZAYA1-74B-Preview**（2026-05-07）：4B 激活 / 74B 总参，上下文 **256k**，Apache-2.0，pre-RL checkpoint，无分数。

## 6. ZONOS2（2026-06-12，开源 TTS MoE）
**900M 激活 / 8B 总参** 稀疏 MoE Transformer（MoE++，MLP 路由），对 DAC codec token 自回归 → **44.1kHz**，ECAPA-TDNN 说话人嵌入，byte-level UTF-8 输入；**Apache-2.0**；单次生成上限 1 分钟音频；**官方称"吞吐比 Zonos-v0.1 快 4× 实时"，无绝对 RTF/ms，无端侧声明**；需 Linux x86_64 + NVIDIA GPU。约 30+ 语言（三档）。→ https://www.zyphra.com/our-work/zonos2 ・ https://huggingface.co/Zyphra/ZONOS2

> **不存在 Zamba3。** Zyphra 2026 主线是 ZAYA1 + Zamba2-VL + ZONOS2。

---

# 四、CARTESIA

## 1. Rene-v0.1-1.3b（旗舰端侧开源语言模型）
|#|字段|内容|
|---|---|---|
|3|首发|**2024-08-27**（与 Edge 库、Sonic On-Device 私测同期）|
|4|参数|**1.3B**（HF 卡 "1B params"）|
|5|架构|**混合 Mamba-2 + MLP 前馈 + 穿插滑动窗口注意力（SWA）**；tokenizer 用 allenai/OLMo-1B-hf。层数配置未披露|
|6|蒸馏来源|**非蒸馏**，从零预训练 **1.5T tokens of Dolma-1.7**|
|7|量化体积（官方）|**4bit MLX = 1.25 GB**（`Rene-v0.1-1.3b-4bit-mlx`）；官方称 8bit 与 4bit "无质量损失"|
|8|上下文|**未披露**|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径）|目标硬件 **Apple M 系列（为 Mamba-2 写了 Metal kernel，覆盖笔记本与手机）**；4bit MLX 版"在 macOS Sonoma 14.1 + **M3** 上测试通过"；**"推理时内存占用固定"**。**无 tok/s / ms 数字**|
|11|基准（LM-eval-harness）|COPA 82.0 / HellaSwag 69.4 / MMLU(5) 32.6 / PIQA 77.5 / ARC-E 61.7 / ARC-C 34.4 / WinoGrande 62.9 / OBQA 39.2，**均分 57.5**（recurrentgemma-2b 48.4，phi-1.5 62.7）|
|12|模态|纯文本|
|13|来源|https://cartesia.ai/blog/on-device ・ https://huggingface.co/cartesia-ai/Rene-v0.1-1.3b-pytorch ・ https://huggingface.co/cartesia-ai/Rene-v0.1-1.3b-4bit-mlx|

## 2. Llamba（1B / 3B / 8B）— 蒸馏 SSM
|#|字段|内容|
|---|---|---|
|3|首发|**2025-02-20**（论文）/ 2025-03-05（博客）|
|4|参数|论文未给精确值。blocks 16/28/32；hidden 2048/3072/4096；32 heads；state size 64；Llama-3.1 词表|
|5|架构|**纯 Mamba-2 递归 + 交替 MLP 块**，untied multi-head，Discrete-Mamba-2；蒸馏方法 **MOHAWK（三阶段）**|
|6|蒸馏来源（官方明确）|**Llama-3.2-1B-Instruct → Llamba-1B；Llama-3.2-3B-Instruct → Llamba-3B；Llama-3.1-8B-Instruct → Llamba-8B**；末段均再从 **Llama-3.1-70B-Instruct** 蒸馏。蒸馏 token 仅 **8B / 10B / 12B**（不到从零训练的 0.1%）|
|7|量化体积|支持 4bit MLX，**体积未披露**|
|8|上下文|**未披露**（训练序列长度至 4096）|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径）|GPU：**单卡 H100 80GB，生成长度 8192，batch 8–2048 → Llamba-8B 吞吐最高为 Llama-3.1-8B 的 12×**。端侧：**Apple M3 Pro 36GB + MLX 4bit**，"随上下文增长保持恒定高吞吐/低内存"。**绝对 tok/s 与 ms 全部只在图片里，正文无数字；iPhone 只作为目标提及，无实测**|
|11|基准（论文 Table 1，0-shot）|**Llamba-8B**：ARC-C 54.6 / ARC-E 82.5 / PIQA 80.9 / WG 73.3 / HellaSwag 77.6 / MMLU 61.0 / OBQA 43.4，**均分 68.8**；**Llamba-3B** 均分 63.9（MMLU 52.7）；**Llamba-1B** 均分 53.2（MMLU 38.0）|
|13|来源|https://cartesia.ai/blog/llamba-distillation ・ https://huggingface.co/cartesia-ai/Llamba-8B ・ https://arxiv.org/abs/2502.14458 ・ https://github.com/cartesia-ai/edge|

## 3. Sonic-3.6（当代旗舰 TTS，**闭源**）
|#|字段|内容|
|---|---|---|
|1|全名|Sonic-3.6（`sonic-3.6`，快照 `sonic-3.6-2026-08-27`）|
|3|首发|**2026-08-27**（Sonic-3 于 2025-10-27；3.5 于 2026-05 GA）|
|4–8|参数/架构/蒸馏/量化/上下文|**全部未披露**。SSM 血统来自创始团队（S4/Mamba 作者），但 Sonic-3.6 的具体架构官方未公开|
|9|许可|**专有/闭源**，API + 自托管（Baseten / SageMaker / Together）+ on-prem。**非开源权重**|
|10|性能（官方口径）|**延迟 <90 ms；生成速度 132 字符/秒**（约为 "v3 Conversational" 68 字符/秒的 2×）。**硬件未指明**。官网有 "on-device" 部署图块，但**无任何公开规格/硬件/GA 确认**|
|11|基准|Artificial Analysis 榜首（controlled + provider voice）；**controlled-voice Elo 1120**（Sonic-3.5 1095、ElevenLabs v3 1066）；15 个 locale 盲测偏好最高 93%（en-US 92% vs Eleven v3 4%）|
|12|模态|文本转语音（44 语言 / 61 locale / 500+ 音色）|
|13|来源|https://cartesia.ai/blog/sonic-3.6 ・ https://docs.cartesia.ai/changelog ・ https://cartesia.ai/sonic|

> **初代 Sonic**（2024-05-31）：模型延迟 **135 ms**，SSM 架构，参数未披露 → https://cartesia.ai/blog/sonic。**Sonic / Sonic-2 / Sonic Turbo / legacy 将于 2026-10-20 后停用。** 另有 **Ink-2 STT**（2026-07）。

## 4. Mamba-3（2026-03-11，研究架构，**无权重**）
延迟基准在 **1.5B**、精度基准在 **1B**；SSM，采用指数-梯形离散化、**RoPE 实现复值动力学**、**MIMO SSM**、BCNorm、去掉短卷积、交错 MLP；**仅发论文与 kernel（state-spaces/mamba），未发权重**。官方口径（**单卡 H100-SXM 80GB，batch 128**）：16384 token 的 prefill+decode 总耗时 **Mamba-3 SISO 140.61s vs Mamba-2 149.02s vs vLLM Llama-3.2-1B 976.50s**；MIMO R=4 在 1B 规模多 >1pp 精度。→ https://cartesia.ai/blog/mamba-3 ・ arXiv:2603.15569

> ⚠️ **Cartesia 的开源端侧线（Rene / Llamba / Edge）自 2025 年起未再更新**，HF 上最新是 H-Net（2025-07）。"Sonic On-Device" 是 2024 年的私测，**目前没有公开规格**。

---

# 五、MOONDREAM（M87 Labs, Inc.）

## ★ 参数量按版本锁定（这是任务点名的陷阱，且官方口径自相矛盾）

|版本|首发|参数（官方正文）|HF 侧栏元数据|许可|
|---|---|---|---|---|
|moondream1|2024-01|**1.6B**|2B|**仅研究，禁商用**|
|moondream2|2024-03（末版 rev 2025-06-21）|**1.9B**（2025-01-09 博客两次明写）|2B|**Apache-2.0**|
|Moondream 0.5B|2024-12-05|**0.5B**|—|**Apache-2.0**|
|Moondream 3 Preview|2025-09-18|**9B 总 / 2B 激活**|—|**BSL 1.1 + No Third-Party Service**|
|**Moondream 3.1（9B-A2B）**|**2026-07-07**|**9B 总 / 2B 激活**|—|**Moondream Model License v1.0**|

> **网传的 "1.86B" 在任何一手页面上都不存在** → moondream2 精确参数应记 **未披露**。另注意 HF 侧栏参数数**受量化影响**（`moondream-2b-2025-04-14-4bit` 标 1B，`moondream2-gguf` F16 标 1B），**不可当参数量引用**。

## 1. moondream1
SigLIP 视觉编码器 + **Phi-1.5** 语言模型，LLaVA 训练集；上下文未披露；量化未披露；基准 VQAv2 74.7 / GQA 57.9 / TextVQA 35.6（对比 LLaVA-1.5-13.3B: 80.0/63.3/61.3）。→ https://huggingface.co/vikhyatk/moondream1

## 2. moondream2
- **架构**：小型 VLM，GGUF 仓库元数据显示底层为 **phi2**
- **量化体积**：GGUF **只有 F16 = 2.84 GB**（**无官方 int8/int4 GGUF**）；另有 4bit QAT safetensors `moondream-2b-2025-04-14-4bit`
- **上下文**：**2048**（2025-06-21 博客明说 "context length is currently capped at 2048"）
- **许可**：**Apache-2.0**
- **端侧（官方口径）**：QAT 4bit 版 **峰值显存 4.2GB → 2.4GB（-42%）**，**推理速度 +34%（RTX 3090）**，精度保留 99.4%（8 项基准均分 74.5 vs 74.9）。**无 tokens/s 绝对值**。2025-06-21 版称 superword tokenizer 让生成"快 20–40%"（相对上一版自己）
- **基准（changelog 前→后）**：ScreenSpot F1@0.5 **60.3→80.4**（2025-06-21）；ChartQA 74.8→**77.5**（PoT 82.2）、ScreenSpot 53.3→60.3、DocVQA 76.5→**79.3**、TextVQA 74.6→**76.3**（2025-04-15）；CountBenchQA 80→**86.4**、OCRBench 58.3→**61.2**、COCO detection 30.5→**51.2**（2025-03-27）
- 来源：https://huggingface.co/vikhyatk/moondream2 ・ https://huggingface.co/moondream/moondream2-gguf ・ https://moondream.ai/blog/smaller-faster-moondream-with-qat ・ https://moondream.ai/blog/moondream-2025-06-21-release ・ https://moondream.ai/blog/introducing-a-new-moondream-1-9b-and-gpu-support

## 3. Moondream 0.5B（端侧最小）
**官方量化口径**：**8bit 下载 479 MiB / 运行内存 996 MiB；4bit 下载 375 MiB / 运行内存 816 MiB**。Apache License。**tokens/s 未披露；基准只有图片，正文无数字**。GitHub README 称其为 "distillation target for edge devices"，但**是否由 2B 蒸馏/剪枝而来官方未明说**。→ https://moondream.ai/blog/introducing-moondream-0-5b

## 4. Moondream 3 Preview（★ 9B MoE / 2B active — 已核实）
- **架构（细粒度稀疏 MoE）**：**24 层，前 4 层 dense，其余为 MoE FFN；每 MoE 层 64 experts，每 token 激活 8 个**；MoE FFN 用 GeGLU，inner/gate dim 1024，hidden dim 2048；多头注意力带**可学习的位置与数据相关温度缩放**；视觉编码器 **SigLIP-based + multi-crop channel concatenation**；自研 SuperBPE tokenizer `moondream/starmie-v1`
- **来源不是蒸馏，是"上采样"**：由 **Moondream 2（2B dense）经 drop upcycling 初始化**（arXiv:2502.19261）
- **量化**：官方 MLX int4 版 `md3p-int4` **文件总计 6.96 GB**（MoE 专家权重 int4 affine，bits=4/group_size=64，其余保持 bf16；官方称 MoE 权重显存降约 60%）。**绝对内存需求未披露**
- **上下文 32K**（由 2k 扩展；训练默认 4096 交错长上下文样本，无独立扩展阶段，借鉴 YaRN 的位置相关温度缩放）。官方坦承 post-training 尚未充分利用长上下文
- **许可 = BSL 1.1 + Additional Use Grant（No Third-Party Service）**，HF 标 "other"；商业托管/转售需另签
- **基准**：发布博客只有图片；HF 卡上仅一条 **tiiuae/PBench average = 50.5**。**带星号的分数是随机抽 100 题而非全量评测**
- **端侧**：发布博客**无任何 tokens/s、延迟或显存数字**，官方自认 "inferences are much slower than anticipated"
- 来源：https://moondream.ai/blog/moondream-3-preview ・ https://huggingface.co/moondream/moondream3-preview ・ https://huggingface.co/moondream/md3p-int4

## 5. ★ Moondream 3.1（9B-A2B）— 2026 当代版
|#|字段|内容|
|---|---|---|
|1|全名|**Moondream 3.1**（HF `moondream/moondream3.1-9B-A2B`；Cloudflare `@cf/moondream/moondream3.1-9B-A2B`）|
|3|首发|**2026-07-07**|
|4|参数|**9B 总 / 2B 激活**|
|5|架构|MoE VLM（沿用 MD3 架构，3.1 卡未重复层数/专家数）。精度类型 F32 / BF16 / **F8_E4M3**|
|6|蒸馏来源|**自蒸馏**：在 Lens 上按任务训 LoRA（SFT+RL），再用 **on-policy distillation 把 LoRA 增益并回基座权重**。官方承认"蒸馏后的基座略逊于单个 LoRA"|
|7|量化体积|**未披露**（3.1 无官方量化仓库；新许可允许自行量化再分发）|
|8|上下文|**3.1 未重申 → 未披露**（MD3 Preview 为 32K，**不建议直接沿用到 3.1**）|
|9|许可|**Moondream Model License v1.0**（2026-07-07 生效，取代 BSL 1.1）。source-available，**非 OSI 开源**。**允许**商用、自托管、SaaS 功能、微调/量化/剪枝/合并/再分发、**边缘与端侧部署**、机器人/摄像头、客户 VPC/on-prem；**禁止**（需另签）对外提供通用 Moondream 推理或微调的托管服务。责任上限 = 12 个月付费额或 $100|
|10|端侧性能（官方口径）|**注意：官方一律用 req/s 而非 tokens/s。** 主口径 = **单卡 H100 SXM5 + batch 16 + Photon 引擎**：**平均 34.2 req/s**（Qwen3.5 9B 1.44 / SAM 3 4.78 / LocateAnything 4.26 / Gemma 4 12B 0.46）→ 官方称"比次快快 7×、比最准快 20×+"。<br>**Cloudflare 边缘**：首 token 约 **20–30 ms**，point 约 **145 ms**，detect 约 **160 ms**。<br>**Photon 1.2.0 实测（ChartQA，batch 4，direct）**：**MacBook Pro M5 Max 48GB = 4.58 req/s（MD3）/ 7.26（MD2）**；**Mac mini M2 24GB = 0.55 / 0.79**；**Mac mini M4 16GB = 0.84（仅 MD2）**。<br>**Jetson AGX Thor 64GB**：MD3 单请求约 147 ms，batch 64 = 12.05 req/s；MD2 约 152 ms / 14.53 req/s。**B200**：MD3 约 30 ms 单请求，batch64 71.27 req/s；**H100 batch64** MD3 53 / MD2 57；RTX PRO 6000 MD3 39.7。<br>**内存：官方从未给出模型显存占用数字**；文档只说 16GB M4 Mac mini "只装得下 Moondream 2，Moondream 3 权重超出统一内存"|
|11|基准|开放词表检测 F1@0.5：**COCO val 81.46（SOTA）**、**ODinW-13 93.94（SOTA）**、LVIS val 67.4（输 Qwen 71.11）；密集检测 **Dense200 74.61**、**SKU-110K 52.77**、CrowdHuman 74.5（输 SAM3 82.91）；指代检测 **RefCOCO-M val 87.1**、HumanRef val 70.39（输 Qwen 84.9）；航拍 **DOTA-v2 59.63（SOTA）**；计数 CountBench 90.35（输 Qwen 94.66）、TallyQA 74.86、**PixMo-Count val 88.68**；文档 **ChartQA 86.01（SOTA）**、DocVQA 88.6（输 Qwen 92.94）；**综合均分 77.9**。分割（2026-03，mIoU）：RefCOCO 81.8→83.2、RefCOCO+ 74.7→**79.1**、RefCOCOg 76.4→80.7、RefCOCO-M 86.9→88.2|
|12|模态|Image-Text-to-Text；query / caption / detect / point / **segment（原生 SVG mask）**|
|13|来源|https://moondream.ai/blog/moondream-3-1-beyond-benchmarks ・ https://huggingface.co/moondream/moondream3.1-9B-A2B ・ https://moondream.ai/licenses/model/1.0 ・ https://docs.moondream.ai/running-locally ・ https://moondream.ai/blog/photon-1-2-0-update ・ https://moondream.ai/blog/segmenting-update-2026-03-10|

**Photon 推理引擎（Moondream 2026 主线，非模型）**：2026-03 首发（H100 上 >60 inferences/s）→ 2026-05 加 Mac/Windows/Blackwell/Jetson Thor → 2026-06 本地版免费 → **2026-08 Photon 2.0（Apache 2.0，但编译器闭源，仅支持 H100，扩展到 Qwen3.5/3.6、Gemma 4）** → 2026-09-01 Photon 2.1 加语音识别。→ https://moondream.ai/blog/photon-2-launch ・ https://moondream.ai/blog/photon-2-1-speech-recognition

**公司**：实体 **M87 Labs, Inc.**（m87.ai），旧金山，官网标 "Proudly built in the USA"。**融资金额/估值未披露**（官网无 about/press 页）；已确认 **Felicis 为投资方，阶段标注 Seed**，创始人 **Jay Allen 与 Vikhyat Korrapati**（https://www.felicis.com/companies）。官方自述 **月下载 5M+**、GitHub 约 10k stars。云定价（2026-07 起）输出 **$1.00/M**、输入 $0.30/M。→ https://moondream.ai/

---

# 六、ARCEE AI

## 1. AFM-4.5B / AFM-4.5B-Base
|#|字段|内容|
|---|---|---|
|3|首发|**2025-06-18** 宣布 + Preview；**2025-07-29** 正式发权重|
|4|参数|**4.5B**（HF 侧栏四舍五入 "5B params"，BF16）|
|5|架构|**ArceeForCausalLM**，decoder-only Transformer；**GQA**；**ReLU² 激活替代 SwiGLU**（为便于后续稀疏化）。层数/hidden size **未披露**|
|6|蒸馏来源|**非蒸馏**，从零预训练。长上下文阶段内部用 DistillKit 做过短上下文能力回灌自蒸馏|
|7|量化体积（官方 GGUF 仓库）|BF16 **9.25 GB** / Q8_0 **4.92** / **Q4_K_M 2.92（官方示例默认，推荐）** / Q4_0 2.7 / IQ4_XS 2.56 / Q3_K_M 2.4 / Q2_K 1.89 / IQ2_M 1.7。另有 OpenVINO int4/int8|
|8|上下文|预训练 **4,096** → YaRN + ProLong + MergeKit 合并 + DistillKit 扩到 **64k**（2025-06-23）。大海捞针 32k 100% / 64k 97%。扩展成本约 700 H100-hours|
|9|许可|**现为 Apache-2.0**（README YAML + 正文均明确）。**历经三次口径变化：CC-BY-NC（计划，从未落地）→ Arcee Model License（年收入 <$175 万可商用）→ Apache-2.0**|
|10|端侧性能（官方口径，全部 llama.cpp GGUF，140 组评测）|**Intel Xeon Sapphire Rapids（EC2 c7i，16核/32线程）**：Q4_0 batch4 = **136.77 total TPS**；bf16 同配置 83.13 TPS；单请求最低 20.79 TPS。**TTFT**：小量化 <2s，bf16 batch4 = **2.075s**。<br>**AWS Graviton4（c8g，32 vCPU）**：Q4_0 batch4 **>280 TPS**，单请求约 35–40 TPS；bf16 被排除（llama.cpp 无 ARM bf16，上转 FP32 后仅约 2 TPS）。<br>**Qualcomm X1E-80-100 笔记本（12核）**：repacking 使 prefill 近乎翻倍、生成 +50%。**prefill 是短板**：Q4_0 batch1 从 0.94s(128 tok) 涨到 **10.94s(1024 tok)**；Q8_0 从 3.45s 涨到 **27.83s** → 官方建议该芯片只做短上下文，**不适合 RAG**。<br>另一篇：EC2 c8g.8xlarge Graviton4 上 8bit batch4 **>100 tok/s**，4bit **>200 tok/s**。<br>精度损失：bf16→8bit 困惑度**无影响**，8bit→4bit 仅 **+1%**。官方建议 **batch size 上限 4**；**内存占用未披露**|
|11|基准|**Base**（vs Qwen3-4B-Base / Gemma3-4B）：Winogrande **77.03**/71.6/72.45；PIQA **82.15**/78.45/79.2；MMLU 65.8/**71.69**/59.96；ARC-C 63.52/**64.33**/58.62；HellaSwag **79.48**/75/76.9。<br>**Preview instruct**（vs Qwen3-4B / Gemma3-4B-IT）：MMLU .6533/**.6985**/.577；PIQA **.815**/.746/.773；Winogrande **.704**/.664/.697；IFEval .710/**.760**/.691；ARC-E **.841**/.785/.777；ARC-C **.619**/.542/.572；HellaSwag **.796**/.684/.742。<br>⚠️ 官方自注 Preview 是 RL/KTO 之前的早期 checkpoint；**正式版 HF 卡上的 benchmark 只有图片，无文字数字**|
|12|模态|纯文本 + function calling / agentic reasoning；多语覆盖阿英法德印地意韩中葡俄西|
|13|来源|https://huggingface.co/arcee-ai/AFM-4.5B ・ https://huggingface.co/arcee-ai/AFM-4.5B-GGUF ・ https://www.arcee.ai/blog/deep-dive-afm-4-5b-the-first-arcee-foundational-model ・ https://www.arcee.ai/blog/extending-afm-4-5b-to-64k-context-length ・ https://www.arcee.ai/blog/is-running-language-models-on-cpu-really-viable ・ https://www.arcee.ai/blog/optimizing-arcee-foundation-models-on-intel-cpus|

> 训练：**8T tokens**（6.5T 通用 + 1.5T 数学/代码 midtraining，DatologyAI 策展），**512× NVIDIA H200 on SageMaker HyperPod**；栈 = 改造版 TorchTitan + Axolotl + 改造版 Verifiers。**AFM-2 不存在**；2025-07 融资稿提过 "AFM-57B MoE" 但**从未发布**。

## 2. ★ Trinity-Nano-Preview（Arcee 端侧最相关，2025-12）
|#|字段|内容|
|---|---|---|
|3|首发|**2025-12**（Trinity Manifesto，2025-12-01）|
|4|参数|**6B 总 / 1B 激活**；官方另注每 token 仅 **800M non-embedding** 参数激活。⚠️ HF 量化仓库标注不一致：`-NVFP4` 标 4B、`-FP8-Block` 标 6B|
|5|架构|**AfmoeForCausalLM（自研 `afmoe`）**：**56 层，128 routed experts + 1 shared，每 token 激活 8 个，前两层 dense**；GQA + QK-norm + gated attention（Qwen G1 配置）；**3:1 local/global 层比，RoPE 后接 NoPE**；depth-scaled sandwich norm，gamma 初始化 1/√L；sigmoid 路由 + DeepSeek-V3 的 aux-loss-free 负载均衡；**Muon 优化器**（Microsoft Dion 分布式实现）+ WSD 调度|
|6|蒸馏来源|**非蒸馏**，从零预训练。谱系 `Trinity-Nano-Base-Pre-Anneal` → `-Base` → `-Preview`。数据继承 AFM-4.5B 语料并增补数学/代码|
|7|量化体积（官方 GGUF）|BF16 **12.3 GB** / Q8_0 6.53 / Q6_K 5.06 / Q5_K_M 4.41 / **Q4_K_M 3.79（推荐）** / Q4_0 3.6 / IQ4_XS 3.38 / Q3_K_M 2.91 / Q2_K 2.29 / **IQ2_M 2.08（最小）**。需 **llama.cpp ≥ b7061**（架构 afmoe）。另有 NVFP4 / FP8-Block|
|8|上下文|**训练 256k，推理目标 128k**|
|9|许可|**OpenMDW-1.1**（Linux Foundation 开放模型分发许可）。**首发时为 Apache 2.0，2026-05-29 全家族改为 OpenMDW-1.1 并回溯适用**。官方称无 field-of-use 限制、无需单独商用许可|
|10|端侧性能|**官方未给出任何 tokens/s、TTFT 或内存数字**。表述为 "optimized for small deployments" / "pushes the limits of sparsity"；官方**不托管**该模型，只能本地跑，并警告 preview 可能不稳定。运行时：Transformers、vLLM ≥0.11.1、llama.cpp b7061+、LM Studio、Ollama、Docker Model Runner、Lemonade|
|11|基准|**未披露**（模型卡无 benchmark 表，Manifesto 也无数字）|
|12|模态|纯文本，chat-tuned|
|13|来源|https://huggingface.co/arcee-ai/Trinity-Nano-Preview ・ https://huggingface.co/arcee-ai/Trinity-Nano-Preview-GGUF ・ https://www.arcee.ai/blog/the-trinity-manifesto ・ https://www.arcee.ai/blog/trinity-is-moving-to-openmdw-1-1|

## 3. Trinity-Mini
**2025-12**；**26B 总 / 3B 激活**（⚠️ `-NVFP4` 标 14B、`-FP8-Block` 标 26B）；AfmoeForCausalLM，128 experts（8 active + 1 shared）；**上下文 128k**；**OpenMDW-1.1**（原 Apache 2.0）；GGUF：Q8_0 **27.8 GB** / Q6_K 21.5 / Q5_K_M 18.6 / **Q4_K_M 15.9（推荐）** / Q4_0 15.1 / IQ4_XS 14.2 / Q3_K_M 12.1 / Q2_K 9.43 / **IQ2_XXS 6.56**；**tokens/s 与内存未披露**；**基准只有图片，无文字数字**；定价 $0.045 输入 / $0.15 输出（每百万 token），有限速免费层；推荐采样 temp 0.15 / top_k 50 / top_p 0.75 / min_p 0.06。→ https://huggingface.co/arcee-ai/Trinity-Mini ・ https://huggingface.co/arcee-ai/Trinity-Mini-GGUF

## 4. Trinity-Large（**非端侧**，仅谱系参考）
**2026-01-27**（技术报告 arXiv:2602.17004，2026-02-19）；**约 398–400B 总 / 13B 激活**（原定 420B）；**256 routed experts + 1 shared，每 token 激活 4 个（4-of-256，1.56% 稀疏度）**，6 层 dense；60 层，model dim 3072，FFN dim 12288，48 query heads / 8 KV heads / head dim 128，3:1 local/global，local 滑窗 4096；自研 20 万词表 BPE；Muon（hidden）+ AdamW（embedding/output）；自创 **SMEBU** 负载均衡。训练 **17T tokens（其中 >8T 为合成）**，**2048× NVIDIA B300，33 天**，四模型六个月总成本 **$20M**。上下文 8,192 → 256k 训练 → **512k 推理**（大海捞针 256K 0.994 / 512K 0.976 / 1M 0.42）。**OpenMDW-1.1**。基准（Preview vs Llama 4 Maverick）：MMLU **87.2**/85.5；MMLU-Pro 75.2/**80.5**；GPQA-D 63.3/**69.8**；AIME2025 **24.0**/19.3。**Trinity-Large-Thinking（2026-04-01）**：GPQA-D **76.3** / AIME25 **96.3** / Tau2-Telecom 94.7 / PinchBench 91.9 / MMLU-Pro 83.4 / SWE-bench Verified 63.2 / BCFLv4 70.1。⚠️ 卡内 highlights 写 "98.2% on LiveCodeBench"，但同页对比表把 98.2 归给 GLM-5 的 Tau2-Telecom —— **该数字自相矛盾，勿引用**。→ https://www.arcee.ai/blog/trinity-large ・ https://www.arcee.ai/blog/trinity-large-thinking ・ https://huggingface.co/papers/2602.17004

## 5. SuperNova / 早期小模型（蒸馏与合并谱系）
|模型|参数|蒸馏/合并父模型|许可|基准|来源|
|---|---|---|---|---|---|
|**Llama-3.1-SuperNova-Lite**|**8B**|**蒸馏自 Llama-3.1-405B-Instruct**（离线 logits），基座 Llama-3.1-8B-Instruct；指令数据用 EvolKit|llama3|Open LLM LB 均分 **29.73**（IFEval 80.17 / BBH 31.57 / MATH L5 15.48 / GPQA 7.49 / MuSR 11.67 / MMLU-PRO 31.97）|https://huggingface.co/arcee-ai/Llama-3.1-SuperNova-Lite|
|**Arcee-SuperNova-Medius**|**14B**（HF 标 15B）|**跨架构蒸馏**：教师 = Qwen2.5-72B-Instruct **+** Llama-3.1-405B-Instruct；基座 Qwen2.5-14B；`mergekit-tokensurgeon` 词表移植 + 双轨融合 + EvolKit|**apache-2.0**|自测均分 **0.480**（IFEval .832 / BBH .631 / GPQA .359 / MMLU-Pro .502）；Open LLM LB 均分 **37.22**|https://huggingface.co/arcee-ai/SuperNova-Medius|
|**Arcee-SuperNova-v1**|70B|405B→70B 蒸馏 + EvolKit 版 + DPO 版三者合并|Llama 3 Community|未披露|https://www.arcee.ai/blog/releasing-five-new-open-weights-models|
|**Arcee-Lite**|正文 **1.5B**（HF 标 2B）⚠️|**蒸馏自 Phi-3-Medium**，qwen2 架构，DistillKit|**apache-2.0**|**MMLU 55.93**；有 GGUF；官方定位 "Embedded systems / Mobile / Edge computing"|https://huggingface.co/arcee-ai/Arcee-Lite|
|**Homunculus**|12B|**蒸馏自 Qwen3-235B**，骨干 Mistral-Nemo-Base-2407，保留 /think 与 /nothink|apache-2.0|未披露|同上|
|**Caller**|32B|Qwen-2.5-32B 继续训练（工具调用）|apache-2.0|未披露|同上|
|**GLM-4-32B-Base-32K**|32B|GLM-4-32B-Base-0414 上做上下文扩展|MIT|**32k**（原有效约 8,192），标准基准约 +5%|同上|

**公司**：**2025-07-30** 宣布新一轮战略融资，**金额未披露**；领投 **Prosperity7 Ventures + M12（微软风投）**，跟投 Hitachi Ventures、Wipro、JC2 Ventures、Samsung Next 等。**2026-06-09** 与 Hugging Face 达成"数百万美元级战略合作"，Hub 成为唯一分发平台（累计 200+ 模型）。生态工具 **MergeKit**（IBM 用于 Granite 4.0 开发）、DistillKit、EvolKit、Arcee Fusion。→ https://www.arcee.ai/blog/arcee-ai-announces-new-strategic-funding-round ・ https://www.arcee.ai/blog/why-we-made-hugging-face-the-home-for-everything-we-build

---

# 七、NEXA AI（★ 已并入 Qualcomm AI Hub）

**公司状态（2026-09-09 实测）**：`nexa.ai` 与 `nexa.ai/blogs` **均 301 重定向至 `aihub.qualcomm.com/genai`**，页面标题 **"Nexa AI Is Now Part of Qualcomm AI Hub"**；NexaSDK 仓库指向 **github.com/qualcomm/geniex**；文档仍在 docs.nexa.ai。**Qualcomm 官方新闻稿列表（2026-06~09）中无该收购公告，交易日期与条款未披露。** 时间线可推断：2025-09-11 联合发 OmniNeural-4B → 2025-12-02 NexaSDK for Android → **2026-01-05 作为 Liquid LFM2.5 的 NPU 发布伙伴** → 2026-03-04 Qualcomm+Nexa+Docker 面向 IoT/机器人 → 2026-03-19 Snapdragon X PC 本地 agent → **2026-07-07 GenieX 开发者预览** → 现已完全并入。HF 组织 `NexaAI` 仍在更新（2026-02 仍有 NPU 模型上传）。

## 1. OmniNeural-4B（NPU 原生多模态，其自研旗舰）
|#|字段|内容|
|---|---|---|
|3|首发|**2025-09**（与 Qualcomm 联合博客 2025-09-11；HF 模型 Nov 7, 2025）|
|4|参数|**4B（仅从型号名推断，模型卡未明确给出精确值）→ 精确值未披露**|
|5|架构|**为 NPU 协同设计的多模态模型**：NPU 友好算子（**ReLU 优先于 GELU/SiLU**）、稀疏与小张量乘法、**卷积层优先于线性层**、hardware-aware attention、**静态图执行以保证可预测延迟**|
|6|蒸馏来源|未披露|
|7|量化体积|**未披露**（模型卡未提量化）|
|8|上下文|**未披露**（config.json 在 HF 上标记为 "Invalid JSON"）|
|9|许可|**页面自相矛盾**：侧栏元数据 `cc-by-4.0`，正文写 **CC BY-NC 4.0（禁商用，需 dev@nexa.ai 另签）**。→ 按正文取 **CC BY-NC 4.0**|
|10|端侧性能（官方口径）|**全是相对加速比，无任何绝对 tok/s、TTFT、内存数字**：音频编码 **快 9×（vs Whisper encoder）**、图像编码 **快 3.5×（vs SigLIP encoder）**、整体 **比非 NPU-aware 模型快 20%**。**仅能在 Qualcomm NPU 上运行**；演示硬件 **Samsung S25 Ultra（Snapdragon NPU）与 Snapdragon PC**|
|11|基准|**只有人类偏好评测，无标准 benchmark 分数**：视觉上对 Apple Foundation、Gemma-3n-E4B、Qwen2.5-Omni-3B **约 75% 的 prompt 胜或平**；音频"明显领先"|
|12|模态|**文本 + 图像 + 音频统一模型**（Any-to-Any）；支持多图推理、多音频对比、图+文→函数调用。英文优化|
|13|来源|https://huggingface.co/NexaAI/OmniNeural-4B ・ Qualcomm 博客 "OmniNeural-4B & NexaML: innovating Multimodal AI on Qualcomm Hexagon NPU"（2025-09-11，qualcomm.com）|

## 2. OmniAudio-2.6B
|#|字段|内容|
|---|---|---|
|3|首发|**2024-12**（集合 updated 2025-11-25，精确发布日未在页面披露）|
|4|参数|**2.6B**（⚠️ HF 元数据框写 "0.6B params"，页面自相矛盾）|
|5|架构|**Gemma-2-2b + Whisper turbo + 自研 projector 模块**，融合为单一架构（非 ASR+LLM 串联）；architecture tag `omniaudio-instruct-encoder`；GGUF|
|6|蒸馏来源|**组合自 Gemma-2-2b + Whisper turbo**（非蒸馏）|
|7|量化体积|**Q4_0 = 1.63 GB；Q4_K_M = 1.71 GB；Q8_0 = 2.78 GB**。Q4_K_M 需 **1.30 GB RAM + 1.60 GB 存储**（正文 1.60GB 与列表 1.71GB 略有出入）|
|8|上下文|未披露|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径）|测试机 **2024 Mac Mini M4 Pro**：OmniAudio 经 Nexa SDK **FP16 GGUF = 35.23 tok/s**，**Q4_K_M = 66 tok/s**；基线 Qwen2-Audio-7B-Instruct 经 Transformers **6.38 tok/s** → 官方称 **"快 5.5×–10.3×"**|
|11|基准|**无准确率基准**（无 ASR WER）；只有上述吞吐数字|
|12|模态|Audio-Text-to-Text（英文）|
|13|来源|https://huggingface.co/NexaAI/OmniAudio-2.6B|

> 训练：三阶段 —— MLS 英文 10k 转录预训练（带 transcribe 特殊 token）→ 合成对话 SFT → **以 GPT-4o 为参考、Gemma2 文本输出为质量标准的 DPO**。

## 3. OmniVLM-968M
|#|字段|内容|
|---|---|---|
|3|首发|**2024-11**（v2 GGUF 2024-11-22，v3 2024-11-27；论文 arXiv:2412.11475，2024-12-16）|
|4|参数|**968M 总参**（GGUF 语言骨干标 0.5B）|
|5|架构|**LLaVA 式**：语言模型 **Qwen2.5-0.5B-Instruct** + 视觉编码器 **SigLIP-400M（384 分辨率，14×14 patch）** + MLP 投影层；架构 tag `qwen2`。核心卖点 **9× token 缩减：图像 token 从 729 降到 81**（节省只发生在 LLM 骨干，不含编码器/投影层）|
|6|蒸馏来源|组合自 Qwen2.5-0.5B-Instruct + SigLIP-400M|
|7|量化体积|**Q8_0 = 531 MB；F16 = 994 MB**|
|8|上下文|未披露|
|9|许可|**Apache-2.0**|
|10|端侧性能（官方口径）|**M4 Pro MacBook** 上为 1046×1568 图像生成描述：**<2s 处理时间，988 MB RAM + 948 MB 存储**。**无 tok/s**|
|11|基准（v2 / v1 / nanoLLAVA）|ScienceQA(Eval) **71.0**/62.2/59.0；ScienceQA(Test) **71.0**/64.5/59.0；POPE **93.3**/89.4/84.1；MM-VET **30.9**/27.5/23.9；ChartQA(Test) **61.9**/59.2/NA；MMMU(Test) **42.1**/41.8/28.6；MMMU(Eval) **40.0**/39.9/30.4|
|12|模态|图像+文本→文本|
|13|来源|https://huggingface.co/NexaAI/OmniVLM-968M ・ arXiv:2412.11475|

## 4. Octopus v2（函数调用，2024）
|#|字段|内容|
|---|---|---|
|3|首发|**2024-04-02**（arXiv:2404.01744，最新 v6 为 **2026-07-20**）|
|4|参数|**2B**（HF 页面元数据显示 "3B params"，⚠️ 不一致）|
|5|架构|**微调自 google/gemma-2b**；核心方法是把函数映射到**功能性 token**，使上下文长度减少 95%|
|6|蒸馏来源|基座 **Gemma-2B**|
|7|量化体积|未披露|
|8|上下文|未披露|
|9|许可|**CC BY-NC 4.0**（模型）；论文 CC BY-NC-SA 4.0|
|10|端侧性能（官方口径）|**平均推理延迟 0.38s**（Phi-3 为 10.2s）；比 "Llama7B + RAG" 方案**快 36×（单卡 A100 上测）**、准确率高 31%；**比 GPT-4-turbo 快 168%**（后者跑在 A100/H100 集群上）。⚠️ **所谓"端侧"模型的延迟对比全部在 A100 上做，不是手机**|
|11|基准|函数调用准确率 **99.5%**（各基准数据集 98%–100%）；Phi-3 45.7%；Apple OpenELM 无法生成函数调用（MMLU 26.7）；Gemma-2B MMLU 42.3|
|12|模态|纯文本（设备端 API/函数调用）|
|13|来源|https://arxiv.org/abs/2404.01744 ・ https://huggingface.co/NexaAIDev/Octopus-v2|

**Nexa 2026 产出重心已转向 NPU 部署资产**（非自研基座）：HF 组织 2026 年上传的是 **LFM2-24B-A2B-GGUF、LFM2.5-1.2B-npu、Ministral-3-3B-npu / -ANE、Gemma3-1B-ANE、Qwen3-0.6B-ANE、Granite-4-Micro-ANE、yolo26{n,s,m,l,x}-npu-mobile、paddleocr-npu-mobile、depth-anything-v2-npu、table-transformer-detection-npu** —— 即**把第三方模型编译到 Qualcomm Hexagon NPU 与 Apple Neural Engine**。另有论文 **"AutoNeural: Co-Designing Vision-Language Models for NPU Inference"（arXiv:2512.02924）**。→ https://huggingface.co/NexaAI

---

# 八、其他美国端侧模型公司（核查后的取舍）

- **Deep Cogito** — 官网（deepcogito.com）与落地页**不列任何模型、尺寸、日期或许可**，定位是 "building general superintelligence"，**不是端侧导向**。→ **建议不纳入端侧地图**。
- **Prime Intellect / Together AI / Nous Research** — 均非端侧模型定位（分布式训练 / 云推理 / 通用开源微调）。→ **不纳入**。
- **Qualcomm（收编 Nexa 后）** — 本轮实质上从"部署工具商"变成了掌握 OmniNeural 自研 NPU 原生多模态模型 + NexaSDK/GenieX 运行时的**端侧全栈方**，建议在图上单独标注这条并购线。
- **Apple** — 非创业公司，但其 on-device Foundation Model（约 3B）与 OpenELM 是端侧对照系；本轮未展开核查，如需可另开一轮。

> ⚠️ 本轮 **WebSearch 配额已在 200/200 用尽**（含子代理消耗），后续补充只能靠已知 URL 的 WebFetch。以下三项未能闭合：Nexa AI 被 Qualcomm 收购的**确切日期与条款**；Moondream 的**融资金额**；Moondream **3.1 的上下文长度**。

---

# 九、口径陷阱总汇（建议直接做成图上的脚注区）

### A. 架构口径 vs 营销口径
1. **Liquid AI "非 Transformer / 液态网络"**——LFM 一代（2024-09，未开源）明确宣称 *"first time a non-GPT architecture significantly outperforms transformer-based models"*；但 LFM2 起官方自己披露的层配置是 **10 个门控短卷积 + 6 个 GQA 注意力块**（2.6B 为 22 conv + 8 attn，24B-A2B 为 attn:conv≈1:3），**块内还有 SwiGLU + RMSNorm**。**它含注意力，是混合架构，不是无注意力架构。** 官网 2026 版已悄悄删掉 "non-GPT / beyond Transformers" 措辞。技术报告的中性表述是 *"gated short convolutions with a small number of GQA blocks"*。
2. **Zamba2 的 "KV cache 小 6×"** 来自 **1:6 注意力:Mamba 的结构性计数**，不是实测内存数字，且只在长上下文下才兑现。
3. **Nexa OmniNeural-4B 的"NPU 原生"** 具体指的是算子选择（ReLU 代 GELU、卷积代线性、静态图），不是一种新架构范式。

### B. prefill vs decode（最容易被误引的一类）
4. **Liquid "CPU 上比 Qwen3 快 2×" 同时覆盖 prefill 与 decode**，但原始 2025-07 博客**正文无绝对数字**，只有图表图片；绝对数字要到 2026-01 的 LFM2.5 才有。**Prefill 与 decode 的倍率差异极大**：LFM2.5-1.2B 在 Galaxy S25 Ultra 上 prefill 335 vs Qwen3-1.7B 的 181（1.85×），decode 70 vs 40（1.75×）；但在 Ryzen HX370 上 prefill 2975 vs 2008（1.48×），decode 116 vs 62（1.87×）——**不能笼统说"2×"**。
5. **Zamba2-VL "TTFT 低一个数量级"** 明确是 **LLM 骨干在 32k token 上的 prefill**，不含完整 VLM 流水线，**也完全不代表 decode 吞吐**。SSM 的线性 prefill 在长 prefill 下天然放大优势。
6. **Arcee AFM-4.5B 在 Qualcomm X1E 笔记本上 decode 数字很漂亮，但 prefill 是暗雷**：Q8_0 输入 1024 token 时 **TTFT 高达 27.83 秒**。只报 tokens/s 会完全掩盖这点，官方自己因此建议该芯片"只做短上下文，不适合 RAG"。
7. **Arcee 的 "136.77 TPS" / ">280 TPS" 是 batch 4 的 total throughput（decode 汇总）**，同配置**单请求只有 20–40 TPS**。端侧对比表必须用 per-request 数字。
8. **Cartesia Sonic-3.6 的 "132 字符/秒" 是生成吞吐，"<90ms" 是首音延迟**，两者不可混谈；"2×" 的分母是内部前代配置 "v3 Conversational"，不是竞品。

### C. 基线选择（cherry-picking）
9. **Zyphra 每个尺寸换一个基线，且从不给硬件**：1.2B 对 **Phi-1.5-1.3B**（2023 年的弱模型）、2.7B 对 **Phi3-3.8B**、7B 对 **Llama3-8B**。**三组比值之间彼此不可比**，且没有一组给出绝对 tok/s / ms / 硬件。
10. **Liquid 只测 Qwen3 的非推理模式**（理由是边缘输出预算 <4096 token）——在推理型任务上这是对 Qwen3 不利的设定。
11. **Moondream 3.1 "比次快模型快 7×、比最准快 20×+" 是跨引擎对比**：自家用 **Photon**，Qwen3.5/Gemma4/LocateAnything 用 vLLM，SAM 3 用 HF Transformers。**倍率里包含引擎优势，不是纯模型差异。**
12. **Nexa OmniAudio "快 5.5×–10.3×"** 是 **自家 Nexa SDK GGUF vs 竞品跑 HF Transformers**，同样是引擎差异叠加。
13. **Octopus v2 号称端侧模型，但延迟对比全部在单卡 A100 上做**，不是手机。
14. **多数"提速"的基线是自己的上一版**：Moondream 生成 +20–40%、分割 +40%、QAT +34%（绑定 **RTX 3090**）；Liquid LFM2.5 系列的代际提升表同理。
15. **Photon B200 的 "1.49×/1.23× faster" 基线是 H100 batch 64** —— 是硬件代差，不是软件优化。
16. **Liquid Nanos "LFM2-1.2B-Extract 胜过 Gemma 3 27B"** 基于 **5000 份文档的内部评测 + LLM 裁判**，非公开基准。

### D. 参数量口径
17. **Moondream 逐版本锁定**：moondream1 正文 1.6B / 元数据 2B；**moondream2 官方博客写 1.9B，HF 写 2B，网传的 "1.86B" 在任何一手页面都不存在** → 应记未披露；Moondream 3 与 3.1 均为 **9B 总 / 2B 激活**（三处一致，已核实）。
18. **HF 侧栏参数数受量化影响，不可当参数量引用**：`moondream-2b-2025-04-14-4bit` 显示 1B、`moondream2-gguf`（F16）显示 1B；Arcee `Trinity-Mini-NVFP4` 显示 14B（实为 26B/3B）、`Trinity-Nano-Preview-NVFP4` 显示 4B（实为 6B/1B）、`Trinity-Large-Thinking-W4A16` 显示 57B（实为约 398B/13B）；SmolLM2-1.7B 显示 2B；Nexa OmniAudio-2.6B 显示 0.6B。
19. **MoE 命名藏激活量**：Zamba2-7B 实为 **7.4B**；ZAYA1-8B 实为 **8.4B 总 / 0.76B 激活**（名字取总参，隐藏了极小的激活参数）；Zamba2-VL 的 HF "2B params" 包含视觉编码器。

### E. 许可口径（会随版本翻转）
20. **Moondream**：moondream1 **仅研究禁商用** → moondream2 & 0.5B **Apache-2.0** → MD3 Preview **BSL 1.1 + No Third-Party Service** → **MD3.1 = Moondream Model License v1.0（source-available，非 OSI 开源，允许端侧/商用/再分发，禁"对外提供通用 Moondream 托管推理服务"）**。**"Moondream 是 Apache 2.0" 只对 2B/0.5B 成立。** 另注意 `md3p-int4` 在 HF 上标 apache-2.0，与母模型 BSL 冲突，疑为标注错误。
21. **Arcee AFM-4.5B**：**CC-BY-NC（计划，未落地）→ Arcee Model License（$175 万营收线）→ 现为 Apache-2.0**。Trinity 家族：**Apache 2.0 → OpenMDW-1.1（2026-05-29，回溯适用）**。
22. **Liquid "open-weight" ≠ 开源**：正式名为 **LFM Open License v1.0（tag `lfm1.0`）**，"基于 Apache 2.0"，**年收入 <$1000 万可商用，超过需另签**。博客一律只写 "Open-weight — download, fine-tune, and deploy without restrictions"，**许可名只在 HF 模型卡上**。
23. **Nexa OmniNeural-4B 页面许可自相矛盾**（元数据 cc-by-4.0 vs 正文 CC BY-NC 4.0），按正文取 **非商用**。

### F. "数字只存在于图片里"
24. 以下模型的官方基准/吞吐**只有图表图片，正文无数字**，凡标"未披露"多因此：LFM2 原始博客的 CPU 吞吐图、LFM2-8B-A1B 的全部速度数字、LFM2-24B-A2B 的全部基准与 CPU 吞吐、SmolLM/SmolLM2 的内存与基准图、Moondream 3 Preview / Moondream 0.5B / AFM-4.5B 正式版 / Trinity-Mini / Trinity-Nano 的基准、Cartesia Llamba 的 M3 Pro 端侧曲线、Photon 2.0 的全部对比图。
25. **Moondream 3 Preview 的带星号分数是"随机抽 100 题"，不是全量评测。**

### G. "端侧"是营销位而非已发布规格
26. **Zyphra 的 2026 旗舰（ZAYA1 / ZONOS2）全是云端（AMD MI300X / 需 NVIDIA GPU），没有 edge 构建**；真正 edge 定位的是 Zamba2-VL-1.2B/2.7B。
27. **Cartesia 官网有 "on-device" 部署图块，但其开源端侧线（Rene / Llamba / Edge）自 2025 年起停更**，"Sonic On-Device" 是 2024 年私测，**至今无公开规格/硬件/延迟**。
28. **Arcee Trinity-Nano-Preview 定位端侧但官方零个 tokens/s / TTFT / 内存数字**，且官方明说自己不托管、preview 可能不稳定。

Sources: [huggingface.co/blog/smollm3](https://huggingface.co/blog/smollm3) · [huggingface.co/blog/smolvlm2](https://huggingface.co/blog/smolvlm2) · [arxiv.org/abs/2506.01844](https://arxiv.org/abs/2506.01844) · [liquid.ai/blog/liquid-foundation-models-v2](https://www.liquid.ai/blog/liquid-foundation-models-v2-our-second-series-of-generative-ai-models) · [arxiv.org/abs/2511.23404](https://arxiv.org/abs/2511.23404) · [liquid.ai/blog/introducing-lfm2-5](https://www.liquid.ai/blog/introducing-lfm2-5-the-next-generation-of-on-device-ai) · [liquid.ai/blog/lfm2-5-2-6b](https://www.liquid.ai/blog/lfm2-5-2-6b) · [zyphra.com/our-work/zamba2-vl](https://www.zyphra.com/our-work/zamba2-vl) · [cartesia.ai/blog/llamba-distillation](https://cartesia.ai/blog/llamba-distillation) · [moondream.ai/blog/moondream-3-1-beyond-benchmarks](https://moondream.ai/blog/moondream-3-1-beyond-benchmarks) · [huggingface.co/arcee-ai/Trinity-Nano-Preview](https://huggingface.co/arcee-ai/Trinity-Nano-Preview) · [huggingface.co/NexaAI/OmniNeural-4B](https://huggingface.co/NexaAI/OmniNeural-4B) · [aihub.qualcomm.com/genai](https://aihub.qualcomm.com/genai)