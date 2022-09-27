import { AppOrProject, ProgectType } from "@/store/indexDB";

// 启动程序或项目
export async function openExe(itemData: AppOrProject) {
    if (itemData.isApp) {
      const { path, name } = itemData;
      const data = await window.$elec.openApp({
        path,
        name
      });
      console.log(data);
    } else {
      const { path, name, code } = itemData as ProgectType;
      const data = await window.$elec.openProject({
        code,
        path,
        name
      });
    }
  }
