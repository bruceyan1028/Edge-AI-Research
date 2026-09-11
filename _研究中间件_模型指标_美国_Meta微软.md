# 研究中间件：美国端侧模型型号参数 · Meta + Microsoft

> 本文件为《端侧模型技术路线与指标对比·数据支撑清单》的中间产物，合并进正式清单后可删除。
> 检索日期：2026-09-09。所有"官方口径"均指厂商自报数字，已注明测试硬件。

---

## META

### 1. Llama 3.2 1B Instruct（BF16 原版）
- 公司：Meta ｜ 首发：2024-09-25 ｜ 参数量：**1.23B**
- 架构：Dense Transformer，GQA + shared/tied input-output embeddings
- 蒸馏：**是** — 从 Llama 3.1 8B/70B 剪枝 + 知识蒸馏；预训练用 8B/70B logits 作 token-level targets
- 量化：原版 BF16，2358 MB（ExecuTorch .pte）
- 上下文：**128K** ｜ 许可：Llama 3.2 Community License（自定义商用协议，非 OSI）
- 官方端侧性能（官方口径）：**Android OnePlus 12**，ExecuTorch + ARM CPU backend，adb binary
  - decode **19.2 tok/s**、prefill **60.3 tok/s**、TTFT **1.0 s**（prompt len=64）、RSS **3185 MB**
- benchmark：MMLU(5) 49.3；IFEval 59.5；GSM8K(CoT,8) 44.4；MATH 30.6；ARC-C 59.4；GPQA 27.2；HellaSwag 41.2；BFCL V2 25.7；MGSM 24.5
- 模态：纯文本（官方支持 8 语种）
- 来源：https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct

### 2. Llama 3.2 1B Instruct — SpinQuant INT4_EO8 / QLoRA INT4_EO8
- 公司：Meta（与 Arm、Qualcomm、MediaTek、HF、Ollama 合作）｜ 首发：**2024-10-24**
- 参数量：1.23B ｜ 架构：同原版
- **量化方案（关键口径，三段式混合精度）**：
  - transformer block 内 linear 层：权重 **4-bit groupwise, group size=32**；激活 **8-bit per-token 动态**
  - classification 层：权重 8-bit per-channel；激活 8-bit per-token 动态
  - embedding：**8-bit per-channel**（名字里 "EO8" = Embedding/Output 8-bit）
  - SpinQuant 路线：PTQ + GPTQ，旋转矩阵微调 100 iter / 800 条 WikiText-2 / seq 2048，GPTQ 用 128 条样本。**不需训练数据**，1B 仅 1.7 GPU 小时
  - QLoRA 路线：BF16 checkpoint → 带 QAT 的 SFT → 冻结 backbone → 在所有 block 上训 LoRA adaptor（**adaptor 权重与激活保持 BF16**）→ DPO。torchao 实现，Meta 称质量最好
  - 体积：1B SpinQuant .pte = **1083 MB**（−54.1% vs BF16 2358 MB）
- 上下文：**8K**（从 128K 砍下，官方："prioritized short-context applications up to 8K"，手机内存受限）。长上下文基准标 N/A
- 许可：Llama 3.2 Community License
- 官方端侧性能（官方口径，**OnePlus 12 / ExecuTorch / ARM CPU，非 NPU**）：
  - 1B SpinQuant：decode **50.2 tok/s**(2.6×)、prefill **260.5 tok/s**(4.3×)、TTFT **0.3 s**(−76.9%)、RSS **1921 MB**(−39.7%)
  - 1B QLoRA：decode **45.8 tok/s**、TTFT 0.3 s
  - 官方明说 "NPU enablement for Llama 1B/3B is still in progress with partners"
  - 另在 Samsung S24+（1B/3B）、S22（1B）验证 similar relative performance；**iOS 只验证精度未测性能**
