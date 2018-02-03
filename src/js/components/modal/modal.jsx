export default function loadView() {
	return (
		<div class="popup" ref={ref => this.view = ref}>
			<div class="upper">{this.message}</div>
			<div class="stroke"></div>
			<div class="lower">
				<button onClick={this.confirm}><i class="icon-large icon-ok"></i>yes</button>
				<button onClick={this.dismiss}><i class="icon-large icon-remove"></i>no</button>
			</div>
		</div>
	);
}