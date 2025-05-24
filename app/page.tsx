import withMetaData from "@/components/withMetaData";
import HomeWrapper from "@/components/HomeWrapper";
const {metadata, default : Home} = withMetaData({
  title : "Cafe - Home",
  description : "Its a cafe, so just chill"
}, HomeWrapper)
export {metadata}
export default Home