- benchmark（bf16 → SpinQuant / QLoRA）：MMLU 49.3→47.3/49.0；IFEval 59.5→58.4/55.6；GSM8K 44.4→40.6/46.5；MATH 30.6→25.3/31.0；ARC-C 59.4→57.0/60.7；**BFCL V2 25.7→15.9/23.7（工具调用掉最狠）**；MGSM 24.5→18.2/24.4。均值：BF16 36.1、QLoRA 35.7(−1.13%)、SpinQuant 33.1
- 来源：https://ai.meta.com/blog/meta-llama-quantized-lightweight-models/ ；https://pytorch.org/blog/unleashing-ai-mobile/

### 3. Llama 3.2 3B Instruct（+ SpinQuant/QLoRA INT4_EO8）
- 首发：2024-09（原版）/ 2024-10（量化版）｜ 参数量：**3.21B** ｜ 架构：Dense + GQA + shared embeddings
- 蒸馏：是，同 1B（Llama 3.1 8B/70B 剪枝 + 蒸馏）
- 量化：同三段式方案；SpinQuant 训练 2.4 GPU 小时。体积 BF16 6129 MB → SpinQuant **2435 MB**（−60.3%）
- 上下文：原版 128K；**量化版 8K** ｜ 许可：Llama 3.2 Community License
- 官方端侧性能（OnePlus 12 / ExecuTorch / ARM CPU）：
  - BF16：decode 7.6 tok/s、prefill 21.2 tok/s、TTFT 3.0 s、RSS 7419 MB
  - **SpinQuant：decode 19.7 tok/s(2.6×)、prefill 89.7 tok/s(4.2×)、TTFT 0.7 s(−76.4%)、RSS 3726 MB(−49.8%)**
- benchmark（3B bf16 → SpinQuant）：MMLU 63.4→62.0；IFEval 77.4→73.5；GSM8K 77.7→75.7；MATH 48.0→45.3；ARC-C 78.6→77.6；BFCL V2 67.0→60.1
- 来源：https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct-SpinQuant_INT4_EO8

### 4. MobileLLM 系列（ICML 2024）
- 公司：Meta FAIR ｜ 首发：论文 2024-02（arXiv:2402.14905）
- 参数量：124.6M / 345.3M / 603.1M / **1.01B** / 1.51B（+ MobileLLM-LS 层共享变体）
- 架构：Dense auto-regressive Transformer。官方四要素："SwiGLU"、"**deep and thin architectures**"（深而窄）、"embedding sharing"、"grouped-query attention"。LS 变体额外用 block-wise layer sharing
  - 配置：1B = 54 层 / 20 heads / 5 KV heads / dim 1280；1.5B = 54 层 / 25 heads / 5 KV heads / dim 1600
- 蒸馏：**否**，从零训练（1T tokens/模型）
- 量化：官方未提供量化 checkpoint（**未披露**）
- 上下文：**2K**（全系列）｜ 许可：**FAIR Noncommercial Research License**（仅非商业研究，gated）
- 官方端侧性能：**未披露**（无 tok/s / 硬件）。训练成本 32×A100-80G，125M≈3 天、1B≈12 天、1.5B≈18 天
- benchmark（zero-shot commonsense 8 任务均值）：125M 46.3(LS 47.0)；350M 51.3(LS 52.1)；600M 54.3；1B 57.3；1.5B 59.4
- 来源：https://huggingface.co/facebook/MobileLLM-1B ；https://arxiv.org/abs/2402.14905

### 5. MobileLLM-R1（2025-09）
- 公司：Meta FAIR ｜ 首发：**2025-09-12**（技术报告 arXiv:2509.24945，09-29）
- 参数量：140M / 360M / **949M**（各有 base 与 post-trained 版）
- 架构：Dense Transformer；950M = 22 层 / 24 heads / 6 KV heads(GQA) / dim 1536 / FFN 6144 / vocab 128K / 输入输出 embedding 共享。HF 架构 tag 为 `llama4_text`
- 蒸馏：**部分是** — 仅 mid-training 阶段用知识蒸馏，**teacher = Llama-3.1-8B-Instruct**，最小化师生 logits KL 散度；预训练本身随机初始化
- 量化：官方**未披露**量化 checkpoint
- 上下文：base **4K**；post-trained **32K** ｜ 许可：**FAIR Noncommercial Research License v1**（非商业，gated）
- 官方端侧性能：**未披露**。官方只强调数据效率 "<5T total training tokens"（≈Qwen3-0.6B 的 1/9）
- benchmark（post-trained 950M）：**MATH500 74.0**（Qwen3-0.6B 73.0）；GSM8K 67.5；AIME'24 15.5；AIME'25 16.3；LiveCodeBench-v6 19.9
- 模态：纯文本，**非通用对话模型**，官方定位数学 / Python&C++ 代码 / 科学题
- 来源：https://huggingface.co/facebook/MobileLLM-R1-950M ；https://arxiv.org/abs/2509.24945

