import fs from 'node:fs/promises';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const wb=Workbook.create();
const main=wb.worksheets.add('补充玩家清单');
const headers=['优先级','层级','细分方向','公司/生态','地区','端侧角色','主要场景','产品/技术关键词','建议状态','补充理由','来源'];
const rows=[
['必须补入','L1 芯片','边缘AI加速器','Hailo','以色列','边缘AI NPU/加速器','工业、摄像头、机器人','低功耗推理','核心观察','代表性纯边缘AI芯片创业公司','https://hailo.ai/'],
['必须补入','L1 芯片','端侧NPU平台','Kneron','美国/中国台湾','端侧NPU与全栈平台','视觉、语音、生成式AI','低功耗、设备端部署','核心观察','端侧AI创业公司中产品线较完整者','https://www.kneron.com/'],
['必须补入','L1 芯片','边缘AI加速器','Axelera AI','荷兰','边缘AI芯片与平台','工业、视觉、机器人','D-IMC、Metis','核心观察','欧洲纯边缘AI芯片代表','https://www.axelera.ai/'],
['必须补入','L1 芯片','边缘ML系统','SiMa.ai','美国','芯片+软件平台','工业、机器人、视觉','MLSoC','核心观察','补足系统级边缘AI玩家','https://sima.ai/'],
['必须补入','L1 芯片','边缘NPU','DEEPX','韩国','端侧AI NPU','视觉、机器人、IoT','低功耗NPU','核心观察','亚洲创业公司代表','https://deepx.ai/'],
['必须补入','L1 芯片','边缘AI SoC','Blaize','美国','边缘AI SoC与平台','汽车、工业、机器人','嵌入式推理','重要观察','补足汽车与工业边缘算力','https://www.blaize.com/'],
['必须补入','L2/L3','TinyML/部署平台','Edge Impulse','美国/英国','数据、训练、部署一体化平台','IoT、工业、TinyML','设备端ML开发','核心观察','模型落地到设备的关键桥梁','https://www.edgeimpulse.com/'],
['必须补入','L2/L3','模型部署优化','Latent AI','美国','端侧生成式AI部署','国防、工业、边缘设备','模型压缩、部署','重要观察','补足端侧生成式AI工程层','https://latentai.com/'],
['必须补入','L5 机器人','机器人基础模型','Physical Intelligence','美国','机器人通用模型','通用机器人、操作任务','VLA、机器人基础模型','核心观察','代表机器人智能层的新方向','https://www.physicalintelligence.company/'],
['必须补入','L5 机器人','机器人基础模型','Skild AI','美国','机器人通用智能平台','人形、工业机器人','通用机器人模型','核心观察','模型层创业公司遗漏','https://www.skild.ai/'],
['必须补入','L5 机器人','机器人自主系统','FieldAI','美国','边缘实时机器人智能','工业、户外、移动机器人','自主导航、边缘推理','核心观察','强调真实环境部署与边缘运行','https://www.fieldai.com/'],
['必须补入','L5 机器人','人形机器人','Apptronik','美国','人形机器人整机','工业、物流','Apollo','重要观察','国际人形机器人重点玩家','https://apptronik.com/'],
['必须补入','L5 机器人','人形机器人','Agility Robotics','美国','人形机器人整机','仓储、物流','Digit','重要观察','商业化验证较早的公司','https://agilityrobotics.com/'],
['必须补入','L5 可穿戴','AI眼镜','Even Realities','德国','显示型AI眼镜','消费、助理','轻量显示、无摄像头路线','核心观察','AI眼镜独立品类的重要玩家','https://www.evenrealities.com/'],
['必须补入','L5 可穿戴','AI眼镜','Brilliant Labs','美国/新加坡','开放式AI眼镜','消费、开发者','开放平台、多模态','核心观察','开发者生态和开放路线代表','https://brilliant.xyz/'],
['必须补入','L5 可穿戴','AI音频眼镜','Solos','美国','音频型AI眼镜','消费、运动','语音助手、音频','重要观察','补足AI音频眼镜赛道','https://solosglasses.com/'],
['必须补入','L5 可穿戴','AR/AI眼镜','INMO','中国','AR/AI眼镜','消费、翻译、助理','显示、翻译、交互','重要观察','中国AI眼镜创业公司代表','https://www.inmolens.com/'],
['重要观察','L1 芯片','存算一体','Mythic','美国','模拟存算一体芯片','边缘视觉、工业','模拟计算、低功耗','观察','代表存算一体技术路线','https://mythic.ai/'],
['重要观察','L2/L3','模型压缩部署','Nota AI','韩国','模型压缩与编译部署','移动、汽车、IoT','量化、编译优化','观察','补足亚洲模型部署基础设施','https://www.nota.ai/'],
['重要观察','L2/L3','模型编译','OctoML','美国','模型编译与推理优化','云边协同、设备','模型编译','观察','连接模型与硬件的重要工具层','https://octoml.ai/'],
['重要观察','L5 机器人','机器人基础模型','Covariant','美国','机器人操作智能','仓储、物流','机器人模型、抓取','重要观察','工业机器人智能层代表','https://covariant.ai/'],
['重要观察','L5 机器人','人形机器人','1X','挪威/美国','人形机器人整机','家庭、服务','NEO、远程数据','重要观察','具身智能热度较高的玩家','https://www.1x.tech/'],
['重要观察','L5 机器人','人形机器人','Sanctuary AI','加拿大','人形机器人整机','工业、通用劳动','通用机器人手','观察','补足北美人形机器人阵营','https://sanctuary.ai/'],
['重要观察','L5 机器人','人形机器人','NEURA Robotics','德国','认知机器人','工业、服务','认知协作机器人','观察','欧洲机器人创业代表','https://neura-robotics.com/'],
['重要观察','L5 可穿戴','AI眼镜','Halliday','美国/中国','显示型AI眼镜','消费、助理','轻量显示、AI助手','观察','新一代轻量AI眼镜玩家','https://halliday.global/'],
['重要观察','L5 可穿戴','AI眼镜','Looktech','美国','摄像头型AI眼镜','消费、记录、助理','视觉理解、录制','观察','补足摄像头AI眼镜路线','https://looktech.ai/'],
['重要观察','L5 新硬件','个人记忆设备','Bee','美国','可穿戴AI记录器','个人助理、记忆','全天候记录、总结','观察','个人记忆型AI硬件代表','https://www.bee.com/'],
['重要观察','L5 新硬件','个人记忆设备','Omi','美国','可穿戴AI记录器','个人助理、记忆','录音、转写、记忆','观察','补足AI记录器新玩家','https://www.omi.me/'],
['生态基础设施','L2/L3','模型分发生态','Hugging Face','美国/法国','模型分发与开源生态','模型、端侧部署','Hub、Transformers、Tอกkenizers','生态支撑','不是纯端侧公司，但影响模型分发与适配','https://huggingface.co/'],
['生态基础设施','L2/L4','设备管理平台','Balena','英国','边缘设备部署与管理','IoT、边缘设备','fleet management','生态支撑','补足设备生命周期管理','https://www.balena.io/'],
['生态基础设施','L5 机器人','机器人仿真/平台','NVIDIA Isaac','美国','机器人开发生态','机器人、仿真、训练','Isaac Sim、Isaac Lab','生态支撑','机器人端侧AI的重要平台生态','https://developer.nvidia.com/isaac']
];
main.getRangeByIndexes(0,0,1,headers.length).values=[headers];
main.getRangeByIndexes(1,0,rows.length,headers.length).values=rows;
main.freezePanes.freezeRows(1);
main.getRange('A1:K1').format={fill:'#1f4e78',font:{bold:true,color:'#ffffff'},horizontalAlignment:'center',verticalAlignment:'center'};
main.getRange(`A2:K${rows.length+1}`).format={verticalAlignment:'top',wrapText:true};
main.getRange(`A2:A${rows.length+1}`).format={horizontalAlignment:'center',font:{bold:true}};
main.getRange(`A2:K${rows.length+1}`).format.borders={style:'continuous',color:'#d9e2f3'};
const widths=[12,12,18,22,14,24,20,24,14,34,36]; widths.forEach((w,i)=>main.getRangeByIndexes(0,i,rows.length+1,1).format.columnWidth=w);
const def=wb.worksheets.add('字段定义');
def.getRange('A1:C1').values=[['字段','含义','填写建议']];
def.getRange('A2:C10').values=[['优先级','补入紧迫程度','必须补入 / 重要观察 / 生态基础设施'],['层级','对应你的产业链层级','允许跨层，用 L2/L3 表示'],['建议状态','当前研究建议','核心观察 / 重要观察 / 观察 / 生态支撑'],['端侧角色','公司在端侧AI中的位置','芯片、模型、部署、设备、平台等'],['产品状态','建议后续补充字段','研发 / 试点 / 量产 / 大规模出货'],['端侧真实性','建议后续补充字段','A 核心端侧 / B 端云协同 / C 端侧入口 / D 概念宣传'],['商业状态','建议后续补充字段','未验证 / 试点 / 已定点 / 有稳定收入'],['来源','公司或项目官网','正式研究时建议增加融资、产品和客户来源'],['注意','本表是查漏补缺名单，不是市场份额排名','名单覆盖代表性和热度，不代表公司规模或商业成功']];
def.getRange('A1:C1').format={fill:'#1f4e78',font:{bold:true,color:'#ffffff'}}; def.getRange('A1:C10').format={wrapText:true,verticalAlignment:'top'}; [16,42,55].forEach((w,i)=>def.getRangeByIndexes(0,i,10,1).format.columnWidth=w); def.freezePanes.freezeRows(1);
const pri=wb.worksheets.add('优先级摘要'); pri.getRange('A1:B1').values=[['优先级','建议动作']]; pri.getRange('A2:B4').values=[['必须补入','优先加入现有地图，覆盖纯端侧芯片、模型部署、AI眼镜、机器人基础模型'],['重要观察','作为第二梯队和热度跟踪名单，定期更新融资、产品和量产进展'],['生态基础设施','不一定放在主产业链玩家层，可单独放入 L0/L2/L4/L5 生态支撑']]; pri.getRange('A1:B1').format={fill:'#1f4e78',font:{bold:true,color:'#ffffff'}}; pri.getRange('A1:B4').format={wrapText:true,verticalAlignment:'top'}; pri.getRange('A:A').format.columnWidth=18; pri.getRange('B:B').format.columnWidth=90;
const outDir='/Users/batlap/Desktop/端侧研究/outputs'; await fs.mkdir(outDir,{recursive:true}); const out=await SpreadsheetFile.exportXlsx(wb); await out.save(`${outDir}/edge-ai-player-gap-list.xlsx`); console.log(`${rows.length} rows saved`);
