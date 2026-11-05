# 端侧 AI 产业链全景图（Edge-AI Industry Map）

单文件 HTML 版「端侧AI产业链全景图」，覆盖边缘智能从上游 IP / 芯片 / 制造到下游终端 / 应用的完整价值链。

## 内容

- **产业链全景图** — 按价值链自下而上排列，色块 = 层级，卡片 = 厂商类型，实线箭头 = 供给 / 依赖方向，两侧竖带 = 横切维度。
- **L3 模型层详解** — 端侧小模型 / 多模态 / 语音等玩家，矩阵 + 筛选工具栏 + 洞察。
- **L4 方案与集成层详解** — 方案商 / 集成商 / ODM 等玩家，矩阵 + 筛选工具栏 + 洞察。
- **L5 终端设备层详解（机器人 / 具身智能）** — 人形机器人、工业 / AGV·AMR、服务 / 商用、消费 / 无人机、具身模型 / 核心部件五大品类，按国家 / 地区 × 品类的矩阵拆解 91 家玩家，附融资轮次 / 估值 / 市值等体量数据。

## 使用

用浏览器直接打开 `edge-ai-industry-map.html`，点击顶部页签切换视图。全景图中的 L3 / L4 / 机器人卡片可直接跳转到对应详解页。

## 可拆解 3D 机械模拟器（`teardown/`）

十三台“会计算的机器”的交互式 3D 拆解页，单文件、零外部依赖、可离线打开：

- `teardown/su-song-clock-tower.html` — 水运仪象台（1088）：按《新仪象法要》插图重建，36 斗枢轮每 24 秒步进一次，天衡擒纵、天柱一日一转，带动报时木人、浑象与浑仪；可实时观察擒纵或延时看完一天。
- `teardown/apollo-guidance-computer.html` — 阿波罗制导计算机 Block II（1969）：DSKY 回放阿波罗 11 号动力下降（含两次 1202 报警），同时拆开机壳看逻辑模块、磁芯绳与可擦写磁芯。
- `teardown/jacquard-loom.html` — 雅卡尔提花机（1804）：96 钩机头、24 张打孔卡、卡筒每纬转 90°，布面花纹由卡片逐纬织出。
- `teardown/newton-messagepad.html` — Apple Newton MessagePad H1000（1993）：手写演示后按维修顺序拆成 8 步，参数取自官方规格。
- `teardown/modicon-084-plc.html` — Modicon 084 PLC（1969）：梯形图四行程序的实时求解，扫描周期读入/写出延迟可见，开盖看逻辑卡与 4K 磁芯。
- `teardown/humanoid-robot.html` — 人形机器人（2024）：两连杆逆解步态、重心/支撑面平衡、髋膝执行器与 11 自由度手、胸口 VLA 计算机。
- `teardown/on-device-llm.html` — 端侧大模型（2023）：token 逐个生成、权重从 DRAM 流经 NPU 的脉冲、16 GB 内存占用与功耗温度联动。
- `teardown/ai-glasses.html` — AI 眼镜（2023）：快门/读行/编码的拍摄周期、取景器、镜腿主板与电池、前框相机与白色指示灯。
- `teardown/tinyml-esp32.html` — TinyML 与 ESP32（2018）：关键词识别的听/算/动循环、8 段能量波形、三类概率、屏蔽罩下的 ESP32 裸片与 flash。
- `teardown/kirin-970.html` — 麒麟970（2017）：裸片平面图上的任务调度,拍照/唤醒词/游戏/通话/应用/视频各点亮对应模块,功耗与温度联动。
- `teardown/kinect-v1.html` — Kinect v1（2010）：830 nm 结构光深度、640×480 @ 30 fps、四个麦克风与 ±27° 俯仰电机；行走的人驱动电机角度、深度图与散斑位移的实时读数。
- `teardown/siri-iphone-4s.html` — Siri / iPhone 4S（2011）：一次语音回合的拆解，录音/上行/云端/回复四段共用一条时钟，1.7 s 往返；拆后盖看 1432 mAh 电池、A5 与摄像头。
- `teardown/iphone-1st-gen.html` — 初代 iPhone（2007）：多点触控与加速度计的实时读数，机身随重力倾斜；拆后壳看 1400 mAh 电池、S5L8900 主板与 2 MP 摄像头（无 GPS）。
- `teardown/index.html` — 十三者的入口页。

拖动旋转、滚轮缩放，右侧按钮切换视角与标签 / 透视 / 剖切；闲置时自动导览。基于 [elvarofficial/teardown](https://github.com/elvarofficial/teardown)（MIT）构建。

## GitHub Pages 部署

仓库根目录的 `index.html` 与 `edge-ai-industry-map.html` 内容完全一致（单文件、零外部依赖，可独立发布）。在仓库 Settings → Pages 中把分支（如 `main`）发布为 Pages 源，即可通过 `https://<owner>.github.io/<repo>/` 访问该单页应用。

## 说明

- 融资轮次 / 估值 / 市值为编写时点的公开信息估算，非官方披露，仅供参考。
- 辅助文档「模型层数据支撑清单.md」记录了模型层玩家数据的口径与来源标注。