### 6. Muse Glimmer 30B（2026-08，PC 端侧可跑，手机不行）
- 公司：Meta Superintelligence Labs ｜ 首发：**2026-08-10**
- 参数量：**30B**（第三方称 dense；**Meta 官方博文未明确 dense 还是 MoE** → 官方口径未披露）
- 架构：官方仅称 "compact architecture" + 专用 **perception encoder**（interleaved text & images）。注意力类型/层数**均未披露**。配套发布基于 **DFlash** 的 drafter 模型做投机解码
- 蒸馏：**是** — 预训练对 **Muse Spark** 输出做 logit distillation；后训练 SFT + on-policy distillation + RL
- 量化：全精度需 **>55 GB**；约 4-bit 量化后语言模型 **<20 GB**，加 KV cache + perception encoder + drafter 可塞进 **24GB / 32GB 显存包络**。官方 benchmark 有 **"K-Quant-17GB"** 变体
- 上下文：Meta 官方**未披露**；第三方（VentureBeat）报 128K —— 需谨慎
- 许可：**Apache 2.0**（Meta 首个用 OSI 标准许可发布的前沿模型，无 7 亿 MAU 限制），HF ungated
- 官方端侧性能：投机解码加速 **RTX 5090 3.1× / M5 Max 1.8× / M4 Max 1.5×**。绝对 tok/s **未披露**
- benchmark：官方对比 Gemma4-31B、Qwen3.6-27B（数值在官方图片里，正文未给）。第三方转述：MCP Atlas 75.5 vs 62.5；SWE-Bench Verified 76.0 vs 77.2；TerminalBench 2.1 51.7 vs 60.7；OSWorld-Verified 65.9 vs 75.6
- 模态：**多模态输入（文本+图像），文本输出**；100+ 语言；可选推理强度档位
- 端侧运行时：Ollama、LM Studio、Unsloth；llama.cpp、ExecuTorch、MLX。硬件伙伴 AMD、Arm、Dell、Intel、NVIDIA
- 来源：https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model

### Meta 排除项
- **Llama 4 Scout/Maverick/Behemoth 不属端侧**：Scout 109B总/17B激活 MoE，10M 上下文，int4 仍需 ≈55 GB VRAM（单张 H100，非消费终端）。MoE 虽只激活 17B，但**推理时全部权重必须驻留内存**。**无官方 "Llama 4 mini"**；截至 2026-09 Meta 手机级官方模型仍是 Llama 3.2 1B/3B
- **Meta 智能眼镜无官方命名的本地 LLM**：官方口径是翻译/导航/助手需配对手机 + Meta AI App + 网络（走云端）。2026 年绑定眼镜的 Muse Spark 是**云端**助手模型。眼镜本地确定在跑的只有唤醒词检测、显示控制、Neural Band 的 EMG 手势解码（规格未披露）
- **未证实待核**：第三方称 "Meta 2026-08-12 开放 Llama 4 405B 权重"、"Muse Glimmer 上下文 128K"、"AR1+ Gen 1 NPU 本地跑 Llama 1B" —— 均无一手来源

---

## MICROSOFT

