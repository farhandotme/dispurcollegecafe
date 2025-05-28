import withMetaData from "@/components/withMetaData";
import SettingsPage from "@/components/SettingsPage";
const {metadata , default : Settings} = withMetaData({
    title : "Beanzy Cafe - Settings",
    description : "Settings page of beanzy cafe"
}, SettingsPage );

export {metadata};
export default Settings