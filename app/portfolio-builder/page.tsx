import { ToolLandingPage, toolMetadata } from "@/components/tool-landing";
import { getToolPage } from "@/lib/tool-pages";

const tool = getToolPage("portfolio-builder")!;

export const metadata = toolMetadata(tool);

export default function Page() {
  return <ToolLandingPage tool={tool} />;
}