### 9. Phi-4-mini-instruct (3.8B)
- 首发：**2025-02** ｜ 参数量：**3.8B**
- 架构：**Dense decoder-only Transformer**。相对 Phi-3.5-mini 三处变化："**200K vocabulary、grouped-query attention、shared input and output embedding**"。层数未披露
- 蒸馏：官方未称蒸馏自更大模型；靠 5T 高质量/合成数据训练
- 量化：官方 ONNX 仓库提供 **INT4 RTN（Round-To-Nearest），block size 32**：`cpu-int4-rtn-block-32-acc-level-4`（CPU/mobile）、`gpu-int4-rtn-block-32`（CUDA & DirectML 共用）。**该仓库无 NPU/QNN target，也无 AWQ**。文件体积未列
- 上下文：**128K** ｜ 许可：**MIT**
- 官方端侧性能（官方口径，ONNX INT4 vs PyTorch）：RTX 4090 **260.045 tok/s**(5× fp16)；**Intel Core Ultra 7 165H 笔记本 CPU 4.863 tok/s**(2.8×)；Intel i7 3.474 tok/s(4.85×)；Xeon Platinum 8272CL 16.89 tok/s(10×)；8573B 23.978 tok/s(5.35×)；AMD EPYC 7763v 19.884 tok/s(12.4×)。**TTFT / 内存占用未披露**
- benchmark：MMLU(5) **67.3**；MMLU-Pro 52.8；GSM8K(8,CoT) **88.6**；MATH **64.0**；Arena Hard 32.8；BBH 70.4；ARC-C(10) 83.7；GPQA 25.2；HellaSwag(5) 69.1；MGSM 63.9；**总均值 63.5**
- 模态：纯文本（支持 function calling），23 语种
- 训练：5T tokens、512×A100-80G、21 天、数据截止 2024-06
- 来源：https://huggingface.co/microsoft/Phi-4-mini-instruct ；https://huggingface.co/microsoft/Phi-4-mini-instruct-onnx

### 10. Phi-4-multimodal-instruct (5.6B)
- 首发：**2025-02** ｜ 参数量：**5.6B**
- 架构：以 **Phi-4-mini-instruct 为语言主干**，外接独立 vision encoder 与 speech encoder/adapter；用**模态专属 LoRA adapter**。论文题 "Compact yet Powerful Multimodal Language Models via **Mixture-of-LoRAs**" —— **注意是 Mixture-of-LoRAs，不是经典 MoE**。vLLM 需 `--max-lora-rank 320`
- 蒸馏：非蒸馏；由 Phi-4-mini 扩展（父模型 = Phi-4-mini-instruct）
- 量化：官方 ONNX 变体存在；本模型卡**未披露** GB 数与推荐方案
- 上下文：**128K**；vocab 200,064 ｜ 许可：**MIT**
- 官方端侧性能：**未披露**。训练：512×A100-80G、28 天
- benchmark：**语音** HF OpenASR 榜首 **WER 6.14%**（当时前 SOTA 6.5%，2025-03-04）；榜单现示 mean WER 6.02、AMI 11.09、RTFx 151.1。**视觉** 14 项均值 **72.0**（Phi-3.5-vision 60.9，Qwen2.5-VL-7B 73.1，GPT-4o 72.4）；MMMU 55.1、MMBench dev-en 86.7、ScienceQA 97.5、DocVQA 93.2、OCRBench 84.4、MathVista 62.4。**视觉-语音联合**均值 72.2
- 模态：**文本+图像+音频 输入 → 纯文本输出**。文本 23 语；视觉仅英文；音频 8 语。视觉上限 64 crops/frames；音频建议 ~40s，摘要最长 ~30min
- 来源：https://huggingface.co/microsoft/Phi-4-multimodal-instruct

