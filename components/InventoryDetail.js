import Title from "./Title";
import Box from "./Box";
import MediaItem from "./MediaItem";

export default function InventoryDetail({item}) {
    return (
        <div>
            <Title label="Inventory" classes={['pl-0','mb-3']} />
            <div className="flex">
                <div>
                    <Title label="Field 1" type={4} dashed={false} />
                    <div className="mb-2">Lorem </div>
                    <Title label="Field 2" type={4} dashed={false} />
                    <div className="mb-2">Lorem </div>
                </div>
                <div className="flex flex-col gap-2 ml-auto w-1/3 text-sm">
                    <Box>
                        <Title label="Attachments" classes={['-mt-2','mb-2']} add={true} type={5} dashed={false} />
                        <MediaItem
                            title="Some file"
                            image={{ src: 'https://placekitten.com/200/300' }}
                        />
                    </Box>
                    <Box>
                        <Title label="Tags" classes={['-mt-2','mb-2']} add={true} type={5} dashed={false} />
                        lorem ipsum
                    </Box>
                </div>
            </div>
        </div>
    );
}