import { resolve } from "path"

export default {
  srcDir: resolve("src/app/(frontend)"),
  publicDir: resolve("src/app/(frontend)/public"),
  bundleType: ["react"],
  componentCompatibleFolders: ["components", "popin"],
  componentsTemplatesDir: resolve("config/tasks/scaffold-component/templates"),
}