### 11. Phi-4-mini-flash-reasoning (3.8B, SambaY) —— 架构上最值得展开的一条
- 首发：**2025-06**（训练 2025-05，数据截止 2025-02；Azure 博文 2025-07）｜ 参数量：**3.8B**
- 架构：**SambaY — decoder-hybrid-decoder 混合架构 + Differential Attention**，vocab 200K
  - **Self-decoder**：Samba 结构 = **Mamba(SSM) + Sliding Window Attention**，外加一个全注意力层
  - **Cross-decoder**：交替使用昂贵的 cross-attention 层与新提出的 **GMU（Gated Memory Unit）**；约**一半 cross-attention 层被 GMU 替换**。GMU 是廉价的 element-wise 门控，直接复用**最后一层 SSM 的 hidden state**
  - **Prefill**：仿 YOCO，全注意力层在 prefill 只由 self-decoder 计算一次 KV cache → **prefill 计算复杂度线性**
  - 其他：GQA、共享 KV cache 配单个 global attention 层、tied embeddings、**无需显式位置编码**
  - 依赖 `mamba`、`causal-conv1d`、`flash-attn`
- 蒸馏：**是**。基座 = Phi-4-mini-flash；推理能力来自 **DeepSeek-R1 生成的合成数学数据蒸馏**（>100 万题 × 8 rollouts，仅留正确解，约 30B tokens）
- 量化：官方**未披露** ｜ 上下文：**64K** ｜ 许可：**MIT**
- 官方性能（**官方口径 — 数据中心 GPU，不是端侧硬件**）：解码吞吐最高 **10×** 于 Phi-4-mini-reasoning，条件：**2K prompt / 32K 生成，vLLM，单张 A100-80GB，TP=1**。延迟随生成 token 数**近似线性**（前代二次）。**无任何手机/NPU/Copilot+ PC 官方 tok/s**
- benchmark（Pass@1）：**AIME24 52.29**（Phi-4-mini-reasoning 48.13）；**AIME25 33.59**（31.77）；**Math500 92.45**（91.20）；**GPQA Diamond 45.08**（44.51）。对比 DeepSeek-R1-Distill-Qwen-7B（53.70/35.94/93.03/47.85）。官方强调**未使用任何 RL**
- 来源：https://huggingface.co/microsoft/Phi-4-mini-flash-reasoning ；论文 https://arxiv.org/abs/2507.06607

### 12. Phi Silica（Copilot+ PC 内置 NPU 模型）
- 首发：**2024-05** 宣布（Build 2024）；2024-12 技术细节；开发者 API 2025-01
- 参数量：⚠️ **口径陷阱** — 微软官方博文与 Learn 文档**从未给出确切参数量**。流传的 "3.3B" 来自 2024-05 媒体报道。官方 2024-12 只说它是 "**a Cyber-EO compliant derivative of Phi-3.5-mini**"，并泛泛提到 NPU 可承载 "3 to 7B parameter SLMs"（硬件能力表述，非模型规格）→ **官方参数量：未披露**
- 架构：Dense Transformer（Phi-3.5-mini 衍生）。NPU 改造：**LayerNorm → RMS-Norm 并融合 Hadamard rotation**；**linear 层转成 1×1 Conv2D** 降 NPU 延迟。NPU 上用 **speculative decoding**
- 蒸馏：**是** — 派生自 Phi-3.5-mini
- 量化（官方细节完整）：基于 **QuaRot** 的 4-bit 权重量化
  - 权重：QuaRot + GPTQ，symmetric per-channel 到 4-bit 整数
  - 激活：asymmetric per-tensor round-to-nearest 到 **16-bit 无符号整数**
  - **选择性混合精度：128 个权重矩阵中约 4–8 个用 8-bit per-tensor**
  - LM head：4-bit block-wise
  - 综合 4-bit + 权重共享 + memory-mapped embeddings + 关闭 arena allocator，**内存降低约 60%**。GB 数未披露
