export default function loadView() {
	return (
		<div class={this.type} ref={ref => this.view = ref}>
			<p>{this.message}</p>
		</div>
	);
}