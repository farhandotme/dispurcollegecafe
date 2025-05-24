import { Metadata } from "next";
interface WithMetadataReturn {
    metadata: Metadata;
    default: React.FC;
}
const withMetaData = (metadata: Metadata, Component: React.FC): WithMetadataReturn => {
    return {
        metadata,
        default: Component
    }

}
export default withMetaData