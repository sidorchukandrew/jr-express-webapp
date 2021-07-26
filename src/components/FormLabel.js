export default function FormLabel({ children, className }) {
	return <label className={`font-bold block ` + className}>{children}</label>;
}

FormLabel.defaultProps = {
	className: "",
};