- 上下文：原浮点模型 4K；**实际发运版 2K**（官方 2024-12："with support for 4k coming shortly"）。Prompt 以 **N=64 滑动窗口分块**处理
- 许可：**闭源，随 OS 分发**。API 属 Limited Access Feature，需申请解锁 token。**在中国不可用**
- 官方端侧性能（官方口径，**Copilot+ PC，Snapdragon X 系列 NPU 40+ TOPS**）：
  - **吞吐 up to 20 tokens/s** ← **解码吞吐**
  - **TTFT 230 ms（短 prompt）** ← 官方单独给出，与 20 tok/s 是**两个不同口径**
  - 上下文处理能耗 **Snapdragon X Elite 上仅 4.8 mWh**；token 迭代阶段功耗比 CPU **低 56%**
  - ⚠️ **陷阱#1**：2024-05 Build 流传的 "650 tokens per second first token latency" 单位自相矛盾，实指 **NPU 上的 prompt/context 处理吞吐**，不是 TTFT。真 TTFT 官方口径 230 ms
  - ⚠️ **陷阱#2**：**并非纯 NPU 推理** — transformer block 在 NPU，而 **tokenizer、embedding、LM head、GroupQueryAttention 跑在 CPU**
  - ⚠️ **陷阱#3**：2026 起也支持 GPU（RTX 30+/RX 9060+，6GB+ VRAM），但 GPU 上**没有 prompt compression、没有 speculative decoding，tok/s 更低**；GPU 版不预装，需按需下载数 GB
- benchmark：官方**未披露**任何标准基准分数
- 模态：纯文本（生成/摘要/改写/text-to-table）。8 语种
- ⚠️ **生命周期**：正被 Aion Instruct 取代 —— 2026-10-01 独立测试包 → 2026-10-23 Windows Insider → **2026-11-24 零售铺开，同时 Phi Silica 被移除**
- 来源：https://blogs.windows.com/windowsexperience/2024/12/06/phi-silica-small-but-mighty-on-device-slm/ ；https://learn.microsoft.com/en-us/windows/ai/apis/phi-silica

### 13. Mu（Windows 设置 Agent 模型）
- 首发：**2025-06-23** ｜ 参数量：**330M**（官方原文 "an efficient 330M encoder–decoder language model"，已确认）
- 架构：⚠️ **不是 decoder-only** — 是 **Transformer encoder–decoder**，encoder 把输入压成定长 latent，decoder 从中生成，**输入只编码一次**
  - **层数配比约 2/3 encoder : 1/3 decoder**，官方举例 32 encoder 层 vs 12 decoder 层
  - **tied embeddings**；三项改造：**Dual LayerNorm（pre+post LN）**、**RoPE**、**GQA**
  - 各层维度**刻意对齐 NPU 的 tensor size 与向量化单元**，只使用 NPU 支持的算子
  - hidden dim / FFN 宽度 / head 数 / vocab **均未披露**
- 蒸馏：**是** — 官方明说 "distillation from Microsoft's Phi models"（具体父模型名**未披露**）。优化器 **Muon** + warmup-stable-decay；微调用 **LoRA**
- 量化：**PTQ，主要 8-bit 与 16-bit**，无需重训练。与 AMD、Intel、Qualcomm 联合算子调优。**体积未披露**
- 上下文：官方未给确切数字（**未披露**）。只说 encoder-decoder 优势在 **512–8192 token 区间**成立
- 许可：**闭源，随 Windows 分发**，无权重发布
- 官方端侧性能（官方口径）：
  - **">100 tokens/s"** — Copilot+ PC NPU，**模型完全 offload 到 NPU**
  - **">200 tokens/s"** — **Surface Laptop 7**（优化后）
  - **端到端响应 < 500 ms**
  - 在 **Qualcomm Hexagon NPU** 上，相比同尺寸 decoder-only 模型：**首 token 延迟低 47%**、**解码快 4.7×**
  - ⚠️ **陷阱**：100/200 tok/s 都是**解码吞吐**。微软**没给绝对 TTFT 毫秒数**，只给相对值（基线模型未命名）。**prefill 吞吐未披露**。唯一绝对时间口径是"端到端 <500ms"
- benchmark：官方只给微调后对比 Phi-3.5-mini（Mu 是其 1/10 大小）：**SQUAD 0.692（Phi 0.846）；CodeXGlue 0.934（Phi 0.930）；Settings Agent 0.738（Phi 0.815）**。官方提到 Phi LoRA 方案"太大、达不到延迟目标"才选 Mu。Settings 微调用 **360 万条样本**，覆盖从约 50 个设置扩到数百个
- 模态：纯文本（自然语言 → Windows 设置操作）
- 来源：https://blogs.windows.com/windowsexperience/2025/06/23/introducing-mu-language-model-and-how-it-enabled-the-agent-in-windows-settings/

