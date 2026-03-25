
interface Props {
    title: string;
    children: React.ReactNode;
}

function PageLayout( { title, children }: Props ) {

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            <h2>
                { title }
            </h2>
            { children }
        </div>
    )
    
    
}

export default PageLayout;