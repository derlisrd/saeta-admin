
import { ConfigProvider } from "./_provider/provider";
import MainConfig from "./main";

function Config() {
    return <ConfigProvider>
        <MainConfig />
    </ConfigProvider>
}

export default Config;