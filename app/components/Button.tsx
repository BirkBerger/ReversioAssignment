
interface Props {
    onClick: () => void;
    children: React.ReactNode;
}

function Button({ onClick, children }: Props) {
    return (
        <button className="text-white bg-black bg-[linear-gradient(#4d4d4dc4,#27282bcf_7%,#282b2e_43%,#30353b_84%,#26282a_104%)] hover:bg-[#333] transition-color duration-150 cursor-pointer rounded-xl py-2 px-3 lg:max-w-100"
            onClick={onClick}>
            { children }
        </button>
    )

}

export default Button;