### 14. Aion 1.0 Instruct（2026 年最重要新增 — 取代 Phi Silica）
- 首发：**2026-06-02**（Build 2026；Edge Canary/Dev 开发者预览）
- 参数量：**未披露**。官方仅称 "smaller, faster and more efficient than our current Windows OS SLM"，以及在 Edge 中替代 4B 的 Phi-4-mini
- 架构：**未披露** ｜ 蒸馏：**未披露**
- 量化：**未披露具体位宽**。官方 sample repo 仅透露首次启动会为目标 EP 编译 "**QDQ ONNX models**"（说明是量化 ONNX 图，位宽未给）
- 上下文：**未披露** ｜ 许可：模型本身**未披露**（以 ESRP 签名 MSIX 分发）。官方在 Build 2026 承诺 2026-07 在 HF 开放权重 —— 截至检索 `huggingface.co/microsoft/Aion-1.0-Instruct` 返回 401，**未确认已上线**。示例代码仓库为 MIT。**不再需要 LAF token**
- 官方端侧性能：**未披露具体数字**。sample repo 明确说 app 里显示的 first-token latency 与 tok/s 是 "**preliminary — not final performance**"。唯一确定时间数据：**首次启动为 NPU 编译模型需约 3–5 分钟（每设备一次）**，之后近瞬时，NPU 上 prompt "sub-second to first token"
  - 硬件：预览版限 **ARM64 Snapdragon Copilot+ PC（QNN EP）**，x64 "coming soon"；EP 由 **WinML ExecutionProviderCatalog** 自动选择，**要求认证 NPU EP，无 CPU fallback**（与 Edge 侧"可 CPU 推理"说法存在口径差异，两条路径不同）。硬件门槛：Copilot+ PC ≥40 TOPS NPU，或 RTX 30+/RX 9060+ GPU
- benchmark：**未披露** ｜ 模态：纯文本（summarization、rewrite、intents、accessibility）
- 迁移时间表（官方）：2026-10 初独立可 sideload 包 → 2026-10 Windows Insider（Phi Silica 仍在，CFR 控制激活，开发者可用注册表键 A/B）→ **2026-11 零售铺开，Phi Silica 移除**
- 来源：https://blogs.windows.com/windowsdeveloper/2026/06/02/build-2026-furthering-windows-as-the-trusted-platform-for-development/ ；https://github.com/microsoft/Aion-Instruct-Preview-Sample/

### 15. Aion 1.0 Plan（14B 本地 agentic 模型）
- 首发：2026-06 宣布，官方称 "available in the coming months"
- 参数量：**14B**（官方原文 "a 14-billion parameter reasoning and tool-calling model with 32K context length"）
- 架构 / 蒸馏 / 量化 / 官方性能 / benchmark：**均未披露**
- 上下文：**32K** ｜ 许可：**未披露**；随 Windows inbox 分发（"on capable devices"），非按需下载
- 模态：纯文本 + 工具调用。官方能力："reason over user intent, invoke tools, manage files and orchestrate sub-agents"
- 来源：同上 Build 2026 博文

### 16. Foundry Local（分发平台，非模型 — 供 L4 层参考）
- 端到端本地 AI 方案，**随应用一起 ship**。提供 C#/JS/Rust/Python SDK、精选模型目录、自动硬件加速。**运行时仅给应用包增加约 20 MB**。推理引擎 ONNX Runtime。已 GA
- 模型目录：chat 类含 GPT OSS、Qwen、DeepSeek、Mistral、Phi；音频转录含 Whisper。官方称"每个模型都经过大量量化与压缩"
- 硬件加速：自动 NPU → GPU → CPU 回退。**v0.7 起新增 Intel 与 AMD NPU（Windows 11）**。**macOS Apple Silicon 走 WebGPU EP，经 Google 的 Dawn 把 WebGPU compute shader 编译成 Metal Shading Language**
- 平台：Windows、macOS(Apple Silicon)、Linux。无 Azure 订阅要求，无 per-token 费用。API 兼容 OpenAI
- 来源：https://learn.microsoft.com/en-us/azure/ai-foundry/foundry-local/what-is-foundry-local

