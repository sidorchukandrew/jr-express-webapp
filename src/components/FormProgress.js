import { Step } from "semantic-ui-react";

export default function FormProgress({ currentStep, onStepClick }) {
	return (
		<div className="hidden lg:block lg:fixed top-36 font-semibold">
			<Step.Group vertical size="mini">
				<Step
					completed
					active={currentStep === 0}
					className={`${currentStep === 1 ? "text-purple-600" : ""}`}
					onClick={() => onStepClick(0)}
				>
					<Step.Content className={`${currentStep === 0 ? "text-purple-600" : ""}`}>
						Invoice
					</Step.Content>
				</Step>
				<Step active={currentStep === 1} onClick={() => onStepClick(1)}>
					<Step.Content className={`${currentStep === 1 ? "text-purple-600" : ""}`}>
						Attachments
					</Step.Content>
				</Step>
				<Step active={currentStep === 2} onClick={() => onStepClick(2)}>
					<Step.Content className={`${currentStep === 2 ? "text-purple-600" : ""}`}>
						Review
					</Step.Content>
				</Step>
			</Step.Group>
		</div>
	);
}