### Microsoft 排除 / 核实结论
- **不存在 Phi-5，也不存在 Phi-4.5**。Azure Phi 产品页最新型号仍是 Phi-4-mini 与 Phi-4-multimodal。网传 "Phi-5 14B / 32-64K 上下文" 来自第三方 GPU 部署指南，该文自己声明是基于"pre-release announcements 和架构轨迹"的**推测**，不可采用
- 实际新增项是 **`microsoft/Phi-4-reasoning-vision-15B`**：HF 标注 2026-03-04 发布、15B 参数、16,384 上下文、MIT、文本+图像输入，训练用 240 张 B200 / 4 天。架构为 Phi-4-Reasoning 语言主干 + SigLIP-2 视觉编码器 mid-fusion。⚠️ 15B 手机不现实，属 PC/工作站级；且**未见微软官方博文，仅 HF 模型卡**
- **微软端侧路线重心已从 Phi 转向 Aion**

---

## 本批次三大口径陷阱（汇总）

### ① Meta 量化版 Llama 3.2 的 "2–4×" 与 "41%/56%"
- 硬件：**Android OnePlus 12，ExecuTorch + ARM CPU backend（KleidiAI kernels），不是 NPU**
- "2–4× 加速"是聚合说法，官方明确拆成 **decode 平均 2.5×、prefill 平均 4.2×** → tok/s 必须分开引用
- **56% 是"模型体积"平均降幅，41% 是"运行时内存 RSS"平均降幅**，且是 1B+3B、SpinQuant+QLoRA 的**平均值**。单模型差异大：1B 体积 −54.1%/内存 −39.7%；3B 体积 −60.3%/内存 −49.8%
- **隐藏代价：上下文从 128K 砍到 8K**；**BFCL V2 工具调用从 25.7 掉到 15.9**（1B SpinQuant）
- TTFT 是在 **prompt length = 64** 这一极短提示下测的

### ② SpinQuant vs QLoRA 的精确混合位宽
两条路线的**目标 scheme 完全相同**（4-bit groupwise g32 权重 + 8-bit per-token 动态激活；分类层/embedding 8-bit per-channel），差异在**怎么得到这个 4-bit 模型**：
- SpinQuant = 纯 PTQ（学旋转矩阵抹平 outlier + GPTQ，WikiText 小校准集，**不需训练数据**，1B 仅 1.7 GPU 小时）
- QLoRA = QAT 训 backbone → 冻结 → 训 LoRA adaptor（**adaptor 权重和激活全程 BF16**）→ DPO
- 质量 QLoRA > SpinQuant；可移植性 SpinQuant > QLoRA

### ③ Phi Silica / Mu 的 tok/s 到底是什么
- **Phi Silica**：`up to 20 tok/s` = **解码吞吐**；TTFT 单独给的 **230 ms**（短 prompt）。流传的 "650 tokens per second first token latency" 单位错乱，实为 **NPU prompt/context 处理吞吐**，不应当 TTFT 引用。且**非纯 NPU**：transformer block 在 NPU，tokenizer/embedding/LM head/GQA 在 CPU
- **Mu**：`>100 tok/s`（Copilot+ NPU）与 `>200 tok/s`（Surface Laptop 7）**都是解码吞吐**。微软**未公布绝对 TTFT**，只给相对值（Hexagon NPU 上比同尺寸 decoder-only 首 token 延迟低 47%、解码快 4.7×，基线未命名）。Mu 的加速本质来自 **encoder-decoder 一次性编码输入**
- **Phi-4-mini-flash-reasoning 的 "10× 解码吞吐" 是 A100-80GB + vLLM 上测的，属数据中心口径**，不能当端侧数字用
